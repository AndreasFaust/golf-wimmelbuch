import { APP_LOCALES } from "./shared/i18n";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    smtp: {
      host: "",
      port: "587",
      secure: "false",
      user: "",
      password: "",
      from: "",
    },
    public: {
      siteUrl: "",
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/main.css"],
  ui: {
    fonts: false,
    colorMode: false,
  },
  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://use.typekit.net/gmb7aiv.css" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [
        { name: "theme-color", content: "#dbeafe" },
        { name: "apple-mobile-web-app-title", content: "Golf-Wimmelbuch" },
      ],
    },
  },
  i18n: {
    defaultLocale: "de",
    strategy: "no_prefix",
    langDir: "locales",
    locales: APP_LOCALES,
  },
});
