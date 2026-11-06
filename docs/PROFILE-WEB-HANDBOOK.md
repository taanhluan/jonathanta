# Profile website — implementation handoff

Updated: 2026-11-06 (Asia/Ho_Chi_Minh)
Project: `/Users/jonathanta/Desktop/Profile`
Owner: Tạ Anh Luận. Stack: React 18, TypeScript, Vite, Framer Motion, Lucide, CSS, native WebGL.

## 1. Design decisions and accepted behavior

The user wants a polished animated personal portfolio, grounded in banking, business analysis and product ownership. References evolved from a “website builds itself” reel to Shopify Spring ’26's immersive intro, then ferrofluid macro material. The orbiting white “Clarity.” ring was explicitly removed. The portfolio uses one black/navy canvas, with cyan/violet reflections and accents.

The current Experience interaction was explicitly approved: the **whole section stays pinned in one screen**, scroll advances through ten career milestones, the ferrofluid/year and detailed copy fly out/in in opposite directions, upward scroll reverses the same timeline, and section 04 follows after the last milestone. The user praised this design. Do not replace it with an ordinary vertical timeline or a long one-sided list.

The latest addition is a soft cyan/violet halo following the **native main cursor**. It strengthens around actionable elements, compresses on press, and is decorative only.

## 2. Routes and source map

| Source | Responsibility |
|---|---|
| `src/App.tsx` | Hash route selection and metadata; `#/dao-tao-ba` opens training, other hashes navigate portfolio |
| `src/Portfolio.tsx` | Portfolio composition, header and reading progress, profile, work, expertise, contact |
| `src/data/portfolioData.ts` | Profile facts, all career entries and content; reuse instead of inventing metrics |
| `src/main.tsx` | React StrictMode and final stylesheet import order |
| `src/portfolio.css` | Original layouts and accumulated styles |
| `src/scroll-story.css` | Shared text/scroll styling plus legacy story styling |
| `src/portfolio-theme.css` | Scoped dark palette and overrides loaded last |
| `src/components/motion/ParticleHero.tsx` | Current full-screen intro, live renderer, links and pause control; no visible large headline |
| `src/components/motion/FerrofluidCloud.tsx` | WebGL lifecycle, GPU buffers, pointer attraction/click pulse, pause, viewport suspension, context restoration |
| `src/components/motion/ferrofluidGeometry.ts` | Radial hexagonal indexed patches sampling each exact peak tip |
| `src/components/motion/ferrofluidShaders.ts` | GPU height field, per-pixel analytic normals, metallic reflected strip lights |
| `src/components/motion/particle-hero.css` | Intro frame, atmospheric fallback, links and controls |
| `src/components/motion/CareerExperience.tsx` | One pinned stage, active career data, timeline navigation, fly transitions |
| `src/components/motion/careerTimeline.ts` | Pure timeline function and 560px scroll allocation per milestone |
| `src/components/motion/career-experience.css` | Desktop/mobile pinned stage and constrained reading region |
| `src/components/motion/SiteBuild.tsx` | Wireframe/cursor construction effects on reading sections |
| `src/components/motion/siteBuildProgress.ts` | Position-based reversible construction frame |
| `src/components/motion/CursorGlow.tsx`, `cursor-glow.css` | Main native cursor's decorative glow |
| `src/components/motion/AnimatedTitle.tsx`, `ScrollPanel.tsx` | Shared words/reveal effects |
| `src/TrainingPage.tsx`, `training.css` | Separate Vietnamese BA training page and email-based registration |

`src/ScrollStory.tsx`, `src/build-story.css`, and `src/kiddo.css` are earlier experiments, not the current Experience implementation. Inspect imports before modifying or removing legacy files.

## 3. Palette and composition

Theme tokens are on `.portfolio-theme`:

- Canvas `#040910`; surface `#0a1420`; hover surface `#101e2d`.
- Main text `#eef3fa`; body `#aebccb`; secondary `#8598ab`.
- Cyan `#7bdde9`; violet `#b9a1ef`; subtle borders `#a5c7e326`.

All content sections share the canvas. Cards, mentoring promotion, marquee, sticky surfaces and navigation use related deep surfaces; no lavender/cream blocks between dark sections. The hero shade fades to the same canvas. Theme changes stay scoped; the training page is a separate route and should not accidentally inherit portfolio colors.

`portfolio.css` contains repeated legacy selectors. New scoped theme rules live in `portfolio-theme.css`, imported after it and `scroll-story.css`. Component CSS may be imported earlier through modules. Specificity matters; inspect computed results rather than assuming source order alone wins.

## 4. Ferrofluid renderer

