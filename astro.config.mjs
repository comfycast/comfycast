// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import { vite as vidstack } from "vidstack/plugins";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  vite: {
    plugins: [vidstack()],
  },
});
