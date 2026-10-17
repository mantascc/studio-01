# Momentum / Open Field

[Open the sketch](index.html) · [All sketches](../index.html)

An automatically running version of [Momentum / After the Gesture](../momentum-after-the-gesture/index.html). Uses the interactive sketch’s eight-neighbor grid movement: direction survives with probability equal to momentum, turns are 45 degrees, boundaries reflect paths, and every hop multiplies momentum by `1 − damping`. Paths stop below 0.04 momentum. Moving square heads, momentum rings, and fading angular trails follow the original rendering.

A full-screen grid replaces the framed canvas. Seeded automatic launches replace drag gestures, with varied origins and directions every 1–2.33 seconds at the default 1.50× tempo. No pointer input is required.

## Controls

Defaults: arrival tempo **1.50×**, damping **0.07**, trail persistence **17 s**, initial momentum **80%**, grid visibility **35%**.

Only **parameters** is visible initially. Arrival tempo, per-hop damping, trail persistence, initial momentum, and grid visibility are adjustable. Damping and initial momentum apply to subsequent launches. Pause freezes the simulation; reset clears the field while retaining settings. Escape or a click outside closes the panel.

The grid dimensions are chosen on load for roughly 24-pixel cells; resizing projects the same grid and existing paths into the new viewport. Hidden tabs suspend the simulation. Reduced motion starts paused with explicit resume. Standalone HTML, no dependencies or network requests. Diagnostics: `window.openField.snapshot()`.

## Validation

Compared every hop against the interactive source at damping 0.03, 0.08, and 0.20: positions, direction, momentum, random state, turns, and stop condition match. A 180-second simulation at maximum launch tempo verified that all steps stay on neighboring grid nodes and within bounds. Browser inspection confirmed automatic motion, parameters, pause/resume, and Escape dismissal.
