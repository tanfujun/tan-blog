<template>
    <div class="container" ref="container">
            <div class="logo">
                <router-link to="/" >
                    <img src="@/assets/icon/logo.svg" alt="">
                    <span>Tan-Blog</span> 
                </router-link>
            </div>
            <div class="center">
                <el-dropdown>
                <sort :icon="require('@/assets/icon/book.png')" style="margin-right: 20px;" :hover-icon="require('@/assets/icon/book_hover.png')" title="笔记分享"></sort>
                    <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="Article.setCurrentSortId('')">全部</el-dropdown-item>
                    <el-dropdown-item v-for="item in Article.sort" :key="item.sort_id" @click="Article.setCurrentSortId(item.sort_id)">{{item.sort_name}}</el-dropdown-item>
                </el-dropdown-menu>
    </template>
  </el-dropdown>
                <!-- <sort :icon="require('@/assets/icon/book.png')" style="margin-right: 20px;" :hover-icon="require('@/assets/icon/book_hover.png')" title="笔记分享"></sort> -->
                <sort :icon="require('@/assets/icon/life.png')" @click="ElMessage.info('该模块正在开发中.....')" style="margin-right: 20px;" :hover-icon="require('@/assets/icon/life_hover.png')" title="生活栏目"></sort>
                <!-- <sort :icon="require('@/assets/icon/book.png')" :hover-icon="require('@/assets/icon/book_hover.png')" title="生活栏目"></sort> -->
            </div>
            <div class="user">
                <div class="search">
                    <el-input
                v-model="searchValue"
                class="w-50 m-2"
                @input="changeSearchValue"
                @keyup.enter="search"
                placeholder="搜索有关文章和用户"
                :prefix-icon="Search"
                />
                </div>
                <div class="avatar-container">
                <el-dropdown>
                    <el-avatar  size="default" fit="contain" :src="user.userInfo.user_profile_photo?user.userInfo.user_profile_photo:circleUrl" />
                <template #dropdown>
                <el-dropdown-menu>
                <el-dropdown-item :icon="Sunny" v-if="!user.isLogin" @click="user.openDialog('login')"><div class="el-dropdown-item">
                    <span>登录</span>
                </div></el-dropdown-item>
                <el-dropdown-item v-if="user.isLogin"><div class="el-dropdown-item">
                    <span>你好,{{user.userInfo.user_nickname}}</span>
                </div></el-dropdown-item>
                <el-dropdown-item :icon="Document" @click="router.push(`/user/myArticle?user_id=${user.userInfo.id}`)" v-if="user.isLogin"><div class="el-dropdown-item">
                    <span>我的文章</span>
                </div></el-dropdown-item>
                
                <el-dropdown-item :icon="User" @click="gotoInfo" v-if="user.isLogin" >
                        <div class="el-dropdown">
                    <span >账号设置</span>
                </div></el-dropdown-item>
                <el-dropdown-item :icon="SwitchButton" @click="logOut" v-if="user.isLogin"><div class="el-dropdown-item">
                    <span>退出登录</span>
                </div></el-dropdown-item>
                </el-dropdown-menu>
                </template>
                </el-dropdown>
            </div>
            </div>
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted,onBeforeUnmount } from 'vue'
import {ElAvatar,ElInput,ElDropdown,ElDropdownMenu,ElDropdownItem,ElMessage} from 'element-plus'
import sort from './sort.vue';
import router from '@/router';
import {useUser} from '@/pinia/user'
import {useArticle} from '@/pinia/article'
import { Search,User,Document,SwitchButton,Sunny } from '@element-plus/icons-vue'
const user = useUser()
const Article = useArticle()
//搜索
const searchValue = ref('')
const  circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

function handleScroll(){
    const scrollTop = window.scrollY
        if(scrollTop > 60){
            container.value.style.position = 'fixed'
            
        }
        if(scrollTop < 60){
            container.value.style.position = ''
        }
}

function changeSearchValue(value:string){
    searchValue.value = value
    console.log(searchValue.value);
    
}

function search(){
    if(searchValue.value==''){
        ElMessage.error('搜索内容不能为空！')
    }else{
        router.push(`/article/search/${searchValue.value}`)
        searchValue.value=''
    }
        
        
}

const container = ref<any>(null)
onMounted(()=>{
    window.addEventListener('scroll',handleScroll)
})

onBeforeUnmount(()=>{
    window.removeEventListener('scroll',handleScroll)
})


function logOut() {
    user.logOut()
    ElMessage.success('退出登录成功！')
}

function gotoInfo(){
    router.push('/user/userInfo')
}

</script>

<style scoped lang="scss">

@media (min-width:1200px) {
    .container{
    width: 100%;
    height: 60px;
    background-color: #fff;
    // position: fixed;
    z-index: 1000;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10%;
    border-bottom: 1px solid rgb(224, 224, 224);
    .logo{
        font-size:24px;
        font-weight: bold;
        color: black;
        a{
            display: flex;
            align-items: center;
        }
        
        img{
            width: 40px;
            height: 40px;
            margin-right: 5px;
        }
    }
    .center{
        flex:1;
        display: flex;
        justify-content: center;

    }
    .user{
        display: flex;
        align-items: center;
        .search{
            // margin-right: 50px;
        }
        .avatar-container{margin-left: 50px;}
        .avatar-container:hover{
            cursor: pointer;
            border: none;
        }
    }
}
    
}

@media (max-width:1200px) {
    .container{
    width: 100%;
    height: 60px;
    // background-color: #f2f;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    z-index: 9999;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid rgb(224, 224, 224);
    .logo{
        font-size:24px;
        font-weight: bold;
        color: black;
        a{
            display: flex;
            align-items: center;
        }
        
        img{
            width: 40px;
            height: 40px;
            margin-right: 5px;
        }
    }
    .center{
        display: none;

    }
    .user{
        display: flex;
        align-items: center;
        .search{
            // margin-right: 50px;
        }
        // font-size: 40px;
        .avatar-container{margin-left: 50px;}
        .avatar-container:hover{
            cursor: pointer;
            border: none;
        }
    }
}
    
}


</style>