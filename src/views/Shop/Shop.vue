<template>
    <div id="shop">
        <div id="scroll_wrap" ref="scroll_wrap">
            <header>
                <!-- 返回 -->
                <div class="back" @click="back($router)"><i class="iconfont iconarrowdown"></i></div>
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
                                <div class="swiper-slide swiper-no-swiping">满32减13;满45减20;满65减25</div>
                                <div class="swiper-slide swiper-no-swiping">折扣商品5折起</div>
                                <div class="swiper-slide swiper-no-swiping">领4元券;领30元券</div>
                                <div class="swiper-slide swiper-no-swiping">实际支付50元返4元商家代金券</div>
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
                            <GoogdList :idx="current_content_idx" ref="goodList" :shop_id="shop._id" @selected="get_selected" @show_food_modal="handle_show_modal"></GoogdList>
                        </section>
                        <section ref="2">
                            <Comments :idx="current_content_idx" />
                        </section>
                        <section ref="3">
                            <ShopInfo :idx="current_content_idx" />
                        </section>
                    </div>
                </div>
            </article>

            <footer v-show="title_tip_distance == 0">
                <!-- 购物栏详情 -->
                <transition name="slideUp">
                    <div class="cart_detail" v-if="show_cart">
                        <div class="cart_title">
                            <span>购物车</span>
                            <span @click="clear_cart">清空购物车</span>
                        </div>
                        <div class="cart_content">
                            <template v-if="cart.length > 0">
                                <template v-for="i in cart">
                                    <div class="cart_item" v-if="i.count > 0" :key="i.name">
                                        <div class="c_i_left">
                                            <div class="c_i_l_name">
                                                <p class="food_name">{{i.food_name}}</p>
                                                <p class="food_standard">份(份)</p>
                                            </div>
                                            <div class="c_i_l_price">¥{{i.price}}</div>
                                        </div>
                                        <div class="c_i_right">
                                            <i class="img_goods_del" @click="handle_set_cart(false,-1,i.food_idx,i.food_name,i.price,i.cate_idx,i.cate)"></i>
                                                <span class="goods_count" @click="handle_set_cart(false,1,i.food_idx,i.food_name,i.price,i.cate_idx,i.cate)">{{i.count}}</span>
                                            <i class="img_goods_add"></i>
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <div class="cart_item">
                                <div class="c_i_left">
                                    <div class="c_i_l_name">
                                        <p class="food_name">包装费</p>
                                    </div>
                                    <div class="c_i_l_price">¥0</div>
                                </div>
                                <div class="c_i_right">
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <div class="goods_cart">
                    <div class="g_c_left" @click="toggle_cart">
                        <div class="cart_img_wrap">
                            <div :class="['cart_img', selected_count > 0 ? 'img_cart_has' : 'img_cart_none']"></div>
                            <i v-if="selected_count > 0" class="selected_count">{{selected_count}}</i>
                        </div>
                        <div class="deliver_price">
                            <p v-show="selected_price > 0"><span class="font-n">¥</span><span class="selected_price">{{selected_price}}</span></p>
                            <p :class='{ "small": selected_price > 0 }'>另需配送费¥{{shop.deliver.price}}</p>
                        </div>
                    </div>
                    <div class="g_c_right">
                        <div v-if="selected_price <= 0">¥{{shop.deliver.limit}}起送</div>
                        <div v-else-if="selected_price > 0 && shop.deliver.limit > selected_price">还差{{shop.deliver.limit - selected_price}}起送</div>
                        <div class="settle_account" v-else>去结算</div>
                    </div>
                </div>
            </footer>
        </div>

        <div class="food_modal" v-show="Object.keys(food_detail).length > 0" @click="food_detail = {}">
            <transition name="scale">
                <div v-show="Object.keys(food_detail).length > 0" @click="food_detail = {}">
                   <div class="modal_top">
                    <div class="food_img"></div>
                    <div class="food_info">
                        <p class="f_i_name">{{food_detail.name}}</p>
                        <p class="f_i_meta"><span>月售{{food_detail.sale}}</span><span>赞{{food_detail.zan}}</span></p>
                        <p class="f_i_intro">{{food_detail.intro}}</p>
                    </div>
                    <div class="food_price">
                        <span class="price">¥{{food_detail.price}}</span>
                        <span class="to_cart" @click="handle_set_cart(false, 1, food_detail.food_idx, food_detail.name, food_detail.price, food_detail.cate_idx, food_detail.cate, food_detail.standard, food_detail.is_discount, food_detail.old_price, food_detail.limit)">加入购物车</span>
                    </div>
                </div>
                <div class="modal_bottom"></div>
                </div>
            </transition>
        </div>

        <mMask ref="mask" :show="show_mask" @close="toggle_cart" />


        <div v-if="loading" class="loading"> loading........... </div>
    </div>
