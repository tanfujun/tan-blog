//使用pinia进行状态管理

import { defineStore } from 'pinia'
import { articleApi } from '@/api'
import { ElMessage } from 'element-plus'
import router from '@/router'

export const useArticle =  defineStore('markDown',{
    state(){
      return {
        html:'',
        sort:[{
          sort_id:'',
          sort_name:''
        }],
        currentSortId:'',
        articleList:[] as any,
        activeName:'first',
        total:0,
      }
    },
    actions:{
      async getAllArticle(params:Params){
        try {
          if(this.currentSortId){
            const res = await articleApi.getAllArcticleBySortId({...params,sort_id:this.currentSortId})
            console.log(res);
            const {data} = res.data
            this.articleList = data
            this.total = res.data.count
          }else{
            const res = await articleApi.getAllArcticle({...params})
            console.log(res);
            const {data} = res.data
            this.articleList = data
            this.total = res.data.count
          }
        } catch (error) {
          ElMessage.error(error as string)
        }
       
    },
      async getAllSort(){
        try {
          const res = await articleApi.getAllSort()
          const {data} = res.data
          this.sort = data
        } catch (error) {
          ElMessage.error(error as string)
        }
      },
      async setCurrentSortId(currentSortId:string){
        this.currentSortId = currentSortId
        if( this.currentSortId == ''){
          router.push('/home')
          await this.getAllArticle({dateDesc:true,limit:3})
          console.log(this.articleList);
  
          this.activeName = 'second'
          return
        }
        
        if(router.currentRoute.value.path!='/home'){
          router.push('/home')
          this.getAllArticle({viewsDesc:true,limit:3})
        }else{
          this.getAllArticle({viewsDesc:true,limit:3})
        }
        this.activeName = 'second'
      },
    }

})

type Params = {
  dateDesc?:boolean,
  viewsDesc?:boolean,
  offset?:number,
  limit?:number
}