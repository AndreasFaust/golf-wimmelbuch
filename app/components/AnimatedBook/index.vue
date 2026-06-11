<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { motion, useSpring } from "motion-v";
import useFormat from "./useFormat";
import useTranslate from "./useTranslate";
import BookSide from "./BookSide.vue";
import BookSideGeneric from "./BookSideGeneric.vue";
import type { Props } from "./props";

const props = withDefaults(defineProps<Props>(), {
  spring: () => ({ stiffness: 100, mass: 1, damping: 100 }),
  width: 200,
  height: 400,
  depth: 20,
  rotate: true,
  duration: 10,
  drag: true,
  initial: () => ({ x: 0, y: 0 }),
  animate: () => ({ x: 0, y: 0 }),
  start: true,
  sizes: "100vw",
});

const container = useTemplateRef<HTMLDivElement>("container");
const { format } = useFormat(
  container,
  () => props.width,
  () => props.height,
  () => props.depth
);
const translate = useTranslate(format);
const halfDepth = computed(() => format.value.depth / 2);

const pause = ref(!props.rotate);
const frontLoaded = ref(!props.front?.url);
const x = useSpring(props.initial.x, props.spring);
const y = useSpring(props.initial.y, props.spring);

watchEffect(() => {
  if (props.start) {
    x.set(props.animate.x);
    y.set(props.animate.y);
  }
});

function onDrag(
  _event: PointerEvent,
  info: { offset: { x: number; y: number } }
) {
  const previousX = x.get();
  x.set(previousX + -info.offset.y);
  const previousY = y.get();
  y.set(previousY + info.offset.x);
}

// Inlined WebP textures (book spine/top/bottom). Extracted out of the template
// because the base64 strings are too long to keep inline.
const spineTexture =
  "data:image/webp;base64,UklGRp4DAABXRUJQVlA4WAoAAAAAAAAAnAEAnAEAVlA4ICoDAADQSACdASqdAZ0BP/3+/3+/vLuyM9keY/A/iWlu9s/V6i2Xe3LdEuf/qFI/1oDc/+f8jfn0CnfYS1gWG/X2xJGJugHaSbwwEKlwDw2bS99PN2v3XkYswFupW1S6FveTCbKbNsnmxvo7AFrumJDAWPDbGLUrLEGSCJe6gEh3R4zBr+FNh166ffcSCxStkiqWe2gQXyOjXSF5svUh0zBwupZzzbphcXdUfZmVSGXk2HXrp/kMgfUjeGSm7a/cMxd2VEY0emYNfGQPqRvDJTdtfuGYu7GKSrQOcIVKyw1IACfg27BhdYbP8p1ulZFqqNKx5dc826YXD/4Z+rWeXUZQYzLe9vTFYhCIEBMzRPGapZt4y3uEU1sJqPkr4xxrnidR18kVIIWbEQ1gUK7Yff5dn33NuQRL+a3bX7X9azyXAgOvUY4r44upAAT8G3YMH7F3ZUx5o9Lo99u5dJtLaVEaHn8cXaZmkqQpddCZs9fdrqBQB8YRm8VRrHLUVyQw8IU6Cdu7FzhK2SKkFDCoO7/YGbda+iK+MeZJj+6CJgClbKGauO/2GmPNHpdHvuIzOErZIqQUMKpZslDhimNFR7Fh/cD8x82evToaRPGapafDD6IICSPS6PfcRmcJWyRVLPbP8tamQnJKr1JQmDCpWWNFMSF4J0OX6vA2SetDO06+iK/p+BqW88ltfOayzOUcfAGZcDYNflbP4DdKqYhVqYbM5Hen1crHA3xT7/Ltp/IAAn7sx4kRMdZjVjQHfqShMGNRphpbzyXApvhO93+s5QvtitwA/vQtIBUbmXQPzVq8NXvO0OrniZne0Dun4cngYsoTEDsisFWn0mZDl9m9ePlJFh3px+V0HshacAKgNGBGd/+hMzVmvNaRFdDsNMIK6IrWdkAGxTo7M2gh3/EzCLcOUNPKRAWMo2jIUwkXI9UPiGfmT48GUHrIiZpodwLpDRAMLVRSuHe0qjx5826x+DePcf7nYl9vgZ81AQDpYky+GBiYS1BpXjVbqU+wDmTsiwMcZffEDsHnrVoGoIqIgHST3nGowpjJf5awVd+B2an2YyIvsWdCFNyCH14gAABQU0FJTgAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBEMAAAAAAA5QYmVXARAABgAAAAAAAA==";
