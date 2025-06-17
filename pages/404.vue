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
                    <ButtonElement text="Back to home" to="/" />
                    
<!--                     
                    <ButtonElement text="Navigation" ariaLabel="Enter the online cinema" to="/about" />
                    <ButtonElement text="Show" to="/browse/genre/banaan" />
                    <ButtonElement text="External link" href="https://www.nu.nl" />
                    <ButtonElement text="Function" :onClickEvent="showAlert" />
                    <ButtonElement text="Function" :onClickEvent="showAlert('hello')" /> -->
                   
                </div>

            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import ButtonElement from '@/components/ui/buttonElement.vue';

    const showAlert = ( text: string|undefined) => alert(text || 'test 123');
</script>