# Simply Admin Landing Page

This repository contains the root landing page for Simply Admin, a project catalog for practical self-hosted tools, sysadmin notes, DevOps experiments, and open-source projects.

The site is a Vite + React + TypeScript single-page static website with plain CSS. Russian is the default language, with English available through the header language switcher.

## Architecture

Final public architecture:

- `simplyadmin.org` -> this `simplyadmin-site` Cloudflare Pages project.
- `voiceassistant.simplyadmin.org` -> a separate `voiceassistant-site` Cloudflare Pages project.
- `printledger.simplyadmin.org` remains the existing PrintLedger site.

The main site keeps only the project catalog. VoiceAssistant is linked as an external product site.

## Routes

- `/` - Simply Admin homepage and project catalog.
- `/voiceassistant` - redirects to `https://voiceassistant.simplyadmin.org/`.

PrintLedger links are preserved and continue to point to:

- `https://printledger.simplyadmin.org`
- `https://github.com/fedorovdo/printledger`

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
git diff --check
```

## Build

```bash
npm run build
```

The static output is generated in `dist/`.

## Deployment

Deployment target: Cloudflare Pages.

Suggested build settings:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

Custom domains for this project:

- `simplyadmin.org`
- `www.simplyadmin.org`

Do not attach `voiceassistant.simplyadmin.org` to this project after the standalone `voiceassistant-site` is deployed. Cloudflare Pages custom domains must not be attached to two Pages projects at the same time.

## VoiceAssistant Links

The VoiceAssistant catalog card uses:

- Product site: `https://voiceassistant.simplyadmin.org/`
- Repository: `https://github.com/fedorovdo/VoiceAssistant`
- Windows download: `https://github.com/fedorovdo/VoiceAssistant/releases/download/v0.2.0/VoiceAssistant-0.2.0-x64.exe`

## Content Notes

- No analytics or tracking scripts are included.
- No external UI libraries are used.
- Social preview SVGs are generated locally in `public/`.
