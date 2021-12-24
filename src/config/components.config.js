import Vue from 'vue';
import commBox from "../components/commBox/commBox.vue";
import lineUp from "@/components/lineUp/lineUp.vue";
import myPicker from "@/components/myPicker/myPicker.vue";
import descBox from "@/components/descBox/descBox.vue";
import myTab from "@/components/myTab/myTab.vue";
import verBox from "@/components/verBox/verBox.vue";
import linePro from "@/components/linePro/linePro.vue";
import billie from "@/components/billie/billie.vue";

/** 配置VUE */
export default {

    /** 初始化所有 */
    init() {
        // 配置全局组件
        Vue.component('comm-box', commBox)
        Vue.component('line-up', lineUp)
        Vue.component('my-picker', myPicker)
        Vue.component('desc-box', descBox)
        Vue.component('my-tab', myTab)
        Vue.component('ver-box', verBox)
        Vue.component('line-pro', linePro)
        Vue.component('n-billie', billie)
    },

};
