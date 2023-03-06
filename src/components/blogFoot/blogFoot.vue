<template>
    <div class="container">
        <div class="center">
            <div class="logo">
                <div class="tan">
                    <img src="@/assets/icon/logo.svg" alt="">
                </div>
                <div class="github">
                    <el-tooltip
        class="box-item"
        effect="dark"
        content="tanfujun的Github"
        placement="top-start"
      >
                    <a target="_blank" href="https://github.com/tanfujun"><img src="@/assets/icon/github.png" alt="" srcset=""></a>
                    </el-tooltip>
                    <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="TTT18022836826"
                    placement="top-start"
                    >
                        <a href=""><img src="@/assets/icon/wechat.png" alt="" srcset=""></a>
                    </el-tooltip>
                    
                    
                </div>
            </div>
            <div class="info">
                <span>@2023 author:Tan Fujun | email:1694912065@qq.com </span>
                <span>Thanks for your watching.</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ElTooltip,ElPopover } from 'element-plus';
</script>

<style scoped lang="scss">
.container{
    width: 100%;
    height: 122px;
    margin-top: auto;
    background-color: #fff;
    border-top: 1px solid rgb(233, 233, 233);
    // margin-top: 60px;
    .center{
        width: 1100px;
        margin: 0 auto;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;
        .logo{
            display: flex;
            align-items: center;
            .tan>img{
                width: 50px;
                height: 50px;
                margin-right: 30px;
            }
            .github{
                img{
                    width: 20px;
                    height: 20px;
                    margin-right: 20px;
                }
                display: flex;
                .wechat{
                    img{
                        height: 100px;
                        width: 100px;
                        object-fit: cover;
                    }
                }
            }
        }

        .info{
            display: flex;
            flex-direction: column;
            // align-items: flex-start;
            span{
                margin-top: 5px;
            }
        }
    }

    
}


</style>