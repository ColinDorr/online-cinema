<template>
  <div
    class="relative rounded-3xl border-b text-white md:border-4 md:border-zinc-800 overflow-hidden md:hover:scale-115 transition-transform group w-full h-full bg-white"
  >
    <NuxtLink :to="`/${path}/${data.id}`" class="w-full h-full">
      <imageElement
        :path="data.image"
        :alt="data.name"
        :placeholder="path === 'movies' ? placeholderMovies : placeholdeSeries"
        class="w-full h-full"
      />
    </NuxtLink>

    <div class="hidden md:block absolute bottom-0 left-0 w-full bg-black p-4">
      <h3 class="">{{ data.name }} - ({{ data.year }})</h3>
      <p v-if="data.runtime">{{ data.runtime }} min</p>
    </div>

    <div class="absolute top-4 right-4">
      <ButtonListToggleSphere :path="path" :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, Serie } from "@/types/globals";
import { useUserDataStore } from "@/stores/userData";
import imageElement from "@/components/ui/imageElement.vue";
import ButtonListToggleSphere from "@/components/ui/buttonListToggleSphere.vue";
import placeholderMovies from "@/src/assets/movie.jpg";
import placeholdeSeries from "@/src/assets/serie.jpg";

const props = defineProps<{
  data: Movie | Serie;
  path: "movies" | "series";
}>();

const userData = useUserDataStore();

const isInList = computed(() => {
  return userData.getListIndex(props.path, props.data.id) !== -1;
});
const handleListToggle = () => {
  userData.toggleListItem(props.path, props.data.id);

  const nuxtApp = useNuxtApp();
  nuxtApp.$trackEvent({
    event: `${isInList.value ? "Remove" : "Add"}_${props.path}`,
    message: `${isInList.value ? "Remove" : "Add"} ${props.data.id} from user list `,
    data: {
      id: props.data.id,
      name: props.data.name,
    },
  });
};
</script>
