/** 全局上下文 */
import myUtil from '../utils/my.utils';

export default {
    /**
     * 当前登陆得用户信息
     */
    user: {},
    dept: {},
    roles: [],
    permissions: [],

    /** 获取用户信息后，更新 */
    updateGetUserInfo(data) {
        console.log('更新用户信息', data)
        this.user = data
    },

    /**
     * 登入
     * @param token
     */
    signIn(token) {
        myUtil.setCookie('token', token)
    },

    /** 退出时重置 */
    signOut() {
        this.user = {}
        this.dept = {}
        this.roles = []
        this.permissions = []
        myUtil.delCookie('token')
    },
};
