import { defineStore } from 'pinia';

export const useStoreDownloader = defineStore("storeDownloader", {
    state: () => ({
        navbarHP: [
            {id: 0, name: "home", status: true},
            {id: 1, name: "favorite", status: false},
            {id: 2, name: "history", status: false}
        ]
    }),
    getters: {
        posisi(state) {
            const currentPosisi = state.navbarHP.filter(i => i.status)[0]
            if(currentPosisi.name === "home") {
                return false
            } else {
                return true
            }
        },
    },
    actions: {
        setStatus(id) {
            this.navbarHP.map(item => {
                if(item.id === id) {
                    item.status = true
                } else {
                    item.status = false
                }
            })
            
        }
    }
})


