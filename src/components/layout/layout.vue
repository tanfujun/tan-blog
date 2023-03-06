<template>
    <div class="all-container">
    <BlogHead></BlogHead>
    
    <div class="context">
    <router-view></router-view>
    </div>
    <blogFoot></blogFoot>
    <el-backtop :right="50" :bottom="50" />
   <!-- <el-affix :offset="120">
    
    </el-affix> -->
    <div class="edit">
        <el-button type="primary" size="large" @click="gotoEdit" :icon="Edit" circle/>
    </div>
   
    </div>
</template>

<script setup lang="ts">
import {ElBacktop,ElAffix,ElButton} from 'element-plus'
import BlogHead from '../blogHead/blogHead.vue';
import blogFoot from '../blogFoot/blogFoot.vue';
import carousel from '../carousel.vue';
import { Edit } from '@element-plus/icons-vue';
import router from '@/router';

function gotoEdit(){
    router.push('/article/edit')
}


</script>

<style scoped lang="scss">
    .context{
        padding-bottom: 100px;
        background-color: rgb(244,244,244);
        
    }
    .all-container{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: rgb(244,244,244);
    }
    .edit{
        width: 40px;
        height: 40px;
        position: fixed;
        bottom: 100px;
        right: 50px;
        z-index: 101;
    }
</style>