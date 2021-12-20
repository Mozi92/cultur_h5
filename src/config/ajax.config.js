import ajax from '../utils/http.ajax';
import Vue from 'vue';
import message from '../utils/message';
import util from "../utils/my.utils";


let _errQueue = [];//错误队列

/**
 * 定时 访问错误队列 如果指定时间内有异常 抛出异常 并清理队列
 */
setInterval(function () {
    if (_errQueue.length > 0) {
        message.error('系统内部异常');
        _errQueue = [];
    }
}, 800)

/** 在发起请求之前 , 加token */
function onBeforeRequest(config) {
    let token = util.getCookie('token');
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    } else {
        console.log('token is null')
    }
}

/** 默认的错误处理 */
function onFail(response) {
    console.log('onFail-----------', response)
    // 统一错误处理

    //判断是否没有登录态
    if (response.status === 401) {
        logOutMsg()
    } else {
        if (response.data.error && response.data.error.code === '401') {
            logOutMsg()
        }
    }

    //判断是否参数齐全
    if (response.status === 400) {
        message.error('缺少必要的参数')
    }

    const data = response.data;

    if ((data || data == null) && data.error) {
        // 如果有错误信息，就显示错误信息
        if (data.error.code != null && data.error.code == '-1') {
            console.log(data.error.message, response.config.url)
            // 登陆提示特殊处理
            if (!(response.config.url.indexOf('mobileLogin') !== -1 || response.config.url.indexOf('login') !== -1)) {
                message.error(data.error.message)
            } else {
                console.log('这里是登陆操作', 1)
            }
        } else {
            _errQueue.push(data.error)
            // message.error('未知错误');
        }

    } else {


        // 如果没有返回错误信息，就是未知错误
        // if (response.error) {
        //   message.error('未知错误');
        // }
    }

}

function logOutMsg() {
    top.postMessage({
        tag: 'LogOut'
    }, '*')
}


export default {
    init() {
        console.log('初始化 ajax.config');
        Vue.prototype.$ajax = ajax;

        ajax.initOnBeforeRequest(onBeforeRequest);
        ajax.initOnFail(onFail);
    }
};
