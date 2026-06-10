<script setup lang="ts">
defineProps<{
  width: number;
  height: number;
  transform: string;
}>();
</script>

<template>
  <div
    aria-hidden="true"
    class="absolute top-0 left-0 bg-repeat bg-top-left"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      transform,
      backfaceVisibility: 'visible',
    }"
  />
</template>
