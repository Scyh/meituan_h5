<template>
    <div id="shop">
        <div>
            <header>
                <!-- 返回 -->
                <div class="back"><i class="iconfont iconarrowdown"></i></div>
                <div class="shop_meta">
                    <div class="shop_meta_left">
                        <img src="">
                    </div>
                    <div class="shop_meta_right">
                        <!-- 时间与距离 -->
                        <div class="s_m_distance">
                            <div><span>{{shop.deliver.time}}</span><span>{{shop.deliver.distance}}</span></div>
                            <i :class="{'img_meituan': shop.deliver.is_meituan}"></i>
                        </div>
                        <!-- 公告 -->
                        <div class="s_m_announce">{{shop.announce}}</div>
                        <!-- 优惠轮播 -->
                        <div class="s_m_discount">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">满32减13;满45减20;满65减25</div>
                                <div class="swiper-slide">折扣商品5折起</div>
                                <div class="swiper-slide">领4元券;领30元券</div>
                                <div class="swiper-slide">实际支付50元返4元商家代金券</div>
                            </div>
                            <i class="iconfont iconmore"></i>
                        </div>
                    </div>
                </div>
            </header>
            
            <article>
                <div class="article_title">
                    <span :class='{"checked": current_content_idx === 1}' @click="switch_tip(0,1)">点评</span>
                    <span :class='{"checked": current_content_idx === 2}' @click="switch_tip('100%',2)">评价</span>
                    <span :class='{"checked": current_content_idx === 3}' @click="switch_tip('200%',3)">商家</span>
                    <div class="title_tip" :style="'transform: translateX('+ title_tip_distance +')'"></div>
                </div>
                <div class="article_content">
                    <div class="content_wrap" :style="'transform: translateX(-'+ title_tip_distance +')'">
                        <section ref="1">
                            <GoogdList :shop_id="shop._id" @selected="get_selected"></GoogdList>
                        </section>
                        <section ref="2">22222222222222222222222</section>
                        <section ref="3">333333333333333333333</section>
                    </div>
                </div>
            </article>

            <footer>
                <!-- 购物栏详情 -->
                <div></div>

                <div class="goods_cart">
                    <div class="g_c_left">
                        <div class="cart_img_wrap">
                            <div :class="['cart_img', selected_count > 0 ? 'img_cart_has' : 'img_cart_none']"></div>
                            <i v-if="selected_count > 0" class="selected_count">{{selected_count}}</i>
                        </div>
                        
                        <div class="deliver_price">另需配送费¥0  {{selected_count}}</div>
                    </div>
                    <div class="g_c_right">
                        <div>¥0起送</div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import GoogdList from '@/views/Shop/Children/GoodsList'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            title_tip_distance: '0',
            current_content_idx: 1,
            current_content_distance: '0',
            selected_count: 0,
            selected_price: 0,
            shop: {
                _id: 111,
                shop_brand_img: '',
                announce: '欢迎光临xxx,xxxxxxxxxxxxxxxxx',  // 公告
                discount: { // 优惠
                    rebate: 5,  // 折扣商品xx折起
                    manjian: [  // 满减优惠，从低到高，匹配时从高到低进行匹配
                        { limit: 32, count: 13 },
                        { limit: 45, count: 20 },
                        { limit: 65, count: 25 },
                    ],
                    achieve: [  // 领xx元券
                        { limit: 30, count: 4 },
                        { limit: 100, count: 30 },
                    ],
                    fan: [  // 实际支付满xx元返回xx元代金券
                        { limit: 50, count: 4 }
                    ],
                    present: [  // 满xx元赠送
                        { limit: 88, gift: '土豆饼一份' }
                    ]
                },
                deliver: {      // 配送信息
                    is_meituan: true,  // 美团专送
                    distance: '945m',
                    time: '30分钟',
                    start_time: '10:00',    // 配送时间
                    end_time: '21:59',      // 配送时间
                    limit: 0,       // 起送费
                    price: 6,       // 配送费
                }
            }
        }
    },
    created() {
        
    },
    mounted() {
        new Swiper('.s_m_discount', {
            direction: 'vertical',
            loop: true,
            autoplay: 1000,
        });
    },
    methods: {
        switch_tip(idx, c_idx) {
            this.title_tip_distance = idx;
            this.current_content_idx = c_idx;
        },

        get_selected() {
            // 获取选择的商品
            let selected = this.$store.getters.get_cart(this.shop._id);
            let count = 0,
                price = 0;
            for(let i in selected) {
                for (let f in selected[i]) {
                    count += selected[i][f].count;
                    price = selected[i][f].count * selected[i][f].price;
                }
            }
            this.selected_count = count;
            this.selected_price = price;
        }
    },
    components: {
        GoogdList,
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

.shop_meta {
    @include flexBox(row, flex-start);
    .shop_meta_left {
        position: relative;
    }
    .shop_meta_right {
    }
}

#shop {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    > div {
        width: 100%;
        height: 100%;
        @include flexBox(column);
    }
    header {
        width: 100%;
        padding-left: 10px;
        flex: 0 0 130px;
        background-color: rgb(46, 47, 59);
        .back {
            width: 100%;
            height: 50px;
            line-height: 50px;
            > i {
                display: inline-block;
                transform: rotate(90deg);
                color: #eee;
            }
        }
        .shop_meta_left {
            width: 80px;
            height: 80px;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 80px;
                height: 80px;
                background: #999;
            }
        }
        .shop_meta_right {
            flex: 1;
            height: 80px;
            @include flexBox(column, space-between, flex-start);
            font-size: 12px;
            color: #fff;
            .s_m_distance,
            .s_m_announce {
                width: 100%;
                padding: 0 15px;
                box-sizing: border-box;
            }
            .s_m_distance {
                @include flexBox(row, space-between);
            }
            .s_m_discount {
                position: relative;
                width: 100%;
                height: 30px;
                padding-left: 15px;
                line-height: 30px;
                background: rgba(255, 255, 255, 0.1);
                overflow: hidden;
                > i {
                    transform: rotate(-90deg);
                    position: absolute;
                    top: 0;
                    right: 20px;
                }
            }
        }
    }
    article {
        flex: 1;
        @include flexBox(column, flex-start, flex-start);
    }
    .article_title {
        position: relative;
        width: 100%;
        @include flexBox;
        > span {
            position: relative;
            flex: 1;
            display: inline-block;
            text-align: center;
            font-size: 16px;
            line-height: 40px;
            color: #666;
            &::after {
                position: absolute;
                left: 0;
                bottom: 0;
                @include borderBottom;
            }
        }
        > span.checked {
            font-weight: 600;
        }
        > .title_tip {
            width: 33.3%;
            height: 1px;
            left: 0;
            bottom: 0;
            position: absolute;
            transition: transform .2s linear;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 42%;
                display: inline-block;
                width: 20px;
                height: 2px;
                background: #ffb000;
            }
            
        }
    }
    .article_content {
        flex: 1;
        width: 100vw;
        overflow-x: hidden;
        .content_wrap {
            @include flexBox(row, flex-start, center, nowrap);
            width: 100vw;
            height: 100%;
            transition: transform .3s linear;
            > section {
                width: 100vw;
                height: 100%;
                flex: 0 0 auto;
            }
        }
    }
    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        .goods_cart {
            @include flexBox(row, space-between);
            width: 100%;
            background: #3b3b3c;
            .g_c_left {
                @include flexBox(row, flex-start);
                .cart_img_wrap {
                    position: relative;
                    height: 50px;
                }
                .cart_img {
                    position: absolute;
                    top: -10px;
                    left: 10px;
                    z-index: 99;
                }
                .selected_count {
                    position: absolute;
                    top: -15px;
                    right: -65px;
                    z-index: 100;
                    @include count;
                }
                .deliver_price {
                    padding-left: 60px;
                    font-size: 14px;
                    color: #999;
                }
            }
            .g_c_right {
                font-size: 16px;
                font-weight: 600;
                color: #999;
                > div {
                    height: 50px;
                    line-height: 50px;
                    padding: 0 20px;
                }
            }
        }
    }
}



</style>