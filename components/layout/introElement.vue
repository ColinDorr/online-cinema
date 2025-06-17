<template>
  <div v-if="NetflixPromo" class="grid h-screen place-items-center">
    <img :src="NetflixAnimation" alt="netflix image" />
  </div>
  <div v-else class="grid px-10">
    <img class="mx-auto w-32 md:w-48" :src="Netflix" alt="" />
    <p class="mx-auto mb-3 mt-10 text-lg text-white md:mb-8 md:mt-20 md:text-5xl md:font-semibold">
      Who's Watching?
    </p>

    <div class="mx-auto flex flex-col lg:flex-row flex-wrap gap-5">
      <ul
        class="flex flex-row flex-wrap gap-5"
      >
        <li
          v-for="userKey in imageArray"
          :key="userKey"
          class="text-xs md:flex md:w-fit md:flex-col"
        >
          <button @click="handleAvatarClick(userKey)" :aria-label="`select ${userKey} avatar`" class>
            <User
              class="w-24 rounded-sm md:w-32 md:hover:border-4"
              :fill="userColors[userKey]"
            />
          </button>
        </li>
      </ul>
      <span
        class="relative"
      >
        <button
          class="border bg-[#101010f9] px-3 py-1 text-3xl font-bold h-24 w-24 rounded-sm md:w-32 md:md:h-32"
          v-if="count < 3"
          @click="addImage"
        >
          +
        </button>
      </span>

    </div>

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