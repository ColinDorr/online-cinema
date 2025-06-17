<template>
  <button
    :class="appliedStyle"
    type="button"
    @click="handleListToggle"
    :aria-label="`${isInList ? 'Remove' : 'Add'} ${props.path} ${isInList ? 'from' : 'to'} list`"
  >
    {{ isInList ? '- Remove from list' : '+ Add to list' }}
  </button>
</template>

<script setup lang="ts">
import { useUserDataStore } from '@/stores/userData';
import type { Movie, Serie } from '@/types/globals';

const props = defineProps<{
  path: 'movies' | 'series';
  data: Movie | Serie;
  style?: keyof typeof buttonStyles;
}>();

const userData = useUserDataStore();

const buttonStyles = {
  white: 'p-4 text-l font-semibold bg-white hover:bg-transparent-white-75 text-black rounded-md',
  transparent: 'p-4 text-l font-semibold bg-transparent-black-90 hover:bg-transparent-black-60 text-white rounded-md',
  red: 'p-4 text-l font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md',
  list: 'flex h-fit items-center justify-center rounded-lg bg-transparent-black-90 px-1 py-1 font-medium text-[#fbf9f9c8] md:px-2 md:py-2 hover:bg-transparent-black-60 hover:bg-[red] pointer',
};

const appliedStyle = computed(() => {
  return buttonStyles[props.style as keyof typeof buttonStyles] ?? buttonStyles.red;
});

const isInList = computed(() =>
  userData.user.list[props.path].includes(props.data.id)
);

const handleListToggle = () => {
  userData.toggleListItem(props.path, props.data.id);

  const nuxtApp = useNuxtApp();
  nuxtApp.$trackEvent({
    event: `${isInList.value ? 'Remove': 'Add'}_${props.path}`,
    message: `${isInList.value ? 'Remove' : 'Add'} ${props.data.id} from user list `,
    data: {
      id: props.data.id,
      name: props.data.name,
    }
  })

};
</script>