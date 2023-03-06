<template>
    <div class="home">
        <div class="carousel">
            <carousel></carousel>
        </div>  
        <div class="context">
            <div class="tabs">
    <el-tabs v-model="Article.activeName" class="demo-tabs"  @tab-change="handleChange">
    <!-- <el-tab-pane label="推荐" name="first">
        <Card v-for="item in Article.articleList" 
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

    </el-tab-pane> -->
    <el-tab-pane label="最新发布" name="second">
        <Card v-for="item in Article.articleList" 
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
        ></Card></el-tab-pane>
    <el-tab-pane label="浏览量最多" name="third">
        <Card v-for="item in Article.articleList" 
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
    </el-tab-pane>
    </el-tabs>
    <el-empty v-if="!Article.articleList.length" description="暂无文章" />
        </div>
        
        <div class="hot">
            <hotArticles :articles="hotArticleList.data"></hotArticles>
        <hotUser :users="[{id:'123',avatar:'http://47.106.39.120:3000/uploads/8310e300f15722575c110c204.png',name:'tantantan'},{id:'123',avatar:'http://47.106.39.120:3000/uploads/8310e300f15722575c110c204.png',name:'tantantan'},{id:'123',avatar:'http://47.106.39.120:3000/uploads/8310e300f15722575c110c204.png',name:'tantantan'},]"></hotUser>
        </div>
        
        </div>
        
        <div class="pagination">
            <el-pagination style="width: 1200px;" :page-size="3" hide-on-single-page v-model:current-page="currentPage" @current-change="getArticle" background layout="prev, pager, next" :total="Article.total" />
        </div>
        
        <Login></Login>
        <Register></Register>
    </div>
</template>

<script setup lang="ts">
import { reactive ,ref,onMounted,computed} from 'vue';
import carousel from '@/components/carousel.vue';
import HomeHeader from './hotArticles.vue';
import Login from './Login.vue';
import Register from './Register.vue';
import {ElTabs,ElTabPane,ElCard,ElPagination,ElEmpty} from 'element-plus'
import type { TabsPaneContext,TabPaneName } from 'element-plus'
import { useArticle } from '@/pinia/article';
import hotArticles from '@/views/hotArticles.vue'
import hotUser from './hotUser.vue';
import router from '@/router';
import { articleApi } from '@/api';
const activeName = ref('first')
const currentPage = ref(1)
const Article = useArticle()
const articleList = reactive({data:[] as any})
const hotArticleList = reactive({data:[] as any})

onMounted(async ()=>{
    await Article.getAllSort()
    const res = await Article.getAllArticle({dateDesc:true,offset:0,limit:3})
    articleList.data = res
    Article.activeName = 'second'
    console.log(articleList);
    getHotArticles()
    
})

const offset = computed(()=>{
    return (currentPage.value-1)*3
})

async function getHotArticles(){
    const res = await articleApi.getAllArcticle({viewsDesc:true})
    const {data} = res.data
    hotArticleList.data = data
    console.log(hotArticleList.data);
    
}

function getArticle(value:number){
    // currentPage.value = value
    console.log(currentPage.value);
    
    Article.getAllArticle({viewsDesc:true,offset:offset.value,limit:3})
}

function gotoDetail(article_id:string){
    router.push(`/article/detail?article_id=${article_id}`)
}

const handleChange = async (name: TabPaneName) =>{
    console.log(Article.activeName);
    if(name == 'first'){
    const res = await Article.getAllArticle({viewsDesc:true,offset:offset.value})
  }
  if(name == 'second'){
    const res = await Article.getAllArticle({dateDesc:true,offset:offset.value,limit:3})
  }
  if(name == 'third'){
    const res = await Article.getAllArticle({viewsDesc:true,offset:offset.value,limit:3})
  }
    
}



// const handleClick = async (tab: TabsPaneContext, event: Event) => {
//   console.log(tab.index)
//   if(tab.index == '0'){
//     const res = await Article.getAllArticle({viewsDesc:true,offset:0})
//     articleList.data = res
//   }
//   if(tab.index == '1'){
//     const res = await Article.getAllArticle({dateDesc:true,offset:0})
//     articleList.data = res
//   }
//   if(tab.index == '2'){
//     const res = await Article.getAllArticle({viewsDesc:true,offset:0})
//     articleList.data = res
//   }
// }

</script>

<style scoped lang="scss">
.home{
    background-color: rgb(244, 244, 244);
    // position: relative;
    @media (min-width:1200px){
        .context{
        // height: 200px;
        width: 1250px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        .tabs{
            margin-top: 40px;
            width: 800px;
        }
        .hot{
            margin-top: 50px;
        }
    }
    }

    @media (max-width:1200px){
        .context{
        width: 100%;
        padding: 0 20px;
    }
    }
    .pagination{
        width: 1200px;
        margin: 0 auto;
        margin-top: 50px;
    }
}
</style>