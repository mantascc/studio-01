---
type: sketch
sketch_type: ambient
mintis: Practice of reinvention
status: implemented
themes: [variation, lineage, temporal]
roles: [ambient_study, generative_system]
references:
  - 43-style-seed: 43-style-seed/style-seed.md
  - 56-constrained-variation: 56-constrained-variation/index.html
  - 66-ascii-field-gallery: 66-ascii-field-gallery/index.html
---

# Reinvention / Ancestral Drift

## Idea
A self-running lineage where one graphic organism continually reinvents itself, with faint ancestral layers lingering behind the present form.

## Question
What remains recognizable when change never stops?

## Mechanism
Every interval, preserve most of the current state, change one transformation rule, and carry the result forward.

## Interface
- pattern: self-running lineage study
- primary interaction: none required
- exposed parameter: none; inheritance ratio, fixed as part of the composition rather than exposed.
- visible state: Motifs persisting across generations, dissolving, returning, and shifting between foreground and memory.

## Responsive behavior
### Desktop
Large central field with enough surrounding void for multiple translucent ancestral layers to remain readable.

### Mobile
Portrait field with fewer retained ancestral layers but identical temporal cadence and inheritance behavior.

### Invariants
Same generation sequence, inheritance ratio, rule order, mutation logic, and color semantics.

## References
- **43-style-seed** — `43-style-seed/style-seed.md`
- **56-constrained-variation** — `56-constrained-variation/index.html`
- **66-ascii-field-gallery** — `66-ascii-field-gallery/index.html`

## Reuse
Borrow the idea of showing change through ancestry: present state plus fading evidence of what it came from.

## Open questions
- What can be removed while the behavior still reads?
- Does optional interaction weaken or strengthen the ambient quality?


## Implementation
- [Open the ambient sketch](index.html): standalone, self-running, no dependencies.
- One radial organism preserves 140 of 160 structural samples every 3.2 active seconds; one deterministic transformation changes the remaining sector.
- Five faint ancestral layers on desktop, two on mobile, with identical underlying evolution.
- Pause/resume is the sole optional control. Reduced-motion starts paused; hidden tabs suspend execution.
- [Implementation decisions and validation](README.md). Original graph evidence is preserved.
