<template>
  <div class="mx-auto container px-5 lg:px-0 !py-20">
    <div class="relative grid place-items-center gap-5">
      <div
        class="relative rounded-3xl border-[.7px] md:w-fit md:rounded-none md:border-none"
      >
        <div class="relative bg-inherit overflow-hidden w-full h-auto">
          <imageElement
            class="rounded-3xl aspect-[16 / 9]"
            :path="image"
            :alt="name"
          />
        </div>
      </div>

      <div
        class="text-white flex flex-col shadow max-w-[40rem] gap-5 bg-transparent-black-60"
      >
        <div class="flex flex-col gap-1">
          <h1 class="mb-4 text-3xl font-bold">{{ name }}</h1>
          <p>
            Elio, a space fanatic with an active imagination, finds himself on a
            cosmic misadventure where he must form new bonds with eccentric
            alien lifeforms, navigate a crisis of intergalactic proportions and
            somehow discover who he is truly meant to be.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from "@/types/globals";
import imageElement from "@/components/ui/imageElement.vue";

const props = defineProps<{ data: Person }>();
const { name, image } = props.data ?? {};
</script>
