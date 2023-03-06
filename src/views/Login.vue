<template>
    <el-dialog v-model="user.dialogLoginVisible" width="600px" title="登录Tan-Blog">
      
        <el-form :model="form"  ref="ruleFormRef" label-width="170px">
      <el-form-item label="用户名：" >
        <div class="input">
          <el-input  v-model="form.user_name" placeholder="请输入账号..." autocomplete="off" />
        </div>
      </el-form-item>
      <el-form-item label="密码：" >
        <div class="input">
          <el-input  v-model="form.user_password" type="password" placeholder="请输入密码..." autocomplete="off" />
        </div>
      </el-form-item>
    </el-form>
    <div class="register">
      <el-link type="primary" @click="openRegister">没有账号？点击我注册</el-link>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="user.closeDialog('login')">取消</el-button>
        <el-button type="primary" @click="login()">
          登录
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
    <script setup lang="ts">
    import { ref,reactive } from 'vue';
    import { ElDialog,ElForm,ElFormItem,ElButton,ElInput,ElLink,ElMessage,FormRules,FormInstance } from 'element-plus';
    import {useUser} from '@/pinia/user'
    import { setToken } from '@/utils/auth';
    const dialogLoginVisible = ref(false)
    const formLabelWidth = '80px'

    const user = useUser()

    const form = reactive({
    user_name:'',
    user_password:''
    })

    function openRegister(){
      user.closeDialog('login')
      user.openDialog('register')
    }

    async function login(){
        try {
            if(form.user_name==''||form.user_password==''){
              ElMessage.error('用户名或密码不能为空！')
              return
            }
            const res = await user.login(form)
            console.log(res);
            if(res.code == 200){
              ElMessage({
              message: '登录成功！',
              type: 'success',
            })
            form.user_name = ''
            form.user_password = ''
            const {token} = res.data
            setToken(token)
            user.closeDialog('login')
            user.getUserInfo()
            }
            if(res.code == 500){
              ElMessage.error('登录失败！！')
            }
        } catch (error) { 
            ElMessage.error('登录失败！')
        }
    }

</script>


<style scoped lang="scss">
  .input{
    width: 300px;
    margin: 0 auto;
  }
  .register{
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>