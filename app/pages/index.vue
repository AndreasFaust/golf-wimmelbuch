<script setup lang="ts">
const { tm, rt } = useI18n();

interface ContentSectionData {
  title: string;
  description: string;
}

type CompiledMessage = Parameters<typeof rt>[0];

const summaryItems = computed<string[]>(() => {
  const items = tm("preface.summary.items") as CompiledMessage[];
  return items.map((item) => rt(item));
});

const contentSections = computed<ContentSectionData[]>(() => {
  const sections = tm("content") as Array<{
    title: CompiledMessage;
    description: CompiledMessage;
  }>;
  return sections.map((section) => ({
    title: rt(section.title),
    description: rt(section.description),
  }));
});

const contentImages: { src: string; width: number; height: number }[] = [
  { src: "/content-2.jpg", width: 2000, height: 2000 },
  { src: "/content-1.jpg", width: 1554, height: 1554 },
  { src: "/content-4.jpg", width: 2191, height: 2191 },
];
</script>

<template>
  <div class="overflow-hidden">
    <PageHero />
    <section class="bg-white relative z-10">
      <div
        class="max-w-6xl mx-auto px-5 md:px-10 pt-10 pb-20 rounded-3xl flex flex-col gap-10"
      >
        <div
          class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center mb-10"
        >
          <p
            class="duper text-2xl lg:text-4xl leading-tight text-balance mix grow lg:col-span-2"
          >
            {{ $t("preface.text") }}
          </p>
          <div class="p-5 bg-blue-200 rounded-3xl flex flex-col gap-2.5">
            <h2 class="text-2xl font-bold">
              {{ $t("preface.summary.title") }}
            </h2>
            <ul :class="['text-lg lg:text-xl leading-[1.4]', styling.list.ul]">
              <li v-for="item in summaryItems" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <ContentSection
          v-for="(section, i) in contentSections"
          :key="i"
          :title="section.title"
          :description="section.description"
          :image="{ ...contentImages[i]!, alt: section.title }"
          :image-position="i % 2 === 0 ? 'left' : 'right'"
        />
      </div>
    </section>
    <section
      id="bestellen"
      class="bg-blue-50 border-t border-blue-200 relative z-10"
    >
      <div
        class="max-w-6xl mx-auto px-5 md:px-10 py-10 lg:py-20 rounded-3xl flex flex-col gap-5 md:gap-10"
      >
        <div class="flex max-md:flex-col items-baseline gap-y-5 gap-x-10">
          <h2 class="font-bold text-4xl leading-none text-balance mix">
            {{ $t("requestForm.title") }}
          </h2>
          <p>{{ $t("requestForm.required") }}</p>
        </div>
        <RequestForm />
      </div>
    </section>
  </div>
</template>
