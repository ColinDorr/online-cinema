<template>
  <div class="container mx-auto px-5 lg:px-0 !py-20">
    <div class="flex flex-col gap-10">
      <h1 class="text-2xl lg:text-3xl text-center w-full">People</h1>
      <div
        class="flex flex-wrap gap-5 justify-center lg:grid lg:grid-cols-5 xl:grid-cols-6"
      >
        <div
          v-for="person in displayPeople"
          :key="person.id"
          class="w-[200px] lg:w-auto"
        >
          <PersonCard
            :path="'person'"
            :data="person"
            class="w-[200px] lg:w-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStreamingDataStore } from "@/stores/streamingData";
import { getPeople } from "@/utils/tvDbCalls";
import PersonCard from "@/components/cards/personCard.vue";

const streamingData = useStreamingDataStore();
const displayPeople = ref(streamingData.people.slice(0, 50));

const loadMore = () => {
  const currentLength = displayPeople.value.length;
  const nextPeople = streamingData.people.slice(
    currentLength,
    currentLength + 50,
  );
  if (nextPeople.length) {
    displayPeople.value = displayPeople.value.concat(nextPeople);
  }
};

onMounted(async () => {
  if (streamingData.people.length < 50) {
    const people = await getPeople();
    if (people.status === "success") {
      streamingData.setPeople(people.data);
      displayPeople.value = people.data.slice(0, 50);
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
