import axios from 'axios';
import message from './message';
import util from './my.utils';

let _onBeforeRequest = null; // 执行请求之前
let _onFail = null; // 默认的错误处理
let _errQueue_net = [];//错误队列--网络异常的情况
/**
 * 定时 访问错误队列 如果指定时间内有异常 抛出异常 并清理队列
 */
setInterval(function () {
    if (_errQueue_net.length > 0) {
        message.error("网络异常")
        _errQueue_net = [];
        // top.postMessage({
        //     tag: 'error',
        // }, '*')
    }
}, 800)

/** 请求之前执行，通常用于放token */
function onBeforeRequest(config) {
    if (_onBeforeRequest && typeof _onBeforeRequest === 'function') {
        _onBeforeRequest(config);
    }
}

/**
 * 得到响应后
 * @param data 响应的data
 */
function onResponse(data, config) {
    console.debug(`调用 ${config.url} :`, data);
}

/** 判断返回的请求是否正常 */
function onFail(response, config) {
    // 统一错误处理
    if (response) {
        const data = response.data;
        const status = response.status;
        console.debug(`调用 ${config.url} 出错了:`, data, status);
        // 如果有响应，就调用错误处理
        const fn = config.onFail;
        if (util.isFunction(fn)) {
            // 如果请求配置中要覆盖 ，就用请求中的
            fn(response, config);
        } else {
            // 如果没有覆盖，就调用默认的错误处理方式
            if (util.isFunction(_onFail)) {
                _onFail(response, config);
            }
        }
    } else {
        // 如果没有响应，就弹窗
        if (config.noFailTisp) {
            return
        } else {
            _errQueue_net.push({e: "网络发生故障"})
        }
        // message.error('网络发生故障');
    }
}

/** 显示 loading */
function pageLoadingOpen(config) {
    const fn = config.pageLoadingOpen;
    if (util.isFunction(fn)) {
        // 如果请求配置中要覆盖 ，就用请求中的
        fn();
    } else {
        console.log('nothing')
    }
}

/** 隐藏 loading */
function pageLoadingColse(config) {
    const fn = config.pageLoadingClose;
    if (util.isFunction(fn)) {
        // 如果请求配置中要覆盖，就用请求中的
        fn();
    } else {
        console.log('nothing')
    }
}

// 创建axios实例
function createInstance() {
    const service = axios.create({
        baseURL: util.getBaseUrl(), // api的base_url
        timeout: 180 * 1000, // 请求超时时间
    });

    /** request拦截器 */
    service.interceptors.request.use(config => {
        // 全屏遮罩，延迟开启
        pageLoadingOpen(config);

        // 看看有没有需要先准备的，就准备一下
        onBeforeRequest(config);
        return config;
    }, error => {
        // Do something with request error
        console.log('request 出错了', error); // for debug
        // Promise.reject(error)
    });

    /** response拦截器 */
    service.interceptors.response.use(
        response => {
            // console.log('response拦截器response', response)
            // 关闭loading
            pageLoadingColse(response.config);
            // console.log(response)
            const data = response.data;
            if (data) {
                // console.log('response拦截器response正常返回', data)
                onResponse(response, response.config);
                return data;
            } else {
                console.log('response拦截器response拦截错误', response)
                onFail(response, response.config);
                return Promise.reject(data);
            }

        },
        error => {
            console.log('response拦截器error', error)
            // 关闭loading
            pageLoadingColse(error.config);
            onFail(error.response, error.config);

            // 有错误时，就reject，然后触发ajax的 onRejected，不让最外层调用then
            return Promise.reject(error);
        }
    );

    return service;
}

export default {
    /**
     * extConfig: 参数
     * @pageLoadingOpen 覆盖默认的 pageLoading函数
     * @pageLoadingClose 覆盖默认的 pageLoadingClose函数
     * @onFail 覆盖默认的 onFail
     * @returns {*}
     */
    ajax(method, url, params, extConfig) {
        // console.debug(`请求:${url}`);

        // 构造配置
        const config = {
            url: url,
            method: method,
            // params: params,
        };

        if (method.toLowerCase() === 'post') {
            config.data = params
        } else {
            config.params = params
        }

        // 将额外的配置拷贝进来
        util.copyAttr(extConfig, config);

        // 创建实例
        const instance = createInstance();
        return instance(config).then(response => {
            // console.debug(`请求:${url} 得到响应:`, response)
            // 需要从响应包中解析出数据
            return response;
        }, (error) => {
            // 捕捉错误，还是要reject,否则外面会调用.then，但没有数据
            return Promise.reject(error);
        })
    },

    /** 初始化 onBeforeRequest */
    initOnBeforeRequest(fn) {
        if (util.isFunction(fn)) {
            _onBeforeRequest = fn;
        } else {
            throw new Error('onBeforeRequest 参数类型错误');
        }
    },

    /** 初始化 onFail */
    initOnFail(fn) {
        if (util.isFunction(fn)) {
            _onFail = fn;
        } else {
            throw new Error('onFail 参数类型错误');
        }
    },

    get(url, params, extConfig) {
        return this.ajax('get', url, params, extConfig);
    },

    post(url, params, extConfig) {
        return this.ajax('post', url, params, extConfig);
    }
};
