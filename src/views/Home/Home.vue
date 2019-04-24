<template>
    <div id="home">
        <common-header ref="top_header" :show_location="show_location"></common-header>
        <section class="category_list">
            <ul>
                <li v-for="(i, idx) in category_list" :key="idx">
                    <img :src="i.img">
                    <span>{{ i.text }}</span>
                </li>
            </ul>
        </section>
        <section class="near_shop">附近商家</section>
        <section ref="screen_group" :class="['screen_group', fix_to_top ? 'fixed' : '']">
            <div>
                <ul>
                    <li :class="['screen_item', sort_list.includes(s_s.selected) ? 'selected' : '']" @click="sort(10)">
                        {{ sort_list.includes(s_s.selected) ? s_s.selected : sort_list[0] }}
                        <i
                            :class="['iconfont', 'iconmore', show_sort ? 'rotate' : '']"
                        ></i>
                    </li>
                    <li :class="['screen_item', s_s.selected === '销量最高' ? 'selected' : '' ]"
                        @click="sort('销量最高')"
                    >销量最高</li>
                    <li :class="['screen_item', s_s.selected === '距离最远' ? 'selected' : '' ]"
                        @click="sort('距离最远')"
                    >距离最远</li>
                    <li class="screen_item" @click="sort(40)">
                        筛选
                        <i v-if="s_s.show_screen_count" class="screen_count">{{ s_s.screen.length }}</i>
                        <i v-else class="iconfont iconshaixuan1"></i>
                    </li>
                </ul>
                <div class="screen_panel">
                    <ul v-if="show_sort">
                        <li :class="[s_s.selected === i ? 'selected' : '']" v-for="(i, idx) in sort_list" :key="idx" @click="sort(i,true)" >{{i}}</li>
                    </ul>
                    <ul v-if="show_screen" class="shaixuan">
                        <template v-for="(i, idx) in screen_list">
                            <li :key="idx">
                                <div>
                                    <section class="title">{{ i.title }}</section>
                                    <section class="content">
                                        <ul>
                                            <template v-for="(item, index) in i.content">
                                                <li  :key="index" @click="screen_handle(item.text,i.title,i.multiple,index,idx)" :class="[item.class, item.selected ? 'selected' : '']">
                                                    <i v-if="item.icon_class" :class="item.icon_class"></i>
                                                    {{ item.text }}
                                                </li>
                                            </template>
                                        </ul>
                                    </section>
                                </div>
                            </li>
                        </template>
                        <li class="btn-group">
                            <div @click="screen_over(false)">清除筛选</div>
                            <div @click="screen_over(true)">完成<i v-if="s_s.screen.length>0" class="screen_count">{{s_s.screen.length}}</i></div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="shop_list" ref="shop_list" v-load-more="load_more_handle">
            <template v-if="!shop_list || shop_list.length <= 0">
                <div class="shop_none">
                    <i class="iconempty"></i>
                    <p>哎呀，没有找到能够送餐的餐厅</p>
                </div>
            </template>
            <template v-else>
                <shop-item v-for="(i, idx) in shop_list" :key="idx"></shop-item>
                <div v-if="show_loading" class="loading-box">
                    <p>正在加载中...</p>
                    <div class="img_loading"></div>
                </div>
                <div v-else>
                    <p class="shop_no_more">已无更多商户</p>
                </div>
            </template>
        </section>
        <common-footer :selected="1"></common-footer>
        <cus-mask :show="show_mask" @close="closeMask"></cus-mask>
    </div>
</template>

