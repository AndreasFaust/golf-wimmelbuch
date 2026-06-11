<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale, t } = useI18n();
const config = useRuntimeConfig();
const requestUrl = useRequestURL();

const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

const siteUrl = computed(
  () => config.public.siteUrl || requestUrl.origin,
);
const ogImage = computed(() => `${siteUrl.value}/og-image.jpg`);

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
  link: [{ rel: "canonical", href: siteUrl }],
});

useSeoMeta({
  title: () => t("meta.title"),
  description: () => t("meta.description"),
  ogTitle: () => t("meta.title"),
  ogDescription: () => t("meta.description"),
  ogImage: () => ogImage.value,
  ogUrl: () => siteUrl.value,
  ogType: "website",
  ogLocale: () => (locale.value === "de" ? "de_DE" : "en_US"),
  ogLocaleAlternate: () =>
    locale.value === "de" ? ["en_US"] : ["de_DE"],
  ogSiteName: () => t("nav.brand"),
  twitterCard: "summary_large_image",
  twitterTitle: () => t("meta.title"),
  twitterDescription: () => t("meta.description"),
  twitterImage: () => ogImage.value,
});
</script>

<template>
  <UApp :locale="locales[locale]">
    <navigation
      class="fixed top-0 inset-x-0 z-20 bg-blue-100/90 backdrop-blur-sm border-b border-blue-200 h-12"
    >
      <div class="max-w-6xl mx-auto px-5 md:px-10 flex items-center h-full">
        <i18n-t keypath="nav.title" tag="p" class="text-lg">
          <template #brand>
            <span class="whitespace-nowrap font-bold">
              {{ $t("nav.brand") }}
            </span>
          </template>
        </i18n-t>
      </div>
    </navigation>
    <main class="">
      <NuxtPage />
    </main>
    <PageFooter />
    <DevOnly>
      <BreakpointInspector />
    </DevOnly>
  </UApp>
</template>
