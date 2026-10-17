---
type: sketch
number: 001
sketch_type: ambient
mintis: Momentum
status: implemented
themes: [field, motion, temporal]
roles: [ambient_study, generative_system]
references:
  - 43-style-seed: 43-style-seed/style-seed.md
  - 49-grid-trace: 49-grid-trace/index.html
  - 74-particles: 74-particles/index.html
---

# 001 — Momentum / Residual Paths

## Idea
Inspired by residual paths, the spiral carries memory forward.

## Question
Can momentum be made visible as the accumulated influence of previous motion?

## Executable graph
`impulse → spiral turn → residual trace → inherited bias → next turn`

## Mechanism
An impulse enters a spiral. Each turn leaves a fading residual path; that path contributes a small directional bias to the next turn, so the trajectory never begins from zero. Momentum appears as history bending the next move.

## Interface
- pattern: ambient spiral trace field
- primary interaction: none required
- exposed parameter: none; damping and inheritance are fixed compositionally rather than exposed
- visible state: spiral curvature, persistence length, overlap, empty intervals, and the degree to which older traces bias newer turns

## Responsive behavior
### Desktop
The spiral has room to widen across the field while residual paths remain visible as a layered history of motion.

### Mobile
The same normalized spiral logic is projected into portrait space, preserving inheritance, damping, and path lifetime.

### Invariants
Same impulse schedule, damping ratio, trail lifetime, spiral progression, and residual-influence rule.

## References
- **43-style-seed** — `43-style-seed/style-seed.md`
- **49-grid-trace** — `49-grid-trace/index.html`
- **74-particles** — `74-particles/index.html`

## Reuse
A small runnable thinking graph for systems where previous motion should alter the conditions of the next move.

## Open questions
- How little residual influence is needed before the spiral reads as memory rather than decoration?
- Should momentum accumulate indefinitely, or occasionally release and reset?

## Implementation

[Open the ambient sketch](index.html). Seeded impulses run automatically; older fading segments gently steer later trajectories. Pause/resume is the only control. Desktop and portrait use the same normalized simulation with a rotated projection. See [implementation notes](README.md).
