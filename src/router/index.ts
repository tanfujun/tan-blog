import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Detail.vue'
import Home from '@/views/Home.vue'
import layout from '@/components/layout/layout.vue'
import LoginVue from '@/views/Login.vue'
import Edit from '@/views/Edit.vue'
import userInfoVue from '@/views/userInfo/userInfo.vue'
import DetailVue from '@/views/Detail.vue'
import MyArticle from '@/views/MyArticle.vue'
import SearchResult from '@/views/SearchResult.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect:to=>{
      return {path:'/home',}
    },
    component: layout,
    children:[{
      path:'home',
      component:() => import('@/views/Home.vue')
    }],
  },
  {
    path: '/user',
    name: 'user',
    component:layout,
    children:[
    {
      path:'userInfo',
      component:() => import('@/views/userInfo/userInfo.vue'),
      meta:{
        auth:true
      }
    },
    {
      path:'myArticle',
      component:() => import('@/views/MyArticle.vue'),
      meta:{
        auth:true
      }
    },
  ]
  },
  {
    path:'/article',
    name:'article',
    component:layout,
    children:[{
      path:'edit',
      component:() => import('@/views/Edit.vue'),
      meta:{
        auth:true
      }
    },
    {
      path:'detail',
      name:'detail',
      component:() => import('@/views/Detail.vue'),
    },{
      path:'search/:key',
      name:'search',
      component:() => import('@/views/SearchResult.vue'),
    }
  ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
