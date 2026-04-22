import { useEffect, useMemo, useState } from "react";

export type ActiveSectionMetrics = {
  id: string;
  progress: number;
  visibilityRatio: number;
  viewportPosition: number;
  isActive: boolean;
};

export type ActiveSectionDetails = {
  activeId: string;
  activeIndex: number;
  activeSectionProgress: number;
  sectionProgress: Record<string, number>;
  visibilityRatio: Record<string, number>;
  viewportPosition: Record<string, number>;
  sections: Record<string, ActiveSectionMetrics>;
};

type UseActiveSectionOptions = {
  detailed?: boolean;
};

export function useActiveSection(sectionIds: readonly string[]): string;
export function useActiveSection(
  sectionIds: readonly string[],
  options: { detailed: true },
): ActiveSectionDetails;
export function useActiveSection(
  sectionIds: readonly string[],
  options?: UseActiveSectionOptions,
) {
  const detailed = options?.detailed === true;
  const sectionKey = useMemo(() => sectionIds.join("|"), [sectionIds]);
  const stableSectionIds = useMemo(
    () => (sectionKey ? sectionKey.split("|") : []),
    [sectionKey],
  );

  const [activeId, setActiveId] = useState(stableSectionIds[0] ?? "");
  const [details, setDetails] = useState<ActiveSectionDetails>(() =>
    createEmptyDetails(stableSectionIds, stableSectionIds[0] ?? ""),
  );

  useEffect(() => {
    if (stableSectionIds.length === 0) {
      setActiveId("");
      setDetails(createEmptyDetails([], ""));
      return;
    }

    const elementCache = new Map<string, HTMLElement>();
    let rafId: number | null = null;

    const getElements = () =>
      stableSectionIds
        .map((id) => {
          const cached = elementCache.get(id);

          if (cached && cached.isConnected) {
            return cached;
          }

          const element = document.getElementById(id);
          if (element) {
            elementCache.set(id, element);
          }

          return element;
        })
        .filter((element): element is HTMLElement => Boolean(element));

    const measure = () => {
      rafId = null;

      const elements = getElements();
      if (elements.length === 0) {
        return;
      }

      const next = calculateDetails(stableSectionIds, elements);

      setActiveId((current) => (current === next.activeId ? current : next.activeId));

      if (detailed) {
        setDetails((current) => (hasDetailsChanged(current, next) ? next : current));
      }
    };

    const scheduleMeasure = () => {
      if (rafId !== null) {
        return;
      }

      rafId = window.requestAnimationFrame(measure);
    };

    const syncFromHash = () => {
      const hashId = window.location.hash.replace("#", "");

      if (hashId && stableSectionIds.includes(hashId)) {
        setActiveId(hashId);

        if (detailed) {
          setDetails((current) =>
            current.activeId === hashId
              ? current
              : {
                  ...current,
                  activeId: hashId,
                  activeIndex: stableSectionIds.indexOf(hashId),
                },
          );
        }
      }

      scheduleMeasure();
    };

    syncFromHash();
    scheduleMeasure();

    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [detailed, stableSectionIds]);

  if (detailed) {
    return details;
  }

  return activeId;
}

function calculateDetails(
  sectionIds: string[],
  elements: HTMLElement[],
): ActiveSectionDetails {
  const viewportHeight = window.innerHeight || 1;
  let bestId = sectionIds[0] ?? "";
  let bestScore = Number.NEGATIVE_INFINITY;

  const sections = sectionIds.reduce<Record<string, ActiveSectionMetrics>>((accumulator, id) => {
    const element = elements.find((entry) => entry.id === id);

    if (!element) {
      accumulator[id] = {
        id,
        progress: 0,
        visibilityRatio: 0,
        viewportPosition: 1,
        isActive: false,
      };

      return accumulator;
    }

    const rect = element.getBoundingClientRect();
    const visiblePixels =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

    const visibilityRatio = clamp(
      visiblePixels > 0 ? visiblePixels / Math.min(rect.height || 1, viewportHeight) : 0,
      0,
      1,
    );

    const progress = clamp(
      (viewportHeight - rect.top) / (viewportHeight + (rect.height || 1)),
      0,
      1,
    );

    const viewportPosition = clamp(
      ((rect.top + rect.height / 2) - viewportHeight / 2) / (viewportHeight / 2),
      -2,
      2,
    );

    const score = visibilityRatio * 10 - Math.abs(viewportPosition);

    if (score > bestScore) {
      bestScore = score;
      bestId = id;
    }

    accumulator[id] = {
      id,
      progress,
      visibilityRatio,
      viewportPosition,
      isActive: false,
    };

    return accumulator;
  }, {});

  const activeIndex = Math.max(0, sectionIds.indexOf(bestId));
  const activeMetrics = sections[bestId] ?? {
    id: bestId,
    progress: 0,
    visibilityRatio: 0,
    viewportPosition: 1,
    isActive: true,
  };

  sections[bestId] = {
    ...activeMetrics,
    isActive: true,
  };

  const sectionProgress = Object.fromEntries(
    Object.entries(sections).map(([id, metrics]) => [id, metrics.progress]),
  );
  const visibilityRatio = Object.fromEntries(
    Object.entries(sections).map(([id, metrics]) => [id, metrics.visibilityRatio]),
  );
  const viewportPosition = Object.fromEntries(
    Object.entries(sections).map(([id, metrics]) => [id, metrics.viewportPosition]),
  );

  return {
    activeId: bestId,
    activeIndex,
    activeSectionProgress: activeMetrics.progress,
    sectionProgress,
    visibilityRatio,
    viewportPosition,
    sections,
  };
}

function createEmptyDetails(sectionIds: string[], activeId: string): ActiveSectionDetails {
  const sections = sectionIds.reduce<Record<string, ActiveSectionMetrics>>((accumulator, id) => {
    accumulator[id] = {
      id,
      progress: 0,
      visibilityRatio: 0,
      viewportPosition: 1,
      isActive: id === activeId,
    };

    return accumulator;
  }, {});

  return {
    activeId,
    activeIndex: Math.max(0, sectionIds.indexOf(activeId)),
    activeSectionProgress: 0,
    sectionProgress: Object.fromEntries(sectionIds.map((id) => [id, 0])),
    visibilityRatio: Object.fromEntries(sectionIds.map((id) => [id, 0])),
    viewportPosition: Object.fromEntries(sectionIds.map((id) => [id, 1])),
    sections,
  };
}

function hasDetailsChanged(
  previous: ActiveSectionDetails,
  next: ActiveSectionDetails,
) {
  if (previous.activeId !== next.activeId || previous.activeIndex !== next.activeIndex) {
    return true;
  }

  if (Math.abs(previous.activeSectionProgress - next.activeSectionProgress) > 0.002) {
    return true;
  }

  for (const id of Object.keys(next.sectionProgress)) {
    if (Math.abs((previous.sectionProgress[id] ?? 0) - next.sectionProgress[id]) > 0.002) {
      return true;
    }

    if (Math.abs((previous.visibilityRatio[id] ?? 0) - next.visibilityRatio[id]) > 0.002) {
      return true;
    }

    if (Math.abs((previous.viewportPosition[id] ?? 0) - next.viewportPosition[id]) > 0.01) {
      return true;
    }
  }

  return false;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