### Material and geometry

The current renderer draws a **continuous triangle surface**, no longer point sprites. This change was required because visibly separated particles looked grainy rather than like the supplied glossy macro photograph. Do not describe the current geometry as a point cloud or claim it is a physical fluid simulation.

A hexagonal cosine field produces dense small peaks. A cusp profile preserves pointed tips. The radial mesh puts many rings near every exact apex and joins outer hexagonal boundaries. Desktop uses 72 angular slices and 18 radial rings; mobile/compact views use 36 slices. This is roughly 1.2 million desktop vertices and 2.33 million triangles over the full generated disk. Performance is device-dependent and has not been benchmarked comprehensively.

Vertex shaders deform the surface. Fragment shaders compute analytic field gradients and reflected cyan, violet and white strip lights at each pixel, avoiding interpolated vertex-lighting artifacts. If height-field equations change, update the analytic gradient in `fluidNormal` too; a mismatch makes reflection disagree with geometry.

`uZoom` controls framing: hero default 14 for macro, career compact renderer 2.5. Projection, screen roll, pitch and inverse pointer mapping must be kept in sync. Current roll uses cos/sin values `.91308894` / `.40776045`, pitch `.85 + progress*.13`. Pointer ray projection uses `viewScale`, then undoes roll and model rotation.

### Interaction and lifecycle

- Pointer moves attract the local magnetic field; leave decays attraction.
- Pointer down on the scene emits an expanding damped wave. Links/buttons do not trigger a pulse.
- `pausedRef` plus `wake` permits pause/resume without recreating buffers.
- A persistent clock prevents jump after pause; elapsed frame delta is capped.
- Reduced motion freezes ambient animation and disables magnetic interaction.
- IntersectionObserver and document visibility suspend the loop offscreen/hidden.
- Resize recalculates drawing-buffer size with DPR capped at 2.
- WebGL context loss clears ready status; restoration reinitializes GPU resources.
- `OES_element_index_uint` is used where available; an expanded non-indexed triangle fallback handles older WebGL contexts.
- Cleanup disposes shaders/program/buffers/listeners/observers/RAF, including StrictMode effect replay.

`sceneProgress` allows the career stage to drive shape phase and angle independently. A single career canvas persists while milestone text changes. Do not allocate one renderer per milestone.

## 5. Pinned Experience timeline

`CareerExperience` has an outer scroll distance and an inner `position:sticky; top:0; height:100svh` stage. The invisible scroll allocation is intentional: it advances the scene while the displayed section remains in place. There is no wheel/touch cancellation or scroll hijacking.

Outer height: `100svh + count * 560px`. Progress is `-sectionRect.top / (sectionHeight - viewportHeight)`, clamped 0–1. `careerFrame` multiplies progress by the milestone count, selects the current index, and reserves the middle 60% for a fully visible reading state. The first scene enters already visible; the last stays visible until natural section release.

Within each milestone:

- First 20%: fly in, fade up.
- Middle 60%: stable reading state.
- Final 20%: fly out, fade down.
- Fluid/year and detail copy travel in opposite directions.
- No time-based AnimatePresence transition: the frame derives from scroll position so reverse travel is deterministic.

All content reuses the existing `experiences` array order. It currently includes FPT before Xebia despite overlapping periods; this has not been silently reordered. Three responsibilities per milestone match the previous display; complete data remains in the content file.

Dots and previous/next scroll to `(index + .45) / count`, a stable reading position. The final forward button navigates to `#work`. On narrow/short screens, the detail region can scroll internally so text remains reachable; the outer stage remains pinned. Reduced motion removes translation/fading but preserves selection and controls.

**Do not include this stage in SiteBuild targets.** A separate wireframe animation owner would fade or transform the pinned content and break the coordinated scene.

## 6. Construction effects and cursor glow

`SiteBuild` measures real content boxes in viewport coordinates, draws wireframes with dimensions, and assigns five named decorative cursors. Rendering is position-driven, not a “seen once” IntersectionObserver animation. Upward scrolling must reverse the reveal. No idle RAF loop is needed after a frame settles. Focused content is forced readable. The original “seen once” version failed the user's reverse-scroll requirement.

The old intro also got stuck at near-zero opacity at scrollY=0. The current hero is excluded from construction targets entirely. Avoid reintroducing that failure.

`CursorGlow` follows fine hover pointers only, preserves the native cursor, and never captures input (`pointer-events:none`). It uses a radial aura plus a small ring, highlights links/buttons/fields, and contracts on press. RAF runs only until the halo catches the target. Pointer exit, blur, scrolling, hidden documents and coarse-pointer changes clear the halo so it cannot remain stranded on screen. Reduced motion uses immediate positioning; forced-colors hides decoration. It is mounted once per route. The default scope is `.portfolio-theme`; the training route mounts its own instance with `scope=".training-page"`. It still preserves the native pointer and never captures input.

