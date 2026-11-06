---
name: profile-ferrofluid-web
description: Develop Tạ Anh Luận's existing Profile portfolio with its dark ferrofluid hero, pinned career milestones, reversible scroll effects, and glowing native cursor. Use only for this Profile project or an explicit request to reuse its design and implementation.
---

# Profile ferrofluid web

Work on `/Users/jonathanta/Desktop/Profile`. Inspect the current source and preserve unrelated uncommitted changes; substantial work is not committed to Git.

Read [the implementation handoff](references/implementation.md) before changing shaders, pinned career behavior or theme composition. It records accepted design choices, the source map, implementation mechanics, failure modes and verification limits. The workspace copy is `docs/PROFILE-WEB-HANDBOOK.md`; keep the copies consistent when updating them.

## Accepted choices

- One black/navy background throughout the portfolio, with cyan/violet accents and readable light text. Scope theming to `.portfolio-theme` to preserve the separate BA training route.
- Live interactive ferrofluid, dense small pointed peaks and glossy cyan/violet reflections. No large white orbiting typography; retain the screen-reader heading.
- Experience pins the whole section in one viewport. Scroll swaps one milestone at a time; fluid/year and detail copy fly out/in together; upward scroll reverses the same frames. Release into section 04 after the final milestone. Do not revert to a long one-sided list or merely sticky left column.
- Preserve the native main pointer with a soft decorative cyan/violet glow. No cursor hiding or input interception.
- Reuse profile facts from `src/data/portfolioData.ts`; preserve contact, CV download and mentoring links.

## Workflow

Inspect `src/Portfolio.tsx` and relevant motion components before editing. Propose layout alternatives first when the user asks for solutions; execute once authorized. Inspect screenshots and reference pages before claiming similarity. Change existing components rather than rebuilding unrelated sections.

Run `npm run build` and `git diff --check`. For timeline changes, verify first/final states, every reading interval and identical forward/reverse frames. For geometry changes, check finite vertices and valid indices. Inspect the browser when available: compilation and mocked tests do not prove visual fidelity, GPU performance or pointer accuracy. Report concrete verification limits when tools time out.

Keep work local unless publishing is requested. Update the handoff with meaningful decisions and verified lessons. The current surface is a stylized continuous WebGL mesh, not a particle cloud or physically accurate fluid simulation; describe it accurately.
