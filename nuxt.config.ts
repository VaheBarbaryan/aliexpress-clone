import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  _requiredModules: undefined,
  $schema: undefined,
  dev: false,
  telemetry: undefined,
  $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
  devtools: { enabled: true },
  pages: true,
  modules: [
    "nuxt-icon",
    "nuxt-lodash",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
    },
  },
  supabase: {
    redirect: false
  },
  app: {
    head: { script: [{ src: "https://js.stripe.com/v3/", defer: true }] },
  },
  css: ["@/assets/css/main.css"],
  build: {
    alias: {
      "@": path.resolve(__dirname),
    },
  }
});
