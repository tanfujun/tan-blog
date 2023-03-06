import request from '../request'
import {loginParams,registerBody,updateBody} from '@/types/user'


export function login(user:loginParams){
    return request.post('/users/login',{...user})
}

export function register(user:registerBody){
    return request.post('/users/register',user)
}

export function changePassword(newPassword:string){
    return request.post('/users/update',{user_password:newPassword})
}

export function updateUser(newUser:updateBody){
    return request.post('/users/updateInfo',newUser)
}

export function getUserInfo(){
    return request.get('/users/userInfo')
}

export function upload(image:FormData){
    return request.post('/upload/image',image,{
        headers:{
            'Content-Type':'multpart/form-data;charset=UTF-8'
        }
    })
}

export function getUserInfoByUserId(user_id:string){
    return request.get(`/users/getUserInfoByUserId?user_id=${user_id}`)
}

export function getUserOrderByUserWeight(){
    return request.get('/users/getUserOrderByUserWeight')
}