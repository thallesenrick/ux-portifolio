# RachAqui — original interactive experience

Source: user-provided `Untitled (24).zip`. `manifest.json` records the archive SHA-256 and the original name and SHA-256 of every full-screen PNG. All 14 files are unmodified 430 × 932 exports. `Ellipse 12.png` is a separate primitive already embedded in the complete screens and is not needed by the experience.

The interactive experience displays one complete exported screen at a time. Transparent, keyboard-accessible hotspots sit over actions present in the mockups. Stage selectors outside the phone provide access to every supplied state, including empty/filled forms and the empty/populated table variants. Turning on tap-target hints adds an optional outline; it does not redraw the UI.

Room names, participants, prices and selected items are the examples already present in the source images. Tapping the form fields moves from the supplied empty state to its supplied completed state. There are no custom participant forms, invented success screens, generated UI, simulated payment, or extra status/toolbar graphics inside the phone. The closing action returns to the supplied recent-activity home screen.

State metadata, labels and tap targets live in `src/data/rachaqui-experience.ts`. The UI lives in `src/components/case-study/RachaquiExperience.tsx`.
