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
