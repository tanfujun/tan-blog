<template>
      <!-- <v-md-editor v-model="text" height="600px"  left-toolbar="undo redo clear | emoji h bold italic strikethrough quote | ul ol table hr | link image code | save" @change="change"  ></v-md-editor> -->
      <div class="container">
        <div class="header">
          <div class="left">
            <img src="@/assets/icon/publish.png" alt="" srcset="">
          <span>发布文章</span>
          </div>
          
          <div class="publish">
            <el-button type="danger" style="width: 100px;" @click="publish">发布</el-button>
          </div>
        </div>
        <ElDivider></ElDivider>
        <div class="title">
          <span>文章标题：</span>
          <el-input style="width: 400px;" v-model="title" placeholder="输入文章标题" />
        </div>
        <ElDivider></ElDivider>
        <div class="selectContainer">
          
            <span>选择文章分类：</span>
            <el-select v-model="currentSort_id" class="m-2" placeholder="Select" size="large">
          <el-option
      v-for="item in Article.sort"
      :key="item.sort_id"
      :label="item.sort_name"
      :value="item.sort_id"
    />
        </el-select>
          
        </div>
        <ElDivider></ElDivider>
        <div class="headerImage">
          <span>选择文章头图：</span>
          <el-upload
                class="avatar-uploader"
                action="http://47.106.39.120:3000/upload/image"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
            >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
             </el-upload>
        </div>
        <div class="editor" >
          <mavon-editor  style="height: 700px;z-index: 100;" v-model="text" @change="change" ishljs/>
        </div>  
        
      </div>
      
</template>

<script setup lang="ts">
import {ElButton,ElSelect,ElOption, ElMessage,ElUpload,ElIcon,ElInput,ElDivider} from 'element-plus'
import { reactive,ref,watch,onMounted,watchEffect } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import {useArticle} from '@/pinia/article'
import { useUser } from '@/pinia/user';
import { articleApi } from '@/api';
import type { UploadProps } from 'element-plus'
import router from '@/router';
const Article = useArticle()
const user = useUser()
onMounted(()=>{
  Article.getAllSort()
})
//处理编辑器里的markdown文本数据
const text = ref('')
const htmlText = ref('')
const imageUrl = ref('')
const title = ref('')

Article.getAllSort()
function change(text:string,html:string){
    htmlText.value = html
}

const currentSort_id = ref('')

watchEffect(()=>{
  console.log(currentSort_id.value);
  
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
    const {data} = response
    imageUrl.value = data.path
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile.type);
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG or PNG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

function reset(){
    text.value = ''
    title.value = ''
    imageUrl.value = ''
    currentSort_id.value = ''
}

//发布
async function publish(){
  // markDown.updateHtml(htmlText.value)
  try {
    if(currentSort_id.value == ''){
    ElMessage.error('请选择文章分类！')
    return
  }else{
    if(title.value == ''){
      ElMessage.error('标题不能为空！')
    }else{
      if(imageUrl.value == ''){
        ElMessage.error('文章头图不能为空！');
        return
      }else{
        if(htmlText.value == ''){
      ElMessage.error('请输入内容！')
      return
    }else{
        const {id} = user.userInfo 
        const publishBody = {
          user_id:id,
          sort_id:currentSort_id.value,
          article_views:0,
          article_comment_count:0,
          article_like_count:0,
          article_title:title.value,
          article_image:imageUrl.value,
          article_content:htmlText.value
        }
        console.log(publishBody);
        
        const res = await articleApi.publishArticle(publishBody)
        const {data} = res.data
        if(res.data.code == 200){
            ElMessage.success('发布成功！')
            reset()
            setTimeout(()=>{
              router.push('/home')
            },500)


        }else{
          ElMessage.error('发布失败！')
        }
        
    }
      }
      
    }
    
  }
  } catch (error) {
      ElMessage.error('发布失败！')
  }
  
}

</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 680px;
  height: 178px;
  text-align: center;
  background-color: #fff;
}
</style>

<style scoped lang="scss">
.container{
  width: 1200px;
  margin: 0 auto;

  .avatar-uploader .avatar {
  width: 680px;
  background-color: #fff;
  height: 178px;
  display: block;
  object-fit: contain;
}

.title{
  display: flex;
  align-items: center;
  span{
    font-size: 16px;
    width: 130px;
    text-align: right;
    font-weight: bold;
    font-family: '黑体';
  }
}

.headerImage{
  display: flex;
  width: 100%;
  align-items:center;
  margin-top: 20px;
  span{
    font-size: 16px;
    font-weight: bold;
    font-family: '黑体';
    width: 130px;
    text-align: right;
  }
}
  .editor{
    margin-top: 20px;
  }

  .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    font-family: '黑体';
    img{
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
    .left{
      display: flex;
      align-items: center;
    }
  }

  .selectContainer{
    width: 100%;
    margin-top: 30px;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    span{
        width: 130px;
        text-align: right;
        font-weight: bold;
        font-family: '黑体';
      }
    
  }
}
</style>