import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';

import './assets/main.css';

import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/atom-one-light.css'  //导入代码高亮样式

const app = createApp(App);

app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: any) => {
        hljs.configure({languages: ['python']});
        hljs.highlightBlock(block)
    })
});

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.mount('#app');
