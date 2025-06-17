<template>
  <div class="flex flex-col">
    <div class="container mx-auto flex gap-4 justify-between items-center">
      <h2 v-if="title" class="font-bold text-2xl md:text-3xl">{{ title }}</h2>
      <ButtonElement v-if="showMore" class="hidden lg:block" :to="`/${path}`" :text="`view more`" :ariaLabel="`View more ${path}`" />
    </div>
    
    <Splide :options="settings" :aria-label="title" class="py-5 pb-10">
      <SplideSlide v-for="(slide, index) in slides" :key="slide.id" class="py-10">
        <MediaCard 
          v-if="path === 'movies' || path === 'series'" 
          :path="path" 
          :data="slide as Movie | Serie"
        />
        <PersonCard v-else-if="path === 'people'" :path="path" :data="slide as Person"/>
      </SplideSlide>
    </Splide>
    <div v-if="showMore" class="container mx-auto flex gap-4 justify-center items-center">
      <ButtonElement class="lg:hidden" :to="`/${path}`" :text="`view more`" :ariaLabel="`View more ${path}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, Serie, Person} from '@/types/globals'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import ButtonElement from '@/components/ui/buttonElement.vue';
import MediaCard from "@/components/cards/mediaCard.vue";
import PersonCard from "@/components/cards/personCard.vue";

const props = defineProps<{
    title?:string,
    path?: "movies" | "series" | "people";
    slides: Movie[] | Serie[] | Person[];
    options?: {[key:string] : any}
    showMore?: boolean
}>();

const settings = computed(() => {
  const defaultSettings = {
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
    snap: true,
    rewind: false,
    rewindByDrag: true
  }

  const breakpoints = {
    ...defaultSettings.breakpoints,
    ...props.options?.breakpoints
  }

  return {
    ...defaultSettings,
    ...props.options,
    breakpoints: breakpoints
  }

})


</script>