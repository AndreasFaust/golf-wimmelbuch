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

  modules: [
    "@nuxt/eslint",
    "@nuxt/hints",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
  ],
  css: ["~/assets/main.css"],
  ui: {
    fonts: false,
    colorMode: false,
  },
  app: {
    head: {
      title: "Das große Golf-Wimmelbuch",
      link: [
        { rel: "stylesheet", href: "https://use.typekit.net/gmb7aiv.css" },
      ],
    },
  },
});
