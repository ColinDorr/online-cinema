<template>
   <!-- <showHeader v-if="person" :data="person"/> -->
    <h1 v-if="person">{{ person.name }}</h1>
</template>

<script setup lang="ts">
import { useStreamingDataStore } from "@/stores/streamingData";
import { getPersonById } from '@/utils/tvDbCalls';
import type { Person } from "~/types/globals";
import showHeader from '@/components/headers/showHeader.vue'

const streamingData = useStreamingDataStore();
const route = useRoute();
const id = Number(route.params.id);
const person = ref<Person | null>(null);

onMounted(async () => {
  person.value = streamingData.getPersonById(id) ?? null;

  if (person.value && person.value.characters) return;

  const personData = await getPersonById(id);
  if (personData.status === "success") {
    streamingData.setPeople([personData.data]);
    person.value = personData.data;
    console.log(person.value);
  }
});
</script>