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

## Deployment

The project is natively optimized for **Netlify**. It uses the `@astrojs/netlify` adapter to automatically map Astro API endpoints and SSR routes directly into Netlify Edge Functions.

To deploy:
1. Push your repository to GitHub.
2. Go to your Netlify dashboard and click **"Add New Site"** -> **"Import an existing project"**.
3. Connect your GitHub account and select this repository.
4. Netlify will automatically detect the Astro framework and apply the correct build settings (`npm run build` as the Build command, and `dist` as the publish directory).
5. Click **"Deploy Site"**. Every push to the `main` branch will automatically trigger a new deployment.
