<script setup lang="ts">
import type { BookImage } from "./props";

defineProps<{
  width: number;
  height: number;
  transform: string;
  image: BookImage;
  sizes?: string;
}>();
</script>

<template>
  <div
    v-if="image && image.url"
    class="absolute top-0 left-0 pointer-events-none"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      transform,
      backfaceVisibility: 'visible',
    }"
  >
    <NuxtImg
      class="absolute inset-0 object-cover object-center h-full w-full"
      :src="image.url"
      :alt="image.alt ?? ''"
      :width="image.width"
      :height="image.height"
      :sizes
    />
  </div>
</template>
