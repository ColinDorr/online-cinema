<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-black text-white text-center"
  >
    <h1 class="text-5xl font-bold mb-6">🚨 Oops!</h1>
    <pre class="mb-4">{{ error }}</pre>
    <!-- Debug output -->
    <p class="text-2xl mb-4">
      {{ error?.statusCode }} - {{ error?.statusMessage }}
    </p>
    <ButtonElement
      :text="`Back to home`"
      :style="'white'"
      :to="`/${path}/${id}`"
      class="flex items-center rounded-sm bg-white font-medium"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>
