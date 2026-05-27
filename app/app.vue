<template>
  <UApp>
    <div
      class="grid md:grid-rows-8 min-h-screen lg:h-screen py-[2vw] gap-[2vw]"
    >
      <NuxtPage />
      <PageFooter />
    </div>
    <NuxtImg
      class="fixed inset-0 -z-10 w-screen h-screen object-contain object-top-right dark:invert dark:hue-rotate-100"
      src="/background-blurred.png"
    />
  </UApp>
</template>
