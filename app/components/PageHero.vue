<script setup lang="ts">
import { motion } from "motion-v";
const { y } = useParallaxHeader({ speed: -3, opacity: 0.001 });
</script>
<template>
  <motion.header
    :style="{ y }"
    :class="[
      'relative',
      'h-[90svh] flex items-center overflow-hidden bg-contain bg-bottom bg-no-repeat',
      'bg-[url(/background.avif)]',
      'after:absolute after:inset-0 after:bg-linear-to-b after:from-blue-100 after:to-transparent after:z-10',
    ]"
  >
    <div
      class="relative z-20 max-w-6xl mx-auto grid grid-cols-5 px-10 gap-20 items-center mb-[5svh]"
    >
      <AnimatedBook
        class="col-span-2"
        :front="{
          url: '/wimmelbuch-front.jpg',
          alt: 'Title',
          width: 1794,
          height: 2598,
        }"
        :back="{
          url: '/wimmelbuch-back.jpg',
          alt: 'Title',
          width: 1794,
          height: 2598,
        }"
        :spine="{
          url: '/wimmelbuch-spine.jpg',
          alt: 'Title',
          width: 74,
          height: 2598,
        }"
        :width="69"
        :height="100"
        :depth="3"
        :rotate="true"
        :duration="40"
        :drag="true"
        :initial="{ x: 0, y: 0 }"
        :animate="{ x: 0, y: 0 }"
        :start="true"
      />
      <div class="relative flex flex-col gap-10 col-span-3">
        <NuxtImg
          src="/bird.png"
          alt="Bird"
          width="310"
          height="261"
          class="w-28 absolute -top-40 left-20"
        />
        <NuxtImg
          src="/balloon.png"
          alt="Balloon"
          width="284"
          height="385"
          class="w-24 absolute -top-20 right-20"
        />
        <h1 class="w-full text-[80px] leading-none text-balance mix">
          Das große
          <span class="whitespace-nowrap font-bold">Golf-Wimmelbuch</span>
        </h1>
        <p class="duper text-4xl leading-[1.2] text-balance mix">
          Das individuelle Merchandise für Ihren Club
        </p>
        <UButton
          to="#bestellen"
          size="xl"
          class="w-max rounded-full pr-5"
          variant="solid"
          color="secondary"
          icon="lucide:arrow-down"
          >Jetzt bestellen</UButton
        >
      </div>
    </div>
  </motion.header>
</template>
