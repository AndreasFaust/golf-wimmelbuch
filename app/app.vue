<template>
  <UApp>
    <navigation
      class="fixed top-0 inset-x-0 z-20 bg-blue-100/90 backdrop-blur-sm border-b border-blue-200 h-12"
    >
      <div class="max-w-6xl mx-auto px-10 flex items-center h-full">
        <p class="text-lg">
          Das große
          <span class="whitespace-nowrap font-bold">Golf-Wimmelbuch</span>
        </p>
      </div>
    </navigation>
    <main class="">
      <NuxtPage />
    </main>
    <PageFooter />
  </UApp>
</template>
