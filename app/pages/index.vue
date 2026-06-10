<script setup lang="ts">
useSeoMeta({
  title: "Das große Golf-Wimmelbuch",
  description:
    "Das farbenfrohe Golf-Wimmelbuch zeigt Kindern den Golfsport in seinen schönsten Facetten. Witzige Geschichten, sympathische Figuren, und bunte Bilder machen den Sport für die Kleinen zum echten Abenteuer.",
});
</script>

<template>
  <div class="overflow-hidden">
    <PageHero />
    <section class="bg-white relative z-10">
      <div class="max-w-6xl mx-auto p-10 rounded-3xl flex flex-col gap-10">
        <div class="grid grid-cols-3 gap-5 items-center">
          <p
            class="duper text-4xl leading-tight text-balance mix grow col-span-2"
          >
            Wie bringt man Vorschulkindern die Welt des Golfs näher? Mit
            farbenfrohen Wimmelbüchern! Witzige Geschichten, sympathische
            Figuren, und bunte Bilder machen den Sport für die Kleinen zum
            echten Abenteuer.
          </p>
          <div class="p-5 bg-blue-200 rounded-3xl">
            <h2 class="text-2xl font-bold">Das Buch im Überblick</h2>
            <ul :class="['text-xl', styling.list.ul]">
              <li>14 hand-illustrierte Seiten</li>
              <li>Individuelle Anpassung an Ihren Club und Ihre Sponsoren</li>
              <li>Großes Format (260 x 375 mm, ähnlich DIN A3)</li>
              <li>Stabiler Karton und hochwertige Verarbeitung</li>
            </ul>
          </div>
        </div>
        <ContentSection
          title="Warum ein Wimmelbuch?"
          description="Das Wimmelbuch zeigt Kindern den Golfsport in seinen schönsten Facetten. Die bunten Bilder sind sympathisch und altersgerecht aufbereitet. Sie sind voller lustiger und kurioser Geschichten und wecken den Wunsch, es selber auszuprobieren."
          :image="{
            src: '/content-2.jpg',
            alt: 'Ein Buch, viele Möglichkeiten',
            width: 2000,
            height: 2000,
          }"
        />
        <ContentSection
          title="Ein Buch, viele Möglichkeiten"
          description="Ob als Merchandise im Clubshop, als herzliches Willkommensgeschenk für Neumitglieder und Gäste oder als unterhaltsamer Zeitvertreib in Kinderarztpraxen – das Wimmelbuch ist ein vielseitiges Aushängeschild für den Club und den Golfsport. Und das Beste: Die Erlöse aus dem Verkauf können direkt in die Jugendarbeit fließen und fördern so den Nachwuchs."
          :image="{
            src: '/content-1.jpg',
            alt: 'Das Buch im Überblick',
            width: 1554,
            height: 1554,
          }"
          image-position="right"
        />
        <ContentSection
          title="Maßgeschneidert für Ihren Club"
          description="Ihr von Hand nachgezeichnetes Clubhaus oder eine markante Besonderheit Ihres Platzes zieren das Titelblatt. Ihre Sponsoren können sich auf der Rückseite verewigen und das Projekt aktiv unterstützen."
          :image="{
            src: '/content-4.jpg',
            alt: 'Das Buch im Überblick',
            width: 2191,
            height: 2191,
          }"
        />
      </div>
    </section>
    <section id="bestellen" class="bg-white relative z-10">
      <div class="max-w-6xl mx-auto p-10 rounded-3xl flex flex-col gap-10">
        <h2 class="font-bold text-4xl leading-none text-balance mix">
          Jetzt unverbindlich anfragen
        </h2>
        <RequestForm />
      </div>
    </section>
  </div>
</template>
