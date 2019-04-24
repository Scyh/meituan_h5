<template>
    <div id="search">

        <!-- 头部信息栏 -->
        <header class="search_section header">
            <i class="img_left_arrow f_l"></i>
            <h5 class="text-c">搜索页</h5>
        </header>

        <!-- 搜索输入框 -->
        <section class="search_section search_input">
            <div class="input_box">
                <input type="text" placeholder="请输入商家或商家名称">
                <i class="img_search"></i>
            </div>
            <span class="text-r">搜索</span>
        </section>

        <!-- 热门搜索 -->
        <section class="search_section search_hot" v-if="hot_list.length > 0">
            <nav class="section_title">热门搜索</nav>
            <div class="section_content">
                <ul>
                    <li v-for="(i, idx) in hot_list" :key="idx">{{i}}</li>
                </ul>
            </div>
        </section>

        <!-- 历史搜索 -->
        <section class="search_section search_history">
            <div class="section_title">历史搜索<i class="img_dustbin f_r" @click="clear"></i></div>
            <div class="section_content">
                <ul v-if="history_list.length > 0">
                    <li v-for="(i, idx) in history_list" :key="idx">{{i}}</li>
                </ul>
            </div>
        </section>

        <cconfirm ref="confirm"></cconfirm>
    </div>
</template>
<script>
import { Store } from '@/common/javascript/util'
export default {
    data() {
        return {
            hot_list: ['粥', '麻辣烫', '麻辣香锅', '奶茶', '黄焖鸡米饭', '炒饭' ,'凉皮' ,'烧烤' ,'蛋包饭' ,'炸鸡'],
            history_list: ['麻辣烫']
        }
    },
    created() {
        let history = Store.get('search_history');
        if (history && history.length > 0) {
            this.history_list = history.split(',');
        }
    },
    methods: {

        // 清空历史记录
        clear() {
            this.$refs.confirm.show = true
        }
    }
}
</script>
<style lang="scss" scoped>
    @import 'src/common/style/mixin';
    #search {
        padding: 0 10px;
    }
    .header {
        line-height: 40px;
        > i {
            margin-top: 12.5px;
        }
        
    }
    .search_input {
        @include flexBox(row, flex-start);
        .input_box {
            flex: 1;
            position: relative;
            input {
                width: 100%;
                padding: 6px 0 6px 28px;
                line-height: 17px;
                border: none;
                border-radius: 100px;
                background: #e8e8e8;
            }
            .img_search {
                position: absolute;
                top: 6px;
                left: 6px;
                width: 16px;
                height: 18px;
            }
        }
        > span {
            width: 65px;
            line-height: 29px;
            font-size: 16px;
            color: #999;
        }
    }
    .search_section {
        margin-bottom: 20px;
        .section_title {
            height: 30px;
            left: 35px;
            font-size: 14px;
            color: #999;
            border-bottom: 1px solid #e4e4e4;
        }
        .section_content {
            margin: 10px 0;
            > ul {
                @include flexBox(row, flex-start, center, wrap);
                > li {
                    margin: 5px 8px;
                    padding: 0 8px;
                    line-height: 28px;
                    color: #666;
                    font-size: 12px;
                    box-sizing: border-box;
                    border: 1px solid #eaeaea;
                    @include ellipsis;
                }
            }
        }
    }
    .search_hot {}
    .search_history {}
</style>