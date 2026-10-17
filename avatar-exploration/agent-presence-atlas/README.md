# Form / presence — exploration 01

[Open the self-contained gallery](index.html). First substantial exploration for [min1 issue #5](https://github.com/mantascc/min1/issues/5), ready for review; the issue remains open.

The HTML contains all code, styles and vector assets. It needs no build, server, dependency, account or network connection. A local HTTP preview is also available with `python3 -m http.server 8848 --bind 127.0.0.1` from the repository root, at `/avatar-exploration/agent-presence-atlas/`.

## What is here

**80 curated structures across ten construction rules:** pressure forms, apertures, stroke glyphs, modular assemblies, folded ribbons, radial systems, collectives, matrices, contour stacks and articulated forms. Each family contains two kawaii, two playful, two functional and two Bauhaus studies. These labels describe the original specimens; edits can move their personality elsewhere. Palette swaps do not count toward the eighty structures.

- Filter by construction and vibe; switch the gallery between 128 px and actual 64 px previews.
- Tap any study to edit its construction, palette/custom color, softness, proportion, spacing, weight, orientation and deterministic seed.
- Arrange individual parts by touch/mouse dragging, a part selector and directional buttons, or arrow keys. Single-contour constructions move as one connected mark. A conservative fit rule keeps extreme edits inside the frame.
- Compare exact 64 px light/dark previews against a larger asset with internal detail. Identity hues stay constant across themes and states.
- Select idle, working, attention and failure still poses. Optional playback animates idle breathing and working rhythm; the cycle interpolates all four states. Attention and failure also work as static signals. Phase scrubbing and reduced-motion alternatives are available.
- Save candidates locally and compare the first four saved studies. Export individual SVG/PNG assets, a four-state SVG sheet, an identity recipe, or all saved/edited identities. Recipe imports reproduce shape, color, seed, part positions, pose blend and phase.

## First design assessment

User review, October 17, 2026: **Articulated forms, Matrices and Collectives** are the successful directions. **Pressure forms** are also promising, with a requested shift toward retro-game pixels instead of organic shapes.

Pressure forms now use solid stepped silhouettes with a limited highlight/body/shadow palette. The pixel chunkiness control selects three grid densities; pose changes retain the discrete construction. The gallery recommendations reflect the three selected directions.

## Focused silhouette exploration

[Open the 48-silhouette comparison](silhouettes.html). Twelve studies each for Articulated forms, Matrices, Collectives and pixel-style Pressure forms, in one ink with no faces or motion. Each card includes actual 24, 32 and 64 px views. Star candidates to compare them on a shared shortlist, switch light/dark grounds, or export selected IDs as JSON. Selections persist locally when browser storage is available. The twelve Pressure studies use connected, solid pixel silhouettes with stepped edges and no gaps between cells.

## Character showreel

[Open Little company](showreel.html): sixteen expressive character treatments derived from the silhouette studies, with four directions each for Articulated forms, Matrices, Collectives and Pressure forms. The cast deliberately spans face-led characters, abstract mechanisms, pixel creatures and distributed groups.

Swap a character into four illustrative UI scenes: conversation, collaborative task board, inline question and empty state. Compare idle, working, needs-input, success and stuck expressions. Play the automatic reel to cycle through scenes and cast members, or pause motion for static review. Small-size samples show actual 24, 32, 48 and 96 CSS pixel appearances. The demo contains no live tasks or agents and needs no external assets or dependencies. Reduced-motion preferences disable animation; starting the reel still permits discrete scene changes.

Checked: all 80 character/expression SVG trees parse; four characters per family; cast filtering/swapping, scene switching, interactive prompt responses, pause and automatic reel progression work in the browser. All four scenes fit 320 px and 768 px viewports without horizontal overflow; the prompt scene was also inspected at 390 px. These are browser checks, not physical-device testing.

## Matrix characters — October 17, 2026

[Open the animated matrix study](matrix-characters.html). This focused continuation explores abstract characters through shape, expression, and motion on a fixed 19 × 19 lattice. Six identities test different movement rules: Moss breathes and compresses; Reed reaches; Loop changes its aperture; Wisp ripples; Duet separates and reunites; Rook braces and lifts its crown. These are new motion studies informed by the earlier matrix silhouettes, not replacements for them.

Compare idle, curious, thinking, delighted, startled, and sleepy states. Switch squares/dots, hide the grid, or hide faces to judge whether posture alone communicates character. Pointer position influences gaze; selecting a character triggers a small acknowledgment. Loop expresses itself through negative space. Cell centers remain fixed; occupancy, size, and luminance animate. Shapes use soft occupancy at their edges rather than strictly binary pixels.

Playback starts automatically unless reduced motion is requested. Pause freezes the current pose; expressions remain selectable while paused. This is a procedural sketch, not a production sprite set. Identity and expression readability still need user review, particularly at small avatar sizes. The accompanying inline preview passed Chromium checks for animation, exact pause, expression changes, controls, 320/390/736 px layouts, and reduced motion.

## Matrix studio — professional interface demo

[Open Forma](matrix-studio.html), a self-contained professional workspace built around the six matrix characters. **Run demo** starts a guided local sequence: Moss inspects a pending-state bug, Loop reviews the proposed patch, the user applies it, Reed improves the design, and Rook closes the session. Character expression follows activity: thinking, asking for input, noticing a problem, and completing work. Helpers appear in the team roster, beside relevant work, in the composer, and in the activity trail.

Code, Design, and Review are interactive views of the same example. The source editor accepts edits; the patch preserves surrounding source and refuses to apply if the expected button has changed. Three source-pattern checks examine the label, pending guard, and busy feedback. The design preview reflects that guard, supports compact spacing and an accent variant, and updates its supporting text token. Token edits also update the preview. All six helpers can be selected; the composer returns local scripted responses.

This is an interface prototype: no live AI, React execution, actual test runner, connected repository, purchase, or deployment. Edits last for the current page session. Motion can be paused; reduced-motion preferences start with still characters. Reset cancels pending demo transitions.

Repeat the browser checks with `PLAYWRIGHT_MODULE=/path/to/playwright node verify-matrix-studio.cjs`. Checks cover the guided flow, source changes, pending-button behavior, design controls, helper routing, all three views at 320/390/768/1024 px, reduced motion, changed-source rejection, and reset cancellation. The inline version uses the same interface and animation source.

## Full behavior demos

Two deeper continuations of the selected Collectives and Pressure directions:

- [Collectives / Gather](collectives-demo.html): Trio, Mote, Chorus and Fable gather a brief, compare formats, recover from a missing reference and hand a draft into review. Character grouping changes with working, attention, handoff, error and completion states.
- [Pressure / Pocket](pressure-demo.html): Puff, Bud, Glitch and Flick organize fictional notes, help draft an update, accompany a compressed focus session and recover from a simulated export failure. Pixel silhouettes retain their individual faces and discrete movement.

Each demo has four seven-step scenarios, streamed dialogue, visible tool activity, a work product that develops alongside the conversation, and a decision that changes the result. Individual scenarios wait for a user choice; the guided tour follows the first sample choice and continues through all four scenarios. Playback supports pause, replay, step controls, timeline seeking and pace adjustment. Characters can be swapped without resetting the story. Complete artifacts open inside the demo. Everything is fictional and local; no actual agent tools, messages, timers or file operations run.

The HTML pages share `character-demos.js` and `character-demos.css`; keep these files beside the pages. Reduced-motion preferences start the demo paused and disable animation. Pages also pause when hidden.

Validation: all eight scenarios and their alternate decisions reached the correct final artifact in the browser; the guided tour advanced automatically into the next scenario; character swapping and modal results worked without console errors. All scenarios were checked at 390 px without horizontal overflow, with additional 320 px checks on both pages. The 48 character/state SVG trees parse, and all sixteen scripted branch outcomes are distinct. Physical-device testing remains outside these checks.

## Matrix characters — stepped study

[Open the matrix character study](matrices.html). A deeper pass on Matrices after the October 17 review: eight abstract characters (Pip, Slab, Quad, Worm, Murmur, Stack, Hinge, Glyph) on 12 × 12 grids, plus a 5 × 5 minimum. Each has its own body grammar, so the eight expressions (idle, listen, think, speak, joy, doubt, sleep, error) look different in every body. Cells only switch; nothing tweens. Eyes are negative space and follow the pointer or a tap. A looping agent script (request → think → answer → clarify → done) runs by default; a step-rate control (6/12/24 fps), cell style (square, LED, solid) and an 8 × 8 contact sheet support comparison. Reduced motion starts paused.

## Evidence

- [Mobile gallery, light](evidence/mobile-gallery-light.png) · [mobile gallery, dark](evidence/mobile-gallery-dark.png) · [phone laboratory](evidence/laboratory-mobile.png)
- [Desktop](evidence/desktop-dark.png) · [desktop laboratory](evidence/laboratory-desktop.png) · [four-way comparison](evidence/comparison-desktop.png)
- All eighty studies: [dark 1–5](evidence/contact-dark-1.png), [dark 6–10](evidence/contact-dark-2.png), [light 1–5](evidence/contact-light-1.png), [light 6–10](evidence/contact-light-2.png)
- Export samples: [64 px PNG](evidence/sample-interface.png), [512 px PNG](evidence/sample-communication.png), [SVG](evidence/sample-interface.svg), [state sheet](evidence/sample-state-sheet.svg), [reproducible recipe](evidence/sample-identity.json)
- [Machine-readable verification results](evidence/verification.json) and [repeatable browser checks](verify.cjs).

The original exploration passed all thirteen verification groups in Chromium (the evidence below predates the October 17 pixel revision). Checks cover 1,280 deterministic renders (80 studies × 4 states × 2 themes × default/extreme settings), valid SVG XML, four distinct poses per study, frame bounds, filtering, persistence, keyboard access, actual emulated touch events, drag/nudge editing, motion/pause/cycling, live reduced-motion changes, exports, exact recipe/session round trips and invalid-import rejection. Layouts were checked at widths 320, 360, 390, 412, 768, 844 and 1440 px, in both themes, without horizontal overflow. Exported PNGs have the correct dimensions and transparent pixels. The exact HTML also runs with networking disabled and browser storage unavailable.

To repeat the checks, install Playwright separately for development and run `node verify.cjs`. `PLAYWRIGHT_MODULE` can point to an existing installation; `CHROMIUM_BIN` can select a browser executable. The harness starts its own temporary local server and regenerates evidence. Neither dependency is needed to use the gallery.

**Limits:** phone checks use Android-sized Chromium touch emulation, not physical hardware. Managed Chromium blocked `file://` navigation, so offline execution was verified by loading the exact HTML into a network-disabled browser context. Android file-opening behavior and the final Library/browser-preview delivery route still need confirmation. GitHub’s source view is not a runnable phone preview. State semantics and palette separability have not been tested with users; the ratings are design judgments. Motion/video export, arbitrary path drawing, 3D and production integration are outside this first exploration.

## Reference lineage

Read the full issue and all comments, including [breadth](https://github.com/mantascc/min1/issues/5#issuecomment-6238021889), [categorized comparison](https://github.com/mantascc/min1/issues/5#issuecomment-6238067764), [HTML/vibe axis](https://github.com/mantascc/min1/issues/5#issuecomment-6238111327), and [phone review](https://github.com/mantascc/min1/issues/5#issuecomment-6238119606).

[Style seed](https://github.com/mantascc/100days/blob/main/43-style-seed/style-seed.md) and [Clear Channel](https://github.com/mantascc/100days/tree/main/69-clear-channel) inform simple rules, explicit mechanisms and the comparison grid. [Sprite States](https://github.com/mantascc/100days/blob/main/89-sprite-states/interface.md) informs still-pose communication; [Thinking States](https://github.com/mantascc/100days/blob/main/30-thinking-states/interface.md) informs deterministic time-based variation. Monochrome and hover-only conventions were adapted to the issue’s identity-color and touch requirements. SVG is sufficient for the bounded collective and matrix scenes here; no raster or 3D dependency is justified yet.

Originally developed as a local exploration; now published in [Studio](https://mantas.cc/studio/).

## Nocturne — matrix characters after dark

[Open Nocturne](matrix-nocturne.html). A minimal dark interface with white matrix characters in sidebar, conversation, and companion sizes. The library below contains 24 distinct procedural silhouettes, expanding the six original matrix characters. Select any character to place it in the interface; compare idle, working, attention, and done states. Underlight adds a soft accent glow below the white cells; 30% tint blends white into a maximum 30% accent at the bottom; White removes both treatments. Motion can be paused, and reduced-motion preferences start it paused. Interface content is illustrative with no connected agent.

## Room — agents at work

[Open Room](agent-room.html). A wide neutral chatroom study based on Nocturne, with six matrix agents, a shared brief, visible collaboration, and an artifact inspector. Run, pause, step through, or replay a twelve-step scripted session. Agents research the supplied fictional brief, write, review, revise, and assemble three sample artifacts. Open artifacts from the conversation or shared-work panel. The room pauses playback when hidden; matrix motion has a separate control and respects reduced motion. No live agents, research, messaging, or deployment are connected.

## Nocturne — expression field

[Open the expression study](nocturne-expression.html). Moss, Reed, Loop, and Rook explore idle, working, producing, busy, long-task focus, error, and need-attention states. White bodies hold a fixed silhouette; optional stepped breath changes cell size, and gaze adds small expressions. Colored signal elements carry distinct state patterns outside the body at six frames per second. Compare signal elements, underlight, background color, or a combination, with seven palettes, a custom color, intensity, and optional state-based accents. A seven-state atlas follows the selected character, with 32 and 48 px samples. Pause, single-step, cycle states, hide faces, and switch square/round cells. Reduced motion starts playback paused; the focus arc is an illustrative twenty-second loop, not actual task progress.
