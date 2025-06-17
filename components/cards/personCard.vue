<template>
  <div
    class="relative rounded-3xl border-b text-white md:border-4 md:border-zinc-800 overflow-hidden md:hover:scale-115 transition-transform group w-full h-full bg-white"
  >
    <NuxtLink :to="`/people/${data.id}`" class="w-full h-full">
      <imageElement
        :path="data.image"
        :alt="data.name"
        :placeholder="placeholder"
        class="w-full h-full"
      />
    </NuxtLink>

    <div
      class="hidden md:block absolute bottom-0 left-0 w-full bg-black p-4 text-center"
    >
      <h3 class="">{{ data.name }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from "@/types/globals";
import imageElement from "@/components/ui/imageElement.vue";
import placeholder from "@/src/assets/person.webp";

const props = defineProps<{
  data: Person;
}>();
</script>
