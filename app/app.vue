<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale } = useI18n();
const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
});

const { t } = useI18n();
useSeoMeta({
  title: t("meta.title"),
  description: t("meta.description"),
  // ogImage: settings.value?.ogImage as Media | null,
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
