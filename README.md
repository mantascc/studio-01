# Studio

Public interaction and visual explorations by [mantascc](https://github.com/mantascc).

[Open Studio](https://mantascc.github.io/studio/)

- [Avatar exploration](https://mantascc.github.io/studio/avatar-exploration/) — shape, character, motion, and agent interfaces.
- [Sketches](https://mantascc.github.io/studio/sketches/) — momentum, reinvention, overflow, and topology.

## Work here

This repository owns the runnable sketches and their supporting documentation. Broader thinking and formation context remain in [min1](https://github.com/mantascc/min1). The initial import preserves the existing collection paths, with a fresh repository history.

Keep explorations focused and information sparse. Follow the [sketching principles](AGENTS.md#sketching-and-exploration). Add each new study to its collection index, newest first.

## Preview locally

From this repository:

```sh
python3 -m http.server 8850 --bind 127.0.0.1
```

Open http://127.0.0.1:8850/. No build step is required. Some studies use an external webfont with a system-font fallback. Development verification scripts document any optional dependencies separately.

## Publish

GitHub Pages serves `main` from the repository root. `.nojekyll` keeps the HTML and assets as static files. Changes pushed to `main` are published automatically. All internal navigation uses relative paths so it works under `/studio/`.
