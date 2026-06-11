<script setup lang="ts">
import * as uiLocales from "@nuxt/ui/locale";
import { getNuxtUiLocaleCode, getOgLocale, getOgLocaleAlternates } from "#shared/i18n";

const { locale, t } = useI18n();
const config = useRuntimeConfig();
const requestUrl = useRequestURL();

const uiLocale = computed(() => {
  const key = getNuxtUiLocaleCode(locale.value) as keyof typeof uiLocales;
  return uiLocales[key] ?? uiLocales.en;
});
const lang = computed(() => uiLocale.value.code);
const dir = computed(() => uiLocale.value.dir);

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
  ogLocale: () => getOgLocale(locale.value),
  ogLocaleAlternate: () => getOgLocaleAlternates(locale.value),
  ogSiteName: () => t("nav.brand"),
  twitterCard: "summary_large_image",
  twitterTitle: () => t("meta.title"),
  twitterDescription: () => t("meta.description"),
  twitterImage: () => ogImage.value,
});
</script>

<template>
  <UApp :locale="uiLocale">
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
