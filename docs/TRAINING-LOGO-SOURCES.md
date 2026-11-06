# Training company logo sources

Retrieved 2026-11-06. Used only to identify the existing project/teaching experience listed on the portfolio. Local files avoid third-party logo hotlinking. Original logos are not AI-generated or redrawn. CSS gives transparent marks a restrained white treatment for the dark background; hovering increases visibility. Aspect ratios are preserved; optical sizes differ intentionally.

| Brand | Local asset | Primary source |
|---|---|---|
| Migros Bank | `public/logos/migros-bank.svg` | [Official website](https://www.migrosbank.ch/) — complete inline desktop SVG from `.logo-container`, including its original paths and gradient; responsive class removed for standalone image use. |
| BIC Bank Cambodia | `public/logos/bic-bank.png` | [Cambodia Department of Intellectual Property official gazette](https://www.cambodiaip.gov.kh/wp-content/uploads/DocResources/489cbfa7-4f39-4e5e-8f64-e55cfa0a7294_e9e18593-8994-4a44-818e-1c9f313dbe17-kh.pdf) — PDF page 83 (printed page 73), registration 90447/D/2020, owner B.I.C (CAMBODIA) BANK PLC. Embedded image extracted losslessly to PNG; not BIC insurance, BIDC or BIC Laos. Historical brand matches the project name. Current institution link uses iBank. |
| ABBank Vietnam | `public/logos/abbank.png` | [Official header logo](https://abbank.vn/uploads/images/2026/02/01/logo-160x62-697e39f2c1aaa.png) from [abbank.vn](https://abbank.vn/). |
| JACCS Vietnam | `public/logos/jaccs.png` | [Official logo](https://jaccs.com.vn/wp-content/uploads/2020/03/logo_jaccs.png) from [jaccs.com.vn](https://jaccs.com.vn/). |
| Home Credit Vietnam | `public/logos/home-credit.webp` | [Official white footer lockup](https://www.homecredit.vn/static/f4845a244c19b53c79beb31f91254f7f/64fa3/White_8b0987dbeb.webp) from [homecredit.vn](https://www.homecredit.vn/). Full lockup retained, including tagline. |
| COLE | `public/logos/cole.png` | [Official white logo](https://cole.vn/client_fe/v2/images/logo-white.png) from [cole.vn](https://cole.vn/). |

BIC discovery: old bicbank.com.kh no longer resolved. Its successor's historic WordPress report paths serve an HTML fallback rather than a PDF. A verified official trademark record was used instead. The BIC logo has an opaque white raster background; `grayscale(1) invert(1)` plus `mix-blend-mode: screen` makes that background blend into the dark strip without editing its shape.

Implementation: `src/components/training/TrainingBrands.tsx`. Six columns on desktop, three columns below 800px; same item alignment, no stretching, accessible image alternatives, direct brand links and text fallback on failed image loading. No new dependencies.

## Career timeline assets — 2026-11-06

- FPT Software: official fptsoftware.com header, `/-/media/project/fpt-software/fso/uplift/home/logo_fpt_text_black.png?modified=20240111094946` (served as WebP, saved as fpt.webp).
- Axon Active: https://cdn.axonactive.com/wp-content/uploads/2026/07/axon-active-logo.webp
- Innotech: https://innotech-vn.com/wp-content/themes/innotech/public/images/logo_innotech_2_optimized.png
- Xebia: https://xebia.com/media/2025/03/Xebia_logo-2.svg
- Amaris: https://commons.wikimedia.org/wiki/File:Logo_Amaris.png — Amaris, 2017, CC BY-SA 4.0; original image unmodified.
- Maersk: https://commons.wikimedia.org/wiki/File:Maersk_Group_Logo.svg — corporate wordmark; original SVG unmodified.

Employer logos are mapped separately from client/project logos. Independent freelance work uses a plain text label rather than a fabricated logo.
