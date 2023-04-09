<script>
    import "./index.css";
    import { useStoreAccount } from "../../../stores/storeAccount.js";
    import axios from "axios"
    import Cookies from "js-cookie";

    export default {
        name: "LoginVue",
        data() {
            return {
                username: "",
                password: "",
            }
        },
        props: {
            logoSilang: {
                type: String,
                required: true
            }
        },
        emits: ["setPosisi"],
        methods: {
            async handleLogin() {
                const linkAPI = useStoreAccount().linkAPI
                const formData = new FormData(this.$refs.formData)
                
                try {
                    const result = await axios.post(linkAPI+"client/login", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    if(result.data.status === 200) {
                        const storeAccount = useStoreAccount()
                        storeAccount.setIsLogin(true)

                        const {username, token} = result.data.data
                        Cookies.set("username", username)
                        Cookies.set("token", token)

                        
                        alert("Login berhasil")
                        location.reload()
                    } else {
                        alert("Login gagal!")
                    }
                } catch (error) {
                    const {status} = error.response.data
                    
                    if(status === 404) {
                        alert("Username tidak ditemukan!")

                        return false
                    } else if(status === 401) {
                        alert("Password Salah!")

                        return false
                    } else {
                        console.log({error})
                        alert("Login gagal")
                        
                        return false
                    }
                }
            }
        }
    }
        

</script>

<template>
    <div class="loginTodo">
        <form 
            method="POST" 
            @submit.prevent="handleLogin"
            ref="formData"
        >
            <button 
                type="button" 
                class="logoSilang" v-html="logoSilang"
                @click="$emit('setPosisi')"
            >
            </button>

            <p class="judulFormLogin font-[ROBOTO]">Login</p>

            <div class="containerInput">
                <p class="judulInput font-[POPPINS]">username</p>
                <input type="text" 
                    v-model.trim="username" 
                    name="username" 
                    class="font-[INTER]"
                    required
                    autocomplete
                />
            </div>

            <div class="containerInput">
                <p class="judulInput font-[POPPINS]">Password</p>
                <input 
                    type="password" 
                    required 
                    class="font-[INTER]"
                    autocomplete 
                    v-model.trim="password" 
                    name="password"
                />
            </div>

            <button type="submit" class="tombolSubmit ROBOTO font-bold" >Login</button>
        </form>
    </div>
</template>