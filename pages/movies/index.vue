<template>
  <div class="!py-20">
    <div class="container mx-auto px-5 lg:px-0">
      <h1 class="text-2xl lg:text-3xl text-center w-full">Movies</h1>
    </div>
    <div class="flex flex-col gap-10">
      <splideSlider
        v-for="(row, rowIndex) in movieRows"
        :key="rowIndex"
        :title="getRandomMovieGenre()"
        :slides="row"
        path="movies"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStreamingDataStore } from "@/stores/streamingData";
import { getMovies } from "@/utils/tvDbCalls";
import splideSlider from "@/components/ui/splideSlider.vue";

const streamingData = useStreamingDataStore();
const displayedMovies = ref(streamingData.movies.slice(0, 100));

const movieRows = computed(() => {
  const rows = [];
  for (let i = 0; i < displayedMovies.value.length; i += 20) {
    rows.push(displayedMovies.value.slice(i, i + 20));
  }
  return rows;
});

const loadMore = () => {
  const currentLength = displayedMovies.value.length;
  const nextMovies = streamingData.movies.slice(
    currentLength,
    currentLength + 100,
  );
  if (nextMovies.length) {
    displayedMovies.value = displayedMovies.value.concat(nextMovies);
  }
};

function getRandomMovieGenre() {
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Crime",
    "Drama",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Thriller",
  ];

  const randomIndex = Math.floor(Math.random() * genres.length);
  return genres[randomIndex];
}

onMounted(async () => {
  if (streamingData.movies.length < 200) {
    const movies = await getMovies();

    if (movies.status === "success") {
      streamingData.setMovies(movies.data);
      displayedMovies.value = movies.data.slice(0, 100);
    }
    loadMore();
  }

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight * 0.75
    ) {
      loadMore();
    }
  });
});
</script>
