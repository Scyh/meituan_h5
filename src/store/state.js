import { Store } from 'src/common/javascript/util';

export const state = Store.get('__state') ? JSON.parse(Store.get('__state')) : {
    user_info: {
        name: '测试'
    },  // 用户信息
    location: '',   // 位置
    city: '',   // 选择城市
    last_route: null,    // 在登录之前访问的路由，没有值则跳转到首页
    last_addr_edit_route: {
        route: null,
        address: null,
    },  // 地址编辑信息
};

export const getters = {
    hasLogin: state => {
        return JSON.stringify(state.user_info) === '{}' ? false : true;
    }
}