## 7. References and iterations that failed

Visual references:

- https://www.shopify.com/editions/spring2026 — full-screen scene and original ring composition.
- https://www.behance.net/gallery/132782249/PROJECT-7-FERROFLUID-IN-MOTION — Jeremy Spaunhurst's ferrofluid macro color/material reference.
- Local package `/Users/jonathanta/Downloads/website-build-reel/` — wireframe construction reel; its README/SKILL/template describe a separate rendered video workflow requiring ReelCrew, not the implementation used by this website.

Lessons verified in this session:

1. A separate process-board animation did not meet “the website builds itself.” Use real page blocks for that effect.
2. Even angular spacing of glyphs produced disconnected letters and an oversized ring. Measured glyph advances and a distant camera improved it, but the user later removed the ring entirely.
3. Procedural random tree clusters did not resemble Shopify's authored point-cloud scene.
4. A Shopify fallback still improved comparison but was not interactive point cloud; it has been replaced in the live hero. `public/reference/shopify-spring2026-hero.webp` is an unused local reference asset, not an active background.
5. Increasing particle count alone did not reproduce glossy ferrofluid: continuous geometry and per-pixel reflections were needed.
6. A sticky left summary next to ten long job articles left a large blank column. The approved solution pins the entire section and swaps both visual and text together.
7. Browser tool timeouts occurred frequently. A successful build is not proof of visual correctness. Say exactly what was observed.

The renderer is a stylized procedural interpretation. Photographic macro equivalence, true optical depth of field, and physically accurate ferrohydrodynamics have not been established. Do not overclaim them.

## 8. Run, verify and deliver

```sh
npm run dev -- --host 127.0.0.1
npm run build
git diff --check
```

Vite base is `/jonathanta/`. Prefer the localhost URL reported by Vite; several dev servers may already occupy 5173/5174. `localhost` may resolve to IPv6 while `127.0.0.1` selects another process. Inspect actual served state if changes appear missing; do not start repeated servers blindly.

Meaningful checks:

- Timeline: all ten indices reachable, first/final visible, stable reading intervals, same position renders same frame forward/backward, release to section 04.
- Geometry: finite coordinates, triangle index count divisible by three, every index in range; both desktop and mobile configurations.
- Browser: shader compilation/render, live attraction and pulse, Pause/Resume, offscreen suspension, no text clipping, scene does not cover controls, sticky entry/exit, small viewport detail access.
- Glow: follows main cursor, strengthens on action, no click interception, hides on leave/touch, no perpetual idle animation.
- Check training route and hash links after changes to shared styles/navigation.

Build and math tests have passed during development. Native Chrome screenshots showed the live ferrofluid, but not every later adjustment or responsive layout was visually verified because some tool calls timed out. Recheck rather than inheriting an assumption of comprehensive QA.

Registration on the separate BA page uses a prefilled email, not a backend submission. Do not claim successful delivery/storage. Publishing is not part of this handoff; changes remain local until explicitly requested.


## 9. BA training route enhancement — 2026-11-06

`#/dao-tao-ba` now uses a separate scoped dark navy/cyan/violet design consistent with the portfolio. Do not apply the pinned career/WebGL machinery to this reading-focused route.

- `src/data/trainingContent.ts` owns three development tracks, three illustrative BFSI cases, five analysis steps, FAQ answers and the preserved shareable introduction. Cases are educational examples, not disclosed client requirements.
- `src/TrainingPage.tsx` owns independent track/domain/method selection. Native buttons use `aria-pressed` and `aria-controls`; panels announce updates. Track CTA preselects the registration level and clears any obsolete draft.
- Hero uses the existing local portrait, CSS orbital lines and floating business/delivery cards. Native cursor glow is shared through the new `scope` prop. No new dependency or external image service is required.
- Navigation scrolls without changing the hash route, respects reduced motion, and focuses the destination. FAQ and the long shareable introduction use native `details` disclosures.
- Registration has no backend or automatic email launch. Submit validates and trims name/goal, then creates a visible draft. A separate mailto link opens the user's mail app, where they must press Send. Copy fallback is available. Any form edit invalidates the preview; choosing another track does too. Do not claim submission/delivery success.
- No invented fees, course duration, student counts, testimonials, employment guarantees or automatic promotion claims. Existing project/teaching facts and COLE link were retained. Scheduling, delivery format and fees are agreed directly.
- CSS breakpoints cover 1100/800/540px, single-column forms on small screens, 16px mobile input text, reduced motion and forced colors. Theme rules remain scoped to training classes.