<script>
import commonHeader from "@/components/common/header";
import commonFooter from "@/components/common/footer";
import shopItem from "@/components/shopItem/shopItem";
import cusMask from "@/components/Mask/Mask";
import { getOffsetTop, getStyle } from "@/common/javascript/util";
import { loadMore } from '@/components/mixin.js'
export default {
    name: "home",
    data() {
        return {
            category_list: [
                {
                    img:
                        "http://p1.meituan.net/jungle/8b5e1702d4145ccf058ba5fb31008c5310912.png",
                    text: "美食"
                },
                {
                    img:
                        "http://p0.meituan.net/jungle/45ff2f098a20a77122bff8385192f0ec10547.png",
                    text: "美团超市"
                },
                {
                    img:
                        "http://p1.meituan.net/jungle/12a9834827909fa55f54bce96e67470711250.png",
                    text: "生鲜果蔬"
                },
                {
                    img:
                        "http://p1.meituan.net/jungle/da9181f93dd2e11c5d74cf685470408f10016.png",
                    text: "美团专送"
                },
                {
                    img:
                        "http://p1.meituan.net/jungle/a2a306c5467aba7fac8d7410d161f8db9364.png",
                    text: "下午茶"
                },
                {
                    img:
                        "http://p0.meituan.net/jungle/58b60a312cf86f3a3afc4c96ff0e53438774.png",
                    text: "汉堡披萨"
                },
                {
                    img:
                        "http://p0.meituan.net/jungle/2ec76f8f4f21a4ec163adc7fccfa1a399428.png",
                    text: "小吃馆"
                },
                {
                    img:
                        "http://p0.meituan.net/jungle/2eee7747fd143249b100b9fa5ee5e31d9873.png",
                    text: "家常菜"
                },
                {
                    img:
                        "http://p1.meituan.net/jungle/dfd03fd91f640682c16179ba85837f739679.png",
                    text: "鲜花蛋糕"
                },
                {
                    img:
                        "http://p1.meituan.net/jungle/99fb0a3687a7ad570d015ec081ff396a9989.png",
                    text: "品牌连锁"
                }
            ],
            sort_list: [
                "综合排序",
                "速度最快",
                "评分最高",
                "起送价最低",
                "配送费最低",
                "人均高到低",
                "人均低到高"
            ],
            screen_list: [
                {
                    title: "专送",
                    multiple: false,
                    content: [{class: null, icon_class: null, selected: false, text: "美团专送"}]
                },
                {
                    title: "商家特色(可多选)",
                    multiple: true,
                    content: [
                        { class: null, icon_class: null, selected: false, text: "免费配送" },
                        { class: null, icon_class: null, selected: false, text: "0元起送" },
                        { class: null, icon_class: null, selected: false, text: "新商家" },
                        { class: null, icon_class: null, selected: false, text: "品牌商家" },
                        { class: null, icon_class: null, selected: false, text: "点评高分" },
                        { class: null, icon_class: null, selected: false, text: "跨天预定" },
                        { class: null, icon_class: null, selected: false, text: "支持开发票" }
                    ]
                },
                {
                    title: "人均价",
                    multiple: false,
                    content: [
                        { class: null, icon_class: null, selected: false, text: "20元以下" },
                        { class: null, icon_class: null, selected: false, text: "20-40元" },
                        { class: null, icon_class: null, selected: false, text: "40元以上" }
                    ]
                },
                {
                    title: "优惠活动(单选)",
                    multiple: false,
                    content: [
                        { class: 'discounted_item', icon_class: 'icon10', selected: false, text: "优惠商家" },
                        { class: 'discounted_item', icon_class: 'icon11', selected: false, text: "首单立减" },
                        { class: 'discounted_item', icon_class: 'icon12', selected: false, text: "满减优惠" },
                        { class: 'discounted_item', icon_class: 'icon13', selected: false, text: "进店领券" },
                        { class: 'discounted_item', icon_class: 'icon14', selected: false, text: "第二份半价" },
                        { class: 'discounted_item', icon_class: 'icon15', selected: false, text: "满返代金券" },
                        { class: 'discounted_item', icon_class: 'icon16', selected: false, text: "折扣商品" },
                        { class: 'discounted_item', icon_class: 'icon17', selected: false, text: "提前下单优惠" },
                        { class: 'discounted_item', icon_class: 'icon18', selected: false, text: "满赠活动" },
                        { class: 'discounted_item', icon_class: 'icon19', selected: false, text: "门店新客立减" },
                    ]
                }
            ],
            show_location: true,
            shop_list: [1, 1, 1, 1,1,1,1,1,1],
            show_sort: false, // 综合排序
            show_screen: false, // 筛选
            show_mask: false, // 显示遮罩层
            offset_top: 0,
            fix_to_top: false,
            show_loading: true,
            s_s: {
                selected: "",
                screen: [],
                show_screen_count: false
            }
        };
    },
    mounted() {
        this.listen_scroll();
    },
    destoryed() {
        window.removeEventListener("scroll");
    },
    methods: {
        // 获取店家数据
        async getShop(sort_type) {
            sort_type = sort_type || 0;
            return await this.$apis.shop.getList(sort_type);
        },

        // 综合排序和筛选框显示
        sort(num) {
            let offsetTop = getOffsetTop(this.$refs.shop_list);
            window.scrollTo(0, offsetTop);
            if (num === 10) {
                this.show_sort = !this.show_sort;
                this.show_mask = this.show_sort;
                this.show_screen = false;
            } else if (num === 40) {
                this.show_screen = !this.show_screen;
                this.show_mask = this.show_screen;
                this.show_sort = false;
            } else {
                this.s_s.selected = num;
                this.closeMask();
            }
        },

        screen_handle(type, category, multiple, type_idx, category_index) {
            if (!multiple) {
                this.screen_list[category_index].content.forEach(item => {
                    if (item.text !== type) {
                        let i = this.s_s.screen.indexOf(item.text);
                        if (i > -1) { this.s_s.screen.splice(i, 1); }
                        item.selected = false;
                    }
                });
            }
            if (this.s_s.screen.includes(type)) {
                this.screen_list[category_index].content[type_idx].selected = false;
                this.s_s.screen.splice(this.s_s.screen.indexOf(type), 1)
            } else {
                this.screen_list[category_index].content[type_idx].selected = true;
                this.s_s.screen.push(type);
            }
            
            
        },

        screen_over(flag) {
            this.closeMask();
            if (flag) {
                this.s_s.show_screen_count = true;
            } else {
                this.s_s.show_screen_count = false;
                this.s_s.screen = [];
                this.screen_list.forEach(i => {
                    i.content.forEach(item => {
                        item.selected = false;
                    })
                })
            }
        },

        closeMask() {
            this.show_sort = false;
            this.show_screen = false;
            this.show_mask = false;
        },

        listen_scroll(ev) {
            this.offset_top = getOffsetTop(this.$refs.screen_group);
            window.addEventListener("scroll", ev => {
                    if ( document.documentElement.scrollTop >= (this.offset_top - getStyle(this.$refs.top_header, "height"))) {
                        this.fix_to_top = true;
                        this.show_location = false;
                    } else {
                        this.fix_to_top = false;
                        this.show_location = true;
                    }
                }, false);
        },

        load_more_handle() {
            let that = this;
            let temp = JSON.parse(JSON.stringify(that.shop_list)).slice(0, 10)
            that.shop_list = [...that.shop_list, ...temp];
            console.log(that.shop_list.length)
            return true;
        }
    },
    mixins: [loadMore],
    components: {
        commonHeader,
        commonFooter,
        cusMask,
        shopItem
    }
};
</script>
<style lang="scss" scoped>
@import "src/common/style/mixin";

