<template>
  <div class="!py-20">
    <div class="container mx-auto px-5 lg:px-0">
      <h1 class="text-2xl lg:text-3xl text-center w-full">Series</h1>
    </div>
    <div class="flex flex-col gap-10">
      <splideSlider
        v-for="(row, rowIndex) in serieRows"
        :key="rowIndex"
        :title="getRandomMovieGenre()"
        :slides="row"
        path="series"
        :show-more="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStreamingDataStore } from "@/stores/streamingData";
import { getSeries } from "@/utils/tvDbCalls";
import splideSlider from "@/components/ui/splideSlider.vue";

const streamingData = useStreamingDataStore();
const displaySeries = ref(streamingData.series.slice(0, 100));

const serieRows = computed(() => {
  const rows = [];
  for (let i = 0; i < displaySeries.value.length; i += 20) {
    rows.push(displaySeries.value.slice(i, i + 20));
  }
  return rows;
});

const loadMore = () => {
  const currentLength = displaySeries.value.length;
  const nextSeries = streamingData.series.slice(
    currentLength,
    currentLength + 100,
  );
  if (nextSeries.length) {
    displaySeries.value = displaySeries.value.concat(nextSeries);
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
  if (streamingData.series.length < 200) {
    const series = await getSeries();

    if (series.status === "success") {
      streamingData.setSeries(series.data);
      displaySeries.value = series.data.slice(0, 100);
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
