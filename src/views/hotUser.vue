<template>
    <el-card class="hot-user">
      <div class="hot-user__title">
        <span>热门用户</span>
        <el-link type="primary" class="hot-user__link" href="#">更多</el-link>
      </div>
      <div class="hot-user__content">
        <el-row>
          <el-col v-for="user in userList.data" :key="user.id" :span="8">
            <el-avatar style="cursor: pointer;" :size="60" @click="router.push(`/user/myArticle?user_id=${user.id}`)" :src="user.user_profile_photo"></el-avatar>
            <div class="hot-user__name">{{ user.user_nickname }}</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { ref,reactive,onMounted } from 'vue';
  import { ElAvatar, ElCard, ElCol, ElLink, ElRow } from 'element-plus';
  import { userApi } from '@/api';
  import router from '@/router';
  const userList = reactive({data:[] as any})
  
  const hotUsers = ref([
    { id: 1, name: '张三', avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: 2, name: '李四', avatarUrl: 'https://randomuser.me/api/portraits/women/11.jpg' },
    { id: 3, name: '王五', avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg' },
    { id: 4, name: '赵六', avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: 5, name: '孙七', avatarUrl: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { id: 6, name: '周八', avatarUrl: 'https://randomuser.me/api/portraits/women/13.jpg' }
  ]);

  async function getUserList(){
    const res = await userApi.getUserOrderByUserWeight()
    const {data} = res.data
    userList.data = data
    console.log(userList.data);
    
  }

  onMounted(async ()=>{
   await getUserList()
  })

  </script>
  
  <style scoped lang="scss">
  .hot-user {
    margin-top: 50px;
    width: 350px;
    height: 350px;
    background-color: #fff;
  
    &__title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
    }
  
    &__link {
      font-size: 14px;
    }
  
    &__content {
      padding: 0 20px;
      box-sizing: border-box;
      overflow: hidden;
  
      // 消除滚动条
      // &::-webkit-scrollbar {
      //   display: none;
      // }
    }
  
    &__name {
      margin-top: 10px;
      font-size: 16px;
      text-align: center;
      font-weight: bold;
    }
  }
  </style>
  