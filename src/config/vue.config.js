import Vue from 'vue';
import Vant from 'vant';
import {Lazyload} from 'vant';
import {Image as VanImage} from 'vant';
import myUtil from '../utils/my.utils';
import VueBus from 'vue-bus';
import context from './server.context';
import apiUrl from '../config/api.url';
import messageText from '../config/message.text';

import ECharts from 'vue-echarts'
import {use} from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {BarChart} from 'echarts/charts'
import {GridComponent, TooltipComponent} from 'echarts/components'
import "echarts";

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);

const dataFormatStr = 'yyyy-MM-dd hh:mm'; // 时间输出格式
/** 格式化输出相关工具集 */
const filterUtil = {

    /** unix时间格式化为  yyyy-MM-dd hh:mm:ss */
    timeFormat(time) {
        if (!time) {
            return ''
        }
        // 后端传递参数需要乘1000
        if (time < 2595835727) {
            time = time * 1000
        }

        return myUtil.timeFormat(time, dataFormatStr);
    },


    /** unix时间格式化为 yyyy-MM-dd 去掉时分秒 */
    timeFormatRemove(time) {
        if (!time) {
            return ''
        }
        // 后端传递参数需要乘1000
        if (time < 2595835727) {
            time = time * 1000
        }
        let a = myUtil.timeFormat(time, dataFormatStr);
        if (a) {
            return a.split(' ')[0];
        }
        return '-';
    },

    /** Date时间格式化为  yyyy-MM-dd hh:mm:ss */
    dateFormat(data) {
        return myUtil.dateFormat(data, dataFormatStr);
    },

    /** 将空间大小转为K，并且用逗号分隔 */
    sizeToK(size) {
        const k = size / 1024;
        return myUtil.numFormat(k, true) + 'K';
    },

    /** 将空间大小转为M，并且用逗号分隔 */
    sizeToM(size) {
        if (!size || size === 0) {
            return 0;
        }

        const k = size / 1024;
        if (k > 1024) {
            const m = k / 1024;
            return myUtil.numFormat(m, true) + 'M';
        } else {
            return myUtil.numFormat(k, true) + 'K';
        }
    },

    /** 用逗号分隔显示数字,保留两位小数点 */
    numFormat2(value) {
        return myUtil.numFormat(value, true);
    },

    /** 用逗号分隔显示数字，取整 */
    numFormat(value) {
        return myUtil.numFormat(value, false);
    },
};

/** 配置VUE */
export default {

    /** 初始化所有 */
    init() {
        Vue.config.productionTip = false;

        // 配置全局组件
        /** 我们可以再这个地方注入全局的组件，这样就不需要在每个页面单独的声明了 */
        Vue.use(Vant);
        Vue.component('v-chart', ECharts)

        //懒加载
        Vue.use(Lazyload, {
            lazyComponent: true,
        });

        Vue.use(VanImage);
        Vue.use(VueBus);
        // 设置格式化输出
        Vue.filter('numFormat', filterUtil.numFormat); // 逗号分隔，取整
        Vue.filter('numFormat2', filterUtil.numFormat2); // 逗号分隔，保留两位小数
        Vue.filter('timeFormat', filterUtil.timeFormat); // unix时间 到年月日时分秒
        Vue.filter('dateFormat', filterUtil.dateFormat); // Date 到年月日时分秒
        Vue.filter('sizeToK', filterUtil.sizeToK); // 转为K
        Vue.filter('sizeToM', filterUtil.sizeToM); // 转为M
        Vue.filter('timeFormatRemove', filterUtil.timeFormatRemove); // unix时间 到年月日

        Vue.prototype.$context = context
        Vue.prototype.$apiUrl = apiUrl
        Vue.prototype.$messageText = messageText
        Vue.prototype.$util = myUtil
    },

};
