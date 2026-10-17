# Momentum / Residual Paths

Open [index.html](index.html) directly in a modern browser. Everything is inline; no server, build, dependency, or network access is needed. The page is an ambient work: watch autonomous arrivals, persistence, overlaps, fading, and empty intervals. Pause/resume is the only control. [Back to sketches](../index.html).

## Implementation decisions

The input explicitly declares **ambient**. There are no metrics, parameter sliders, gestures, pointer forces, or required interaction. Removing the moving object and origin marker lets the trace itself carry the motion. Optional pointer perturbation was omitted because it would compete with the self-running composition. Damping is fixed compositionally.

A seeded generator launches four impulses in a loose cluster, followed by a longer rest. The first arrives at 0.35 simulation seconds; subsequent intervals are 2.1, 2.8, 3.3, and 25.8 seconds with ±0.25 seconds of seeded jitter. Launch positions, headings, and drift phases are seeded too. Each path moves for 8.5 seconds, retaining its heading with a small sinusoidal drift. Speed decays exponentially at 0.21 per second. There is no visible persistent emitter or head.

Every fourth simulation step leaves a segment that fades linearly over nine seconds. Nearby **older** segments create a directional memory: their tangents, weighted by proximity and remaining lifetime, gently steer newer paths. Opposite tangents are aligned to the new heading before blending, preventing abrupt reversals. A path cannot steer itself or its predecessors. Memory is a real part of the motion calculation, not just a visual overlay. Overlapping trails composite normally and remain legible without bloom, gradients, or decorative effects.

The logical model occupies a normalized square. Desktop projects it laterally across the full viewport; portrait rotates its projection by 90 degrees, yielding vertical and diagonal travel. Resize changes only projection and pixel density. Schedule, damping, drift, trail lifetime, memory radius, and all existing model state remain identical.

The simulation runs at fixed 1/60-second steps; frames cap catch-up to 0.1 seconds. Hidden tabs suspend advancement and clear accumulated elapsed time. Reduced-motion preference starts the scene paused and also pauses it if enabled during playback; resume is explicit. Pause freezes fading and scheduling as well as motion. There is no rapid flashing.

Expired paths and segments are removed. The schedule bounds live paths to four in validation; memory also has a defensive 2,400-segment ceiling, and diagnostic launch history holds only 16 entries. Device pixel ratio is capped at two.

## Evidence and validation

The implementation was informed by the declared actual archive files: `43-style-seed/style-seed.md` for near-black monospace reduction, `49-grid-trace/index.html` for accumulated path visibility, and `74-particles/index.html` for continuing motion and decaying transient influence. It does not copy their interfaces or require their assets.

JavaScript syntax and the pure simulation were checked in Node. A 150-second fixed-step test confirmed:

- Two copies with the same seed yield identical snapshots.
- Disabling memory influence changes later trajectories by up to 0.162 normalized units; the enabled model recorded 5,948 influenced steps.
- The sequence includes both overlap and genuine emptiness: 93.05 seconds with overlapping path lifetimes and 33.7 seconds with no visible segments after the initial 20 seconds.
- Maximum retained counts were four paths and 367 memory segments.

Read-only QA state is available through `window.residualPaths.snapshot()`. It returns copies of normalized path coordinates, simulation time, scheduling, segment counts, influence totals, pause/orientation state, and fixed constants. It is never displayed in the artwork.

The original input, artifact, graph state, and execution trace are preserved. `sketch.md` adds implementation status and links only.
