export const state = {
    user_info: {
        name: '测试'
    },  // 用户信息
    location: '',   // 位置
    city: '',   // 选择城市
    last_route: null,    // 在登录之前访问的路由，没有值则跳转到首页
    revice_addr_list: [],   // 收货地址列表
    last_addr_edit_route: null,  // 地址编辑信息
};

export const getters = {
    hasLogin: state => {
        return JSON.stringify(state.user_info) === '{}' ? false : true;
    }
}