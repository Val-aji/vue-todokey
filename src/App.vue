<script>
  import {  RouterView } from 'vue-router'
  import "./index.css"
  import { useStoreAccount } from './stores/storeAccount';
  import NavigasiRouter from "./components/NavigasiRouter/NavigasiRouter.vue"
  
  export default {
    name: "App",
    setup() {
      const storeAccount = useStoreAccount()
      const {cekLogin} = storeAccount
      
      return {cekLogin}
    },
    beforeMount() {
      this.cekLogin()
    },
    components: {
      NavigasiRouter
    },
    methods: {
      handleEnd() {
        console.log("hei")
      }
    }
  }
</script>

<template>
  <RouterView ref="componentUtama" />
  <NavigasiRouter  />
</template>

