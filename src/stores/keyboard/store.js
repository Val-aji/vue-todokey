import { defineStore } from 'pinia';
import { bankKata } from './listKata';

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
        deleteData(id) {
            const newData = this.dataHistori.filter(item => item.id != id)

            this.currentDataHistori = newData
        },
        setDataHistori(res) {
            this.idTerakhir++
            this.currentDataHistori = [...this.dataHistori, res] 
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