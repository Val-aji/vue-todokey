<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';

    const listNavigasi = ref([
        {id: 0, name: "Todolist", status: true, route: "/"},
        {id: 1, name: "Downloader", status: false, route: "/downloader"},
        {id: 2, name: "Keyboard", status: false, route: "/keyboard"},
    ])

    function handleNavigasiRouter(id) {
        listNavigasi.value.map(item => {
            if(id === item.id) {
                item.status = true
            } else {
                item.status = false
            }
        })
    }
</script>

<template>
    <div id="NavigasiRouter" class="fixed bottom-0 inset-x-0 dark:bg-dark light:bg-light text-dark dark:text-light">
        <div class="containerNavigasi flex w-100 justify-between px-[3vw] py-[1vh]  bg-dark dark:bg-light text-light dark:text-dark border-t-2 border-slate-100">
            <RouterLink 
                v-for="navigasi in listNavigasi" :key="navigasi.id" :to="navigasi.route" 
                class="font-[POPPINS] " :class="navigasi.status ? 'text-base' : 'font-thin text-sm'"
                @click="() => handleNavigasiRouter(navigasi.id)"
            >
                {{ navigasi.name }}
            </RouterLink>    
        </div>
        
    </div>
</template>