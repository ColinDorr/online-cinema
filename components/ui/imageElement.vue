<template>
  <template v-if="compiledPath">
    <img :src="compiledPath" :alt="alt" loading="lazy" class="w-full h-full" />
  </template>
  <template v-else-if="placeholder">
    <img :src="placeholder" :alt="alt" loading="lazy" class="w-full h-full" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  path: string | undefined,
  alt: string,
  placeholder?: string, // string URL of placeholder image
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