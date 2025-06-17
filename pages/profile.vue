<template>
    <div class="flex flex-col gap-8 justify-center items-center py-40">
        <h1>My Profile</h1>
        <p>A/B testing version: {{ abVersion }} <span v-if="abVersion === 'a'">⭐</span><span v-else-if="abVersion === 'b'">🚗</span></p>
        <div v-if="listedMovies.length" class="flex w-full flex-col gap-5 justify-baseline items-baseline">
            <h2 class="font-bold text-2xl md:text-3xl">My movies</h2>
            <ul class="flex flex-wrap gap-5">
                <li v-for="(item, index) in listedMovies" class="w-[200px] md:w-[300px]">
                    <MediaCard :data="item" :path="'movies'"/>
                </li>
            </ul>
        </div>

        <div v-if="listedSeries.length" class="flex w-full flex-col gap-5 justify-baseline items-baseline">
            <h2 class="font-bold text-2xl md:text-3xl">My Series</h2>
            <ul class="flex flex-wrap gap-5">
                <li v-for="(item, index) in listedSeries" class="w-[200px] md:w-[300px]">
                    <MediaCard :data="item" :path="'series'"/>
                </li>
            </ul>
        </div>
        <p v-if="!listedSeries.length && !listedMovies.length">No movies or series saved yet</p>
    </div>
</template>

<script setup lang="ts">
import type { Movie, Serie  } from '@/types/globals'
import { useUserDataStore } from '@/stores/userData';
import { useStreamingDataStore } from '@/stores/streamingData'
import MediaCard from '~/components/cards/mediaCard.vue';
import { ref, computed, onMounted } from 'vue';

const userData = useUserDataStore();
const streamingData = useStreamingDataStore();

const listedMoviesIds = ref(userData.user.list.movies);
const listedSeriesIds = ref(userData.user.list.series);

const listedMovies = computed(() => {
    return streamingData.movies.filter((item) => listedMoviesIds.value.includes(item.id))
})

const listedSeries = computed(() => {
    return streamingData.series.filter((item) => listedSeriesIds.value.includes(item.id))
});

const abVersion = ref('');
function getABVersion() {
    const match = document.cookie.match(new RegExp('(^| )ab-testing-version=([^;]+)'));
    if (match) {
        abVersion.value = match[2];
    } else {
        abVersion.value = '';
    }
}

onMounted(() => {
    getABVersion();
});
</script>