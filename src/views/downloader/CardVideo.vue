<script setup>
    import { ref } from 'vue';
    import axios from 'axios';

    

</script>

<template>
    <div class="cardVideo">
        <iframe :src="urlYoutube" frameborder="0" allowfullscreen class="w-4/5 sm:w-3/5 mx-auto h-[40vh] border dark:border-light border-dark">
        </iframe>

    </div>
</template>