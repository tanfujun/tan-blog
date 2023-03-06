
import { defineStore } from 'pinia'
import { getToken,setToken,removeToken } from '@/utils/auth'
import { loginParams } from '@/types/user'
import { ElMessage, ElNotification } from 'element-plus'
import { userApi } from '@/api'
import router from '@/router'

function getUserDefault(){
    return {
        id:'',
        user_name:'',
        user_email:'',
        user_profile_photo:'',
        user_age:1,
        user_nickname:'',
        user_description:'',
        isAdmin:false
    }
}

export const useUser = defineStore('user',{
    state(){
        return {
            token:getToken(),
            dialogLoginVisible:false,
            dialogRegisterVisible:false,
            isLogin:false,
            userInfo:{
                id:'',
                user_name:'',
                user_email:'',
                user_profile_photo:'',
                user_age:1,
                user_nickname:'',
                user_description:'',
                isAdmin:false
            }
        }
    },
    actions:{
        async login(user:loginParams){
            try {
                const res = await userApi.login(user)
                this.isLogin = true
                router.go(0)
                    return res.data
            } catch (error) {
                ElNotification({
                    title: 'Error',
                    message: error as string,
                    type: 'error',
                  })
            }
        },
        async getUserInfo(){
            try {
                const res = await userApi.getUserInfo()
                const {data} = res.data
                const userInfo = data
                this.userInfo = userInfo
                console.log(this.userInfo);
                this.isLogin = true
            } catch (error) {
                ElMessage({
                    message: error as string,
                    type: 'error',
                  })
            }
        },
        logOut(){
            removeToken()
            this.userInfo = getUserDefault()
            this.isLogin = false
            setTimeout(()=>{
                router.push('/home')
                router.go(0)
            },1000)
            

        },
        openDialog(option:string){
            if(option =='login'){
                this.dialogLoginVisible = true
            }
            if(option =='register'){
                this.dialogRegisterVisible = true
            }
            
        },
        closeDialog(option:string){
            if(option =='login'){
                this.dialogLoginVisible = false
            }
            if(option =='register'){
                this.dialogRegisterVisible = false
            }
        }
    }
})