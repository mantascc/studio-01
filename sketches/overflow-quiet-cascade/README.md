# Overflow / Quiet Cascade

Open `index.html` directly in a browser, or follow the gallery link. No dependencies, build, assets, or network requests are needed. This is an **ambient** sketch: watch it accumulate, release, and settle. The small pause/resume button is the only control.

## Decisions

- A seeded scalar lattice gains pressure from three slowly drifting sources on desktop, two on mobile. Source forcing combines a broad background with a stronger local zone. Their 34-second breathing cycles are offset by 1.4 seconds; each feeds for 12 seconds. Timing and physical constants are shared across formats.
- At pressure 1, a cell discharges 84% of its pressure equally to orthogonal neighbors and resets to 0.06. Transfers are synchronous. Each fired cell relaxes for 15 seconds, dissipating incoming pressure and suppressing renewed forcing during recovery. This is intentionally dissipative; out-of-bounds transfers also escape. It produces finite fronts and quiet intervals instead of a continuously firing field.
- The first release begins after roughly five seconds. Subsequent cascades recur autonomously, usually separated by more than 25 seconds of quiet. Sources keep drifting throughout; releases are threshold events, not prerecorded animations.
- Brightness reveals accumulation, pale green-white cells reveal discharge, and a separate slowly decaying trace retains the shape after a front passes. Sparse dim cells remain visible through the calm periods. No decorative blur or gradients are used.
- The open questions are resolved through removal: no metrics, explanatory panels, injection, pointer bias, or tuning UI. Optional interaction would distract from the temporal study, so only pause remains.

## Responsiveness and access

Desktop uses a wider, denser field; mobile uses fewer cells and sources so the zones occupy more visible space. Resolution is bounded at 112 × 80 cells; mobile at 44 × 84. Resizing resamples pressure, relaxation timers, and both light traces in normalized space. It preserves elapsed simulation time and does not restart the composition. Source count changes only at the mobile breakpoint.

Simulation uses a seeded 24 Hz fixed timestep independent of display frame rate. Long frame gaps are capped; hidden tabs cancel animation and resume without catch-up. `prefers-reduced-motion` starts paused, with explicit resume available; changing the preference to reduced motion also pauses. The pause button supports keyboard focus and announces its state. Canvas has a descriptive accessible label.

## Checks

- Browser QA passed desktop/mobile snapshots at 1, 8, and 18 seconds, pause/resume, and reduced-motion initial pause. Cascade and quiet afterglow were visually inspected.
- Extracted inline script passes `node --check`.
- Ten simulated minutes at 96 × 60 / three sources and 32 × 70 / two sources each produced 18 autonomous releases. Desktop had no active spilling on 88.4% of ticks; mobile on 89.6%.
- First desktop releases: 4.8–7.5 s, 42.1–45.3 s, 75.3–79.4 s. First mobile releases: 4.6–6.8 s, 42.1–45.0 s, 76.1–79.2 s. The first three releases traversed every cell in each format.
- Sampled pressures stayed finite, nonnegative, and below 3 throughout. Two identical 3,000-tick runs match exactly. Resize preserves simulation ticks, allocates correctly sized buffers, and remains bounded after another 90 seconds.
- For further numerical inspection, `window.quietCascade.snapshot()` returns a frozen summary. The model is available as `window.quietCascade`; it is never displayed as a dashboard. `step()` advances one tick, and `draw()` redraws when manually inspecting a paused field.

Original input, artifact, graph state, and trace remain unchanged. The implementation follows the updated ambient constraint and inspected references listed in `sketch.md`.
