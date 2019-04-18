<template>
    <div id="home">
        <top-header></top-header>
        <section class="category_list">
            <ul>
                <li v-for="(i, idx) in category_list" :key="idx">
                    <img :src="i.img">
                    <span>{{ i.text }}</span>
                </li>
            </ul>
        </section>
        <section class="near_shop">附近商家</section>
        <section class="screen_group">
            <ul>
                <li class="screen_item" @click="sort">综合排序 <i class="iconfont iconmore"></i></li>
                <li class="screen_item">销量最高</li>
                <li class="screen_item">距离最远</li>
                <li class="screen_item">筛选<i class="iconfont iconshaixuan1"></i></li>
            </ul>
        </section>
        <section class="shop_list" ref="shop_list">
            <template v-if="!shop_list || shop_list.length <= 0">
                <div class="shop_none">
                    <i class="iconempty"></i>
                    <p>哎呀，没有找到能够送餐的餐厅</p>
                </div>                    
            </template>
        </section>
    </div>
</template>

<script>
import topHeader from '@/views/common/header'
import { getOffsetTop } from '@/common/javascript/util'
export default {
    name: "home",
    data() {
        return {
            category_list: [
                {
                    img: "http://p1.meituan.net/jungle/8b5e1702d4145ccf058ba5fb31008c5310912.png",
                    text: "美食"
                },
                {
                    img: "http://p0.meituan.net/jungle/45ff2f098a20a77122bff8385192f0ec10547.png",
                    text: "美团超市"
                },
                {
                    img: "http://p1.meituan.net/jungle/12a9834827909fa55f54bce96e67470711250.png",
                    text: "生鲜果蔬"
                },
                {
                    img: "http://p1.meituan.net/jungle/da9181f93dd2e11c5d74cf685470408f10016.png",
                    text: "美团专送"
                },
                {
                    img: "http://p1.meituan.net/jungle/a2a306c5467aba7fac8d7410d161f8db9364.png",
                    text: "下午茶"
                },
                {
                    img: "http://p0.meituan.net/jungle/58b60a312cf86f3a3afc4c96ff0e53438774.png",
                    text: "汉堡披萨"
                },
                {
                    img: "http://p0.meituan.net/jungle/2ec76f8f4f21a4ec163adc7fccfa1a399428.png",
                    text: "小吃馆"
                },
                {
                    img: "http://p0.meituan.net/jungle/2eee7747fd143249b100b9fa5ee5e31d9873.png",
                    text: "家常菜"
                },
                {
                    img: "http://p1.meituan.net/jungle/dfd03fd91f640682c16179ba85837f739679.png",
                    text: "鲜花蛋糕"
                },
                {
                    img: "http://p1.meituan.net/jungle/99fb0a3687a7ad570d015ec081ff396a9989.png",
                    text: "品牌连锁"
                }


            ],
            shop_list: [],
        }
    },
    methods: {

        // 综合排序
        sort() {
            let offsetTop = getOffsetTop(this.$refs.shop_list);
            window.scrollTo(0, offsetTop);
        }
    },
    components: {
        topHeader
    }
};
</script>
<style lang="scss" scoped>

    #home {
        padding-top: 50px;
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
                content: "";
                display: inline-block;
                width: 60px;
                height: 1px;/*px*/
                background: #333;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
            }
            &::before {
                margin-right: -3px;
            }
            &::after {
                margin-left: -3px;
            }
        }
        .screen_group {
            ul {
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-top: 1px solid #ddd;/*px*/
                border-bottom: 1px solid #ddd;/*px*/
                .screen_item {
                    width: 25%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    line-height: 40px;
                    color: #666;
                }
            }
        }
        .shop_list {
            padding: 15px 0;
            min-height: calc(100vh - 120px);
            .shop_none {
                text-align: center;
                p {
                    font-size: 16px;
                }
            }
        }
    }

</style>