Verification this turn: TypeScript/Vite build passed. A runtime component-handler check exercised all three tracks/cases and all five steps; selected-track registration mapping; draft trim/encoding; no automatic email launch; stale-preview invalidation; whitespace validation; and FAQ presence. Desktop Chrome rendered the new route and registration layout; a screenshot exposed portrait cropping, corrected to top alignment. Browser access host was unavailable and native UI focus was repeatedly changed by concurrent user activity; comprehensive mobile visual QA, actual clipboard access and external mail-app launch were not verified. No email was sent.

Publishing target remains the existing GitHub Pages repo, `taanhluan/jonathanta`, using the `gh-pages` deployment script. If Git uses `HuppoTa` and returns 403, use the already authenticated `taanhluan` account for deployment and restore the original active account afterward. Never print authentication tokens.


## 10. Training evidence and named learner feedback — 2026-11-06

User supplied a COLE poster, training-group screenshot and six survey tables. They explicitly requested **real names on feedback**, while masking private contact/chat information. Public source stores no phone/email survey columns. No raw survey file or unmasked chat asset is included.

- `src/data/trainingFeedback.ts`: 17 selected substantive positive quotes, six survey-group summaries and four improvement themes. Same learner can appear on several dates; do not call this 17 learners. Preserve quote text, including typos. Standardized full-name spelling uses the other supplied rows. Do not count N/A, blanks, attendance or exercise answers as praise/satisfaction.
- `docs/TRAINING-FEEDBACK-SUMMARY.md`: synthesis of positive/mixed/constructive feedback, exclusions and attribution. No invented ratings or claims that all proposed improvements are completed.
- `src/components/training/TrainingExperience.tsx`: `TrainingEvidence` gallery after mentor and `TrainingFeedback` section before FAQ. Adds a student-feedback navigation button; FAQ/registration become 05/06.
- `training-experience.css`: two equal 16:10 image frames and responsive testimonial cards; no text truncation or stock learner portraits. Reviewer initials are derived from names and are not photographs.
- `public/training/cole-bank-finance.jpg` and `training-groups-redacted.jpg`: imagegen-edited display copies with navy padding; JPEG output normalized to 1600×1000. Group message previews, sender names and clipped right-edge information are masked in raster. Teacher identity on the public COLE poster remains. Originals from the conversation are not stored publicly.
- Feedback is live HTML, not AI-generated testimonial images. One quote animates horizontally/fades with Framer Motion; manual controls wrap across all 17 quotes. Auto-rotation is 12 seconds, only in view/visible and with no reduced-motion preference. Hover suspends; focus/manual navigation stops; Pause/Play controls allow deliberate resume. Hidden tab and component cleanup clear the interval. An archive exposes all selected quotes without timed reading.
- Constructive themes and per-survey summaries are also visible; positive quotes are explicitly labeled selected, not a measure of full-class satisfaction. Never republish learners' MoMo exercise answers as verified legal/financial facts.

Verification: build and diff checks passed. Runtime handler checks cover all quote navigation/wrapping, timer start/stop on viewport/hover/focus/tab visibility, reduced motion, cleanup, local gallery paths and absence of contact fields. Previous track/case/form checks still pass. Final redacted JPEG visually inspected and both image dimensions verified. Native Chrome accessibility tree confirmed the new gallery and feedback section; click-driven visual QA was interrupted by concurrent user changes, so comprehensive responsive visual verification remains limited.


## 11. Training company logo strip — 2026-11-06

`TrainingBrands.tsx` replaces six plain names under the training hero with locally hosted real logos. Source/provenance is recorded in `docs/TRAINING-LOGO-SOURCES.md`. Migros Bank uses its official inline desktop SVG; ABBank Vietnam, JACCS Vietnam, Home Credit Vietnam and COLE assets come directly from official headers/footers. BIC Bank Cambodia's historical mark was extracted from an official Cambodia IP trademark gazette, avoiding BIC Insurance/BIDC/BIC Laos confusion. Its successor iBank is the current destination link. No logo was generated or redrawn.

Dark-strip presentation uses monochrome CSS with increased opacity on hover. Preserve intrinsic ratios and optically balanced per-brand widths rather than stretching marks to a common rectangle. BIC's opaque white background uses inverted grayscale and screen blending; the other files preserve alpha. Six columns desktop / three columns under 800px; each brand is a link with image alternative and failed-image text fallback. Build and asset/XML checks passed; raster assets inspected locally.
