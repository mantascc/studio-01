---
type: sketch
sketch_type: interactive
mintis: Practice of reinvention
status: implemented
themes: [grid, variation, lineage]
roles: [mechanism_exploration, visualization_reference]
references:
  - 43-style-seed: 43-style-seed/style-seed.md
  - 56-constrained-variation: 56-constrained-variation/index.html
  - 65-mode-toggle: 65-mode-toggle/index.html
---

# Reinvention / Lineage

## Idea
One persistent scaffold is repeatedly transformed by changing exactly one rule while carrying state forward. The object of interest is the lineage, not any single variant.

## Question
How much can change while an identity still feels continuous?

## Mechanism
Each generation inherits the previous state and applies one new transformation rule; inheritance strength controls continuity.

## Interface
- pattern: lineage viewer
- primary interaction: tap/click next; swipe or step through history
- exposed parameter: inheritance strength
- visible state: what persists, mutates, recurs, or disappears

## Responsive behavior
### Desktop
Current generation large, with a horizontal lineage of recent generations beside or below it.

### Mobile
Current generation full-width, with a swipeable lineage strip underneath.

### Invariants
Identical states, rule sequence, inheritance value, and history; only composition changes.

## References
- **43-style-seed** — `43-style-seed/style-seed.md` — Clear Channel visual grammar.
- **56-constrained-variation** — `56-constrained-variation/index.html` — fixed scaffold, changing algorithm.
- **65-mode-toggle** — `65-mode-toggle/index.html` — one idea expressed across variants.

## Reuse
Borrow the lineage pattern: preserve a stable scaffold, change one dimension, and show ancestry explicitly.

## Open questions
- How is continuity measured without adding a score?
- Should old generations remain inspectable indefinitely?


## Implementation
- Open [index.html](index.html) directly in a browser; no build step or dependencies.
- Fixed 24 × 24 binary scaffold, eight deterministic spatial rules, one rule per generation.
- Inheritance preserves an exact rounded share of cells; remaining cells take the rule proposal.
- Every generated state remains inspectable in the session through thumbnails, previous/next, arrow keys, or swiping the field.
- Desktop and mobile share state and history; only layout changes.
- See [README.md](README.md) for decisions and checks.
