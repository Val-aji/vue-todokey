<script setup>
    import AccountVue from '../../components/Account/AccountVue.vue';
    import NavigasiVue from '../../components/Navigasi/NavigasiVue.vue';
    import InputDownloader from "../../components/InputDownload/InputDownloader.vue"
    import NavbarHP from '../../components/NavbarHP/NavbarHP.vue';
    import { storeToRefs } from 'pinia';
    import {useStoreDownloader} from "../../stores/downloader/store.js";
    import cardAudio from "./CardVideo.vue"

    const storeDownloader = useStoreDownloader();
    const {setStatus} = storeDownloader;
    const {navbarHP, posisi} = storeToRefs(storeDownloader)


</script>

<template>
    <NavigasiVue />
    <div class="dark:bg-dark pt-[10vh] text-dark bg-light dark:text-light h-[100vh]">
        <AccountVue>
            <InputDownloader class="my-8"/>
        </AccountVue>
        <NavbarHP :listNavbar="navbarHP" @setStatus="setStatus" :posisi="posisi" >
            <InputDownloader class="my-8"/>
        </NavbarHP>
        
        <div class="pb-[20vh] sm:mt-[5vh] bg-light dark:bg-dark">
            <cardAudio />
        </div>
    </div>
    
</template>