import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/permission'

import cardVue from './components/card.vue'

// markdown编辑器所需导入文件
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';

import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import hljs from 'highlight.js';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建一个 pinia 实例


import 'element-plus/dist/index.css'
// 导入element-plus全局样式

// 配置VMdEditor
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.use(createEmojiPlugin())


const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).use(VMdEditor).use(VMdPreviewHtml).use(mavonEditor)

app.component('Card',cardVue)
app.mount("#app")