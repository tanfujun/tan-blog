<template>
      <el-carousel height="400px">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" alt="" class="image">
      </el-carousel-item>
    </el-carousel>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ElCarouselItem,ElCarousel } from 'element-plus';
const images = reactive([
    'https://cdn.sspai.com/2023/2/22/article/27c2f9ab-ef48-23a6-b937-831fc1d0dce3.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!2880x620r/gravity/Center/crop/2880x620/interlace/1',
    'https://cdn.sspai.com/article/b38d2492-3873-d3a4-f25c-6c3585b43109.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!2880x620r/gravity/Center/crop/2880x620/interlace/1',
    'https://cdn.sspai.com/2023/2/13/article/a7fc3fd3-88fa-765d-78b5-34b0c91bfb5f.jpg?imageMogr2/auto-orient/quality/95/thumbnail/!2880x620r/gravity/Center/crop/2880x620/interlace/1'
])

</script>

<style scoped lang="scss">
.image{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
</style>