const topBottomTexture =
  "data:image/webp;base64,UklGRkQEAABXRUJQVlA4WAoAAAAAAAAAnAEAnAEAVlA4INADAACwSgCdASqdAZ0BP/3+/3+/u7u7trqNa/A/iWlu3P+99qkk/Y/2Oo7kO6cGwv91/ja9X/c/56VPkp9jOn4RNiRyBPeDJJFiJrHy4U3DsyaSO5L7Z9vNNaa0yjrTUsF6hg0DJpI7kvuMo8yplTTKOT6ZUymfTSmUPCbjPTTg0dZUyUewb9xlQWmtMo02xBpv0n6hoGSqKOmqelD+UgjFeif1Fo5Tq9ScR3v25SddNoM3khlQWoiqUK1DSctoXy4ZE2W+cmyxTrAg9duLet6uRcgTyBTfLe2lPMvoRNipd2GvOkazXiwOl9xlQWmtNaa01qT/ia+LltoBXz8uGLmDoiETRcAd79xXRHSKpykeHtUgT1oYerFO7PWZuLax8uFNr7uqNyGdSR4ZulK8+h/RN8HoONzVY8DYA0kskVTkaza5UqRxQH1B66kL/yWAO9/F0QrERRPaF494ecjvft1qTP1IGgfNUeC02Pm3v85uLe2e8w0UNc9K/raGSc9KdB6/+rgC6kL/7w6LAm/4iHS/HwRAgBg+6PqZTrAw578MqBR1pmAOe4jJdL1x+pA0NAyaVpcl9xfZ1HP0TV4SEUTwULkybh2O9K0HTJtfddqWMfbTgRr20p5l9B/dnp2unWbkcf4mxzideYWHr7daiWsDC6aBcl+PJK/DJiFGcL4M4TPrTWmslHp2hOfqQNDBzq4S+1d90Ueaa01lTTWmtNZU0qO9f9UuzJpTFrnpz7eaa0yjrTVOSvUJ+LA6X3F8BabC5iieHsUxcl6hfo979xXRLWBhdP3FeDImy2RJSMU6noAA/vMnBa/l5QqkY3ltgrwV6m7pBfmWHnMV3AgV3Q2hNHvAqjHAa9IWopNgGRwJRjzyFF3wh7Tz0gETpx1AicyLUW0j48d2vo0ddaqEw+FSyjG8dbwlPuuO5PDf/4ROJBiWm8BE447BXcICFdwASAusLlrPc4sx3IcFqKhVtkb9PKZg/6mFAEEvJN8KGl9Y0ePU7skyrv83cZzfUxLEdmLwKUwADAs0Dz+UVBhUWxWyv1h9lJstEHiKoM3dXeMVHuAQzVeGvZNH6mG2an6mK+ZMpPK1mW6fNqbGLCUl/kVSMdJkeljkULABt9S3xQ2LCtv7dp3PpwV4TT3fdBlYAJlEZt63X56jc29+2E1IhfY76ueSHgOHx3gUpsruoevwytpLStm7Bfb9TLnqYcn9OCJ09nPh8asc44VD35z1M8bULcJMkWXBn1MVEROZJpxR7CPdzxyGSll1MmnmsPKM4U/m5IvtgqaEy9eKow+0KJeoAAAAUFNBSU4AAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQoAAAAAAAMAAAAAj/wAAAAAAAAOEJJTQRDAAAAAAAOUGJlVwEQAAYAAAAAAAA=";
</script>

<template>
  <div
    ref="container"
    aria-hidden="true"
    class="w-full"
    :style="{ aspectRatio: `${width}/${height}` }"
  >
    <motion.div
      class="h-full w-full flex justify-center items-center cursor-grab"
      :style="{ perspective: '1200px', ...(style ?? {}) }"
      :initial="{ opacity: 0 }"
      :animate="frontLoaded ? { opacity: 1 } : { opacity: 0 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
      :tabindex="-1"
      :drag="drag"
      :drag-constraints="{ left: 0, right: 0, top: 0, bottom: 0 }"
      :while-tap="{ cursor: 'grabbing', scale: 1.05 }"
      @drag="onDrag"
      @drag-start="pause = true"
      @drag-end="pause = false"
    >
      <motion.div
        class="cursor-grab"
        :style="{ transformStyle: 'preserve-3d', rotateY: y, rotateX: x }"
      >
        <div
          :style="{
            transformStyle: 'preserve-3d',
            animationIterationCount: 'infinite',
            animationName: 'rotatingAnimationY',
            animationTimingFunction: 'linear',
            animationPlayState: rotate && !pause ? 'running' : 'paused',
            animationDuration: `${duration}s`,
          }"
        >
          <BookSide
            v-if="front"
            :image="{ ...front, alt: 'Vorderseite' }"
            :width="format.width"
            :height="format.height"
            :transform="`translate3d(${translate}) translate3d(0, 0, 0) rotateY(0deg)`"
            :sizes
            @load="frontLoaded = true"
          />
          <BookSide
            v-if="back"
            :image="{ ...back, alt: 'Rückseite' }"
            :width="format.width"
            :height="format.height"
            :transform="`translate3d(${translate}) translate3d(0, 0, -${format.depth}px) rotateY(180deg)`"
            :sizes
          />
          <BookSide
            v-if="spine"
            :image="{ ...spine, alt: 'Rücken' }"
            :width="format.depth"
            :height="format.height"
            :transform="`translate3d(${translate}) translate3d(-${halfDepth}px, 0, -${halfDepth}px) rotateY(-90deg)`"
          />
          <BookSideGeneric
            class="bg-contain bg-repeat"
            :style="{ backgroundImage: `url(${spineTexture})` }"
            :width="format.depth"
            :height="format.height"
            :transform="`translate3d(${translate}) translate3d(${
              format.width - halfDepth
            }px, 0, -${halfDepth}px) rotateY(90deg)`"
          />
          <BookSideGeneric
            class="bg-contain bg-repeat"
            :style="{ backgroundImage: `url(${topBottomTexture})` }"
            :width="format.width"
            :height="format.depth"
            :transform="`translate3d(${translate}) translate3d(0px, -${halfDepth}px, -${halfDepth}px) rotateX(90deg)`"
          />
          <BookSideGeneric
            class="bg-contain bg-repeat"
            :style="{ backgroundImage: `url(${topBottomTexture})` }"
            :width="format.width"
            :height="format.depth"
            :transform="`translate3d(${translate}) translate3d(0px, ${
              format.height - halfDepth
            }px, -${halfDepth}px) rotateX(-90deg)`"
          />
        </div>
      </motion.div>
    </motion.div>
  </div>
</template>
