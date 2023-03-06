<template>

        <el-card shadow="always" style="margin-top: 20px;">
            <div class="card-container">
                <div class="left" v-if="image">
                <img :src="image" alt="" srcset="">
            </div>
            <div class="right">
                <div class="top">
                    <span class="title">{{ title }}</span>
                    <div class="sort_name" @click.stop="">
                        <!-- <img src="@/assets/icon/tip.png" alt="" srcset=""> -->
                        <span>{{sort_name}}</span>
                        <el-popconfirm title="你确定要删除吗?" v-if="user.userInfo.isAdmin" @confirm.stop="deleteArticle">
                        <template #reference>
                        <el-icon style="margin-left: 10px;"  size="18"><Delete /></el-icon>
                        </template>
                        </el-popconfirm>
                    </div>
                </div>
                <div class="bottom">
                    <div class="userInfo">
                        <el-avatar size="small" :src="user_profile_photo" />
                        <span>{{ user_name }}</span>
                        <span class="time">{{ getTime(time) }}</span>
                    </div>
                    <div class="viewContainer">
                            <img src="@/assets/icon/eyes.png" alt="" srcset="">
                            <span>{{views?views:0}}</span>
                    </div>
                </div>
            </div>
            </div>
        </el-card>
</template>

<script setup lang="ts">
import {ref,defineProps} from 'vue'
import { ElCard,ElAvatar,ElIcon,ElPopconfirm, ElMessage} from 'element-plus';
import { Delete } from '@element-plus/icons-vue';
import { View } from '@element-plus/icons-vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { articleApi } from '@/api';
import router from '@/router';
import { useUser } from '@/pinia/user';
const user = useUser()
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
function getTime(time:Date){
        return dayjs(time).fromNow()
}
const props = defineProps<{
    image?:string,
    title:string,
    user_name:string,
    user_profile_photo:string,
    time:Date,
    sort_name:string,
    views:number,
    id:string
}>()

async function deleteArticle(){
        const res = await articleApi.deleteArticle(props.id)
        ElMessage.success('删除成功！')
        router.go(0)
}


</script>

<style scoped lang="scss">
.container{
    margin-top: 20px;
    width: 100%;
    border: none;
}
.card-container{
    height: 200px;
    display: flex;
    cursor: pointer;
    // border: none;
    .left{
        width: 50%;
        img{
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }
    .right{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 30px;
        .top{
            font-size: 22px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            height: 80px;
            .title{
                max-width: 400px;
            }
            .sort_name{
                display: flex;
                align-items: center;
                img{
                    width: 20px;
                    height: 20px;
                }
                span{
                    color: #1296db;
                    font-weight: bold;
                    font-size: 18px;
                }
            }

        }
        .bottom{
            display: flex;
            justify-content: space-between;
            .userInfo{
                // margin-left: 10px;
                width: 100%;
                display: flex;
                align-items: center;
                span{
                    font-family: '黑体';
                    font-weight: bold;
                    font-size: 18px;
                    max-width: 200px;
                    overflow: hidden;
                    margin-left: 10px;
                }
                .time{
                    font-weight: normal;
                    font-size: 15px;
                    
                    // font-family: '宋体';
                }
                
            }
            .viewContainer{
                    display: flex;
                    align-items: center;
                    span{
                        font-weight: bold;
                        font-family: '黑体';
                        font-size: 14px;
                    }
                    img{
                        width: 20px;
                        height: 20px;
                        margin-right: 5px;
                    }
                    
                }
        }
    }
}

</style>