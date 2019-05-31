<template>
    <div id="search">

        <!-- 头部信息栏 -->
        <header class="header">
            <i class="img_left_arrow f_l" @click="back($router)"></i>
            <h5 class="text-c">搜索页</h5>
        </header>

        <!-- 搜索输入框 -->
        <section class="search_section search_input">
            <div class="input_box">
                <input type="text" placeholder="请输入商家或商家名称" v-model="search_key" @keydown="search">
                <i class="img_search"></i>
            </div>
            <span class="text-r" @click="search()">搜索</span>
        </section>


        <section class="search_section" v-show="!search_key">
            <!-- 热门搜索 -->
            <section class=" search_hot" v-if="hot_list.length > 0">
                <nav class="section_title">热门搜索</nav>
                <div class="section_content">
                    <ul>
                        <li v-for="(i, idx) in hot_list" :key="idx">{{i}}</li>
                    </ul>
                </div>
            </section>

            <!-- 历史搜索 -->
            <section class="search_section search_history">
                <div class="section_title">历史搜索<i class="img_dustbin f_r" @click="show_confirm"></i></div>
                <div class="section_content">
                    <ul v-if="history_list.length > 0">
                        <li v-for="(i, idx) in history_list" :key="idx">{{i}}</li>
                    </ul>
                </div>
            </section>
        </section>

        <section class="suggest_list" v-show="search_key">
            <ul>
                <template v-for="(i, idx) in suggest_list">
                    <li :key="idx">
                        <i :class="[i.icon ? 'img_' + i.icon : 'img_search']"></i>
                        <div>
                            <p class="shop_name">{{i.shop.name}}
                                <template v-if="i.shop.discount && i.shop.discount.length > 0" >
                                    <i v-for="discount in i.shop.discount" :key="discount" :class="['img_' + discount]"></i>
                                </template>
                            </p>
                            <p class="shop_meta" v-if="i.shop.lowest >= 0 || i.shop.deliver >= 0 || i.shop.distance">
                                <span v-if="i.shop.lowest">起送￥{{i.shop.lowest}}</span>
                                <span v-if="i.shop.deliver">配送￥{{i.shop.deliver}}</span>
                                <span v-if="i.shop.distance">{{i.shop.distance}}</span>
                            </p>
                        </div>
                    </li>
                </template>
            </ul>
        </section>
        <cconfirm ref="confirm" @confirm="clear">确认清空历史搜索？</cconfirm>
    </div>
</template>
<script>
import { Store } from '@/common/javascript/util'
import { back } from '@/components/mixin.js'
export default {
    data() {
        return {
            search_key: '',
            hot_list: ['粥', '麻辣烫', '麻辣香锅', '奶茶', '黄焖鸡米饭', '炒饭' ,'凉皮' ,'烧烤' ,'蛋包饭' ,'炸鸡'],
            history_list: [],
            suggest_list: [
                {
                    icon: 'search',
                    shop: {
                        name: '711',  // 关键词匹配
                    }
                },
                {
                    icon: 'search',
                    shop: {
                        name: '1664',  // 关键词匹配
                    }
                },
                {
                    icon: 'shop',
                    shop: {
                        name: '1点点（合肥天鹅湖万达店）',  // 关键词匹配
                        lowest: 20, // 起送费
                        deliver: 6.5,   // 配送费
                        distance: '3.5km',  // 距离
                        discount: []
                    }
                },
                {
                    icon: 'shop',
                    shop: {
                        name: 'HK号客1号饭堂品质快餐',  // 关键词匹配
                        lowest: 20, // 起送费
                        deliver: 3.5,   // 配送费
                        distance: '3.3km',  // 距离
                        discount: ['jian', 'zhe']
                    }
                }
            ]
        }
    },
    created() {
        this.initHistory();
    },
    mixins: [back],
    methods: {
        getHot_list() {},

        // 初始化历史搜索
        initHistory() {
            this.history_list = [];
            let history = Store.get('search_history');
            if (history && history.length > 0) {
                this.history_list = history.split(',');
            }
        },

        // 清除历史记录
        clear() {
            Store.remove('search_history');
            this.initHistory();
        },

        // 弹窗
        show_confirm() {
            this.$refs.confirm.show();
        },

        search(ev) {
            if (!ev || ev.keyCode === 13) {
                if (!this.search_key) {
                    this.$tip('请输入商家或商家名称');
                } else {
                    !this.history_list.includes(this.search_key) && this.history_list.push(this.search_key);
                    Store.set('search_history', this.history_list.join(','))
                    this.search_key = '';
                }
            }
        },
    },
}
</script>
<style lang="scss" scoped>
    @import 'src/common/style/mixin';
    #search {
        padding: 0 10px;
    }
    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 40px;
        > i {
            margin-top: 12.5px;
            margin-left: 10px;
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
            font-size: 14px;
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
    .search_section:first-of-type {
        margin-top: 40px;
    }
    .suggest_list {
        margin-left: 5px;
        > ul {
            width: 100%;
            
            > li {
                @include flexBox(row, flex-start, flex-start);
                width: 100%;
                padding: 10px 0;
                border-bottom: 1px solid #e4e4e4;
                box-sizing: border-box;
                > i {
                    margin-right: 8px;
                }
                i.img_search {
                    width: 14px;
                }
                div {
                    font-size: 14px;
                    .shop_name {
                        i {
                            vertical-align: text-top;
                            margin-right: 5px;
                        }
                    }
                    .shop_meta {
                        margin-top: 8px;
                        font-size: 12px;
                        span:not(:last-child) {
                            &:after {
                                margin: 0 5px;
                                @include borderBefore;
                            }
                        }
                    }
                }
            }
        }
    }
</style>