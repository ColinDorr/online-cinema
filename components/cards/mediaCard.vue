<template>
  <div
    class="relative rounded-3xl border-b text-white md:border-4 md:border-zinc-800 overflow-hidden md:hover:scale-115 transition-transform group w-full h-full bg-white"
  >
  <NuxtLink :to="`/${path}/${data.id}`" class="w-full h-full">
    <imageElement :path="data.image" :alt="data.name" :placeholder="placeholder" class="w-full h-full"/>
  </NuxtLink>

    <!-- :onClickEvent="handleListToggle" -->
    <div class="hidden md:block absolute bottom-0 left-0 w-full bg-black p-4">
      <h3 class="">{{ data.name }} - ({{ data.year}})</h3>
      <p v-if="data.runtime">{{ data.runtime }} min</p>
      <p v-if="data.episodes">{{ data.episodes }} episodes</p>

      <ButtenElement 
        :text="`${isInList ? '- Remove from list' : '+ Add to list'}`"
        :aria-label="`${isInList ? 'Remove' : 'Add'} ${props.path} ${isInList ? 'from' : 'to'} list`"
        :style="'list'"
        :onClickEvent="handleListToggle"
        class="w-full"
        
      />
    </div>

    <div class="absolute top-4 right-4">
       <ButtenElement 
        :text="`${isInList ? '-' : '+'}`"
        :aria-label="`${isInList ? 'Remove' : 'Add'} ${props.path} ${isInList ? 'from' : 'to'} list`"
        :style="'white'"
        :onClickEvent="handleListToggle"
        class="w-[40px] h-[40px] flex justify-center items-center !rounded-full shadow-2xl"
        
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Movie, Serie  } from '@/types/globals'
import { useUserDataStore } from '@/stores/userData';
import imageElement from '@/components/ui/imageElement.vue';
import ButtenElement from '../ui/buttenElement.vue';
import placeholder from "@/src/assets/User.svg";

const props = defineProps<{
    data: Movie | Serie,
    path: "movies" | "series"
}>()

const userData = useUserDataStore();

const isInList = computed(() => {
    return userData.getListIndex(props.path, props.data.id) !== -1;
});
const handleListToggle = () => {
    userData.toggleListItem(props.path, props.data.id)
}
</script>