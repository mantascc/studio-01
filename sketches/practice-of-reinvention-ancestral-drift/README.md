# Reinvention / Ancestral Drift

Open `index.html` directly, or from the experiment gallery. A self-running radial organism slowly changes while faint earlier forms remain visible. No build step, network requests, fonts, dependencies, or required interaction.

## Mechanism

The organism has 160 radial structural samples, initially a three-lobed form with a smaller sevenfold rhythm. Every 3.2 seconds of active playback, one of six rules transforms a contiguous 20-sample sector: displacement, folding, swelling, gathering, counterform, ripple. The other 140 samples are carried forward unchanged: a fixed 87.5% inheritance ratio. Proposals read the complete parent state, never partially updated neighbors. Radii remain within 0.42–0.98 of the field radius.

A deterministic hash of generation chooses the sector and rule phase. Rule order is fixed; generation-dependent phases avoid a short repeated cycle. Repeated displacement and folding carry existing motifs to new places; swelling, counterform, and ripple maintain variation instead of converging to a flat field. No random calls or viewport inputs enter the model. These are continuous radius states, so empty/full grid collapse is inapplicable.

Current structure uses pale radial marks. Prior structures are dimmer, with slightly offset centers and increasing scale so their relationship remains visible without a legend. New and previous states crossfade linearly for 1.25 seconds; this transition shows replacement rather than adding independent decorative motion. Then the form rests until the next generation.

## Ambient decisions

The two open questions resolve toward removing explanation and operational UI: no stats, counters, sliders, history browser, rules display, or generation buttons. The title, gallery link, quiet question, and accessible pause button are the entire interface. Pause supports access and observation without altering the organism.

Five prior generations are retained in a fixed-size buffer. Desktop renders up to five ancestors; mobile renders up to two. Viewport changes affect composition and visible memory only. Generation, cadence, inherited values, rule order, and color meanings remain identical. The organism is centered in a full-screen field with substantial void around it.

Reduced-motion preference starts the page paused; resume explicitly opts into motion. A later change to reduced motion also pauses. Hidden tabs cancel animation work and resume from their paused active time without catch-up. Individual frame deltas are capped at 250ms to avoid unbounded catch-up after a stalled main thread. Rendering is capped at 30fps during transitions and remains still between them. Canvas pixel density is capped at 2.

## Validation

Run `node verify.cjs`. The check exercises 10,000 generations, verifies deterministic output, one rule per generation, 140 protected samples, bounded finite radii, immutable parents, continuing variation, and no repeated state at six decimal places. It also advances the actual bounded history model 1,000 times. A long-run sample is evidence against short loops, not a proof of infinite non-repetition. JavaScript syntax is checked before mechanism tests.

Browser QA can read `window.ancestralDrift.snapshot()` without mutating internal state; returned arrays are copies. `window.ancestralDrift.model` exposes pure `origin()` and `nextState(parent, generation)` for reproducible comparison. No diagnostics are displayed in the sketch.

## References

- [43 / style seed](https://github.com/mantascc/100days/blob/main/43-style-seed/style-seed.md): near-black void, geometric marks, sparse monospace, restrained functional color.
- [56 / constrained variation](https://github.com/mantascc/100days/blob/main/56-constrained-variation/index.html): one scaffold carrying several algorithms.
- [66 / ASCII field gallery](https://github.com/mantascc/100days/blob/main/66-ascii-field-gallery/index.html): a field experienced through repeated discrete marks and ambient rhythm.

These actual archive files were inspected locally. The new implementation preserves the original `artifact.md`, `input.md`, `state.json`, and `trace.jsonl`.
