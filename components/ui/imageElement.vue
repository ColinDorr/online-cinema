<template>
    <img v-if="compiledPath" :src="compiledPath" :alt="alt" lazy>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fullPath?: string
  path?: string
  alt: string
}>()

const compiledPath = computed(() => {
  if (props.fullPath) {
    return props.fullPath
  } else if (props.path) {
    return `https://artworks.thetvdb.com${props.path}`
  }
  return null
})
</script>