</template>
<script>
import GoogdList from '@/views/Shop/Children/GoodsList'
import Comments from '@/views/Shop/Children/Comments'
import ShopInfo from '@/views/Shop/Children/ShopInfo'
// let GoogdList = r => require.ensure([], () => r(require('@/views/Shop/Children/GoodsList')), 'shop_goodslist');
// let Comments = r => require.ensure([], () => r(require('@/views/Shop/Children/Comments')), 'shop_comments');
// let ShopInfo = r => require.ensure([], () => r(require('@/views/Shop/Children/ShopInfo')), 'shop__shop_info');
import { mapGetters } from 'vuex'
import { _throttle, _debounce, getScrollTop } from '@/common/javascript/util.js'
import mMask from '@/components/Mask/Mask'
import { back } from '@/components/mixin.js';
export default {
    data() {
        return {
            loading: true,
            title_tip_distance: '0',
            current_content_idx: 1,
            current_content_distance: '0',
            selected_count: 0,
            selected_price: 0,
            selected_old_price: 0,  // 打折之前的总原价
            has_discount_goods: false,  // 是否有打折商品
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
                    limit: 20,       // 起送费
                    price: 6,       // 配送费
                }
            },
            show_cart: false,
            show_mask: false,
            cart: [],    // 购物车详情
            food_detail: {}
        }
    },
    mounted() {
        new Swiper('.s_m_discount', {
            direction: 'vertical',
            loop: true,
            autoplay: 1000,
        });
        this.$nextTick(() => {
            this.loading = false;
        })
    },
    computed: {
        // cart() {
        //     let _cart = this.$store.state.cart[this.shop._id],
        //         temp = [];
        //     console.log(_cart)
        //     if (_cart) {
        //         Object.keys(_cart).forEach(i => {
        //             Object.keys(_cart[i]).forEach(food => {
        //                 temp.push({ food_name: food, ..._cart[i][food] })
        //             })
        //         })
        //     }
        //     return temp
        // }
    },
    mixins: [back],
    watch: {
        selected_count(val) {
            if (val <= 0) {
                this.show_cart = false,
                this.show_mask = false
            }
        }
    },
    methods: {
        switch_tip(idx, c_idx) {
            this.title_tip_distance = idx;
            this.current_content_idx = c_idx;
        },

        get_selected() {
            // 获取选择的商品
            let selected = this.$store.getters.cart(this.shop._id);
            let count = 0,
                price = 0,
                old_price = 0;
            
            for(let i in selected) {
                for (let f in selected[i]) {
                    if (selected[i][f].count > 0) {
                        count += selected[i][f].count;

                        // 判断商品是否打折     
                        if (selected[i][f].is_discount) {
                            // 判断当前的数量是否大于限制数量
                            if(selected[i][f].limit) {
                                if (selected[i][f].count <= selected[i][f].limit) {
                                    price += selected[i][f].count * selected[i][f].price;            
                                } else {
                                    price += selected[i][f].limit * selected[i][f].price + (selected[i][f].count - selected[i][f].limit) * selected[i][f].old_price;
                                }
                            }
                            old_price += selected[i][f].count * selected[i][f].old_price;
                        } else {
                            price += selected[i][f].count * selected[i][f].price;
                        }
                    }
                }
            }
            this.selected_count = count;
            this.selected_price = price;
            this.selected_old_price = old_price;
            this.set_cart_detail(selected);
        },

        toggle_cart() {
            if(this.cart.length > 0) {
                this.show_mask = !this.show_cart
                this.show_cart = !this.show_cart;
            }
        },

        handle_set_cart(clear, count, food_idx, food_name, food_price, cate_idx, cate, food_standard, food_is_discount,food_old_price,food_limit) {
            clear = !!clear
            this.$refs.goodList.set_to_cart(clear, count, food_idx, food_name, food_price, cate_idx, cate, food_standard, food_is_discount,food_old_price,food_limit)
        },

        set_cart_detail(_cart) {
            let temp = [];
            if (_cart) {
                Object.keys(_cart).forEach(i => {
                    Object.keys(_cart[i]).forEach(food => {
                        temp.push({ food_name: food, ..._cart[i][food] })
                    })
                })
            }
            this.cart = temp
        },

        clear_cart() {
            this.handle_set_cart(true)
        },

        handle_show_modal(food) {
            this.food_detail = { ...food }
        }

    },
    components: {
        GoogdList,
        Comments,
        ShopInfo,
        mMask,
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
    overflow-x: hidden;
    > div {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
    }
    header {
        flex: 0 0 130px;
        padding-left: 10px;
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
        @include flexBox(column, flex-start, flex-start);
        height: 100%;
        flex: 1 0 auto;
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
            height: 2px;
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
        overflow: hidden;
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
        z-index: 999;
        .goods_cart {
            position: relative;
            z-index: 999;
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
                    padding-left: 70px;
                    font-size: 14px;
                    color: #999;
                    > p:first-child {
                        color: #fff;
                        .selected_price {
                            font-size: 24px;
                        }
                    }
                    > p.small {
                        font-size: 11px;
                    }
                }
            }
            .g_c_right {
                font-size: 16px;
                font-weight: 600;
                color: #999;
                > div {
                    height: 50px;
                    line-height: 50px;
                    padding: 0 30px;
                }
                .settle_account {
                    color: #333;
                    background: #f8c74e;
                    font-weight: normal;
                }
            }
        }
        .cart_detail {
            position: absolute;
            bottom: 50px;
            left: 0;
            width: 100%;
            z-index: 98;
            background: #fff;

            .cart_title {
                height: 30px;
                padding: 4px 15px;
                line-height: 30px;
                font-size: 12px;
                background: #F4F4F4;
                @include flexBox(row, space-between)
            }
            .cart_content {
                .cart_item {
                    padding: 15px;
                    @include flexBox(row, space-between);
                    background: #fff;
                    border-bottom: 1ps solid #aaa;
                    .c_i_left {
                        flex: 1;
                        margin-right: 15px;
                        @include flexBox(row, space-between);
                        .food_standard {
                            font-size: 12px;
                            color: #999;
                        }
                        .c_i_l_price {
                            color: #FB4E44;

                        }
                    }
                    .c_i_right {
                        min-width: 80px;
                        @include flexBox(row, space-between);
                    }
                }
            }
        }
    }
}

