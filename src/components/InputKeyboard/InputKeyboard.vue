<script setup>
    import { defineEmits, onMounted, ref } from 'vue';
    
    const emit = defineEmits(["handleInput", "setIsActive"])
    const inputUser = ref("")
    
    function handleInput() {
        const {value} = inputUser
        emit('setIsActive', true)
        if(value.match(/\s+/)) {
            emit("handleInput", value);
            inputUser.value = ""
        }
    }    
</script>   

<template>
    <div class="inputKey">
        <div class="w-4/6 mx-auto">
            <input type="text" class="bg-[#333] font-[POPPINS] text-sm text-white border-2 outline-green-500 px-[3vw] py-[1vh] rounded-full w-full border-blue-500" placeholder="Tes Kecepetan Ngetikmu!" @input="handleInput" 
            v-model="inputUser"
            />
        </div>
        
    </div>
</template>

