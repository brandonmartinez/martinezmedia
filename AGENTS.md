# AGENTS.md

## What this is

A **single-page archival site** for Martinez Media, LLC — <https://www.martinezmedia.net>.
The business ran in Ludington, Michigan from February 2011 to January 2023 and is now idle.
This page exists to tell the story and stay reachable. It is **not** a marketing site, it has
no content cadence, and it does not need new sections. Prefer improving what is here over
adding to it.

## Hard NOs

- No web framework (React, Next, Astro, Svelte, Vue). No bundler. No static-site generator.
  No CMS. No second page. No analytics.
- The `pre-2026-site` and `initial-site-design` branches hold an unfinished Next.js app.
  **Do not merge, cherry-pick, or revive it.** Its `content/clients/*.md` bodies are lorem
  ipsum — nothing there is safe to copy as copy. Only the client _names_ were ever real.
- No JavaScript is required to render this page. Keep it that way: it must be complete and
  readable with JS disabled.

## Dependency budget

Three dev dependencies, total:

| Package            | Why                       |
| ------------------ | ------------------------- |
| `@tailwindcss/cli` | compiles the CSS          |
| `concurrently`     | runs the two dev watchers |
| `browser-sync`     | local dev server + reload |

A fourth dev dependency is a decision to raise with Brandon first. There are no runtime
dependencies and there never should be.

## Layout rule

**Everything under `src/` ships. Nothing outside it does.** The build is literally
`cp -R src/. _site/`.

```
.github/workflows/deploy.yml
src/                  <- ships
  index.html
  images/
  robots.txt
  sitemap.xml
  styles.css          <- GENERATED, gitignored
styles/tailwind.css   <- Tailwind entry point, does NOT ship
CNAME                 <- stays at the repo root
_site/                <- GENERATED, gitignored
package-lock.json     <- IS committed
```

Never commit `_site/` or `src/styles.css`. Always commit `package-lock.json`.

## Tailwind is v4

`@tailwindcss/cli`, and `styles/tailwind.css` is just `@import "tailwindcss";` plus
`@source` and `@theme`. There is **no `tailwind.config.js`** — theming (colours, fonts)
goes in the `@theme` block. Most tutorials still show the v3 shape; do not copy it.

## Deploys

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages. The `permissions` block (`pages: write`, `id-token: write`) is load-bearing —
`deploy-pages` needs the OIDC token.

## CNAME is load-bearing

`CNAME` at the repo root was written by GitHub when the custom domain was set. Deleting or
editing it unbinds the domain. The build copies it into `_site/`. Leave it alone.

## URLs

`www.martinezmedia.net` is canonical; the apex 301s to it. Every absolute URL — canonical,
`og:*`, `twitter:*`, sitemap, robots — uses the `www` form and `https://`.

## Facts are facts

The client names, dates, and counts on this page come from records Brandon holds. Do not
invent, round, embellish, or "tidy up" a client, a year, or a number. If a number needs to
change, ask him for the source. The same goes for the client logos: they are the real ones,
recovered from the old branch, and their `alt` text is the real client name.

## The logo

`src/images/logo-wordmark.svg` and `logo-mark.svg` are the genuine Martinez Media marks,
exported from Brandon's Illustrator source and trimmed to their ink bounds. They are
outlines, not text, so they carry the original Vectora LT look without embedding a font.
The wordmark is inlined directly into the hero `<h1>` — inline, not `<img>`, so the
headline paints on first render with no request and no flash of an empty hero. Its
accessible name comes from a visually hidden `<span>`; the `<svg>` itself is
`aria-hidden`. Keep it that way: exactly one `<h1>`, and it must always have a text name.

The three-colour rule under the wordmark — wine, green, navy at 50% — is the oldest
surviving piece of the brand. It is reprised once, as the bar across the top of the
footer (`--color-brand-wine|green|navy`, pre-blended over the paper). Use it sparingly;
it stops meaning anything if it shows up on every section.

`favicon.png` (512), `apple-touch-icon.png` (180), and `opengraph.png` (1200x630) are
generated from those SVGs, so regenerate them from the SVGs rather than editing pixels.
The icons crop to the `mM` monogram: the "martinezMEDIA" sub-line in the square mark goes
illegible below about 64px.

Do **not** copy the Vectora LT webfonts from the old WordPress theme into this repo.
Vectora LT is a commercial Linotype face and this repository is public.

## Working on it

```sh
npm ci        # install
npm run dev   # http://localhost:3000, rebuilds CSS and reloads on save
npm run build # produces _site/
npm run clean # removes _site/ and src/styles.css
```

Before opening a PR: `npm run build`, then confirm `_site/` contains `index.html`,
`styles.css`, `images/`, `robots.txt`, `sitemap.xml`, and `CNAME`; that the page has no
horizontal overflow at 320px; and that no logo is broken.
