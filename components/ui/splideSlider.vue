<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <Splide :options="settings" :aria-label="title">
      <SplideSlide v-for="(slide, index) in slides" :key="slide.id">
        <NuxtLink :to="`${path}/${slide.id}`">
          <h3>{{ slide.name }}</h3>
          <imageElement :path="slide.image" :alt="slide.name" width="300"/>
        </NuxtLink>
      </SplideSlide>
    </Splide>
  </div>
</template>

<script setup lang="ts">
import type { Movie, Serie } from '@/types/globals'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import imageElement from './imageElement.vue';

const props = defineProps<{
    title?:string,
    path?: "movies" | "series";
    slides: Movie[] | Serie[];
}>();

const settings = {
  type: "loop",
  perPage: 8,
  fixedWidth: "10dvw",
  focus: 0,
  gap: "24px",
  paginationKeyboard: true,
  // breakpoints: {
  //     1280: { padding: { left: "20px", right: "20px" } }
  // },
  arrows: true,
  pagination: true,
  // drag: "free",
  snap: true,
  rewind: false,
  rewindByDrag: true
}


</script>