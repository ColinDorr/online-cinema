<template>
    <div class="flex flex-col gap-8 justify-center items-center py-40">
       <div class="flex w-full flex-col gap-5 justify-baseline items-baseline">
            <h2 class="font-bold text-2xl md:text-3xl">My movies</h2>
            <ul class="flex flex-wrap gap-5">
                <li v-for="(item, index) in listedMovies" class="w-[200px] md:w-[300px]">
                    <MediaCard :data="item" :path="'movies'"/>
                </li>
            </ul>
        </div>

        <div class="flex w-full flex-col gap-5 justify-baseline items-baseline">
            <h2 class="font-bold text-2xl md:text-3xl">My Series</h2>
            <ul class="flex flex-wrap gap-5">
                <li v-for="(item, index) in listedSeries" class="w-[200px] md:w-[300px]">
                    <MediaCard :data="item" :path="'series'"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Movie, Serie  } from '@/types/globals'
import { useUserDataStore } from '@/stores/userData';
import { useStreamingDataStore } from '@/stores/streamingData'
import MediaCard from '~/components/cards/mediaCard.vue';

const userData = useUserDataStore();
const streamingData = useStreamingDataStore();

const listedMoviesIds = ref(userData.user.list.movies);
const listedSeriesIds = ref(userData.user.list.series);

const listedMovies = computed(() => {
    return streamingData.movies.filter((item) => listedMoviesIds.value.includes(item.id))
})

const listedSeries = computed(() => {
    return streamingData.series.filter((item) => listedSeriesIds.value.includes(item.id))
})

console.log({
    userData,
    listedMovies,
    listedSeries
})

</script>