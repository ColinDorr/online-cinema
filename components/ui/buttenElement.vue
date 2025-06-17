<template>
  <component
    :is="componentTag"
    :to="to"
    :href="href"
    :aria-label="ariaLabel"
    :class="appliedStyle"
    :target="href ? '_blank' : undefined"
    :type="componentTag === 'button' ? 'button' : undefined"
    @click="handleClick"
  >
    {{ text }}
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { NuxtLink } from '#components';

const props = defineProps<{
  text: string;
  style?: keyof typeof buttonStyles
  href?: string;
  to?: string | object;
  ariaLabel?: string;
  onClickEvent?: () => void;
}>();

const buttonStyles = {
  "white": 'p-4 text-l font-semibold bg-white hover:bg-transparent-white-75 text-black rounded-md',
  "transparent": 'p-4 text-l font-semibold bg-transparent-black-90 hover:bg-transparent-black-60 text-white rounded-md',
  "red": 'p-4 text-l font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md',
  "list" : "flex h-fit items-center justify-center rounded-lg bg-transparent-black-90 px-1 py-1 font-medium text-[#fbf9f9c8] md:px-2 md:py-2 hover:bg-transparent-black-60 hover:bg-[red] pointer"
};

const appliedStyle = computed(() => {
  return buttonStyles[props.style as keyof typeof buttonStyles] ?? buttonStyles.red;
});

const componentTag = computed(() => {
  if (props.href) return 'a';
  if (props.to) return NuxtLink;
  if (props.onClickEvent) return 'button';
  return 'button';
});

const to = props.to;
const href = props.href;
const ariaLabel = props.ariaLabel;

const handleClick = () => {
  if (props.onClickEvent) {
    props.onClickEvent();
  }
};
</script>