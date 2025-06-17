<template>
  <div class="mx-auto container px-5 lg:px-0">
    <div class="relative grid place-items-center gap-5">
      <div
        class="relative w-[19.5rem] rounded-3xl border-[.7px] md:w-fit md:rounded-none md:border-none"
      >
        <div class="relative bg-inherit overflow-hidden w-full h-auto">
          <imageElement
            class="rounded-3xl md:hidden aspect-[16 / 9]"
            :path="image"
            :alt="name"
          />
          <imageElement
            class="hidden rounded-3xl md:block md:w-[77rem] md:rounded-none md:rounded-b-sm aspect-video"
            :path="artworks?.[0]?.image || image"
            :alt="name"
          />
        </div>
      </div>

      <div
        class="text-white lg:absolute lg:left-0 lg:bottom-[2rem] flex flex-col shadow max-w-[40rem] gap-5 bg-transparent-black-60"
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
</script>
