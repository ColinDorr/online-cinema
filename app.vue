<template>
  <div class="max-h-fit min-h-screen bg-black text-white">
    <NavigationElement />
    <NuxtPage class="container m-auto relative min-h-screen"/>
  </div>
</template>

<script setup lang="ts">
import { NuxtPage } from '#components';
import NavigationElement from './components/ui/navigationElement.vue';
import { useStreamingDataStore } from '@/stores/streamingData'
import { useUserDataStore } from '@/stores/userData';

useUserDataStore();
useStreamingDataStore();


</script>