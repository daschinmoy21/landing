import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import lottie from "astro-integration-lottie";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: "https://russel.dev/",
  integrations: [
    icon(),
    sitemap(),
    lottie(),
    react(),
    markdoc(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ["react", "react-dom"],
    },
    // Live mode writes session journals under .impeccable/ — do not HMR-reload on those.
    server: {
      watch: {
        ignored: ["**/.impeccable/**"],
      },
    },
  },
  adapter: netlify(),
});
