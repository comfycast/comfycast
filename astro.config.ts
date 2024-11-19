import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";
import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [tailwind(), solidJs(), playformCompress()],
  experimental: {
    env: {
      schema: {
        API_URL: envField.string({
          context: "client",
          access: "public",
          default: "http://localhost:8008",
        }),
      },
    },
  },
});
