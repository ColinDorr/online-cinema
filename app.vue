<template>
  <div class="max-h-fit min-h-screen bg-black text-white">
    <div v-if="!selectedUser || loading">
      <IntroElement />
    </div>
    <div v-else>
      <HeaderElement />
      <NuxtPage class="relative min-h-screen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtPage } from "#components";
import { useStreamingDataStore } from "@/stores/streamingData";
import { useUserDataStore } from "@/stores/userData";
import { getMovies, getSeries, getPeople } from "@/utils/tvDbCalls";
import HeaderElement from "@/components/layout/headerElement.vue";
import IntroElement from "@/components/layout/introElement.vue";

const userStore = useUserDataStore();
const streamingData = useStreamingDataStore();
const selectedUser = computed(() => {
  return userStore.user?.icon;
});

const loading = ref(true);

const setABTestingCookie = (forcedVersion?: "a" | "b") => {
  const version = forcedVersion || (Math.random() < 0.5 ? "a" : "b");
  document.cookie = `ab-testing=true; path=/`;
  document.cookie = `ab-testing-version=${version}; path=/`;
  console.log(`AB Test session started with version: ${version}`);
};

onMounted(async () => {
  if (streamingData.movies.length < 200) {
    const movies = await getMovies();
    if (movies.status === "success") {
      streamingData.setMovies(movies.data);
    }
  }

  if (streamingData.series.length < 200) {
    const series = await getSeries();
    if (series.status === "success") {
      streamingData.setSeries(series.data);
    }
  }

  if (streamingData.people.length < 200) {
    const people = await getPeople();
    if (people.status === "success") {
      streamingData.setPeople(people.data);
    }
  }

  loading.value = false;
  setABTestingCookie();
});
</script>
