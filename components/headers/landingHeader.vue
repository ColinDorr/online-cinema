<template>
  <div class="mx-auto container">
    <div class="relative grid place-items-center gap-5">
      <NuxtLink :href="`/${path}/${id}`">
        <div
          class="relative w-[19.5rem] rounded-3xl border-[.7px] md:w-fit md:rounded-none md:border-none"
        >
          <div
            class="relative aspect-video bg-inherit overflow-hidden w-full h-auto"
          >
            <imageElement
              class="rounded-3xl md:hidden"
              :path="artworks?.[0]?.image || image"
              :alt="name"
            />
            <imageElement
              class="hidden rounded-3xl md:block md:w-[77rem] md:rounded-none md:rounded-b-sm"
              :path="artworks?.[0]?.image || image"
              :alt="name"
            />
          </div>
        </div>
      </NuxtLink>

      <div
        class="text-white md:absolute md:left-0 md:bottom-[2rem] md:flex flex-col shadow max-w-[40rem] gap-5 bg-transparent-black-60"
      >
        <div class="flex flex-col gap-1">
          <h1 class="mb-4 text-3xl font-bold">{{ name }}</h1>
          <p>
            Elio, a space fanatic with an active imagination, finds himself on a
            cosmic misadventure where he must form new bonds with eccentric
            alien lifeforms, navigate a crisis of intergalactic proportions and
            somehow discover who he is truly meant to be.
          </p>
          <p v-if="score" class="">
            6.9 ⭐<span class="ml-1 text-xs font-normal md:text-sm"
              >({{ score }}) Reviews</span
            >
          </p>
          <p v-if="runtime" class="m">{{ runtime }} mins</p>
        </div>

        <div class="flex gap-2">
          <ButtonElement
            :text="`Read more`"
            :aria-label="`read more about ${name}`"
            :style="'white'"
            :to="`/${path}/${id}`"
            class="flex items-center rounded-sm bg-white font-medium"
          />
          <ButtonListToggle
            :style="'white'"
            :path="path"
            :data="data"
            class="flex items-center rounded-sm bg-white font-medium"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie, Serie } from "@/types/globals";
import imageElement from "@/components/ui/imageElement.vue";
import ButtonListToggle from "@/components/ui/buttonListToggle.vue";
import ButtonElement from "@/components/ui/buttonElement.vue";

const props = defineProps<{ data: Movie | Serie; path: "movies" | "series" }>();
const {
  id,
  name,
  image,
  score,
  episodes,
  runtime,
  lastUpdated,
  lastAired,
  artworks,
} = props.data ?? {};

console.log({
  data: props.data,
});
</script>
