<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { motion } from "motion-v";

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

const section = useTemplateRef("section");
const visible = ref(false);

useIntersectionObserver(
  section,
  ([entry]: IntersectionObserverEntry[]) => {
    if (entry?.isIntersecting) visible.value = true;
  },
  { rootMargin: "-80px" }
);

const sizes = useSizes("max-sm:100vw max-lg:50vw 510px");
</script>
<template>
  <motion.div
    ref="section"
    class="grid md:grid-cols-2 gap-10 items-center"
    :initial="{ opacity: 0, y: 40 }"
    :animate="visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }"
    :transition="{ duration: 1, ease: 'easeOut' }"
  >
    <div
      class="aspect-square overflow-hidden rounded-full relative"
      :class="[
        imagePosition === 'left'
          ? 'md:order-1 md:-left-2.5'
          : 'md:order-2 md:-right-2.5',
      ]"
    >
      <NuxtImg v-bind="image" :sizes class="w-full h-full object-cover" />
    </div>
    <div
      class="flex flex-col gap-5"
      :class="[imagePosition === 'left' ? 'md:order-2' : 'md:order-1']"
    >
      <h2 class="font-bold text-3xl leading-none text-balance mix">
        {{ title }}
      </h2>
      <p class="text-lg sm:text-xl leading-[1.4] text-balance mix">
        {{ description }}
      </p>
    </div>
  </motion.div>
</template>
