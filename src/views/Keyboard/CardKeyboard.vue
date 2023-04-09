<script setup>
    import { ref, defineProps } from 'vue';

    const props = defineProps({
        hasil: {
            type: Object,
            required: true,
            default: []
        },
        posisi: {
            type: Boolean,
            default: false
        }
    })
    

</script>

<template>
    <div v-if="!posisi" class="cardKeyboard bg-slate-500 dark:bg-slate-800 w-4/5 mx-auto rounded-lg px-[2vw] py-[2vh]">
        <p class="judul  text-lg">Hasil Tes</p>
        <div v-for="({judul, value}, index) in hasil.value" :key="index"
            class="w-full flex justify-between px-3 dark:font-normal font-bold">
            <p class="font-[ROBOTO]">{{ judul }}</p>
            <p class="font-[POPPINS]">{{ value }}</p>
        </div>
    </div>
    <p v-if="posisi" class="font-[ROBOTO] w-full flex justify-center mt-[10vh]">Tidak ada histori</p>
</template>

