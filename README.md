# Ta Anh Luan Portfolio

A premium single-page personal CV and portfolio website built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Run Locally

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
npm run preview
```

## Edit Profile Content

Most editable profile content lives in:

- `src/data/portfolioData.ts`

Update this file to change:

- hero copy
- strengths
- experience
- case studies
- expertise
- learning and mentoring
- contact links

## Main Structure

- `src/App.tsx`: page composition
- `src/sections/*`: major homepage sections
- `src/components/layout/*`: navigation, footer, section wrappers
- `src/components/ui/*`: reusable UI pieces
- `src/hooks/useActiveSection.ts`: scrollspy behavior
- `src/utils/motion.ts`: shared motion presets

## Assets

- `public/Ta-Anh-Luan-CV.pdf` is the resume file used by the Download CV button.
- `public/ta-anh-luan-avatar.jpg` is the portrait image used in the hero section.

## BA BFSI training landing page

Public entry: `https://taanhluan.github.io/jonathanta/#/dao-tao-ba`.
The hash route works on GitHub Pages without server rewrite rules. The homepage includes navigation and a course promotion section. Training content and registration are in `src/TrainingPage.tsx`, with responsive styles in `src/training.css`.

Registration validates required fields and opens a prefilled email to the portfolio contact address. Visitors must send it from their email application. The page does not store submissions or report successful delivery; it also shows the generated text as a manual fallback. No backend or third-party collection endpoint is configured.

## Interactive ferrofluid hero

`FerrofluidCloud.tsx` renders a continuous indexed WebGL surface with a hexagonal needle field, analytic per-pixel normals and cyan/violet area-light reflections. Adaptive radial tessellation concentrates geometry at the tips. Cursor attraction and click ripples run on the GPU. Scroll changes the camera; Pause/Resume and reduced-motion preferences are supported. Rendering suspends outside the viewport and when the tab is hidden, with context-loss recovery.

Visual reference: [Jeremy Spaunhurst — PROJECT #7 FERROFLUID IN MOTION](https://www.behance.net/gallery/132782249/PROJECT-7-FERROFLUID-IN-MOTION). The scene is generated locally; it does not use the artist’s photos/GIFs or the previous Shopify background.

## Pinned career journey

`CareerExperience.tsx` keeps the full Experience stage pinned for ten scroll-driven milestones. `careerTimeline.ts` defines each reading interval and reversible fly-in/fly-out frame. The final milestone releases naturally into Selected Work. Navigation dots and previous/next buttons allow direct navigation; short windows retain an internally scrollable detail region. Reduced-motion mode removes flight transforms. The career ferrofluid reuses one renderer and changes its shape and angle with timeline progress.
