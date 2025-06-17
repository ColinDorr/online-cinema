<template>
   <showHeader v-if="movie" :data="movie" :path="'movies'" />
</template>

<script setup lang="ts">
import { useStreamingDataStore } from "@/stores/streamingData";
import { getMovieById } from '@/utils/tvDbCalls';
import type { Movie } from "~/types/globals";
import showHeader from '@/components/headers/showHeader.vue'

const streamingData = useStreamingDataStore();
const route = useRoute();
const id = Number(route.params.id);
const movie = ref<Movie | null>(null);

onMounted(async () => {
  movie.value = streamingData.getMovieById(id);

  if (movie.value && movie.value.characters) return;

  const movieData = await getMovieById(id);
  if (movieData.status === "success") {
    streamingData.setMovies([movieData.data]);
    movie.value = movieData.data;
    console.log(movie.value);
  }
});
</script>