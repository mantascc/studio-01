# Reinvention / Lineage

Open [index.html](index.html) as the durable sketch output. No dependencies, network requests, build step, or external fonts.

## Use

Generate the next state, adjust inheritance before the next generation, and inspect every ancestor in the horizontal strip. Previous/next and arrow keys navigate saved states. Swipe the large field to navigate; swipe the strip to scroll it. Space generates when focus is outside an interactive control. Generation is available only at the latest state, so inspecting an ancestor never silently deletes descendants.

## Mechanism

A fixed 24 × 24 binary scaffold starts with a frame crossed by a spine. Each generation applies exactly one rule from a repeating sequence: row drift, quarter turn, mirror fold, alternating shear, axis exchange, local majority, negative space, column drift. Rules operate on the previous complete state, with wrapped edges.

A deterministic ordering of cell indices selects `round(576 × inheritance / 100)` cells to preserve; remaining cells accept the one-rule proposal. The mask is indexed by generation. At 100% the entire state persists; at 0% the full rule applies. The same sequence of parameter values yields the same states at any viewport. Resizing never touches the simulation. A generation stores its own inheritance value, state, rule, and previously occupied positions.

## Resolved questions

Continuity is observed rather than scored: solid white cells persist from the parent; solid green cells appear for the first time; green outlines recur at a previously occupied position; gray outlines mark cells that just disappeared. The origin is white. Recurrence describes position occupancy, not tracked particles. The fixed scaffold and thumbnails support comparison without a continuity score.

All old generations remain inspectable for the lifetime of the page. There is no fixed history cutoff or automatic stopping point. The viewer decides when identity becomes ambiguous and stops generating. Refresh starts a new lineage; persistence across reloads and branching are outside this sketch.

## Validation

JavaScript syntax checked with Node. Pure mechanism assertions cover all eight rules across 40 generations, 0% and 100% inheritance endpoints, exact rounded keep counts, deterministic output, nonmutation of ancestors, wrapped coordinates, and 80 generations of binary state evolution. Desktop and mobile browser checks passed with no runtime errors or horizontal overflow.

## References

- [43 / style seed](https://github.com/mantascc/100days/blob/main/43-style-seed/style-seed.md): near-black grounds, monospace labels, functional color, fixed geometric primitives.
- `56-constrained-variation/index.html`: a common scaffold supporting discrete algorithm changes.
- `65-mode-toggle/index.html`: explicit state expressed across repeated variants.

Source archive: [mantascc/100days](https://github.com/mantascc/100days). Original artifact, input, state, and trace are preserved.
