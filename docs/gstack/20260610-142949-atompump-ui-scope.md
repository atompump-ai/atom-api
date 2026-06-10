---
status: in-progress
branch: main
timestamp: 2026-06-10T14:29:49+08:00
files_modified:
  - Dockerfile
  - Dockerfile.dev
  - common/constants.go
  - common/embed-file-system.go
  - controller/option.go
  - main.go
  - makefile
  - router/web-router.go
  - setting/system_setting/theme.go
---

## Working on: AtomPump UI Scope

### Summary

The project is being prepared for frontend UI work using screenshots as visual reference. The app now builds and runs locally at http://localhost:3000/ with AtomPump assets copied into the embedded frontend paths, and HTTP checks for /, /setup, /api/status, JS, and CSS returned 200.

### Decisions Made

- Scope is locked to web/atompump for UI implementation work.
- web/default must not be modified for screenshot-driven UI work, so upstream new-api updates can merge with fewer conflicts.
- gstack freeze boundary is set to /Users/felix/projects/atom-api/web/atompump/ for this session.
- Documentation for this decision is kept in gstack checkpoints instead of repo docs to avoid touching upstream-owned paths.
- Existing non-AtomPump tracked changes are pre-existing integration work and should not be expanded unless explicitly requested.

### Remaining Work

1. Wait for the UI reference screenshots and target page list from the user.
2. Inspect the relevant web/atompump routes/components only.
3. Implement visual changes only under web/atompump.
4. Run web/atompump typecheck/build after TS/TSX edits.
5. Run the local app and verify the changed pages with HTTP/browser checks where tools allow.
6. Save another gstack context checkpoint after the first substantial UI pass.

### Notes

- The user explicitly wants to avoid modifying web/default because it tracks upstream new-api and should stay easier to update.
- Current local backend process was started successfully on http://localhost:3000/ during this session.
- Do not use repo-root docs for this scope unless the user later authorizes widening edits beyond web/atompump.
