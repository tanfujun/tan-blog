<template>
  <div class="home">
      <div class="headerImage">
        <img :src="detail.article_image" alt="" srcset="">
      </div>
      <div class="title">
        <span>{{ detail.article_title }}</span>
      </div>
      <div class="userInfo">
          <div class="Info">
            <el-avatar style="cursor: pointer;" @click="router.push(`/user/myArticle?user_id=${detail.user_id}`)" :size="50" :src="detail.user_profile_photo" />
            <div class="text">
              <span>{{ detail.user_nickname }}</span>
              <span class="description">{{ detail.user_description }}</span>
            </div>
            
          </div>
          <div class="time">{{ getTime(detail.article_date) }}</div>
      </div>
      <mavon-editor 
      style="z-index: 100;"                                
 		  v-model="html"                                     
 		  :subfield="false"                                    
 		  :boxShadow="false"                                    
 		  defaultOpen="preview"                                    
 		  :toolbarsFlag="false"                                   
 	    />  
       <!-- <Comment :initialComments="comments" /> -->
    
  </div>
</template>

<script setup lang="ts" >
import { ref,reactive,onMounted,nextTick } from 'vue';
import {userApi,articleApi} from '@/api/index'
import router from '@/router';
import { ElMessage,ElAvatar,ElDivider } from 'element-plus';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import Comment from './Comment.vue';
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
function getTime(time:Date){
        return dayjs(time).fromNow()
}
let html = ref('')
console.log('123',router.currentRoute.value.query.article_id);

const comments = [
  {
    id: 1,
    username: "小明",
    content: "这篇文章写得非常好，受益匪浅！",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    time: "2022-03-05 09:00"
  },
  {
    id: 2,
    username: "小红",
    content: "非常感谢作者分享这么有价值的内容。",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    time: "2022-03-05 09:15"
  },
  {
    id: 3,
    username: "张三",
    content: "这是我看过的最好的一篇文章，写得真的很好。",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    time: "2022-03-05 10:30"
  },
  {
    id: 4,
    username: "李四",
    content: "非常棒的一篇文章，我学到了很多。",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    time: "2022-03-05 11:00"
  },
  {
    id: 5,
    username: "王五",
    content: "作者真的是个很厉害的人，感谢分享。",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    time: "2022-03-05 12:00"
  }
];


const article_id = router.currentRoute.value.query.article_id
const detail:any = reactive({})

async function getDetail() {
  try {
      const res = await articleApi.getDetailByArcticleId(article_id as string)
      const {data} = res.data
      console.log(res);
      html.value = data[0].article_content
      Object.assign(detail,data[0])
  } catch (error) {
      ElMessage.error(error as string)
  }
      
}
 onMounted(async ()=>{
  await articleApi.addArticleViews(article_id as string)
  getDetail()
 })

</script>


<style scoped lang="scss">

  .home{
    width: 800px;
    margin: 0 auto;
    background-color: #fff;
    .headerImage{
      padding-top: 20px;
      background-color: #fff;
      display: flex;
      img{
        width: 100%;
        height: 200px;
        object-fit: contain;
      }
    }
    
    .title{
        background-color: #fff;
        display: flex;
        font-size: 33px;
        padding-left: 40px;
        padding-top: 40px;
        text-align: left;
    }
    .userInfo{
      background-color: #fff;
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-bottom: 60px;
      padding-left: 40px;
      height: 80px;
      padding-right: 40px;
      border-top: 1px solid #eee;
      justify-content: space-between;
      .Info{
        display: flex;
        align-items: center;
        .text{
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .description{
            font-size: 13px;
          }
        }
        span{
          font-family: '黑体';
          margin-left: 10px;
          margin-top: 5px;
          font-size: 16px;
          // font-weight: bold;
        }
      }
      .time{
        span{
          font-family: '黑体';
          margin-left: 10px;
          font-size: 16px;
          font-weight:800;
        }
      }
    }
    font-family:'PingFang SC';
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }

</style>
