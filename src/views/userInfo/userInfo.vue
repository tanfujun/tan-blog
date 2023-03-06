<template>
    <div class="container">
    <div class="header">
        <img src="@/assets/icon/setting.png" alt="" srcset="">
        <span>账号设置</span>
    </div>
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>个人资料</span>
        <!-- <el-button class="button" text>Operation button</el-button> -->
      </div>
    </template>
    <div class="InfoContainer">
        <div class="avatar">
            <div class="elavatar" style="margin-bottom: 20px;">
                <el-avatar :size="80" :src="imageUrl?imageUrl:circleUrl" fit="contain" />
            </div>
            <el-upload
                class="avatar-uploader"
                action="http://47.106.39.120:3000/upload/image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
            <el-button type="primary" size="small">点击更换头像</el-button>
             </el-upload>
        </div>
        <div class="Info">
            <el-form
    label-position="top"
    label-width="100px"
    :model="userInfo"
    style="max-width: 800px;width: 500px;"
  >
  <el-form-item label="账号">

  <el-input v-model="user.userInfo.user_name" disabled placeholder="" />
  </el-form-item>
    <el-form-item label="昵称">

      <el-input v-model="userInfo.user_nickname" placeholder="输入你的昵称" />
    </el-form-item>
    <el-form-item label="个人简介">
      <el-input v-model="userInfo.user_description" placeholder="一句话介绍，让他人快速了解" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userInfo.user_email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="年龄">
        <el-input-number v-model="userInfo.user_age" :min="1" :max="100" />
    </el-form-item>
    
  </el-form>
    <div class="save">
        <el-button type="primary" style="width: 200px;" size="large" @click="updateUserInfo" >保存</el-button>
    </div>
        </div>
    </div>
  </el-card>
  <!-- <div style="height: 100px;"></div> -->
    </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue';
import { ElCard,ElAvatar,ElUpload,ElButton,ElMessage,ElIcon,ElForm,ElFormItem,ElInput,ElInputNumber } from 'element-plus';
import { Plus } from '@element-plus/icons-vue'
import {useUser} from '@/pinia/user'
import type { UploadProps } from 'element-plus'
import { userApi } from '@/api';
const user = useUser()

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
    const {data} = response
    imageUrl.value = data.path
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const userInfo = reactive({
  user_nickname: '',
  user_description: '',
  user_email: '',
  user_age:1
})

onMounted(()=>{
    const {user_nickname,user_description,user_email,user_age,user_profile_photo} = user.userInfo
    userInfo.user_nickname = user_nickname
    userInfo.user_description = user_description
    userInfo.user_email = user_email
    userInfo.user_age = user_age
    imageUrl.value = user_profile_photo
})

async function updateUserInfo(){
        if(!userInfo.user_nickname){
            ElMessage.error('用户昵称不能为空！')
            return
        }
        const newUser = {user_profile_photo:imageUrl.value,...userInfo}
        const res = await userApi.updateUser(newUser)
        console.log(res);
        ElMessage.success('保存成功！')
        user.getUserInfo()
        

}

</script>

<style scoped lang="scss">
    .container{
        // background-color: #eee;
        width: 1100px;
        margin: 0 auto;
        padding-top: 60px;
        // margin-top: auto;
        .header{
            display: flex;
            align-items: center;
            font-size: 28px;
            font-weight: bold;
            font-family: '黑体';
            margin-bottom: 20px;
            img{
                width: 40px;
                height: 40px;
                margin-right: 10px;
            }
        }
        .card-header{
            display: flex;
            font-size: 16px;
        }

        .InfoContainer{
            display: flex;
            width: 100%;
            justify-content: space-between;
            .avatar{
                width: 300px;
                // flex: 1;
                display: flex;
                flex-direction: column;
                align-items:center ;
            }
            .Info{
               width: 800px;
                display: flex;
                flex-direction: column;
                .save{
                    width:200px;
                    display: flex;
                }
            }
        }
    }
</style>