<template>
    <div class="container">
        <div class="result">
           <img src="@/assets/icon/搜索.png" alt="" srcset="">
            <span>搜索结果</span>
        </div>
        <ElDivider></ElDivider>
        <div class="user_container">
            <div class="title">
                <el-icon size="20"><User  /></el-icon>
                <span>相关用户</span>
            </div>
            <div class="user">
                <div class="avatar_container" style="cursor: pointer;" @click="router.push(`/user/myArticle?user_id=${item.id}`)" v-for="item in userList.data" :key="item.id">
                    <el-avatar :size="50" :src="item.user_profile_photo" />
                    <span>{{item.user_nickname}}</span>
                </div>
            </div>
            <div class="empty" v-if="!userList.data.length" style="width: 100%;">
                <ElEmpty description="用户搜索结果为空"></ElEmpty>
            </div>
            
        </div>
        <div class="article_container">
            <div class="title">
                <el-icon size="20"><DocumentCopy /></el-icon>
                <span>相关文章</span>
            </div>
            <div class="article">
                <Card v-for="item in articleList.data"  
                @click="gotoDetail(item.article_id)"
                :key="item.article_id" 
                :image="item.article_image"
                :user_name="item.user_nickname"
                :user_profile_photo="item.user_profile_photo"
                :title="item.article_title"
                :views="item.article_views"
                :sort_name="item.sort_name"
                :time="item.article_date"
                :id="item.article_id"
        ></Card>
            </div>
            <div class="empty" v-if="!articleList.data.length" style="width: 100%;">
                <ElEmpty  description="文章搜索结果为空"></ElEmpty>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted,watchEffect } from 'vue';
import { ElIcon,ElDivider,ElAvatar,ElEmpty } from 'element-plus';
import { User,Search,DocumentCopy } from '@element-plus/icons-vue';
import { articleApi } from '@/api';
import router from '@/router';

const articleList = reactive({data:[] as any})
const userList = reactive({data:[] as any})
const keyValue = ref('')

watchEffect(()=>{
    const key = router.currentRoute.value.params.key
    keyValue.value = key as string
    getArticleAndUser()
})

function gotoDetail(article_id:string){
    router.push(`/article/detail?article_id=${article_id}`)
}

async function getArticleAndUser(){
    
    const res = await articleApi.searchArticleAndUserByKey(keyValue.value)
    console.log(res);
    
    const {data} = res.data
    articleList.data = data.articleList
    userList.data = data.userList
    console.log(articleList,userList);
}

onMounted(()=>{
    getArticleAndUser()
})

</script>

<style scoped lang="scss">

.container{
        width: 1000px;
        margin: 0 auto;
        // margin-top: 50px;
        // height: 800px;
        // background-color: #fff;
        border-left: 1px solid #d1d0d0;
        border-right: 1px solid #d1d0d0;
        // padding: 0 20px ;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        
        .result{
            img{
                width: 30px;
                height: 30px;
                object-fit: contain;
            }
            span{
                font-size: 20px;
                font-weight: bold;
                color: #1296db;
                margin-left: 10px;
            }

            display: flex;
            align-items: center;
        }
        .user_container{
            // margin-top: 50px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .title{
                display: flex;
                align-items: center;
                span{
                    font-family: '黑体';
                    margin-left: 10px;
                    font-weight: bold;
                }
            }
            .user{
                margin-top: 40px;
                display: flex;
                flex-wrap: wrap;
                .avatar_container{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-left: 20px;
                    span{
                        margin-top: 5px;
                        max-width: 100px;
                        overflow:hidden;
                        font-size: 14px;
                        font-weight: bold;
                        font-family: '黑体';
                    }
                }
            }
        }

        .article_container{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 80px;
            width: 100%;
            .title{
                display: flex;
                align-items: center;
                span{
                    font-family: '黑体';
                    margin-left: 10px;
                    font-weight: bold;
                }
            }
            .article{
                width: 100%;
                margin-right: 20px;
                border: none;
            }
        }
}
</style>