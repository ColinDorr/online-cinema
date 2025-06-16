<template>
    <div class="h-screen flex flex-col justify-center items-center bg-black text-white text-center">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <p class="text-2xl mb-6">Sorry, the page you're looking for doesn't exist.banaan</p>
        <ButtenElement text="Go Home" to="/" />
    </div>
</template>


<script setup lang="ts">
    import ButtenElement from '@/components/ui/buttenElement.vue';
</script>