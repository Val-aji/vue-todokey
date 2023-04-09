<script>
    export default {
        name:"NavbarHP",
        props: {
            listNavbar: {
                type: Object,
                required: false,
                default: []
            },
            posisi: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        emits: ["setStatus"],
        beforeMount() {
            this.navbarHP = this.listNavbar
        },
    }
</script>

<template>
    <div class="block sm:hidden " >
        
        <div class="navbarHP w-full">
            <div class="containerNavbarHP flex w-full justify-center mt-[1vh]">
                <button 
                    v-for="item in navbarHP"
                    :key="item.id"
                    class="text-dark dark:text-light   w-1/2 py-[1vh] pb-[2vh] border-dark dark:border-light "
                    :class="item.status ? 'border-b' : ''"
                    @click="() => {
                        $emit('setStatus', item.id)
                    }"
                >
                    {{ item.name }}
                </button>
                
            </div>
        </div>

        
        <!-- diisi  parent -->
        <slot v-if="!posisi"></slot>
        
    </div>
    

</template>
