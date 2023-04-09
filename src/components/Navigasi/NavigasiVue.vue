<script>
    import "./index.css"
    import { useStoreLogo } from "../../stores/storeLogo.js"
    import Cookie from "js-cookie"

    export default {
        name: "NavBar",
        props: {
            listNavigasi: {
                type: Object,
                requred: false,
                default: []
            }
        },
        data() {
            return {
                dark: false
            }
        },
        setup() {
            const {logoDarkOff, logoDarkOn} = useStoreLogo()

            return {logoDarkOff, logoDarkOn}
        },
        watch: {
            dark(newValue) {
                if(newValue) {
                    document.documentElement.classList.add("dark")
                    Cookie.set("darkTodolist", true)
                } else {
                    document.documentElement.classList.remove("dark")
                    Cookie.remove("darkTodolist")
                }
            }
        },
        beforeMount() {
            const darkTodolist = Cookie.get("darkTodolist")
            this.dark = darkTodolist
        },
        emits: ["setStatus"],
        methods: {
            handleDarkMode() {
                this.dark = !this.dark
            },
            setStatus(index) {
                this.listTombol.map(item => {
                    if(item.id === index) {
                        item.status = true
                        this.$emit("setPosisi", item.name.toLowerCase())
                    } else {
                        item.status = false
                    }
                    return item
                })
            }
        }
    }
</script>

<template>
    <div class="navigasi">
        
        <div 
            class="headerNav"
        >
            <p 
                class="font-[POPPINS] judulNav"
            >
                Todokey
            </p>
            <button 
                class="offDark" 
                v-html="dark ? logoDarkOn : logoDarkOff" 
                @click="handleDarkMode">
            </button> 
        </div>

        <div 
            class="footerNav"
        >
            <button 
                v-for="(list, index) in listNavigasi"
                class="childNav font-[ROBOTO]" 
                :key="index"
                :class="list.status ? 'activeNav' : ''"
                @click="$emit('setStatus', index)"
            >
                {{ list.name }}
            </button>
            
        </div>
        

    </div>

</template>