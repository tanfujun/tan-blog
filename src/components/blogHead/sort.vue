<template>
    <div class="sort-container" @mouseover="change" @mouseleave="backChange">
        <img :src="src" />
        <span>{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
import {defineProps,ref,onMounted} from 'vue'
const props = defineProps<{
  icon: string,
  title: string,
  hoverIcon:string
}>()

const src = ref('')

onMounted(()=>{
    src.value = props.icon
})

function change(){
    src.value = props.hoverIcon
}

function backChange(){
    src.value = props.icon
}


</script>

<style scoped lang="scss">
    .sort-container{
        display: flex;
        align-items: center;
        cursor: pointer;
        img{
            width: 20px;
            height: 20px;
        }
        span{
            margin-left: 5px;
            color: #655E5E;
            font-weight: bold;
            font-size: 15px;
        }
        
    }
    .sort-container:hover{
        span{
            color: #292525;
        }
    }
</style>