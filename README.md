# avarth.github.io

Personal academic website of **Aris Vartholomaios**, Assistant Professor of Urban
Planning at the University of Thessaly. Bilingual (English at `/`, Greek at `/el/`),
static, and privacy-friendly: no trackers, no cookies.

**Live:** https://avarth.github.io/

## Built with

- [Hugo](https://gohugo.io/) (extended) with a hand-built theme: no external
  template, no JavaScript framework.
- Self-hosted IBM Plex Sans (Latin + Greek). Swiss / International Typographic
  Style: white and black with a single red accent.
- Deployed to GitHub Pages via GitHub Actions on every push to `main`.

## Develop locally

Requires Hugo **extended** (the version is pinned in
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

```bash
hugo server     # http://localhost:1313  (live reload)
hugo --minify   # production build into ./public
```

## Project layout

```
config/   site configuration (Hugo, languages, params)
content/  page text (Markdown)
data/     structured content (publications, teaching, education, ...)
i18n/     UI strings (en, el)
layouts/  templates (the theme)
assets/   CSS and JS (minified + fingerprinted at build)
static/   fonts, images, icons
```

---

© Aris Vartholomaios. Site content is the author's; the theme code is free to reuse.
