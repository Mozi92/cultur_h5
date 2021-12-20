// 基础框架
import Vue from 'vue';
import App from './App.vue';
import "amfe-flexible";


// 我们的配置
import routerConfig from './config/router.config';
import vueConfig from './config/vue.config';
import ajaxConfig from './config/ajax.config';
import components from './config/components.config';


// 样式表
import 'vant/lib/index.css';
import './assets/sass/index.scss';

// 各类配置
vueConfig.init();
ajaxConfig.init();
components.init();

const router = routerConfig.initRouter();
new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
