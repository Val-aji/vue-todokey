<script>
  import {  RouterView } from 'vue-router'
  import "./index.css"
  import NavigasiRouter from "./components/NavigasiRouter/NavigasiRouter.vue"
  
  
  export default {
    name: "App",
    components: {
      NavigasiRouter
    },
    
  }
</script>

<template>
  <RouterView ref="componentUtama" />
  <NavigasiRouter  />
</template>

