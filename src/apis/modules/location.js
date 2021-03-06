import Base from './baseApi'

const ak = 'OPpVx7McFjtxfig7pWEdxhWe9jxnSDUQ'
// const url = 'http://api.map.baidu.com'

class Location extends Base {
    constructor(apiName) {
        super();
        this.url = apiName
    }

    async getIp() {
        let ip = await this.axios.get('/v2/cityjson?it=utf-8');
        return /(\d+.\d+.\d+.\d+)/.test(ip) ? RegExp.$1 : false
    }

    async getLocation() {
        let ip = await this.getIp();
        return this.axios.get(`${this.url}/location/ip?ak=${ak}&ip=${ip}`);
    }

    async getSuggess(query, region) {
        return this.axios.get(`${this.url}/palce/v2/suggestion?query=${query}&region=${region}&ak=${ak}&city_limit=true&output=json`);
    }
}

export default new Location('/v1')