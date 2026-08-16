import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// Static output (no adapter) — serve `dist/` with Caddy on your VPS (see Caddyfile)
export default defineConfig({
  site: "https://russel.dev/",
  integrations: [
    icon(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    optimizeDeps: {
      include: ["react", "react-dom", "framer-motion", "lucide-react"],
    },
    server: {
      watch: {
        ignored: ["**/.impeccable/**"],
      },
    },
  },
});
