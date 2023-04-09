<script>
    import "./index.css";
    import { useStoreLogo } from "../../stores/storeLogo.js";
    import { useStoreAccount } from "../../stores/storeAccount";
    import { storeToRefs } from "pinia";
    import {useStoreTodolist} from "../../stores/todolist/store.js"

    export default {
        name: "inputTodo",
        data() {
            return {
                title: ""
            }
        },
        setup() {
            const {logoTambah} = useStoreLogo()

            const storeAccount = useStoreAccount()
            const {
                isLogin, 
                instance, 
                formData
            } = storeToRefs(storeAccount)

            const storeTodolist = useStoreTodolist()

            return {
                logoTambah, 
                isLogin, 
                instance, 
                formData,
                storeTodolist
            }
        },
        methods: {
            async tambahData() {
                if(!this.title) {
                    return false;
                }

                this.storeTodolist.insertData(this.title)
                this.title = ""
            }
        }
    }
</script>

<template>
    <div class="inputTodo">
        <input 
            type="text" 
                class="inputUser INTER" 
                placeholder="add your actvity ...." 
                v-model.trim()="title"
        >
        <button 
            @click="tambahData" 
            v-html="logoTambah" 
            class="logoTambah" 
        >
        </button>
    </div>
</template>
