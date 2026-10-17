# Momentum / After the Gesture

Open [index.html](index.html) as the durable sketch output. No build, dependencies, fonts, or network requests are required. [Back to sketches](../index.html).

## Use

Swipe or drag on the field, then release. Gesture direction selects one of eight neighboring nodes; speed sets initial momentum. Short swipes receive a minimum impulse so their continuation remains visible. The damping slider applies to the **next** trace; existing traces keep their launch value. **Repeat gesture** clears the field and replays the same rightward, full-strength impulse with seed 8128, allowing a controlled damping comparison. **Pause** freezes simulation and trail time. **Clear** removes the field's state and keeps the pause setting.

The readouts describe the latest trace: distance is completed node hops, curvature is direction-change count (including boundary reflections), persistence is elapsed simulation time before settling, and crossings count hops into a still-visible segment node belonging to another trace.

## Rules and decisions

- Preserve **directional bias**, not an exact vector. At each hop the current heading survives with probability equal to remaining momentum. Otherwise the heading turns 45 degrees left or right with equal probability. Boundaries reflect the heading.
- Each hop multiplies momentum by `1 − damping`. Traces settle below 0.04. The hop interval increases from 0.04 toward 0.13 seconds as momentum declines.
- Traces do **not** alter one another. Intersections brighten through compositing and increment the crossing counter. This keeps damping comparisons isolated; influence between traces would add an uncontrolled variable.
- Trails fade linearly over eight simulation seconds. Up to 24 launched traces are retained for bounded work. The final latest-trace measurements persist after its path fades.
- A fixed 61 × 41 lattice and a fixed 1/60-second simulation step are used at every viewport size. Resizing only changes projection, never trace coordinates, momentum, direction, or random state. Mobile uses the same field fitted inside a portrait layout.
- Pointer capture supports drags beyond the field. Pointer cancellation or lost capture discards the gesture without a launch. Tap-only input produces an instruction; the button offers a keyboard-accessible equivalent to a swipe.
- Background tabs suspend simulation time. Reduced-motion users can keep the simulation paused; this sketch has no automatic launching or decorative motion.

## Validation

JavaScript compiled and executed in a Node VM with browser surfaces stubbed. Mechanism checks confirmed deterministic repetition, decreasing travel/persistence as damping rises, state preservation across a desktop-to-mobile resize, cancelled-pointer input launching nothing, and pause holding simulation time.

The same demo impulse produced:

| Damping | Distance (hops) | Persistence (seconds) |
| --- | ---: | ---: |
| 0.03 | 106 | 10.90 |
| 0.08 | 39 | 4.00 |
| 0.20 | 15 | 1.52 |

The original brief and source references remain in `sketch.md` and `artifact.md`.
