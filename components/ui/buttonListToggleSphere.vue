<template>
  <button
    type="button"
    :aria-label="`${isInList ? 'Remove' : 'Add'} ${props.path} ${isInList ? 'from' : 'to'} list`"
    class="text-l font-semibold bg-white hover:bg-transparent-white-75 text-black w-[40px] h-[40px] flex justify-center items-center !rounded-full shadow-2xl"
    @click="handleListToggle"
  >
    {{ isInList ? "-" : "+" }}
  </button>
</template>

<script setup lang="ts">
import { useUserDataStore } from "@/stores/userData";
import type { Movie, Serie } from "@/types/globals";

const props = defineProps<{
  path: "movies" | "series";
  data: Movie | Serie;
}>();

const userData = useUserDataStore();

const isInList = computed(() =>
  userData.user.list[props.path].includes(props.data.id),
);

const handleListToggle = () => {
  userData.toggleListItem(props.path, props.data.id);

  const nuxtApp = useNuxtApp();
  nuxtApp.$trackEvent({
    event: `${isInList.value ? "Remove" : "Add"}_${props.path}`,
    message: `${isInList.value ? "Remove" : "Add"} ${props.data.id} from user list `,
    data: {
      id: props.data.id,
      name: props.data.name,
    },
  });
};
</script>
