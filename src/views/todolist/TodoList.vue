<script>
    import { useStoreTodolist } from "../../stores/todolist/store";    
    import { storeToRefs } from "pinia";
    import "./index.css";
    import AccountVue from "../../components/Account/AccountVue.vue";
    import InputTodo from "../../components/InputTodo/InputTodo.vue";
    import NavbarHP from "../../components/NavbarHP/NavbarHP.vue";
    import NavigasiVue from "../../components/Navigasi/NavigasiVue.vue"
    import CardTodolist from "./CardTodolist.vue";
    import {useElementBounding} from "@vueuse/core";

    export default {
  watch: {
  },
        name: "TodoList",
        components: {
            AccountVue,
            InputTodo,
            NavbarHP,
            NavigasiVue,
            CardTodolist
        },
        data() {    
            return {
                isFixed: false,
            }
        },
        async created() {
            this.getDataTodolist()
        },
        setup() {
            const storeTodolist = useStoreTodolist()
            const {getDataTodolist} = storeTodolist
            const {setStatus} = storeTodolist
            const {navbarHP, posisi} = storeToRefs(storeTodolist)

            const classNavbar = "fixed inset-x-0 top-[10vh] z-20 bg-light dark:bg-dark pb-4 "

            return {setStatus, navbarHP, classNavbar, posisi, getDataTodolist}
        },
        methods: {
            handleScroll(e) {
                const account = useElementBounding(this.$refs.account)    
                const posisiAccount = parseInt(account.y.value) <= -175
                
                if(posisiAccount) {
                    this.isFixed = true
                } else {
                    this.isFixed = false
                }
            },
        }
    }

</script>

<template>

    <NavigasiVue :listNavigasi="navbarHP" @setStatus="setStatus"/>    
    <div id="pageTodolist"  class="pt-[10vh] dark:bg-dark h-[110vh]" :style="{'scroll-snap-type': 'y mandatory'}" @touchmove="handleScroll" @touchend="handleScroll">
      <AccountVue ref="account" class="AccountVue" >
            <InputTodo />
      </AccountVue>

      <NavbarHP @setStatus="setStatus" :listNavbar="navbarHP" :class="isFixed ? classNavbar : ''" :posisi="posisi">
            <InputTodo class="w-[85%]" />
      </NavbarHP>

      <CardTodolist />
    </div>
</template>
