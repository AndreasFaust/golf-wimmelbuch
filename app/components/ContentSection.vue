<script setup lang="ts">
const { imagePosition = "left" } = defineProps<{
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  imagePosition?: "left" | "right";
}>();
</script>
<template>
  <div class="grid md:grid-cols-2 gap-10 items-center">
    <div
      class="aspect-square overflow-hidden rounded-full relative"
      :class="[
        imagePosition === 'left' ? 'order-1 -left-2.5' : 'order-2 -right-2.5',
      ]"
    >
      <NuxtImg v-bind="image" class="w-full h-full object-cover" />
    </div>
    <div
      class="flex flex-col gap-5"
      :class="[imagePosition === 'left' ? 'md:order-2' : 'md:order-1']"
    >
      <h2 class="font-bold text-3xl leading-none text-balance mix">
        {{ title }}
      </h2>
      <p class="text-xl leading-[1.4] text-balance mix">
        {{ description }}
      </p>
    </div>
  </div>
</template>
