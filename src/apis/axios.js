import axios from 'axios';
import { Message } from 'element-ui';

const instance = axios.create({ timeout: 1000 * 5 });

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';

instance.interceptors.request.use(config => {
    // 获取token
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config
}, err => {
    return Promise.reject(err);
});

instance.interceptors.response.use(res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data),
    err => {
        const { response } = err;
        if (response) {
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 断网处理

        };
    });

function errorHandle(status, msg) {
    switch (status) {
        case 401:
            // 未登录
            Message.error('请登录！');
            break;
        case 403:
            // 登录过期
            Message.error('请重新登录！');
            break;
        case 404:
            // 请求资源不存在
            Message.error('请求资源不存在！')
            break;
        default:
            Message.error(msg)
    }
}

export default instance