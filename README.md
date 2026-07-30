# martinezmedia

Source for <https://www.martinezmedia.net> — a single-page archival site for
**Martinez Media, LLC**, the photography, web, and design business Brandon and Joy Martinez
ran in Ludington, Michigan from February 2011 to January 2023.

It is one hand-written HTML page with Tailwind-compiled CSS. No framework, no bundler, no
static-site generator, no CMS, no blog. It renders fully with JavaScript disabled.

## Requirements

- Node.js 22 or newer

## Getting started

```sh
npm ci
npm run dev
```

`npm run dev` starts the Tailwind CLI in watch mode alongside a static server with live
reload at <http://localhost:3000>. Edit `src/index.html` or `styles/tailwind.css` and the
browser refreshes.

## Scripts

| Script          | What it does                                                      |
| --------------- | ----------------------------------------------------------------- |
| `npm run dev`   | Watch CSS + serve `src/` with live reload on port 3000             |
| `npm run build` | Compile minified CSS, then assemble `_site/` (the deploy artifact) |
| `npm run css`   | Compile `styles/tailwind.css` to `src/styles.css` once             |
| `npm run clean` | Delete `_site/` and `src/styles.css`                               |

## Layout

Everything under `src/` ships; nothing outside it does. The build is a straight copy.

```
.github/workflows/deploy.yml   GitHub Pages deploy
src/                           everything that ships
  index.html                   the page
  images/clients/              client logos
  images/                      favicon, apple touch icon, Open Graph image
  robots.txt
  sitemap.xml
  styles.css                   GENERATED — never committed
styles/tailwind.css            Tailwind v4 entry point — does not ship
CNAME                          custom domain, written by GitHub Pages
package-lock.json              committed
_site/                         GENERATED — never committed
```

`_site/` and `src/styles.css` are build output and are gitignored. `package-lock.json` is
committed so CI installs the exact same tree.

## Styling

Tailwind CSS v4 via `@tailwindcss/cli`. There is no `tailwind.config.js` — the palette,
fonts, and custom utilities are declared in the `@theme` block in `styles/tailwind.css`.

## Deploying

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which runs `npm ci && npm run build` and publishes `_site/` to GitHub Pages. Nothing else
needs to be done by hand.

`CNAME` lives at the repo root, is copied into `_site/` by the build, and must not be
deleted — removing it unbinds the custom domain.

## Contributing

See [`AGENTS.md`](AGENTS.md) for the constraints this repo is held to.
