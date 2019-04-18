import axios from '../axios';
import base from '../base'

const ak = 'OPpVx7McFjtxfig7pWEdxhWe9jxnSDUQ'
// const url = 'http://api.map.baidu.com'
const url = '/v1';

export default {

    getIp: () => axios.get('/v2/cityjson?it=utf-8'),

    getLocation: (ip) => axios.get(`${url}/location/ip?ak=${ak}&ip=${ip}`),

    getSuggess: (query, region) => axios.get(`${url}/palce/v2/suggestion?query=${query}&region=${region}&ak=${ak}&city_limit=true&output=json`),
}