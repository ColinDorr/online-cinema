<template>
  <showHeader v-if="serie" :data="serie" :path="'series'" />
</template>

<script setup lang="ts">
import { useStreamingDataStore } from "@/stores/streamingData";
import { getSerieById } from "@/utils/tvDbCalls";
import type { Serie } from "~/types/globals";
import showHeader from "@/components/headers/showHeader.vue";

const streamingData = useStreamingDataStore();
const route = useRoute();
const id = Number(route.params.id);
const serie = ref<Serie | null>(null);

onMounted(async () => {
  serie.value = streamingData.getSerieById(id) ?? null;

  if (serie.value && serie.value.characters) return;

  const serieData = await getSerieById(id);
  if (serieData.status === "success") {
    streamingData.setSeries([serieData.data]);
    serie.value = serieData.data;
  }
});
</script>
