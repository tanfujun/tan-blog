<template>
  <router-view/>
</template>

<style lang="scss">

// @import 'scss-reset/_reset.scss';
@import '@/assets/reset.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html{
  height: 100%;
}


</style>
<script setup lang="ts">
import { onMounted,watch,ref } from 'vue';

// document.documentElement.style.fontSize = '5.208333vw'
// const res = document.documentElement.style.fontSize
// console.log(res);


</script>
