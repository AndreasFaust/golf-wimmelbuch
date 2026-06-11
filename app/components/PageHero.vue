<script setup lang="ts">
import { motion } from "motion-v";
const { y } = useParallaxHeader({ speed: -3, opacity: 0.001 });
const { locale } = useI18n();
const sizes = useSizes("max-sm:60vw max-lg:50vw max-xl:60vw max-lg:50vw 380px");
</script>
<template>
  <motion.header
    :style="{ y }"
    :class="[
      'relative',
      'min-h-[90svh] flex items-center overflow-hidden bg-contain bg-bottom bg-no-repeat',
      'bg-[url(/background.avif)]',
      'after:absolute after:inset-0 after:bg-linear-to-b after:from-blue-100 after:to-transparent after:z-10',
    ]"
  >
    <div
      :class="
        cn(
          'relative z-20 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 px-5 md:px-10 gap-5 md:gap-10 lg:gap-20 items-center mb-[5svh]',
          'max-lg:py-20'
        )
      "
    >
      <AnimatedBook
        class="max-sm:w-2/3 max-sm:mx-auto lg:col-span-2"
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
        :width="68"
        :height="100"
        :depth="2.8"
        :sizes
        :rotate="true"
        :duration="40"
        :drag="true"
        :initial="{ x: 0, y: 0 }"
        :animate="{ x: 0, y: 0 }"
        :start="true"
      />
      <div class="relative flex flex-col gap-5 lg:gap-10 lg:col-span-3">
        <NuxtImg
          src="/bird.png"
          alt="Bird"
          width="310"
          height="261"
          sizes="112px"
          class="w-28 absolute z-0 -top-24 max-lg:right-0 lg:-top-45 lg:left-20"
        />
        <NuxtImg
          src="/balloon.png"
          alt="Balloon"
          width="284"
          height="385"
          sizes="96px"
          class="max-sm:hidden w-24 absolute max-lg:-top-full lg:-top-30 right-20"
        />
        <i18n-t
          keypath="nav.title"
          tag="h1"
          class="w-full text-5xl lg:text-7xl leading-none text-balance"
        >
          <template #brand>
            <span
              :class="
                cn('font-bold', {
                  'lg:whitespace-nowrap': locale === 'de',
                })
              "
            >
              {{ $t("nav.brand") }}
            </span>
          </template>
        </i18n-t>
        <p class="duper text-3xl lg:text-4xl leading-[1.2] md:text-balance">
          {{ $t("hero.description") }}
        </p>
        <UButton
          to="#bestellen"
          size="xl"
          class="w-max rounded-full pr-5"
          variant="solid"
          color="secondary"
          icon="lucide:arrow-down"
          >{{ $t("hero.button") }}</UButton
        >
      </div>
    </div>
  </motion.header>
</template>
