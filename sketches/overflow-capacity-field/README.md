# Overflow / Capacity Field

Open [index.html](index.html) as the durable sketch output. The sketch gallery is linked above the sketch.

## Interaction

Click/tap to inject 12 pressure units. Holding or dragging adds 4 units every three simulation ticks. The field supports pointer capture and touch cancellation. Focus the field, use arrows to select a cell, and Space/Enter to inject. Pause freezes transport and continuous feeding; a click or keyboard pulse can still load the paused field. Reset restores the same initial field and a 12-unit center pulse, keeping the chosen capacity and pause state.

The only physical parameter is capacity. Set capacity, then reset for a controlled comparison:

| Capacity | Result from the same center pulse |
| --- | --- |
| 8.00 | Contained: 1 cell spills |
| 3.65 | Traveling: 81 cells spill before settling |
| 2.90 | Cascading: all 1,536 cells are reached |

These are observations from the actual simulation. The regime label uses cumulative unique spill cells: up to 12 means contained, more than 12 means traveling, and at least 45% of the field means cascading. Extent accumulates until reset; adding more pressure can enlarge it. Changing capacity acts on the existing state immediately.

## Resolved questions

**Conservation:** transfer conserves pressure internally. A cell strictly above capacity releases one capacity-sized packet, divided equally among its four orthogonal directions, per tick. This finite discharge permits an avalanche instead of infinitesimal excess diffusion. Transfers are synchronous, so iteration order does not bias propagation. No pressure decays. Initial load + injected pressure equals stored pressure + escaped pressure, within floating-point precision.

**Boundaries:** open/absorbing. Each share directed outside the grid leaves the field and increases the escaped-pressure counter. This allows cascades to settle and makes loss explicit.

**Initial conditions:** a deterministic hash loads each cell with 2.0–2.8 units; this provides a near-capacity substrate in which one pulse can propagate. It is shown from the start, not silently added during animation. Reset also injects a single center pulse. The simulation runs at 24 fixed ticks per second, capped after long frame interruptions to avoid runaway catch-up. The fixed 48 × 32 logical grid and all pressure values survive viewport changes. Desktop stretches this substrate into a wide field; mobile into a portrait field. Cell geometry may change, but neighborhood topology and rules do not.

**Encoding:** fill brightness shows absolute stored pressure on a fixed 0–8 scale; green flashes show recent spills, and persistent outlines show cells reached since reset. Values beyond 8 saturate visually but remain in the simulation and total. Readouts expose total pressure, currently spilling cells, cumulative extent, and boundary loss.

## Validation

- Extracted inline JavaScript passes `node --check`.
- Deterministic model checks confirm all three regimes from the same initial state and pulse.
- For each regime, stored + escaped equals initial + injected within 1e-7 after 1,800 ticks; no negative pressures occur and the avalanche settles.
- Additional boundary and synchronous-transfer checks verify the accounting and direction-independent update rule.

The visual references remain linked in `sketch.md`. `input.md`, `artifact.md`, `state.json`, and `trace.jsonl` preserve the original generation evidence.
