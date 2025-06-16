<template>
  <h1>Movies</h1>
  <div class="flex flex-col gap-10">
    <splideSlider v-for="(row, rowIndex) in movieRows" :key="rowIndex" :slides="row" path="movies" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useStreamingDataStore } from '@/stores/streamingData'
import { getMovies } from '@/utils/tvDbCalls';
import splideSlider from "@/components/ui/splideSlider.vue"

const streamingData = useStreamingDataStore()
const displayedMovies = ref(streamingData.movies.slice(0, 100))

const movieRows = computed(() => {
  const rows = []
  for(let i = 0; i < displayedMovies.value.length; i += 20){
    rows.push(displayedMovies.value.slice(i, i + 20))
  }
  return rows
})

const loadMore = () => {
  const currentLength = displayedMovies.value.length
  const nextMovies = streamingData.movies.slice(currentLength, currentLength + 100)
  if (nextMovies.length) {
    displayedMovies.value = displayedMovies.value.concat(nextMovies)
  }
}

onMounted(async () => {
  if(streamingData.movies.length < 200){
    const movies = await getMovies();
    
    if(movies.status === "success"){
       streamingData.setMovies(movies.data);
       displayedMovies.value = movies.data.slice(0, 100)
    }
    loadMore()
  }

  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 0.75)) {
      loadMore()
    }
  })
})
</script>