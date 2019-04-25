export const state = {
    user_info: {
        // name: '测试'
    },  // 用户信息
    location: '',   // 位置
    last_route: null,    // 在登录之前访问的路由，没有值则跳转到首页
};

export const getters = {
    hasLogin: state => {
        return JSON.stringify(state.user_info) === '{}' ? false : true;
    }
}