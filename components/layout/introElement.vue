<template>
  <div v-if="NetflixPromo" class="grid h-screen place-items-center">
    <img :src="NetflixAnimation" alt="netflix image" />
  </div>
  <div v-else class="grid px-10">
    <img class="mx-auto w-32 md:w-48" :src="Netflix" alt="" />
    <p class="mx-auto mb-3 mt-10 text-lg text-white md:mb-8 md:mt-20 md:text-5xl md:font-semibold">
      Who's Watching? - {{  userStore.user?.id || "unknown" }} - {{ selected }}
    </p>
    <ul
      class="md:grid-row-1 ml-7 grid h-fit grid-cols-2 gap-3 md:mx-auto md:ml-48 md:w-fit md:grid-flow-col md:gap-6"
    >
      <li
        v-for="userKey in imageArray"
        :key="userKey"
        class="text-xs md:flex md:w-fit md:flex-col"
      >
        <button @click="handleAvatarClick(userKey)" :aria-label="`select ${userKey} avatar`">
          <User
            class="w-24 rounded-sm md:w-32 md:hover:border-4"
            :fill="userColors[userKey]"
          />
        </button>
      </li>
    </ul>
    <span
      class="absolute bottom-24 ml-9 mt-5 flex w-20 flex-col font-extralight text-white md:right-40 md:top-64 md:w-28"
    >
      <button
        class="h-20 rounded-md border bg-[#101010f9] px-3 py-1 text-3xl font-bold md:h-28"
        @click="addImage"
      >
        +
      </button>
    </span>
  </div>
</template>

<script setup>
import { useUserDataStore } from '@/stores/userData';
import User from '@/src/assets/User.svg';
import Netflix from '@/src/assets/NetFlix2.png';
import NetflixAnimation from '@/src/assets/NetFlixAnimation.gif';

const imageArray = ref(['User1', 'User2']);
const imageContainer = ref(['User3', 'User4', 'User5']);
const count = ref(0);
const selected = ref(false);
const NetflixPromo = ref(true);

const userStore = useUserDataStore();

const userColors = {
  'User1': '#247e80',
  'User2': '#f9ad00',
  'User3': '#39bd78',
  'User4': '#2e89e4',
  'User5': '#f50a0b'
};

const SetUserProfile = (userKey) => {
   if (userColors[userKey]) {
    console.log(userColors[userKey]);
    userStore.setUserData({ icon: userColors[userKey] })
  }
};

const handleAvatarClick = (userKey, event) => {
    // if (!selected.value) {
    //     event.target.style.borderWidth = '3px';
    // }
    selected.value = true;
    SetUserProfile(userKey);
};

const addImage = () => {
  if (count.value <= 2) {
    imageArray.value.push(imageContainer.value[count.value]);
    count.value++;
  }
};

onMounted(() => {
  setTimeout(() => {
    NetflixPromo.value = false;
  }, 1650);
});
</script>