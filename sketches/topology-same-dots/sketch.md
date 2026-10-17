---
type: sketch
sketch_type: interactive
mintis: Topology
status: implemented
themes: [topology, distributed-cognition, formation, steering]
roles: [interaction_probe, generative_system]
references:
  - agent-topology-as-a-medium: ../../one-pagers/2026-10-02-agent-topology-as-a-medium.md
  - topology-library: ../../one-pagers/2026-10-02-topology-library.md
  - studio-now: ../../studio/now.md
---

# Topology / Same Dots

## Idea
Same dots + different topology → different system behavior.

## Question
What changes when capability stays constant but topology changes?

## Executable graph
`brief → entry dots → edges carry readings → each dot blends incoming with its lens → output reading`

## Mechanism
Five dots (A–E) each hold a fixed lens: a direction they lean toward. Every dot runs the same rule each round: move toward the mean of what it receives, then lean slightly toward its own lens. Only the wiring differs between formations — who receives the brief, who listens to whom, and where the output is read. The brief, the dots, the lenses, and the rule stay identical.

## Interface
- pattern: formation switch over a constant cast
- primary interaction: the person changes the topology, not the prompt (buttons or keys 1–5); `new brief` changes the task for all formations at once
- visible state: each dot's live reading (solid needle) against its lens (dotted needle), edge brightness as disagreement between endpoints, packets moving along edges per round, the output ring with the brief ghosted beside it
- comparison strip: every formation's output, as deviation from the brief over 24 rounds, computed for the same brief, so the active formation is always read against the others

## Responsive behavior
### Desktop
Full field with the brief entering from the left; strip of five comparison traces with metrics.

### Mobile
Same normalized layouts scaled to width; the strip keeps the five traces and drops the metric line.

### Invariants
Same lenses, rule constants, brief sequence, round length, and formation definitions across viewports.

## Reuse
A probe for the Topology Library: formations as interaction primitives that a person steers by rewiring, with the outcome legible as drift, settling time, spread, and conflict.

## Open questions
- Is drift from the brief a failure, or the formation contributing a point of view? Where should a person want it?
- What would it feel like to rewire a single edge rather than swap a whole formation?
- Should switching formation mid-run inherit current readings (history matters) instead of restarting from the lenses?

## Implementation

[Open the sketch](index.html). Not produced by a run of the generative-sketches graph; written directly from the Agent Topology one-pager and `studio/now.md` direction 2–3. See [implementation notes](README.md).
