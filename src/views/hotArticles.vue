<template>
    <div class="hot-articles" :style="{ height: height + 'px', width: width + 'px' }">
      <h2 class="hot-articles__title">热门文章</h2>
      <ul class="hot-articles__list">
        <li v-for="(article, index) in articles" :key="article.article_id" @click="gotoDetail(article.article_id)" class="hot-articles__item">
          <span class="hot-articles__rank">{{ index + 1 }}</span>
          <a :href="article.link" class="hot-articles__link">{{ article.article_title }}</a>
          <span class="hot-articles__views">{{ article.article_views }} 阅读</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref } from 'vue';
  import { ElLink } from 'element-plus';
import router from '@/router';
  
  interface Article {
    id: number;
    title: string;
    link: string;
    views: number;
  }
  
  const props = defineProps({
    articles: {
      type: Array as any,
      default: () => [],
    },
    height: {
      type: Number,
      default: 350,
    },
    width: {
      type: Number,
      default: 350,
    },
  });
  
  const HotArticles = {
    name: 'HotArticles',
    components: {
      ElLink,
    },
    props,
  };
  
function gotoDetail(article_id:string){
  router.push(`/article/detail?article_id=${article_id}`)
}

  </script>
  
  <style lang="scss">
  .hot-articles {
    // margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    overflow: hidden;
  
    &__title {
      font-size: 20px;
      font-weight: bold;
      padding: 16px;
      margin: 0;
      border-bottom: 1px solid #eee;
      width: 100%;
      box-sizing: border-box;
    }
  
    &__list {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      overflow: auto;
    }
  
    &__item {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 16px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      transition: background-color 0.2s;
  
      &:hover {
        background-color: #f7f7f7;
      }
    }
  
    &__rank {
      font-size: 16px;
      font-weight: bold;
      color: #999;
      margin-right: 16px;
    }
  
    &__link {
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  
    &__views {
      font-size: 14px;
      color: #999;
      margin-left: 16px;
    }
  }
  </style>
  