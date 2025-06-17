<template>
  <template v-if="compiledPath">
    <img :src="compiledPath" :alt="alt" loading="lazy" />
  </template>
  <template v-else-if="placeholder">
    <component :is="placeholder" fill="currentColor" class="w-full h-full" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  path: string,
  alt: string
  placeholder?: any, // SVG component or undefined
}>()

const compiledPath = computed(() => {
  if (props.path) {
    return props.path.startsWith('https://') || props.path.startsWith('http://')
      ? props.path
      : `https://artworks.thetvdb.com${props.path}`
  }
  return null
})
</script>