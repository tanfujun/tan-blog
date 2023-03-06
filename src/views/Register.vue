<template>
    <el-dialog v-model="user.dialogRegisterVisible" width="600px" title="注册Tan-Blog">
      
        <el-form :model="form" ref="ruleFormRef" label-width="170px">
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
      <el-form-item label="再次输入密码：" >
        <div class="input">
          <el-input  v-model="form.user_repeat_password" type="password" placeholder="请重复输入密码..." autocomplete="off" />
        </div>
      </el-form-item>
      <el-form-item label="用户昵称：" >
        <div class="input">
          <el-input  v-model="form.user_nickname"  placeholder="请用户昵称..." autocomplete="off" />
        </div>
      </el-form-item>
      <el-form-item label="邮箱：" >
        <div class="input">
          <el-input  v-model="form.user_email"  placeholder="请输入正确的邮箱..." autocomplete="off" />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="user.closeDialog('register')">取消</el-button>
        <el-button type="primary" @click="register">
          注册
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
    <script setup lang="ts">
    import { ref,reactive } from 'vue';
    import { ElDialog,ElForm,ElFormItem,ElButton,ElInput,ElLink,ElMessage,FormRules,FormInstance } from 'element-plus';
    import {useUser} from '@/pinia/user'
    import { userApi } from '@/api';
    import { setToken } from '@/utils/auth';
    const dialogLoginVisible = ref(false)
    const formLabelWidth = '80px'

    const user = useUser()

    const form = reactive({
    user_name:'',
    user_password:'',
    user_repeat_password:'',
    user_nickname:'',
    user_email:''
    })

    function CheckInfo(){
        if(form.user_name == '' || form.user_password == '' || form.user_repeat_password == '' || form.user_email == '' || form.user_nickname == ''){
            ElMessage.error('每一项内容均不能为空！')
            return false
        }else{
            if(form.user_password!=form.user_repeat_password){
                ElMessage.error('两次输入密码不一致！')
                return false
            }else{
                const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                const userNameReg = /^[a-zA-Z0-9]{6,14}$/

                if(!userNameReg.test(form.user_name)){
                  ElMessage.error('请输入6位以上数字字母组合的账号！')
                }else{
                  if(!reg.test(form.user_email)){
                    ElMessage.error('请输入正确格式的邮箱！')
                    return false
                }else{
                    return true
                }
                }
                
            }
        }
    }

    function resetForm(){
        form.user_email = ''
        form.user_name = ''
        form.user_nickname = ''
        form.user_password = ''
        form.user_repeat_password = ''
    }

    async function register(){
        try {
           const isRightInfo = CheckInfo()
           if(isRightInfo){
                const {user_repeat_password,...userBody} = form
                const res = await userApi.register(userBody)
                console.log(res);
                if(res.data.code == 200){
                    ElMessage.success(res.data.msg)
                    user.closeDialog('register')
                    user.openDialog('login')
                    resetForm()
                }else{
                    ElMessage.error(res.data.msg)
                }
                
           }else{
            return
           }
        } catch (error) { 
            ElMessage.error('注册失败！')
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