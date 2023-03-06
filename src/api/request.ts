import Axios from 'axios'
// import pinia from '@/pinia'
import { useUser } from '@/pinia/user'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'

import NProgress from 'nprogress'

const instance = Axios.create({
    baseURL:'http://47.106.39.120:3000',
    timeout:3000,
})


instance.interceptors.request.use(
    config =>{
        NProgress.start()
        if(getToken()){
            config.headers.Authorization = getToken()
        }
            
        return config
    },
    error =>{
        return Promise.reject(error)
    })

instance.interceptors.response.use(
    res=>{
        NProgress.done()
        return res
    },error =>{
        ElMessage.error(error)
        NProgress.done()
        if(error.response.data.code == '10102'||error.response.data.code =='10101'){
            const user = useUser()
            user.logOut()
            ElMessage.error('token失效，请重新登录！')
        }
            
    }

)

export default instance 