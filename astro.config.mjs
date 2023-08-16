import { defineConfig } from "astro/config";
import deno from "@astrojs/deno";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: deno(),
  integrations: [tailwind(), svelte(), mdx()],
});
