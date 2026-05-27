<script setup lang="ts">
useSeoMeta({
  title: "Andreas Faust",
  description:
    "Andreas Faust is a type designer and software engineer based in Berlin.",
});
</script>

<template>
  <div
    class="md:row-span-7 grid lg:grid-rows-7 gap-[2vw] overflow-hidden px-[2vw]"
  >
    <h1
      class="w-full row-span-2 aspect-3/2 text-4xl md:text-[5.6vw] lg:text-[4vw] leading-none text-balance mix"
    >
      Andreas Faust is a designer and software engineer based in Berlin.
    </h1>
    <NuxtImg
      src="/fist.png"
      class="-ml-0.5 sm:-ml-1 md:-ml-2 max-lg:-mt-20 lg:-mt-1 row-span-2 rounded-full size-[15vw] lg:size-[12vw] xl:size-[10vw]"
    />
    <div
      class="flex flex-col items-start md:grid md:grid-cols-2 2xl:grid-cols-5 gap-[2vw] mix"
    >
      <p class="text-xl leading-[1.4]">
        2025 he started the type foundry
        <a href="https://dreamtype.xyz" class="underlined">Dreamtype™</a>
        together with his friends from
        <a href="https://maas.engineering" class="underlined"
          >Magic as a Service</a
        >. They aim to deliver cutting-edge typefaces to
        <a href="https://dreamtype.xyz/pricing" class="underlined"
          >competetive</a
        >
        licensing conditions.
      </p>

      <p class="text-xl leading-[1.4]">
        2020 he co-founded the publishing house
        <a href="https://www.brumaireverlag.de" class="underlined">Brumaire</a>
        and was creative director of its award-winning magazine
        <a href="https://www.jacobin.de" class="underlined">JACOBIN</a>
        (German edition) until 2024.
      </p>
      <p class="text-xl leading-[1.4]">
        Since 2024 he has been designing the community fact checking platform
        <a href="https://www.faktenforum.org" class="underlined">Faktenforum</a>
        for the public interest-oriented journalist medium
        <a href="https://www.correctiv.org" class="underlined">Correctiv</a>.
      </p>

      <div class="text-xl leading-[1.4]">
        He has some expertise in building fullstack websites. Here are some of
        his projects:
        <ul class="mt-2">
          <li
            class="before:content-['→'] before:mr-2 before:absolute before:left-0 relative flex pl-6 text-sm"
          >
            <a href="https://www.irgac.org" class="underlined"
              >International Research Group on Authoritarianism and
              Counter-Strategies
            </a>
          </li>
          <li
            class="before:content-['→'] before:mr-2 before:absolute before:left-0 relative flex pl-6 text-sm"
          >
            <a href="https://jacobin.de" class="underlined">JACOBIN</a>
          </li>
          <li
            class="before:content-['→'] before:mr-2 before:absolute before:left-0 relative flex pl-6 text-sm"
          >
            <a href="https://www.sleek-mag.com" class="underlined"
              >Sleek Magazine</a
            >
          </li>
          <li
            class="before:content-['→'] before:mr-2 before:absolute before:left-0 relative flex pl-6 text-sm"
          >
            <a href="https://www.adbk-nuernberg.de" class="underlined"
              >Akademie der Bildenden Künste Nürnberg (German Design Award
              Winner)</a
            >
          </li>
          <li
            class="before:content-['→'] before:mr-2 before:absolute before:left-0 relative flex pl-6 text-sm"
          >
            <a href="https://www.sebastianfaust.de" class="underlined"
              >Sebastian Faust</a
            >
          </li>
          <li
            class="before:content-['→'] before:mr-2 before:absolute before:left-0 relative flex pl-6 text-sm"
          >
            <a
              href="https://www.elternratgeber-fluechtlinge.de"
              class="underlined"
              >Elternratgeber Flüchtlinge</a
            >
          </li>
        </ul>
      </div>
      <p class="text-xl leading-[1.4]">
        In 2022/23 he lectured
        <a href="https://type.adbk-nuernberg.de/" class="underlined"
          >type design</a
        >
        at the
        <a href="https://www.adbk-nuernberg.de/" class="underlined"
          >Academy of Fine Arts</a
        >
        in Nuremberg. He enjoys
        <a
          href="https://www.slipcue.com/music/brazil/aa_styles/mpb.html"
          class="underlined"
          >Brazilian music</a
        >
        and playing drums as well as an occasional mountain bike trip to the
        Alps.
      </p>
    </div>
  </div>
</template>
