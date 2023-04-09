<script setup>
    import { useStoreLogo } from '../../stores/storeLogo';

    const logoSearch = useStoreLogo().logoSearch
</script>

<template>
    <div>
        <div class="inputDownloader w-4/5 mx-auto relative ">
            <input type="text" class="bg-[#333] font-[POPPINS] text-sm text-white border-2 outline-green-500 pl-[2vw] pr-[10vw] py-[1vh] rounded-l-full rounded-r-lg w-full border-red-500">
            <button v-html="logoSearch" class="absolute right-0 text-light"></button>
        </div>
    </div>
    
</template>