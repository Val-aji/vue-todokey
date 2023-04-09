<script>
    import "./index.css"
    import RegisterVue from "./register/RegisterVue.vue";
    import LoginVue from "./login/LoginVue.vue"
    import {useStoreAccount} from "../../stores/storeAccount.js"
    import { useStoreLogo } from "../../stores/storeLogo.js";
    import { storeToRefs } from "pinia";
    import Cookies from "js-cookie";
    
    export default {
        name: "AccountVue",
        data() {
            return {
                isUbah: false,
            }
        },
        methods: {
            handleLogout() {
                Cookies.remove("username");
                Cookies.remove("token")

                location.reload()
            },
            setIsUbah() {
                this.isUbah = !this.isUbah
            }
        },
        setup() {
            //Logo Silang 
            const {logoSilang} = useStoreLogo()
            
            //Kebutuhan Account
            const storeAccount = useStoreAccount()
            const {posisi, isUbah, isLogin, namaLengkap, bio} = storeToRefs(storeAccount)

            const {setPosisi} = storeAccount
            // const setPosisi = res => storeAccount.setPosisi(res)

            return {logoSilang, posisi, setPosisi, isUbah, isLogin, namaLengkap, bio, }
        },
        components: {
            LoginVue,
            RegisterVue
        }
    }

</script>

<template>
    <div class="border-b w-full border-green-500 text-dark dark:text-light">
        <LoginVue 
            :logoSilang="logoSilang" 
            v-if="posisi === 'login'"
            @setPosisi="() => setPosisi('account')"
        />

        <RegisterVue 
            :logoSilang="logoSilang" 
            v-else-if="posisi === 'register'" 
            @setPosisi="() => setPosisi('account')"
        />
            
        <div class="containerAccount" v-else>
            <div class="containerInputTodoAccount w-[40%] hidden sm:block mx-auto">
                <slot></slot>
            </div>
            
            <div class="Account">
                <img 
                    class="gambarProfile" 
                    src="../../asset/gambarProfile.png"
                    alt="my profile"
                >
                
                <div class="identitas">
                    <input type="text" 
                        class="font-[INTER] namaProfile bg-inherit border-none border-red-500 outline-none "
                        v-model="namaLengkap"
                        :readonly="!isUbah"
                        :class="isUbah ? 'inputActive' : ''"
                        :placeholder="isUbah ? 'your fullname...' : ''"
                    />   
                    <input type="text" 
                        class=" bioProfile w-full  bg-inherit border-none py-[.1vh] border-red-500 outline-none text-center text-slate-400 dark:text-slate-100"
                        v-model="bio"
                        :readonly="!isUbah"
                        :class="isUbah ? 'inputActive' : ''"
                        :placeholder="isUbah ? 'your bio...' : ''"
                    />
                    <div class="tombol w-full">
                        <div class="login" v-if="isLogin">
                            <button 
                                class="font-[POPPINS] tombolLogin text-light dark:text-dark mt-4 mb-2 "
                                :class="isUbah ? 'bg-green-500  ' : 'bg-dark dark:bg-light'"
                                @click="setIsUbah"

                            >
                                {{(isUbah) ? "Save Profile" : "Ubah Profilemu"}}
                                
                            </button>
                            <button 
                                v-if="!isUbah"
                                class="tombolLogin bg-green-500 font-[POPPINS] dark:font-bold dark:text-dark text-light"
                                @click="handleLogout"
                                >  
                                Logout
                            </button>
                        </div>
                        
                        
                        <div 
                            v-if="!isLogin" 
                            class="noLogin"
                        >
                            <button 
                                class="daftar font-[POPPINS] bg-dark dark:bg-light dark:text-black text-light"
                                @click="() => setPosisi('register')"                                
                            >
                                Daftar Baru
                            </button>
                            <button 
                                class="login font-[POPPINS] bg-green-500 text-light dark:text-dark "
                                @click="() => setPosisi('login')" 
                            >
                                Login
                            </button>
                        </div>
                        
                    </div>       

                </div>
            </div>
        </div>
        
    </div>
    

</template>
