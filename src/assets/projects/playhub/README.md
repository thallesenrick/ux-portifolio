# Playhub — sources and presentation assets

## Original interface exports

The 24 files in `originals/` come from the user-supplied `Untitled (23).zip`, associated with https://www.figma.com/design/v8y0LZqC6qd7iCCemVLFnF/Untitled.

PNG exports are byte-for-byte copies. The eight PDF exports were rasterized as complete pages at 2× resolution using PDF.js 6.4.299. `originals/manifest.json` records the source filename and SHA-256 checksums for the archive, source files and displayed files. App UI is never generated or redrawn. Existing `guide.png` and `type.png` remain supporting project documentation from the repository.

`originals/motion-manifest.json` lists every original used by the animations:

- Onboarding: 40 → 41 → 36 → 29.
- Booking: 38 → 13 → 12 → 18 → 19 → 39.
- Payment options: 18 → 19 → 20 → 21.

The 393 × 852 animations hold each full screen for 1.8 seconds and crossfade for 0.48 seconds. No added toasts, cursors, fields, success screens or UI states. GIF uses an indexed 255-color palette, so it cannot preserve every source color exactly. The page uses the higher-quality VP9 WebM exports and the original full-resolution PNGs for enlarged views. Both GIF and WebM formats are compressed presentations of the original screens.

To regenerate: `node scripts/render-playhub-motion.cjs`. Authoring dependencies use the same ignored local tooling as the RachAqui renderers (`tmp/playhub-qa/node_modules/playwright-core`, and `tmp/rq-animation-tools/node_modules/{gifenc,pngjs,webm-muxer}`). Set `CHROME_PATH` when Chrome is not at the default Windows installation path. No new runtime dependency is needed.

## Atmospheric background photography

Generated with the built-in `image_gen` tool; these images are presentation backgrounds only and are never part of the app interface. Final files are `art/beach-tennis-friends.webp` and `art/rental-courts.webp`, encoded as WebP at quality 0.9 from 1536 × 1024 outputs.

### Beach tennis prompt

Use case: photorealistic-natural. Asset type: wide editorial background photograph for the Playhub sports court booking UX case study. Create a premium natural lifestyle photograph of four adult Brazilian friends, women and men with varied skin tones, enjoying a casual beach tennis doubles game on a real rental sand court in Brazil. Smiling, relaxed joy, two players on either side of a proper beach tennis net, holding solid perforated beach tennis paddles, small orange ball in play, believable anatomy. Warm late afternoon sunlight, cream sand, forest green perimeter fence, small tropical trees beyond. Composition: wide cinematic landscape 3:2, eye-level sideline view, players and the net primarily in the center and right, airy uncluttered background. Soft sun flare, subtle analog grain, warm ivory highlights and restrained sage green. Real photography, tasteful editorial art direction matching a warm cream and sage green portfolio page. No text, no lettering, no logos, no UI, no smartphones, no mockup screens, no watermarks. The image is only an atmospheric section background; do not generate any app interfaces.

### Sports court prompt

Use case: photorealistic-natural. Asset type: wide architectural editorial background photograph for a premium sports court booking app portfolio case. Primary request: a beautiful real Brazilian sports complex with rental multi-sport courts in late afternoon golden sunlight. Elevated oblique angle from spectator terrace showing a green and muted terracotta multipurpose hard court with crisp white basketball, volleyball and futsal markings and a low net, adjoining a fine sand beach tennis court to the side, tall dark green wire fencing, a few tropical palms, warm sunlight and long soft shadows. A well-kept neighborhood arena for renting by the hour, welcoming and approachable rather than a professional stadium. No people required. Wide cinematic 3:2 landscape composition with realistic geometry, elegant sage green and sandy ivory colors, fine natural film grain. High-end travel and lifestyle architectural photography. Clear recognizable courts. No text, no logos, no signage, no watermark, no mobile device, no UI or invented app screens.
