<template>
    <div class="container">
        <div class="userInfo">
            <el-card style="height: 206px;width: 100%;border-radius: 20px;" shadow="always">
            <div class="card-container">
                <div class="left">
                <el-avatar :size="150" :src="userInfo.user_profile_photo" />
            </div>
            <div class="right">
                <div class="username">
                    <span>{{userInfo.user_nickname}}</span>
                    <el-button type="primary" @click="router.push('/user/userInfo')" v-if="isAuthor" >编辑</el-button>
                </div>
                <div class="description">
                    <span>{{userInfo.user_description}}</span>
                </div>
                <el-divider />
            </div>
            </div>
            </el-card>
        </div>
        <div class="title">
            <img src="@/assets/icon/wenzhang.png" alt="" srcset="">
            <span>{{ isAuthor?'我的文章':'他的文章'}}</span>
        </div>
        <div class="context">
            <card v-for="item in Articledata.articleList" 
            :key="item.article_id"
            @click="router.push(`/article/detail?article_id=${item.article_id}`)"
            :image="item.article_image"
            :user_name="item.user_nickname"
            :user_profile_photo="item.user_profile_photo"
            :title="item.article_title"
            :views="item.article_views"
            :sort_name="item.sort_name"
            :time="item.article_date"
            :id="item.article_id"
            >
            </card>
        </div>
        <el-empty v-if="!Articledata.articleList.length" description="暂无文章" />
    </div>
</template>

<script setup lang="ts">
import{ref,reactive,onMounted,computed} from 'vue'
import { ElCard,ElAvatar,ElButton,ElDivider, ElMessage,ElEmpty } from 'element-plus';
import { articleApi,userApi } from '@/api';
import { useUser } from '@/pinia/user';
import router from '@/router';
const user = useUser()
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const {user_id} = router.currentRoute.value.query
const Articledata = reactive({articleList:[] as any})
const userInfo = reactive({} as any)

async function getArticles() {
        const res = await articleApi.getArticleById(user_id as string)
        const {data} = res.data
        Articledata.articleList = data
        console.log(Articledata.articleList);
        
}

async function getUserInfo() {
        const res = await userApi.getUserInfoByUserId(user_id as string)
        const {data} = res.data
        Object.assign(userInfo,data)
        console.log(userInfo);
}

const isAuthor = computed(()=>{
    return user.userInfo.id == user_id
})

onMounted(async ()=>{
    
    await getUserInfo()
    getArticles()
    
})


</script>

<style scoped lang="scss">

    .container{
        width: 1000px;
        margin: 0 auto;
        
        border-left: 1px solid #d1d0d0;
        border-right: 1px solid #d1d0d0;
        .userInfo{
            padding: 20px 20px;
            width: 100%;
            display: flex;

            .card-container{
                display: flex;
                .left{
                width: 180px;
            }
            .right{
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 20px;
                .username{
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 10px;
                    span{
                        font-size: 27px;

                    }
                }
                .description{
                    margin-top: 20px;
                    width: 100%;
                    display: flex;
                    span{

                    }
                }
            }
            }
            
        }
        
        .title{
            width: 100%;
            padding: 0 20px;
            display: flex;
            align-items: center;
            img{
                width: 50px;
                height: 50px;
                object-fit: contain;
            }
            span{
                font-size: 25px;
                font-weight: bold;
                margin-left: 10px;
            }

        }

        .context{
            width: 100%;
            // box-sizing: border-box;
            padding: 0 20px;
        }
    }

</style>