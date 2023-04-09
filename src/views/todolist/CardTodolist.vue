<script>
    import "./cardTodolist.css";
    import { useStoreLogo } from "../../stores/storeLogo.js";
    import { useStoreAccount } from "../../stores/storeAccount";
    import { storeToRefs } from "pinia";
    import { useStoreTodolist } from "../../stores/todolist/store.js";
    
    export default {
        name: "CardTodolist",
        props: {
            text: String,
        },
        watch: {
            isLogin() {
                this.storeTodolist.getDataTodolist()
            },
        },
        setup() {
            const storeLogo = useStoreLogo()
            const {logoHapus, logoSelesai, logoSelesaiDouble} = storeToRefs(storeLogo)

            const storeTodolist = useStoreTodolist()
            const {dataTodolist} = storeToRefs(storeTodolist)
            
            const {isLogin} = storeToRefs(useStoreAccount())

            return {logoHapus, logoSelesai, logoSelesaiDouble, isLogin, storeTodolist, dataTodolist}
        },
        
    }
</script>

<template>
    <div class="ComponentCard dark:bg-dark overflow-y-auto">
        <div class="cardTodo w-full flex flex-wrap justify-end pb-[5vh] h-max ">
            <p v-if="!dataTodolist || dataTodolist.length === 0" class="POPPINS mx-auto mt-[10vh] text-dark dark:text-light">Data tidak ditemukan</p>

            <div v-for="(data, index) of dataTodolist"
                class="card border-[2px]" 
                :class="data.status ? 'border-green-600  dark:border-green-400' : 'border-red-600 dark:border-dark-400'" 
                :key="index"
            >
                <div class="containerTitle">
                    <p class="title INTER">{{ data.title }}</p>
                    <p class="tanggal POPPINS w-max">{{data.tanggalMulai}}</p>
                    <p class="tanggal POPPINS w-full  text-end" v-if="data.status">{{ data.tanggalBerakhir }}</p>
                </div>

                <button v-html="logoSelesaiDouble" class="dark:text-green-500 text-green-400" v-if="data.status"></button>
                <div class="containerTombol" v-else>
                    <button 
                        v-html="logoHapus"
                        class="text-red-700" 
                        @click="() => storeTodolist.deleteData(data.id)"
                    >
                    </button>
                    <button 
                        v-html="logoSelesai"
                        class="text-green-700" 
                        @click="() => storeTodolist.selesaiData(data.id)"
                    >
                    </button>    
                </div>
                
            </div>
        </div>
    </div>
</template>

