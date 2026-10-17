# Topology / Same Dots

[Open the sketch](index.html) · [All sketches](../index.html)

Open `index.html` directly in a modern browser. Everything is inline: no server, build, dependencies, fonts, or network requests.

## Use

Pick a formation — council, maker–critic, pipeline, star, network — with the buttons, the comparison strip, or keys `1`–`5`. Each switch morphs the same five dots into the new arrangement and replays the current brief from the start. `new brief` (`N`) draws the next seeded brief and recomputes every formation. Pause/resume (`Space`) freezes rounds and packets.

## Mechanism

- Readings are unit vectors. Lenses are fixed at −60°, −20°, 15°, 50°, 100° for A–E.
- Each round, synchronously, a dot with inputs updates `v ← normalize(v + 0.55·(mean(inputs) − v) + 0.2·(lens − v))`. Entry dots count the brief as one input. Dots start at their lens.
- Formations differ only in entry dots, directed edges, and output:
  - **council** — every dot gets the brief, no edges; output is the mean reading.
  - **maker–critic** — two maker ⇄ critic pairs (A⇄B, C⇄D) feed an integrator E; makers get the brief; output E.
  - **pipeline** — A→B→C→D→E; output E.
  - **star** — hub A gets the brief and exchanges with every spoke; output A.
  - **network** — ring plus one chord (A⇄C), all bidirectional; A gets the brief; output is the mean.
- 24 rounds of 0.5 s. Metrics per formation: **drift** (output minus brief at the end), **settle** (round after which the output moves less than 0.5° per round), **spread** (mean deviation of dots from their mean reading), **conflict** (mean disagreement across edges).

## Evidence and validation

Briefs swept from −150° to 150° in 10° steps (31 briefs) give mean |drift| / settle / conflict:

| formation | drift | settle | conflict |
|---|---|---|---|
| council | 8.7° | 3.7 | 0° |
| maker–critic | 48.5° | 13.0 | 17.9° |
| pipeline | 47.0° | 10.8 | 14.0° |
| star | 57.8° | 10.9 | 12.4° |
| network | 65.7° | 7.4 | 16.0° |

Council stays closest to the brief because every dot hears it directly; formations where the brief enters once let the cast's lenses accumulate. Same seed and brief produce identical runs.

Chromium checks at 1440 × 960 and 390 × 844: no runtime errors, no horizontal overflow, formation switching and the strip render correctly. Reduced-motion preference skips the morph and packet animation; rounds still advance.

Read-only QA state: `window.sameDots.snapshot()` and `window.sameDots.run(formation, briefDeg)`.
