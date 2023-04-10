<script setup>
    import { ref, defineProps, defineEmits } from 'vue';

    const props = defineProps({
        hasil: {
            type: Object,
            required: true,

        },
    })

    const emit = defineEmits(["deleteData"])

    function handleDeleteData() {
        console.log("tes")
        const kondisi = confirm("apakah anda ingin menghapus "+ props.hasil.tanggal + " ?")
        if(kondisi) {
            emit("deleteData", props.hasil.id)
        } else {
            return false
        }
    }

</script>

<template>
    
    <div  class="cardKeyboard bg-slate-500 dark:bg-slate-800 w-4/5 mx-auto rounded-lg px-[2vw] py-[2vh] relative" @touchend="handleDeleteData">
        <p class="absolute right-[2vw] top-0 text-sm text-slate-300">{{ hasil.tanggal }}</p>
        <p class="judul  text-lg">Hasil Tes</p>
        <div v-for="({judul, value}, index) in hasil.data" :key="index"
            class="w-full flex justify-between px-3 dark:font-normal font-bold">
            <p class="font-[ROBOTO]">{{ judul }}</p>
            <p class="font-[POPPINS]">{{ value }}</p>
        </div>
    </div>
    
</template>

