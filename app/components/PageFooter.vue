<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <footer class="bg-blue-100 h-24 border-t border-blue-200 flex items-center">
    <div
      class="max-w-6xl w-full mx-auto px-10 flex items-center justify-between gap-2.5"
    >
      <p class="leading-[1.4]">
        Copyright © {{ new Date().getFullYear() }}.
        <NuxtLink
          href="https://www.faust-kommunikation.de"
          target="_blank"
          class="underline decoration-1 underline-offset-2 decoration-transparent hover:decoration-primary/50 transition-all"
          >Faust Kommunikation KG</NuxtLink
        >. Alle Rechte vorbehalten.
      </p>
      <div class="flex items-center gap-2.5 justify-between">
        <NuxtLink
          v-if="route.path !== '/impressum'"
          href="https://www.faust-kommunikation.de/impressum"
          class="leading-[1.4] underline decoration-1 underline-offset-2 decoration-transparent hover:decoration-primary/50 transition-all"
          >Impressum</NuxtLink
        >
        <NuxtLink
          v-if="route.path !== '/datenschutz'"
          href="https://www.faust-kommunikation.de/datenschutzerklaerung"
          class="leading-[1.4] underline decoration-1 underline-offset-2 decoration-transparent hover:decoration-primary/50 transition-all"
          >Datenschutz</NuxtLink
        >
      </div>
    </div>
  </footer>
</template>
