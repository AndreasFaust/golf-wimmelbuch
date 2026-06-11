<script setup lang="ts">
import type { BookImage } from "./props";

defineProps<{
  width: number;
  height: number;
  transform: string;
  image: BookImage;
  sizes?: string;
}>();

const emit = defineEmits<{
  load: [];
}>();

const side = useTemplateRef("side");

function notifyLoaded() {
  emit("load");
}

onMounted(async () => {
  await nextTick();
  const image = side.value?.querySelector("img");
  if (image?.complete) {
    notifyLoaded();
  }
});
</script>

<template>
  <div
    v-if="image && image.url"
    ref="side"
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
      @load="notifyLoaded"
      @error="notifyLoaded"
    />
  </div>
</template>
