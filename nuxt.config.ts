// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  runtimeConfig: {
    cleverreach: {
      clientId: "",
      clientSecret: "",
      groupId: "",
    },
  },

  nitro: {
    storage: {
      cache: {
        driver: "fs",
        base: "./.data/cache",
      },
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
