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
      ],
    },
  },
  i18n: {
    defaultLocale: "de",
    strategy: "no_prefix",
    locales: [
      {
        code: "de",
        name: "Deutsch",
        file: "de.json",
      },
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
    ],
  },
});
