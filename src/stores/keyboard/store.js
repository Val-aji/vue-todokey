import { defineStore } from 'pinia';
import { bankKata } from './listKata';
import { useStoreAccount } from '../storeAccount';
import { storeToRefs } from 'pinia';


export const useStoreKeyboard = defineStore("storeKeyboard", {
    state: () => ({
        counter: 0,
        navbarHP: [
            {id: 0, name: "home", status: true},
            {id: 1, name: "history", status: false}
        ],
        isActive: false,
        listKata: [],
        posisiIndex: 0,
        kataBenar: 0,
        kataSalah: 0,
        currentDataHistori: [],
        idTerakhir: 0
    }),
    getters: {
        dataHistori(state) {
            return state.currentDataHistori.reverse()
        },
        hasilTes(state) {
            const {kataBenar, kataSalah} = state
            const jumlah = kataBenar + kataSalah

            const akurasi = jumlah === 0 ? 0 : (kataBenar / (jumlah * 0.1) * 10).toString().substring(0, 4) + "%"
            
            const result = {

                id: this.idTerakhir + 1,
                tanggal: new Date().toLocaleString("ID-id", {timeZone: "Asia/Jakarta"}),
                data: [
                    {judul: "Kata Permenit", value: jumlah},
                    {judul: "Kata yang benar", value: kataBenar},
                    {judul: "Kata Salah", value: kataSalah},
                    {judul: "Akurasi", value: akurasi},
                ]
            }
            return result
        },
        posisi(state) {
            const currentPosisi = state.navbarHP.filter(i => i.status)[0]
            // if(currentPosisi.name === "home") {
            //     return false
            // } else {
            //     return true
            // }
            return currentPosisi.name
        }
    },
    actions: {
        async getDataKeyboard() {
            const storeAccount = useStoreAccount()
            const {getIsLogin, formData, instance} = storeToRefs(storeAccount);

            await storeAccount.cekLogin()
        
            if(!getIsLogin.value) {
                this.currentDataHistori = []
                return false
            }
            
            
            try {
                const result = await instance.value.post("/keyboard/getData", formData.value)
                const {data} = result.data
                const dataDB = data.map((res) => {
                    const parsingData = JSON.parse(res.data)
                    const obj = {
                        id: res.id,
                        tanggal: res.tanggal,
                        data: parsingData
                    }

                    this.currentDataHistori.push(obj)
                })
                
                
                return true
            } catch (error) {
                console.log({error})
                if(error.response.status === 401) return "error"
                
            }


        },
        async deleteData(id) {
            if(!id || typeof id != "number") return false

            const {isLogin, instance, formData, usernameStore} = storeToRefs(useStoreAccount())

            const newData = this.dataHistori.filter(item => item.id != id)

            if(isLogin.value) {
                try {
                    
                    formData.value.append("id", id)
                    const result = await instance .value.post("/keyboard/deleteData", formData.value)
                    
                    console.log({result})
                    formData.value.delete("id")
                } catch (error) {
                    console.log({error})
    
                    return false
                }    
            }

            this.currentDataHistori = [...newData]
        },
        async setDataHistori(res) {
            
            const {isLogin, instance, formData, usernameStore} = storeToRefs(useStoreAccount())
            
            this.idTerakhir++
            const obj = {
                ...res,
                username: isLogin.value ? usernameStore.value: "Guest"
            }
            
            if(isLogin.value) {
                formData.value.append("tanggal", res.tanggal)
                formData.value.append("data", JSON.stringify(res.data))

                if(!instance.value || !formData) return false

                try {
                    const result = await instance.value.post("keyboard/insert", formData.value)
                    
                    if(result.data.status == 201) {
                        formData.value.set("tanggal", "")
                        formData.value.set("data", "")
                        console.log("tambah data berhasil")
                    }    
                } catch (error) {
                    console.log({error})
                }
            }
            this.currentDataHistori.push(obj)

        },
        setCounter(res) {
            this.counter = res
        },
        resetValue() {
            this.counter = 0;
            this.posisiIndex = 0;
            this.kataBenar = 0;
            this.kataSalah = 0;
        },
        setIsActive(res) {
            this.isActive = res
        },
        handleInput(res) {
            if(this.counter === 0) {
                this.resetValue()
            }
            this.counter++
            
            const {listKata, posisiIndex} = this
            const kondisi = listKata[posisiIndex].text.trim() === res.trim()
            
            if(kondisi) {
                this.listKata[posisiIndex].status = true
                this.kataBenar++;
            } else {
                this.kataSalah++;
                this.listKata[posisiIndex].status = false
            }

            this.posisiIndex++
            if(this.posisiIndex >= 6) {
                this.posisiIndex = 0
                this.generateKata()
            }
        },
        generateKata() {
            const random = Math.floor(Math.random() * 113)
            const random2 = Math.floor(Math.random() * 50)
            const listRandom = [
                random, random * 2 - 2, random + random2, random - random2 + 5, random2, random2 + random + 14, 
            ]

            const result = listRandom.map(item => {
                const {length} = bankKata

                if(item > length) {
                    item -= length
                } else if(item < 0) {
                    item *= -1
                }

                return {text: bankKata[item], status: 'default'}
            })

            this.listKata = result
        },
        setStatus(id) {
            this.navbarHP.map(item => {
                if(item.id == id) {
                    item.status = true
                } else {
                    item.status = false
                }
            })
        }
    }
})