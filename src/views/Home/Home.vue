<template>
    <div id="home">
        <top-header ref="top_header" :show_location="show_location"></top-header>
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
                    <li class="screen_item" @click="sort(1)">
                        综合排序
                        <i :class="['iconfont', 'iconmore', show_sort ? 'rotate' : '']"></i>
                        <ul v-if="show_sort">
                            <li data-sort="1">综合排序</li>
                            <li data-sort="2">速度最快</li>
                            <li data-sort="3">评分最高</li>
                            <li data-sort="4">起送价最低</li>
                            <li data-sort="5">配送费最低</li>
                            <li data-sort="6">人均高到低</li>
                            <li data-sort="7">人均低到高</li>
                        </ul>
                    </li>
                    <li class="screen_item" data-sort="10">销量最高</li>
                    <li class="screen_item" data-sort="20">距离最远</li>
                    <li class="screen_item shaixuan" @click="sort(2)">
                        筛选
                        <i class="iconfont iconshaixuan1"></i>
                        <ul v-if="show_screen">
                            <li></li>
                            <li></li>
                            <li>
                                <div>
                                    <section class="title">人均价</section>
                                    <section class="content">
                                        <ul>
                                            <li>20元以下</li>
                                            <li>20-40元以下</li>
                                            <li>40元以上</li>
                                        </ul>
                                    </section>
                                </div>
                            </li>
                            <li class="btn-group">
                                <div>清除筛选</div>
                                <div>完成</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
        <section class="shop_list" ref="shop_list">
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
        <cus-mask :show="show_mask" @close="closeMask"></cus-mask>
    </div>
</template>

<script>
import topHeader from "@/views/common/header";
import shopItem from '@/components/shopItem/shopItem'
import cusMask from "@/components/Mask/Mask";
import { getOffsetTop, getStyle } from "@/common/javascript/util";
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
            show_location: true,
            shop_list: [1,1,1,1,1,1,1,1,1],
            show_sort: false,
            show_screen: false,
            show_mask: false,
            offset_top: 0,
            fix_to_top: false,
            show_loading: false
        };
    },
    mounted() {
        this.listen_scroll();
    },
    destoryed() {
        window.removeEventListener('scroll');
    },
    methods: {
        // 获取店家数据
        async getShop(sort_type) {
            sort_type = sort_type || 0;
            let shops = await this.$apis.shop.getList(sort_type)
        },
        
        // 综合排序
        sort(num) {
            let offsetTop = getOffsetTop(this.$refs.shop_list);
            window.scrollTo(0, offsetTop);
            this.closeMask();
            if (num === 1) {
                this.show_screen = false;
                this.show_sort = !this.show_sort;
            } else if (num === 2) {
                this.show_sort = false;
                this.show_screen = !this.show_screen;
            }
            this.show_mask = !this.show_mask;
        },

        closeMask() {
            this.show_sort = false;
            this.show_screen = false;
            this.show_mask = false;
        },

        listen_scroll(ev) {
            this.offset_top = getOffsetTop(this.$refs.screen_group);
            window.addEventListener("scroll", ev => {
                    if(document.documentElement.scrollTop  > (this.offset_top - getStyle(this.$refs.top_header, 'height'))) {
                        this.fix_to_top = true;
                        this.show_location = false;
                    } else {
                        this.fix_to_top = false
                        this.show_location = true;
                    }
                },
                false
            );
        }
    },
    components: {
        topHeader,
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
        width: 100%;
        height: 40px;
        > ul {
        position: absolute;
        z-index: 100;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        background: #fff;
        > .screen_item {
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
            > ul {
                position: absolute;
                top: 40px;
                left: 0;
                z-index: 100;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                background: #fff;
                width: 100%;
                > li[data-sort] {
                    position: relative;
                    width: 100%;
                    padding-left: 10px;
                    font-size: 14px;
                    line-height: 40px;
                    color: #333;
                    &:after {
                        content: "";
                        position: absolute;
                        z-index: 100;
                        left: 0;
                        bottom: 0;
                        @include borderBottom(100%, 1px);
                    }
                }
            }
        }
        .screen_item.shaixuan {
            > ul {
                width: 100%;
                min-height: 60vh;
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
                                @include flexBox(row, space-between);
                            }
                            li {
                                padding: 0 25px;
                                font-size: 12px;
                                line-height: 30px;
                                border: 1px solid #ccc;
                            }
                        }
                    }
                }
                > li.btn-group {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    margin-bottom: 0;
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
                    }
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