.food_modal {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    .modal_top {
        min-width: 84vw;
        max-width: 88vw;
        height: 50vh;
        margin-top: 15vh;
        background: #fff;
        border-radius: 25px;
        @include flexBox(column);
        .food_img {
            flex: 1;
            width: 100%;
            height: 100%;
            background-image: url('~src/assets/food_img.png');
            background-size: cover;
            border-top-left-radius: 25px;
            border-top-right-radius: 25px;
        }
        .food_info {
            flex: 0 0 75px;
            width: 100%;
            padding: 10px 0 0 0;
            overflow-y: scroll;
            .f_i_name {
                margin-bottom: 2px;
                padding: 0 15px;
                font-weight: 600;
            }
            .f_i_meta {
                padding: 0 15px;
                font-size: 12px;
                color: #666;
                > span:not(:last-child) {
                    margin-right: 10px;
                }
            }
            .f_i_intro {
                margin: 15px 0 0 0;
                padding: 0 15px;
                font-size: 12px;
                color: #666;
            }
        }
        .food_price {
            @include flexBox(row, space-between);
            flex: 0 0 45px;
            width: 100%;
            padding: 0 15px;
            box-sizing: border-box;
            .price {
                font-size: 24px;
                color: #fb4e44
            }
            .to_cart {
                display: inline-block;
                padding: 0 15px;
                height: 25px;
                line-height: 25px;
                font-size: 12px;
                text-align: center;
                background: #FFD161;
                background-image: linear-gradient(-135deg, #FFBD27 0%, #FFD161 100%);
                border-radius: 25px;
            }
        }
    }
    .modal_bottom {
        width: 40px;
        height: 40px;
        margin: 30px auto 0;
        background: url('~src/assets/close.png') no-repeat;
        background-size: cover;
    }
}

.slideUp-enter-active,
.slideUp-leave-active,
.scale-enter-active,
.scale-leave-active {
    transition: all .2s;
}
.slideUp-enter,
.slideUp-leave-to {
    transform: translateY(80%);
    opacity: 0;
}

.scale-enter,
.scale-leave-to {
    transform: scale(0.3);
    opacity: 0;
}

.loading {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    background-color: rgba(0, 0, 0, .9);
}
</style>