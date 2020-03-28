import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import './styles/base.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

/* 全局修改element尺寸为 medium | small */
Vue.prototype.$ELEMENT = {
    size: 'mini'
};

import './icons/iconfont.css'; // 字体图标 css
import './icons/iconfont.js'; // 字体图标 js

/* eslint-disable no-new */
new Vue({
    components: {
        App
    },
    router,
    store,
    template: '<App/>'
}).$mount('#app');