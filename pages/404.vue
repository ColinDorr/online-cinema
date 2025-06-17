<template>

    <div class="w-full !max-w-full">
        <div 
            class="h-screen flex justify-center items-center bg-cover bg-center" 
            style="background-image: linear-gradient(rgb(0 0 0 / 60%), rgb(0 0 0 / 60%)), 
            url('https://assets.nflxext.com/ffe/siteui/vlv3/c0a32732-b033-43b3-be2a-8fee037a6146/2fe6e3c0-5613-4625-a0c1-3d605effd10b/IN-en-20210607-popsignuptwoweeks-perspective_alpha_website_large.jpg')"
        >
            <div>
                <h1 class="text-white font-bold text-5xl flex flex-col items-center">404</h1>
                <p class="text-white font-semibold text-3xl flex flex-col items-center">Sorry, the page you're looking for doesn't exist</p>
                <p class="text-white text-lg flex flex-col items-center">Please check if the url is correct or try it again later </p>

                <div class="flex gap-4 justify-center items-center">
                    <ButtenElement text="Back to home" to="/" />
                    
                    
                    <!-- <ButtenElement text="Navigation" ariaLabel="Enter the online cinema" to="/about" /> -->
                    <!-- <ButtenElement text="Show" to="/browse/genre/banaan" /> -->
                    <!-- <ButtenElement text="External link" href="https://www.nu.nl" /> -->
                        <!-- <ButtenElement text="Function" :onClickEvent="showAlert" />
                        <ButtenElement text="Function" :onClickEvent="showAlert('hello')" /> -->
                   
                </div>

            </div>
        </div>
    </div>


    <!-- <div class="h-screen flex flex-col justify-center items-center bg-black text-white text-center">
        <h1 class="text-6xl font-bold mb-4">404</h1>
        <p class="text-2xl mb-6">Sorry, the page you're looking for doesn't exist.banaan</p>
        <ButtenElement text="Go Home" to="/" />
    </div> -->
</template>


<script setup lang="ts">
    import ButtenElement from '@/components/ui/buttenElement.vue';

    const showAlert = ( text: string|undefined) => alert(text || 'test 123');
</script>