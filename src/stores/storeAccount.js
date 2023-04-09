import { defineStore } from "pinia"
import Cookies from "js-cookie"
import axios from "axios"

export const useStoreAccount = defineStore("storeAccount", {
    state: () => ({
            linkAPI: "https://backend-vue-todolist.vercel.app/",
            // linkAPI: "http://localhost:3000/",
            posisi: "account",
            isUbah: false,
            isLogin: false,
            namaLengkap: "Guest",
            bio: "bot todolist",
            optionsAPI: {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            },
            usernameStore: Cookies.get("username"),
            tokenStore: Cookies.get("token")
    }),
    getters: {
        getIsLogin(state) {
            return state.isLogin
        },  
        instance(state) {
            return axios.create({
                baseURL: state.linkAPI,
                headers: state.optionsAPI
            })
        },
        formData(state) {
            const formData = new FormData();
            formData.append("username", state.usernameStore);

            return formData;
        }
    },
    actions: {
        setIsLogin(res) {
            this.isLogin = res
        },
        setPosisi(res) {
            this.posisi = res
        },
        async cekLogin() {
            const {usernameStore, tokenStore, linkAPI} = this

            if(!usernameStore || !tokenStore) {
                this.isLogin = false
                return false
            } else {
                try {
                    const formData = new FormData()
                    formData.append("username", usernameStore)
                    formData.append("token", tokenStore)

                    const result = await axios.post(linkAPI+"client/cekLogin", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    
                    const {namaLengkap, bio} = result.data.data
                    this.namaLengkap = namaLengkap
                    this.bio = bio ? bio : "Anonymous"
                    this.isLogin = true
                    
                    this.optionsAPI = {
                        ...this.optionsAPI.headers,
                        "Authorization": tokenStore
                    }
                } catch (error) {
                    this.isLogin = false
                    console.log({error})
                }
            }
        }
    }
    
})
