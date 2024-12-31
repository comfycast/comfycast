import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [tailwind(), solidJs(), vue()],
  env: {
    schema: {
      API_URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:8008",
      }),
    },
  },
});
