<template>
  <div class="w-full !max-w-full">
    <h1>home</h1>
    <!-- <splideSlider v-for="(row, rowIndex) in movieRows" :key="`movies-row--${rowIndex}`" :slides="row" path="movies" title="Movies"/>
    <splideSlider v-for="(row, rowIndex) in serieRows" :key="`series-row--${rowIndex}`" :slides="row" path="series" title="Series" /> -->


    <splideSlider :slides="displayedMovies" path="movies" title="Movies" :placeholder="Movie" />
    <splideSlider :slides="displayedSeries" path="series" title="Series" :placeholder="Serie" />
    <!-- <splideSlider :slides="displayedPeople" path="people" title="People" :placeholder="User" /> -->
  </div>
</template>


<script setup lang="ts">
  import { useStreamingDataStore } from '@/stores/streamingData'
  import { getMovies, getSeries, getPeople } from '@/utils/tvDbCalls';
  import ButtenElement from '@/components/ui/buttenElement.vue';
  import splideSlider from "@/components/ui/splideSlider.vue"
  import Movie from "@/src/assets/movie.jpg";
  import Serie from "@/src/assets/serie.jpg";
  import User from "@/src/assets/User.svg";

  const streamingData = useStreamingDataStore();

  const displayedMovies = computed(() => { return streamingData.movies.slice(0, 30) });
  const displayedSeries = computed(() => { return streamingData.series.slice(0, 30) });
  const displayedPeople = computed(() => { return streamingData.people.slice(0, 50) });

  const movieRows = computed(() => {
    const rows = []
    for(let i = 0; i < displayedMovies.value.length; i += 20){
      rows.push(displayedMovies.value.slice(i, i + 20))
    }
    return rows
  })

  const serieRows = computed(() => {
    const rows = []
    for(let i = 0; i < displayedSeries.value.length; i += 20){
      rows.push(displayedSeries.value.slice(i, i + 20))
    }
    return rows
  })
</script>