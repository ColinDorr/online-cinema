<template>
  <div
    :class="[
      'sticky top-0 z-10 flex items-center justify-between rounded-b-lg bg-[#0c0c0cee] px-3 text-zinc-600 md:fixed md:w-full md:rounded-b-none',
      isScrolled ? 'md:bg-[#0c0c0cd5]' : 'md:bg-transparent'
    ]"
  >
    <NuxtLink to="/" class="md:ml-10">
      <img
        class="w-12 rounded-full bg-transparent md:hidden"
        :src="Netflix"
        alt="NetFlix Logo"
      />
      <img
        class="hidden md:block md:w-[7.5rem]"
        :src="NetflixLOGO"
        alt=""
      />
    </NuxtLink>
    
    <div class="hidden font-medium text-white md:-ml-[40rem] md:flex md:w-[22rem] md:justify-between">
      <NuxtLink to="/" class="hover:text-zinc-600">Home</NuxtLink>
      <NuxtLink to="/movies" class="hover:text-zinc-600">Movies</NuxtLink>
      <NuxtLink to="/series" class="hover:text-zinc-600">Series</NuxtLink>
      <NuxtLink to="/people" class="hover:text-zinc-600">People</NuxtLink>
      <NuxtLink to="/profile" class="hover:text-zinc-600">List</NuxtLink>
    </div>

    <NuxtLink to="/profile" class="md:mr-12">
      <UserIcon class="w-7 rounded-sm md:w-9" :fill="userColor" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useUserDataStore } from '@/stores/userData';
import Netflix from '@/src/assets/Netflix.webp';
import NetflixLOGO from '@/src/assets/NetFlix2.png';
import UserIcon from "@/src/assets/User.svg";

const isScrolled = ref(false);
const userStore = useUserDataStore();
const userColor = computed(() => {
  return userStore?.user.icon || '';
});

const listenScrollEvent = () => {
  isScrolled.value = window.scrollY > 7;
};

onMounted(() => {
  window.addEventListener('scroll', listenScrollEvent);
});

onUnmounted(() => {
  window.removeEventListener('scroll', listenScrollEvent);
});
</script>