<script setup lang="ts">
const route = useRoute();
const { locale, setLocale, locales } = useI18n();
</script>

<template>
  <footer class="bg-blue-100 py-10 border-t border-blue-200 flex items-center">
    <div
      class="max-w-6xl w-full mx-auto px-5 md:px-10 flex flex-wrap items-center justify-between gap-2.5"
    >
      <p class="text-sm leading-[1.4]">
        Copyright © {{ new Date().getFullYear() }}.
        <NuxtLink
          href="https://www.faust-kommunikation.de"
          target="_blank"
          class="underline decoration-1 underline-offset-2 decoration-transparent hover:decoration-primary/50 transition-all"
          >Faust Kommunikation KG</NuxtLink
        >. {{ $t("footer.copyright") }}
      </p>
      <div class="flex flex-wrap items-center gap-5 justify-between text-sm">
        <NuxtLink
          v-if="route.path !== '/impressum'"
          href="https://www.faust-kommunikation.de/impressum"
          class="leading-[1.4] underline decoration-1 underline-offset-2 decoration-transparent hover:decoration-primary/50 transition-all"
          >{{ $t("footer.imprint") }}</NuxtLink
        >
        <NuxtLink
          v-if="route.path !== '/datenschutz'"
          href="https://www.faust-kommunikation.de/datenschutzerklaerung"
          class="leading-[1.4] underline decoration-1 underline-offset-2 decoration-transparent hover:decoration-primary/50 transition-all"
          >{{ $t("footer.privacy") }}</NuxtLink
        >
        <ULocaleSelect
          :model-value="locale"
          :locales="locales"
          @update:model-value="setLocale($event)"
        />
      </div>
    </div>
  </footer>
</template>
