<template>
  <component
    :is="componentTag"
    :to="to"
    :href="href"
    :aria-label="ariaLabel"
    :class="buttonStyles[appliedStyle]"
    :target="href ? '_blank' : null"
    :type="componentTag === 'button' ? 'button' : null"
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { defineProps, computed } from 'vue'

const props = defineProps<{
  text: string
  ariaLabel?: string
  onClickEvent?: () => void
  to?: string
  href?: string
  style?: keyof typeof buttonStyles
}>()

const buttonStyles = {
  "white": 'p-4 text-l font-semibold bg-white hover:bg-[rgba(255, 255, 255, 0.75)] text-black rounded-md',
  "transparent": 'p-4 text-l font-semibold bg-[rgba(109, 109, 110, 0.7)] hover:bg-[rgba(109, 109, 110, 0.4)] text-white rounded-md',
  "red": 'p-4 text-l font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md',
}
const appliedStyle = computed(() => props.style || 'red')

const componentTag = computed(() => {
  if (props.onClickEvent) return 'button'
  if (props.to) return NuxtLink
  if (props.href) return 'a'
  return 'button'
});

const nuxtApp = useNuxtApp();
const handleClick = (e: MouseEvent) => {
  if (props.onClickEvent) {
    props.onClickEvent()
  }

  // Compute event and message strings safely
  const eventStr = String(`click ${typeof componentTag.value === 'string' ? componentTag.value : '<NuxtLink />'}`)
  const target = props.to || props.href || props.ariaLabel || props.text || ''
  const messageStr = String(`User clicked on ${typeof componentTag.value === 'string' ? componentTag.value : 'component'} to ${target}`)

  nuxtApp.$trackEvent({
    event: eventStr,
    message: messageStr,
    data: props
  })
}


</script>