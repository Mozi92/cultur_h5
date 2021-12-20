/**
 * 路由配置
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routerCig from './router.json';

/** 所有路由的定义 */
function getRouteDefine() {

    // 所有组件的路由，作为Main的子路由
    const subRouters = [{
        path: '',
    }];


    // 路由配置
    const routers = [];
    let routerList = routerCig.router;

    for (let i = 0; i < routerList.length; i++) {
        let ext = {
            meta: {
                name: routerList[i].meta.name,
                group: routerList[i].meta.group,
                isMenu: routerList[i].meta.isMenu,
                showMenu: routerList[i].showMenu
            },
            children: routerList[i].meta.isMenu ? subRouters : [],
        }
        if (routerList[i].alias) {
            ext.alias = routerList[i].alias
        }
        if (routerList[i].meta.checkRight) {
            ext.meta.checkRight = checkRight
        }

        addToRoute(routers, routerList[i].path, routerList[i].title, ext);
    }

    return routers;
}

/**
 * 权限判断
 * 具体功能待定
 */

function checkRight() {
    // console.log('checkRight')
}

/**
 * 添加路由到路由表
 * @param routers 路由表
 * @param path url路径
 * @param ext 额外的定义
 * @param title 导航标题
 */
function addToRoute(routers, path, title, ext) {
    let paths = path.split('/');
    let pageName;
    if (paths.length > 1) {
        pageName = paths[paths.length - 1];
    } else {
        pageName = path;
    }
    // console.log(path,pageName)
    let r = {
        component: () => import('../views/' + path + '/' + pageName + '.vue'), // 路由懒加载
        path: '/' + path,
    };


    if (ext) {
        for (let key in ext) {
            let value = ext[key];
            if (value) {
                // children 子组件不可用 assign 赋值
                if (typeof value === 'object' && key !== 'children') {
                    r[key] = Object.assign({}, value);
                } else {
                    r[key] = value;
                }
            }
        }
    }

    if (title) {
        if (!r.meta) {
            r.meta = {};
        }
        r.meta.title = title;
    }

    routers.push(r);
}

/** 路由配置 */
export default {

    /** 初始化路由 */
    initRouter() {
        // VUE 在点击同一路由时，会报错
        const originalPush = VueRouter.prototype.push;
        VueRouter.prototype.push = function push(location) {
            if (this.currentRoute.path === location) {
                // 如果重复点击同一路由，就添加随机参数让url不一样
                // console.debug('重复点击了同一个路由，添加随机参数');
                return originalPush.call(this, {
                    location,
                    query: {
                        _random: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
                    }
                });
            } else {
                // 如果点击了路由和当前不一样就调用原来方法
                return originalPush.call(this, location);
            }
        };

        Vue.use(VueRouter);

        const router = new VueRouter({
            mode: 'hash',
            // mode: 'history',
            routes: getRouteDefine(),
        });

        router.afterEach(function (to) {
            console.debug(`成功浏览到: ${to.path}`);
            Vue.nextTick(() => {
            });
            // 进入一个页面时，关闭所有层
        });

        router.beforeEach(function (to, from, next) {
            // console.debug(`准备从: ${to.path}, 跳到 ${from.path}`);
            next();
        });

        return router;
    },

};
