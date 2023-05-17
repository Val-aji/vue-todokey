<script setup>
    import InputKeyboard from '../../components/InputKeyboard/InputKeyboard.vue';
    import NavigasiVue from '../../components/Navigasi/NavigasiVue.vue';
    import AccountVue from '../../components/Account/AccountVue.vue';
    import {useStoreKeyboard} from "../../stores/keyboard/store.js"
    import { storeToRefs } from 'pinia';
    import NavbarHP from '../../components/NavbarHP/NavbarHP.vue';
    import {ref, onBeforeMount, watch} from "vue"
    import CardKeyboard from './CardKeyboard.vue';
    
    const storeKeybard = useStoreKeyboard()
    
    const {setStatus, generateKata, handleInput, setIsActive, setCounter, setDataHistori, deleteData, getDataKeyboard} = storeKeybard
    const {navbarHP, posisi, listKata, hasilTes, isActive, dataHistori} = storeToRefs(storeKeybard)
    
    onBeforeMount(async () => {
        generateKata()
        await getDataKeyboard();        
    })

<<<<<<< HEAD
    const timer = 1;
=======
    const timer = 60
>>>>>>> 89d97b12329d223b5bc1d51a90754072e124858f
    const waktu = ref(timer);
    const hasil = ref(null)
    const manipulationDone = ref(true)
    let batasWaktu;
    watch(isActive, (newValue) => {
        if(newValue) {
            batasWaktu = setInterval(() => {
            waktu.value--;
            }, 1000);
        } 
    })
    
    watch(waktu, newValue => {
        if(newValue <= 0) {
            clearInterval(batasWaktu)
            hasil.value = hasilTes
            setDataHistori(hasilTes.value)
            setIsActive(false)
            generateKata()
            waktu.value = timer
            manipulationDone.value = false
            setTimeout(() => {
                manipulationDone.value = true
            }, 100)
            setCounter(0)
        } 
    })


</script>

<template>
    <NavigasiVue :listNavigasi="navbarHP" @setStatus="setStatus" />
    <div id="Keyboard" class="dark:bg-dark dark:text-light bg-light text-dark h-[110vh] overflow-y-auto pb-[10vh]">
        <AccountVue class="pt-[10vh]" :posisi="posisi">
            <CardKeyboard :hasil="hasilTes" class="mt-[5vh]" />
        </AccountVue>
        <NavbarHP @setStatus="setStatus" :listNavbar="navbarHP" :posisi="false">
        </NavbarHP>

        <div v-if="posisi == 'home'">
            <div class="cardKeyboard w-full preTablet:w-[80%] preTablet:ml-[15vw] mt-[5vh] relative ">
                <p class="absolute right-[2vw] top-[-5vh] text-lg">{{waktu.toString().length <= 1 ? '0'+waktu : waktu}}</p>
                <div class="containerCard w-full flex flex-wrap p-0 justify-center preHp:justify-start preHp:ml-[2vw]"  
                >
                    <p  
                        v-for="(kata, index) in listKata" :key="index" 
                        :class="kata.status === 'default'? 'text-slate-700 dark:text-slate-400': kata.status ? 'dark:text-green-500 text-green-700' : 'text-red-500 dark:text-red-600'"
                        class=" font-[POPPINS] w-[45%] preHp:w-[30%] preTablet:w-[30%]  mx-[3px] "
                    >
                        {{ kata.text }}
                    </p>
                </div>
            </div>    
        </div>

        
        <div v-if="posisi == 'history'" class="w-full flex flex-col my-[5vh]">
            <p v-if="dataHistori.length == 0" class="mx-auto">History Tidak ada!</p>
                <CardKeyboard 
                    v-for="data in dataHistori"
                    :hasil="data"
                    class="my-[2vh]"
                    @deleteData="deleteData"
                />
        </div>

        <InputKeyboard 
                v-if="manipulationDone && posisi == 'home'"
                class="my-[4vh]" 
                @handleInput="handleInput" @setIsActive="setIsActive" 
        />

        <CardKeyboard v-if="hasil && !isActive && posisi == 'home'" :hasil="hasil.value" />
        
    </div>
</template>
