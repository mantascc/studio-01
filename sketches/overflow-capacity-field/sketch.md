---
type: sketch
sketch_type: interactive
mintis: Overflow
status: implemented
themes: [physics, grid, emergence]
roles: [mechanism_exploration, generative_system]
references:
  - 43-style-seed: 43-style-seed/style-seed.md
  - 52-reaction-diffusion: 52-reaction-diffusion/index.html
  - 87-attention-distribution: 87-attention-distribution/index.html
---

# Overflow / Capacity Field

## Idea
A finite field accumulates pressure until local capacity fails and excess spills into neighboring cells. The sketch treats overflow as a system behavior rather than a liquid metaphor.

## Question
When does local excess become a system-wide event?

## Mechanism
Each cell stores pressure; pressure above a capacity threshold transfers to orthogonal neighbors, creating contained, traveling, or cascading regimes.

## Interface
- pattern: responsive threshold field
- primary interaction: tap/click or drag to inject pressure
- exposed parameter: capacity threshold
- visible state: stored pressure, spill events, and cascade extent

## Responsive behavior
### Desktop
Wide field with pointer injection and a compact readout for capacity and active cells.

### Mobile
Portrait-fit field with touch/drag injection and the same single capacity control below.

### Invariants
Same cell rule, pressure values, threshold, and visual encoding across formats.

## References
- **43-style-seed** — `43-style-seed/style-seed.md` — Clear Channel visual grammar.
- **52-reaction-diffusion** — `52-reaction-diffusion/index.html` — simple parameterized emergence.
- **87-attention-distribution** — `87-attention-distribution/index.html` — multiple readings of one system.

## Reuse
Borrow the pattern of one visible scalar state, one threshold, and direct injection into the system.

## Open questions
- Should overflow conserve total pressure exactly?
- Should boundaries wrap, reflect, or absorb?

## Implementation

- Open [index.html](index.html) directly, or use the [sketch gallery](../index.html).
- A fixed 48 × 32 field supports pointer/touch feeding and keyboard injection. Resizing changes rendering only.
- One capacity slider, pause/resume, and deterministic reset expose contained (8.00), traveling (3.65), and cascading (2.90) behavior.
- Pressure brightness uses an absolute scale; green spill flashes and persistent outlines reveal propagation. Readouts show total pressure, currently spilling cells, cumulative cascade extent, and escaped pressure.
- See [README.md](README.md) for resolved boundary/conservation choices and validation.
