import router from '@/router'
// import pinia from './pinia'
import { getToken } from './utils/auth'
import { useUser } from './pinia/user'

const hasToken = getToken()
console.log('hasToken',hasToken);

router.beforeEach(async (to,from,next)=>{
    const user = useUser()
    console.log('hasToken',hasToken);
    if(to.meta.auth){
        if(hasToken){
            const hasUserInfo = user.userInfo.user_name
            if(!hasUserInfo){
                try {
                    await user.getUserInfo()
                    next()
                } catch (error) {
                    user.logOut()
                    user.openDialog('login')
                }
            }else{
                next()
            }
        }else{
            next({path:'/home'})
            user.openDialog('login')
        }
    }else{
        if(hasToken){

            console.log('hello',getToken());
            console.log(hasToken);

            
            if(!user.userInfo.user_name){
                await user.getUserInfo()
                next()
            }else{
                next()
            }
        }else{
            next()
        }
        
    }
    
        

})