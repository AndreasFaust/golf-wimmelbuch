<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <footer
    class="grid md:grid-cols-2 2xl:grid-cols-4 gap-[2vw] px-[2vw] content-between 2xl:content-end items-center mix"
  >
    <p class="text-lg">
      <a href="mailto:mail@andreasfaust.de" class="underlined">Get in Touch</a>
    </p>
    <p class="text-lg">
      Typeface:
      <a href="https://dreamtype.xyz/typefaces/mirage" class="underlined"
        >Mirage</a
      >
    </p>
    <p class="text-xs leading-[1.4]">
      Copyright © {{ new Date().getFullYear() }} Andreas Faust. All rights
      reserved.
    </p>
    <div class="flex items-center gap-2 justify-between">
      <NuxtLink
        v-if="route.path !== '/impressum'"
        href="/impressum"
        class="text-xs leading-[1.4] underlined"
        >Impressum</NuxtLink
      >
      <UColorModeButton class="w-max ml-auto" />
    </div>
  </footer>
</template>
