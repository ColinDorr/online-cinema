<template>
  <div class="w-full !max-w-full">
    <LandingHeader :data="highlightedMovie" :path="'movies'" />
    <splideSlider
      :slides="displayedMovies"
      path="movies"
      title="Hottest movies"
    />
    <splideSlider
      :slides="displayedSeries"
      path="series"
      title="Most watched Series"
    />
    <splideSlider
      :slides="displayedPeople"
      path="people"
      title="Greatest actors"
      :options="peopleSliderOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { useStreamingDataStore } from "@/stores/streamingData";
import splideSlider from "@/components/ui/splideSlider.vue";
import LandingHeader from "@/components/headers/landingHeader.vue";

const streamingData = useStreamingDataStore();
const peopleSliderOptions = {
  fixedWidth: "150px",
  breakpoints: {
    350: { fixedWidth: "200px" },
    785: { fixedWidth: "200px" },
  },
};

const highlightedMovie = computed(() => {
  return streamingData.movies.slice(0, 1)[0];
});
const displayedMovies = computed(() => {
  return streamingData.movies.slice(1, 31);
});
const displayedSeries = computed(() => {
  return streamingData.series.slice(0, 30);
});
const displayedPeople = computed(() => {
  return streamingData.people.slice(0, 50);
});
</script>
