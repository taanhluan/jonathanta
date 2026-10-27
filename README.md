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
