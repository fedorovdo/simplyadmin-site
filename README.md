# Simply Admin Landing Page

This repository contains the root landing page for Simply Admin, a personal/project hub for practical self-hosted tools, sysadmin notes, DevOps experiments, and open-source projects.

The site is a simple Vite + React + TypeScript single-page landing with plain CSS. Russian is the default language, with English available through the header language switcher.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Build

Create a production build:

```bash
npm run build
```

The static output is generated in `dist/`.

## Deployment

Deployment target: Cloudflare Pages.

Suggested build settings:

- Build command: `npm run build`
- Output directory: `dist`

Custom domains:

- `simplyadmin.org`
- `www.simplyadmin.org`

## Content Notes

- No analytics or tracking scripts are included.
- No external UI libraries are used.
