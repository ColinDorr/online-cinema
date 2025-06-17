<template>
  <div class="flex flex-col">
    <div class="container mx-auto flex gap-4 justify-between items-center">
      <h2 v-if="title" class="font-bold text-2xl md:text-3xl">{{ title }}</h2>
      <ButtenElement class="hidden lg:block" :to="`/${path}`" :text="`view more`" :ariaLabel="`View more ${path}`" />
    </div>
    <Splide :options="settings" :aria-label="title" class="py-5 pb-10">
      <SplideSlide v-for="(slide, index) in slides" :key="slide.id" class="py-10 bg-lime">
        <MediaCard v-if="path === 'movies' || path === 'series'" :path="path" :data="slide"/>
      </SplideSlide>
    </Splide>
    <div class="container mx-auto flex gap-4 justify-center items-center">
      <ButtenElement class="lg:hidden" :to="`/${path}`" :text="`view more`" :ariaLabel="`View more ${path}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, Serie, Person} from '@/types/globals'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import ButtenElement from '@/components/ui/buttenElement.vue';
import MediaCard from "@/components/cards/mediaCard.vue";

const props = defineProps<{
    title?:string,
    path?: "movies" | "series" | "people";
    slides: Movie[] | Serie[] | Person[];
    // placeholder?: any
}>();

const settings = {
  type: "loop",
  perPage: 'auto',
  fixedWidth: "300px",
  focus: 0,
  gap: "24px",
  paginationKeyboard: true,
  mediaQuery: 'min',
  breakpoints: {
      350: { fixedWidth: "250px" },
      785: { fixedWidth: "300px" },
  },
  arrows: true,
  pagination: true,
  // drag: "free",
  snap: true,
  rewind: false,
  rewindByDrag: true
}


</script>