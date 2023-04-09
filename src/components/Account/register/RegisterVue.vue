<script>
    import "./index.css";
    import {useStoreAccount} from "../../../stores/storeAccount.js"
    import axios from "axios"

    export default {
        name: "RegisterVue",
        data() {
            return {
                isError: false,
                pesanError: "",
                namaLengkap: "",
                username: "",
                password: "",
                
            }
        },
        props: {
            logoSilang: {
                type: String,
                required: true,
            }
        },
        emits: ["setPosisi"],
        setup() {
            const linkAPI = useStoreAccount().linkAPI

            return { linkAPI }
        },

        methods: {
            setError(pesan) {
                this.isError = true
                this.pesanError = pesan
            },
            async handleRegister() {
                const {username, password, linkAPI, namaLengkap} = this

                if(username.length < 3 || username.length > 30) {
                    this.setError("Karakter Username minimal 3 dan maksimal 30")
                    
                    return false
                } else if(password.length < 5) {
                    this.setError("Password minimal 5 karakter sampai 255 karakter")

                    return false
                } else if(namaLengkap.length < 3 || namaLengkap.length > 50) {
                    this.setError("Nama Lengkap minimal 3 karakter sampai 50 Karakter")

                    return false
                } else {
                    this.error = false

                    try {
                        const formData = this.$refs.formData

                        await axios.post(linkAPI+"client/register", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        })
                        alert("Registrasi Berhasil")

                        location.reload()
                    } catch (error) {
                        const {status} = error.response.data 
                        if(status === 409) {
                            this.setError("Username telah digunakan!")

                            return false
                        } else {
                            this.setError("Register gagal! silahkan coba lagi")
                            console.log({error})

                            return false
                        }        
                    }          
                }                
            }
        }
    }
</script>

<template>
    <div class="containerRegister">
        <div class="register">
            <button 
                class="tombolHapus absolute right-0 top-0" 
                v-html="logoSilang"
                @click="$emit('setPosisi')"
            >
            </button>

            <p class="judulRegister font-[ROBOTO]">Register</p>

            <p 
                v-if="isError" 
                class="font-[POPPINS] mb-[3vh] text-red-500 text-sm mx-auto"
            >
                {{ pesanError }}
            </p>
            <form 
                method="POST" 
                @submit.prevent="handleRegister"
                ref="formData"
            >
                <div class="containerInput">
                    <p class="judulInput font-[POPPINS]">Nama Lengkap</p>
                    <input 
                        class="font-[INTER]" 
                        type="text" 
                        required autocomplete 
                        v-model.trim="namaLengkap" 
                        name="namaLengkap"
                    />
                </div>
                <div class="containerInput">
                    <p class="judulInput font-[POPPINS]" >Username</p>
                    <input 
                        class="font-[INTER]"  
                        type="text" 
                        v-model.trim="username" 
                        required 
                        autocomplete
                        name="username"
                    />
                </div>
                <div class="containerInput">
                    <p class="judulInput font-[POPPINS]">Password</p>
                    <input 
                        class="font-[INTER]"  
                        type="password" 
                        required 
                        autocomplete 
                        v-model.trim="password"
                        name="password"
                    />
                </div>
                <button 
                    type="submit" 
                    class="font-[ROBOTO]"
                    ref="tombolSubmit"
                >
                    Registrasi
                </button>
            </form>
            
        </div>
    </div>
</template>