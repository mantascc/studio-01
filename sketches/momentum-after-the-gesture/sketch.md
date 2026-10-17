---
type: sketch
sketch_type: interactive
mintis: Momentum
status: implemented
themes: [physics, grid, temporal]
roles: [interaction_pattern, mechanism_exploration]
references:
  - 43-style-seed: 43-style-seed/style-seed.md
  - 51-resonant-lattice: 51-resonant-lattice/index.html
  - 49-grid-trace: 49-grid-trace/index.html
---

# Momentum / After the Gesture

## Idea
A gesture launches a trace that continues after the hand or pointer stops. Motion retains direction and gradually decays, making persistence itself visible.

## Question
How long should an action continue to shape a system after the action itself has ended?

## Mechanism
A trace advances node to node while retaining direction with probability proportional to remaining momentum; damping reduces persistence.

## Interface
- pattern: gesture-to-trace field
- primary interaction: swipe/drag to launch a trace
- exposed parameter: damping
- visible state: distance, curvature, persistence, and interference after release

## Responsive behavior
### Desktop
Full viewport dot grid supporting longer directional pointer drags, with a compact damping readout.

### Mobile
Portrait grid using touch swipes; short gestures are normalized so momentum remains legible.

### Invariants
Same momentum calculation, damping, neighbor rule, trail decay, and trace state across formats.

## References
- **43-style-seed** — `43-style-seed/style-seed.md` — Clear Channel visual grammar.
- **51-resonant-lattice** — `51-resonant-lattice/index.html` — energy persistence and damping.
- **49-grid-trace** — `49-grid-trace/index.html` — visible motion history on a grid.

## Reuse
Borrow the pattern of input ending before system response ends: gesture creates state, state carries forward visibly.

## Open questions
- Should traces influence one another when they intersect?
- Should momentum preserve exact direction or only directional bias?

## Implementation

Open [index.html](index.html) directly in a browser. Swipe to release a trace, adjust damping, or use **repeat gesture** for an identical seeded impulse. Pause holds simulation time; clear removes traces. The live readouts describe the latest trace. See [README.md](README.md) for rules and decisions.
