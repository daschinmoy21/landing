# Astro Landing Page

An Astro-based landing page template with React components, Tailwind CSS, and a modular block-based architecture.

## Stack

- **Astro v5** - Static site generator
- **Tailwind CSS v4** - Utility-first CSS framework
- **React** - Interactive components
- **TypeScript** - Type safety

## Project Structure

```
src/
├── components/
│   ├── blocks/          # Section-level components (hero, pricing, features, etc.)
│   │   ├── hero/        # Hero variants
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── cta/
│   │   ├── blog/
│   │   ├── faq/
│   │   └── ...
│   ├── react/           # React components
│   ├── scripts/         # Analytics/tracking scripts
│   └── ui/              # Base UI components (Button, Card, etc.)
├── config/              # TypeScript config files
├── content/             # Markdown/Markdoc blog posts
├── data/json-files/     # JSON data for features, pricing, navigation
├── layouts/             # Page layouts
├── pages/               # Route pages
└── styles/              # Global CSS + Tailwind
```

## Commands

```bash
npm install
npm run dev      # dev server at localhost:4321
npm run build    # production build
npm run preview # preview build
```

## Pages

- `/` - Home (customized)
- `/features` - Features showcase
- `/pricing` - Pricing table
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post
- `/contact` - Contact page
- `/terms` - Terms of service
- `/404` - 404 page

Edit

## Customization `src/config/config.ts` for site settings (title, description, theme mode).

Modify JSON files in `src/data/json-files/` for content.

Colors defined in `src/styles/global.css` under `@theme`.

## Deployment (Caddy on VPS)

This project builds as a **static site**. Serve `dist/` with [Caddy](https://caddyserver.com/) (auto HTTPS).

1. Set your production domain in `astro.config.mjs` (`site` is currently `https://russel.dev/`).
2. Build (on the VPS or in CI), then copy `dist/` onto the server:

```bash
npm run build
# e.g. rsync -avz --delete dist/ user@vps:/var/www/landing/dist/
```

3. Point Caddy at that directory. A ready-made config lives in `Caddyfile` — edit the domain and `root` path if needed, then:

```bash
# system-wide (Debian/Ubuntu-style)
sudo cp Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Or run from the project root after editing `Caddyfile`:

```bash
caddy run --config Caddyfile
```

Caddy will obtain and renew TLS certificates for the domain automatically (ports 80/443 must be open, DNS A/AAAA records pointed at the VPS).