#home {
    padding-top: 50px;
}
.category_list {
    ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        padding: 15px 5px 0 5px;
        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 20%;
            margin-bottom: 10px;
            img {
                width: 44px;
                height: 44px;
            }
            span {
                font-size: 14px;
                padding-top: 4px;
            }
        }
    }
}
.near_shop {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0 5px 0;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    &::before,
    &::after {
        @include borderCenter;
    }
    &::before {
        margin-right: -3px;
    }
    &::after {
        margin-left: -3px;
    }
}
.screen_group {
    width: 100%;
    > div {
        position: relative;
        z-index: 100;
        width: 100%;
        background: #fff;
        > ul {
            position: absolute;
            z-index: 101;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            background: #fff;
            &::before,
            &::after {
                position: absolute;
                left: 0;
                @include borderBottom
            }
            &::before { top: 0 };
            &::after { bottom: 0 }
            > .screen_item {
                position: relative;
                width: 25%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                line-height: 40px;
                color: #666;
                .iconmore {
                    transition: all 0.4s;
                }
                .iconmore.rotate {
                    transform: rotate(180deg);
                }
                .screen_count {
                    width: 15px;
                    height: 15px;
                    font-size: 12px;
                    color: #fff;
                    line-height: 15px;
                    text-align: center;
                    font-weight: 600;
                    background: #000;
                    border-radius: 50%;
                    font-style: normal;
                }
            }
            > .screen_item.selected {
                color: 333;
                font-weight: 600;
            }
            
        }
        > .screen_panel {
            padding-top: 40px;
            ul {
                width: 100%;
                @include flexBox(column, center, flex-start);
                background: #fff;
                > li {
                    position: relative;
                    width: 100%;
                    padding-left: 10px;
                    font-size: 14px;
                    line-height: 40px;
                    color: #333;
                    font-weight: normal;
                    &:after {
                        content: "";
                        position: absolute;
                        z-index: 100;
                        left: 0;
                        bottom: 0;
                        @include borderBottom(100%, 1px);
                    }
                }
                > li.selected {
                    color: #ffb000;
                    font-weight: 600;
                }
            }
            > ul.shaixuan {
                width: 100%;
                max-height: 400px;
                padding-bottom: 50px;
                overflow-x: hidden;
                overflow-y: scroll;
                @include flexBox(column, flex-start);
                > li {
                    position: relative;
                    width: 100%;
                    margin-bottom: 10px;
                    &::after {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        @include borderBottom;
                    }
                    > div {
                        @include flexBox(column, center, flex-start);
                        padding: 0 15px;
                        margin-bottom: 10px;
                        .title {
                            font-size: 12px;
                            color: #999;
                            line-height: 22px;
                        }
                        .content {
                            width: 100%;
                            ul {
                                @include flexBox(row,space-between,center,wrap);
                            }
                            li {
                                width: 30%;
                                margin-bottom: 10px;
                                padding: 0;
                                text-align: center;
                                font-size: 12px;
                                line-height: 30px;
                                border: 1px solid #ccc;
                            }
                            li.discounted_item {
                                width: 50%;
                                text-align: left;
                                border: none;
                            }
                        }
                    }
                }
                > li.btn-group {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    z-index: 100;
                    margin-bottom: 0;
                    background: #fff;
                    @include flexBox;
                    > div {
                        flex: 1;
                        display: inline-block;
                        margin-bottom: 0;
                        line-height: 50px;
                        font-size: 16px;
                        color: #333;
                        text-align: center;
                    }
                    > div:last-child {
                        background: #ffd161;
                        @include flexBox;
                    }
                    .screen_count {
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        font-size: 12px;
                        color: #fff;
                        line-height: 15px;
                        text-align: center;
                        font-weight: 600;
                        background: #000;
                        border-radius: 50%;
                        font-style: normal;
                    }
                }
            }
        }
        
    }
}
.screen_group.fixed {
    position: fixed;
    top: 50px;
    left: 0;
    z-index: 100;
}
.shop_list {
    margin-bottom: 40px;
    padding: 15px 0;
    min-height: calc(100vh - 110px);
    .shop_none {
        text-align: center;
        p {
            font-size: 16px;
        }
    }
    .loading-box {
        @include flexBox(column, center, center);
        p {
            font-size: 14px;
        }
    }
    .shop_no_more {
        @include flexBox;
        padding-bottom: 50px;
        text-align: center;
        color: #999;
        font-size: 12px;
        &::before,
        &::after {
            @include borderCenter(100px, 1px, #999);
        }
    }
}
.screen_group.fixed + .shop_list {
    margin-top: 40px;
}
</style>