# Homepage Reference Pass

## Goal

Use the provided APIPod-style reference screenshot to refocus the public
homepage. The requested top-level columns are Home, Pricing, Model API, Docs,
and Sign in.

## Scope

- Code changes are limited to `web/atompump/`.
- `web/default/` remains untouched for easier upstream new-api merges.
- Shared notes are stored in `docs/gstack/`.

## Design Decisions

- Collapse the separate AI video, AI image, and LLM API navigation concepts into
  one `Model API` navigation item.
- Move the three modalities into the hero itself as LLM API, AI Image API, and
  AI Video API cards.
- Keep the hero centered, with a large `100+` purple emphasis and provider icon
  rail inspired by the reference image.
- Keep the public header sparse on the homepage: language, sign in, and start
  free. Theme and notification controls are hidden on the homepage only.

## Verification

- `bun run i18n:sync` passed in `web/atompump`.
- `bun run typecheck` passed in `web/atompump`.
- `bun run build` passed in `web/atompump`.
