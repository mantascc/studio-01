# studio-01

The first active studio by [mantascc](https://github.com/mantascc), focused on expression, visual exploration, and divergent exploration.

A place to try many directions through shape, motion, character, and interaction. Sketches make possibilities visible before a direction is chosen.

[Open studio-01](https://mantas.cc/studio-01/)

- [Avatar exploration](https://mantas.cc/studio-01/avatar-exploration/) — shape, character, motion, and agent interfaces.
- [Sketches](https://mantas.cc/studio-01/sketches/) — momentum, reinvention, overflow, and topology.

## Work here

This repository holds selected public explorations and their supporting documentation. [min1](https://github.com/mantascc/min1) holds all working drafts, unfinished variations, and source versions of published studies.

Develop in min1. Publish explicitly selected studies here, keeping their relative paths and required assets together. The public collection is curated; it does not automatically mirror every draft or draft edit. Bring any direct public fixes back into the corresponding draft deliberately.

Keep explorations focused and information sparse. Follow the [sketching principles](AGENTS.md#sketching-and-exploration). Add each new study to its collection index, newest first.

## Preview locally

From this repository:

```sh
python3 -m http.server 8850 --bind 127.0.0.1
```

Open http://127.0.0.1:8850/. No build step is required. Some studies use an external webfont with a system-font fallback. Development verification scripts document any optional dependencies separately.

## Publish

GitHub Pages serves `main` from the repository root. `.nojekyll` keeps the HTML and assets as static files. Changes pushed to `main` are published automatically. All internal navigation uses relative paths so it works under `/studio-01/`.
