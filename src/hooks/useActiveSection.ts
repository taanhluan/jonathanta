import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const syncFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && sectionIds.includes(hashId)) {
        setActiveId(hashId);
      }
    };

    syncFromHash();

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-10% 0px -66% 0px",
        threshold: [0.1],
      },
    );

    elements.forEach((element) => observer.observe(element));
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [sectionIds]);

  return activeId;
}
