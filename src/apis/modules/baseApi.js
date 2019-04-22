import axios from '../axios'
import { baseUrl } from '../base.js';
class Base {
    constructor(apiNme) {
        this.axios = axios;
        this.url = baseUrl + apiNme
    }

    async get(page, pageSize, searchObj) {
        return await this.axios.get(this.url, {
            page,
            pageSize,
            ...searchObj
        });
    }

    async updateOne(searchObj, updateObj) {
        return await this.axios.post(this.url, {
            ...updateObj
        })
    }
    
    async addOne(dataObj) {
        return await this.axios.put(this.url, {
            ...dataObj
        })
    }

    async remove(id) {
        return await this.axios.delete(this.url, {
            id
        })
    }
}

export default Base;