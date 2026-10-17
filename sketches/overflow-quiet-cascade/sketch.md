---
type: sketch
sketch_type: ambient
mintis: Overflow
status: implemented
themes: [field, emergence, temporal]
roles: [ambient_study, generative_system]
references:
  - 43-style-seed: 43-style-seed/style-seed.md
  - 52-reaction-diffusion: 52-reaction-diffusion/index.html
  - 66-ascii-field-gallery: 66-ascii-field-gallery/index.html
---

# Overflow / Quiet Cascade

## Idea
A self-running pressure field that spends most of its time quietly accumulating, then releases luminous cascades that travel, intersect, and fade.

## Question
Can excess feel inevitable before it becomes visible?

## Mechanism
Pressure rises slowly from drifting sources; cells above threshold pass excess outward and then relax.

## Interface
- pattern: full-bleed ambient field
- primary interaction: none required
- exposed parameter: none; release rate, fixed per run rather than exposed as UI
- visible state: Long calm accumulation, sudden cascades, collisions between fronts, and residual afterglow.

## Responsive behavior
### Desktop
Wide full-viewport field with several distant accumulation zones evolving at different phases.

### Mobile
Portrait full-viewport field with fewer but larger zones so accumulation and cascades remain legible.

### Invariants
Same forcing model, threshold, spill behavior, timing ratios, and visual encoding; only field resolution and source count adapt.

## References
- **43-style-seed** — `43-style-seed/style-seed.md`
- **52-reaction-diffusion** — `52-reaction-diffusion/index.html`
- **66-ascii-field-gallery** — `66-ascii-field-gallery/index.html`

## Reuse
Borrow the rhythm of quiet build-up followed by brief system-wide release without adding controls.

## Open questions
- What can be removed while the behavior still reads?
- Does optional interaction weaken or strengthen the ambient quality?

## Implementation

[Open the ambient sketch](index.html) · [implementation notes](README.md)

Full-viewport autonomous pressure field with drifting sources, synchronous local spill, and dissipating afterglow. Long quiet intervals separate repeated cascades. Desktop/mobile adapt lattice resolution and source count while retaining the same forcing and timing rules. No required interaction, controls beyond pause/resume, or displayed metrics. Reduced-motion preference starts paused; hidden tabs suspend the simulation. Original run evidence is preserved.
