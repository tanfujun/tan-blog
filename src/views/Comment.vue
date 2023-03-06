<template>
    <div class="comment-container">
      <div class="comment-input">
        <el-input
          v-model.trim="state.commentContent"
          type="textarea"
          :rows="2"
          placeholder="写下你的评论"
          show-word-limit
          maxlength="100"
          class="comment-textarea"
        >
          <el-button
            slot="append"
            class="comment-button"
            :disabled="state.commentContent.trim() === ''"
            @click="addComment"
          >
            发表评论
          </el-button>
        </el-input>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="(comment, index) in state.comments" :key="index">
          <div class="comment-header">
            <el-avatar :src="comment.avatar" size="small"></el-avatar>
            <div class="comment-info">
              <div class="comment-username">{{ comment.username }}</div>
              <div class="comment-date">{{ comment.time }}</div>
            </div>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
        </div>
        <div class="comment-empty" v-if="state.comments.length === 0">暂无评论</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, reactive } from 'vue'
  import { ElInput, ElButton, ElAvatar } from 'element-plus'
  
  const props = defineProps({
    initialComments: {
      type: Array,
      default: () => [],
    },
  })
  
  const state = reactive({
    comments: props.initialComments,
    commentContent: '',
  })
  
  const addComment = () => {
    state.comments.push({
      username: '匿名用户',
      avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
      content: state.commentContent.trim(),
      date: new Date().toLocaleString(),
    })
    state.commentContent = ''
  }
  
  </script>
  
  <style scoped>
  .comment-container {
    width: 100%;
  }
  
  .comment-input {
    margin-bottom: 20px;
  }
  
  .comment-textarea {
    border-radius: 0;
  }
  
  .comment-button {
    border-radius: 0;
    background-color: #67c23a;
  }
  
  .comment-list {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
  }
  
  .comment-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  .comment-header {
    display: flex;
    align-items: center;
  }
  
  .comment-username {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .comment-content {
    margin-top: 10px;
  }
  
  .comment-empty {
    text-align: center;
    margin-top: 20px;
    color: #999;
    font-size: 14px;
  }
  </style>
  