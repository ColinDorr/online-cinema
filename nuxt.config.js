import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["@/src/css/main.css"],
  vite: {
    plugins: [
      tailwindcss({
        config: "./tailwind.config.js",
      }),
      svgLoader(),
    ],
  },
  modules: ["@pinia/nuxt", "@nuxt/test-utils/module"],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      API_TOKEN: process.env.API_TOKEN,
    },
  },
});
