<template>
  <div class="max-h-fit min-h-screen bg-black text-white">

    <div v-if="!selectedUser || laoding">
      <IntroElement />
    </div>
    <div v-else>
      <HeaderElement />
      <NuxtPage class="container pt-5 m-auto relative min-h-screen"/>
    </div>    
  </div>
</template>

<script setup lang="ts">
import { NuxtPage } from '#components';
import NavigationElement from './components/ui/navigationElement.vue';
import { useStreamingDataStore } from '@/stores/streamingData'
import { useUserDataStore } from '@/stores/userData';
import { getMovies, getSeries, getPeople } from '@/utils/tvDbCalls';
import HeaderElement from "@/components/layout/headerElement.vue"
import IntroElement from "@/components/layout/introElement.vue"

const userStore = useUserDataStore();
const streamingData = useStreamingDataStore();
const selectedUser = computed(() => userStore.user?.icon || null);
const loading = ref(true);

onMounted(async () => {
  if(streamingData.movies.length < 200){
    const movies = await getMovies();
    if(movies.status === "success"){
      streamingData.setMovies(movies.data);
    }
  }

  if(streamingData.series.length < 200){
    const series = await getSeries();
    if(series.status === "success"){
      streamingData.setSeries(series.data);
    }
  }

  if(streamingData.people.length < 200){
    const people = await getPeople();
    if(people.status === "success"){
      streamingData.setPeople(people.data);
    }
  }

  loading.value = false
})

</script>