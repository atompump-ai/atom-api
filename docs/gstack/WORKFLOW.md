# GStack Workflow Notes

This directory contains shared gstack working notes for this repository. Keep
records here when other local clients or agents need to read the same project
context.

## Current Scope

- UI implementation work is limited to `web/atompump/`.
- Do not modify `web/default/` for AtomPump UI work. It tracks upstream
  new-api and should stay easy to merge.
- Shared gstack planning, checkpoints, and handoff notes may be written under
  `docs/gstack/`.
- If scope needs to expand beyond `web/atompump/` and `docs/gstack/`, record the
  reason here before making edits.

## Startup State

- The app has been built and run locally at `http://localhost:3000/`.
- `make build-frontend` builds AtomPump and copies the dist output into the
  embedded frontend paths.
- `go build ./...` passed with temporary Go caches under `/private/tmp`.
