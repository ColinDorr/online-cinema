<template>
    <div class="container m-auto relative">
        <div class="text-white">
            <div class="md:grid md:place-items-center">
                <imageElement class="md:w-[74rem] md:rounded-b-md" :fullPath="artworks?.[0]?.image || image" :alt="name" />
            </div>
            
            <imageElement class="-mt-32 ml-4 w-36 rounded-xl md:-mt-[16rem] md:ml-32 md:w-72"  :fullPath="image" :alt="name" />
            
            <button id="/movie/1087891" class="block absolute right-5 top-[17.2rem] ml-12 mt-6 flex items-center rounded-lg  bg-white px-12 py-[.32rem] font-light text-black md:right-20 md:top-[45rem] md:font-semibold">
                <span class="mr-1 text-xl">+</span> My List 
            </button>
            <button class="block absolute right-2  top-[14.6rem]  ml-12  mr-3 mt-6 flex w-40 items-center  justify-center  rounded-lg bg-white py-[.42rem] font-light text-black md:right-[4.5rem] md:top-[42rem] md:font-semibold ">
                <img class="none mr-1 w-3" :src="Play" alt="PlayButton Image">Play
            </button>
            
            <h1 class="ml-5 mt-2  text-2xl font-bold md:absolute  md:left-[25.3rem] md:top-[41.5rem] md:text-3xl">{{ name }}</h1>
            <p class="mb-1 bg-red ml-5 text-xs md:absolute md:left-[25.3rem] md:top-[44rem] md:pt-2 md:text-sm md:font-normal">Don't underestimate him.</p>
            <p v-if="score" class="ml-5 font-semibold md:absolute md:left-[25.3rem] md:top-[44.8rem] md:pt-3 md:text-xl">6.9 ⭐<span class="ml-1   text-xs font-normal md:text-sm">({{score}}) Votes</span></p>
            <p v-if="episodes" class="ml-5 font-semibold md:absolute md:left-[25.3rem] md:top-[44.8rem] md:pt-3 md:text-xl">6.9 ⭐<span class="ml-1   text-xs font-normal md:text-sm">({{episodes}}) Episodes</span></p>
            <p v-if="runtime" class="ml-5 text-sm font-thin md:absolute md:left-[25.3rem] md:top-[46.8rem] md:pt-[.3rem]  md:text-base md:font-medium">{{ runtime }} mins</p>
            <p v-if="lastUpdated || lastAired" class="mb-2 ml-5 text-sm font-extralight md:absolute md:left-[25.3rem] md:top-[48.4rem] md:text-base md:font-normal">{{ lastUpdated || lastAired }}</p>
            
            <ul class="ml-2 flex flex-wrap gap-1 md:absolute md:left-[25.3rem] md:top-[50.2rem] md:gap-5 md:pl-2">
                <li class="rounded-full border px-2 py-1 md:border-2 md:px-3 md:font-medium">Thriller</li>
                <li class="rounded-full border px-2 py-1 md:border-2 md:px-3 md:font-medium">Action</li>
            </ul>
            
            <h1 class="ml-2 mt-5   text-2xl font-bold text-slate-300 md:mb-5 md:ml-20 md:mt-8  md:text-3xl">Synopsis</h1>
            <p class="mx-2 mt-1 text-sm md:ml-20 md:w-[50rem] md:text-lg">After his life is turned upside down when his wife is killed in a London terrorist attack, a brilliant but introverted CIA decoder takes matters into his own hands when his supervisors refuse to take action.</p>
            <a id="row" href="https://www.20thcenturystudios.com/movies/the-amateur"> 
                <button class="mb-10 ml-1 mt-7 rounded-full bg-neutral-900 px-3 py-3 font-semibold md:ml-[4.9rem] md:mt-5 md:rounded-md md:px-6 md:py-4  md:hover:text-gray-700 ">Movie HomePage</button>
            </a>
            
            <h2 class="mt-10 rounded-full border-b-2 pb-2 text-center text-2xl font-bold text-neutral-300 md:mx-auto md:mt-5 md:w-fit md:border-4 md:px-10 md:py-2 md:text-3xl">Production Companies</h2>
            <ul class="mt-2 grid place-items-center gap-10 pb-14 pt-14 text-center text-xl font-semibold text-zinc-500 md:col-auto md:grid-cols-3 md:gap-5 ">
                <li class="rounded-lg bg-[#ffffffe3] px-10 py-4"><img src="https://image.tmdb.org/t/p/original//h0rjX5vjW5r8yEnUBStFarjcLT4.png" class="w-60 rounded-lg">
                    <p class="pt-2">20th Century Studios</p>
                </li>
                <li class="rounded-lg bg-[#ffffffe3] px-10 py-4"><span class="flex flex-col">⭐<span class="mt-5">GetFlix Originals</span></span></li>
                <li class="rounded-lg bg-[#ffffffe3] px-10 py-4"><span class="flex flex-col">⭐<span class="mt-5">GetFlix Originals</span></span></li>
            </ul>
            <p class="fixed bottom-20 left-20 animate-pulse rounded-lg bg-[#000000] px-10 py-3 font-thin text-white md:left-[35rem] hidden ">Added to WatchList</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Movie, Serie } from "~/types/globals";
    import Play from "@/src/assets/Play.svg";
    import imageElement from "@/components/ui/imageElement.vue"

    const props = defineProps<{ data: Movie | Serie }>()
    const {
    name,
    image,
    score,
    episodes,
    runtime,
    lastUpdated,
    lastAired,
    artworks
    } = props.data ?? {}
    console.log({
        props
    })


</script>