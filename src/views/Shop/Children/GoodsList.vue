<template>
    <div id="goods_list">
        <nav v-if="nav.length > 0"  class="list_nav" ref="nav"  @touchstart="start" @touchmove="move" @touchend="end">
            <a v-for="(i, idx) in nav" :key="idx" :class="{ 'curr': curr_cate == i.name }" @click="jump_to_cate(idx)">
                {{i.name}}
                <span v-show="cate_count_local[i.name] && cate_count_local[i.name].count" class="cate_count">{{cate_count_local[i.name].count}}</span>
            </a>
        </nav>
        <div v-if="goods_list.length > 0" class="list_content" ref="content" @touchstart="start" @touchmove="move" @touchend="end">
            <template v-if="goods_list.length > 0">
                <section class="g_l_item" v-for="(i, idx) in goods_list" :key="idx" :ref="'g_l_i' + idx">
                    <div class="g_l_i_title">{{i.category}}</div>
                    <div class="g_l_i_content">
                        <ul v-if="i.list.length > 0">
                            <li v-for="(food, index) in i.list" :key="index">
                                <div class="goods_left">
                                    <img src="" alt="">
                                </div>
                                <div class="goods_right">
                                    <div class="goods_name">{{food.name}}</div>
                                    <div class="goods_intro">鲜嫩多汁，具烧烤香和甜辣味,主要原料:鸡翅</div>
                                    <div class="goods_meta"><span>月售{{food.sale}}</span>&nbsp;&nbsp;赞6</div>
                                    <div class="goods_price">
                                        <span>¥&nbsp;{{food.price}}</span>
                                        <div>
                                            <i class="img_goods_del" v-if="cart_local[food.cate] && cart_local[food.cate][food.name] && cart_local[food.cate][food.name].count > 0" @click="set_to_cart(-1,index,food.name,food.price,idx,food.cate)"></i>
                                            <span class="goods_count" v-if="cart_local[food.cate] && cart_local[food.cate][food.name] && cart_local[food.cate][food.name].count > 0">{{cart_local[food.cate][food.name].count}}</span>
                                            <i class="img_goods_add" @click="set_to_cart(1,index,food.name,food.price,idx,food.cate)"></i>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </template>
            
            <div class="curr_cate" ref="curr_cate">{{curr_cate}}</div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getOffsetTop, getScrollTop, getStyle } from '@/common/javascript/util'
export default {
    props: ['shop_id'],
    data() {
        return {
            move_start: 0,
            move_last: 0,
            move_last_scrollTop: 0,
            requestFram: null,
            direction: null,
            curr_cate: null,  // 当前分类
            cate_h_list: [],    // 所有分类的高度
            nav: ['新品上市', '桶', '美味汉堡/卷', '鸡翅/鸡排', '原味鸡', '小食/配餐', '甜品/冰淇淋', '缤纷饮料', 'K 咖啡', '美味早餐', '夜宵套餐', '夜宵单品'],
            goods_list: [
                {
                    category: '热销',
                    list: [
                        {
                            name: String.fromCharCode(Math.random().toString().substr(2,5)) +　String.fromCharCode(Math.random().toString().substr(2,5)),   // 商品名称
                            intro: '这里是一段简单的介绍xxx',   // 商品简介
                            sale: Math.ceil(Math.random() * 100 ),   // 月售
                            zan: 2,     // 赞
                            is_sale_out: false,
                            cate: 'xxx',
                            count: 0,   // 购买数量
                            sale_time: [    // 可售时间
                                { week_day: 1, day_time: '00:00-23:59' },
                                { week_day: 2, day_time: '00:00-23:59' },
                                { week_day: 3, day_time: '00:00-23:59' },
                                { week_day: 4, day_time: '00:00-23:59' },
                                { week_day: 5, day_time: '00:00-23:59' },
                                { week_day: 6, day_time: '00:00-23:59' },
                                { week_day: 7, day_time: '00:00-23:59' },
                            ],
                            is_specification: false,
                            price: Math.ceil(Math.random() * 100 + 1),
                            specification: [    // 规格
                                {
                                    title: '规格',  // 规格标题
                                    content: [
                                        { name: '大(份)', price: 14.5, old_price: 14.5, is_discount: false },
                                        { name: '小(份)', price: 11.5, old_price: 11.5, is_discount: false },
                                    ]
                                },
                                {
                                    title: '口味',
                                    cotent: [
                                        { name: '甜辣' },
                                        { name: '孜然' },
                                        { name: '微辣' },
                                        { name: '麻辣' },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            cart_local: {},
            cate_count_local: {},
        }
    },
    computed: {
        cart() {
            return this.$store.state.cart[this.shop_id] || {}
        },
    },
    created() {
        this.init_goods_list();
    },
    mounted() {

    },
    methods: {
        init_goods_list() {
            this.goods_list = [];
            this.nav.forEach((i, idx) => {
                this.goods_list.push({
                    category: i,
                    list: Math.random().toString().substr(2, Math.random() * 5 + 3).split('').map(() => { return {
                            name: String.fromCharCode('2' + Math.random().toString().substr(2,4)) +　String.fromCharCode('2' + Math.random().toString().substr(2,4)),   // 商品名称
                            intro: '这里是一段简单的介绍xxx',   // 商品简介
                            sale: Math.ceil(Math.random() * 100),   // 月售
                            zan: 2,     // 赞
                            is_sale_out: false, // 是否售罄
                            count: 0,   // 购买数量
                            cate: i,
                            sale_time: [    // 可售时间
                                { week_day: 1, day_time: '00:00-23:59' },
                                { week_day: 2, day_time: '00:00-23:59' },
                                { week_day: 3, day_time: '00:00-23:59' },
                                { week_day: 4, day_time: '00:00-23:59' },
                                { week_day: 5, day_time: '00:00-23:59' },
                                { week_day: 6, day_time: '00:00-23:59' },
                                { week_day: 7, day_time: '00:00-23:59' },
                            ],
                            is_specification: false,
                            price: Math.ceil(Math.random() * 40 + 1),
                            specification: [    // 规格
                                {
                                    title: '规格',  // 规格标题
                                    content: [
                                        { name: '大(份)', price: 14.5, old_price: 14.5, is_discount: false },
                                        { name: '小(份)', price: 11.5, old_price: 11.5, is_discount: false },
                                    ]
                                },
                                {
                                    title: '口味',
                                    cotent: [
                                        { name: '甜辣' },
                                        { name: '孜然' },
                                        { name: '微辣' },
                                        { name: '麻辣' },
                                    ]
                                }
                            ]
                        } })
                });
            });


            this.nav.unshift('热销');
            let len = Math.ceil(Math.random() * 7 + 3),
                temp = [];
            this.goods_list.forEach(i => {
                temp = [...temp, ...i.list];
            });
            temp.sort((a, b) => a.sale - b.sale)
            this.goods_list.unshift({
                category: '热销',
                list: temp.sort().slice(0, len - 1),
            });


            this.nav = this.nav.map(i => {
                return { name: i, count: 0 }
            })
            this.curr_cate = this.nav[0].name;

            this.$nextTick(() => {
                let base_top = getOffsetTop(this.$refs.content);
                for(let i in this.$refs) {
                    if (i.toString().indexOf('g_l_i') > -1) {
                        this.cate_h_list.push( getOffsetTop(this.$refs[i][0]) - base_top )
                    }
                };
            })
        },

        start(ev) {
            this.move_start = ev.touches[0].pageY;
            this.move_last = ev.touches[0].pageY;
        },

        move(ev) {
            let distance = ev.touches[0].pageY - this.move_last;
            this.direction = ev.touches[0].pageY > this.move_last;
            if (this.$refs.content.scrollTop <= 130) {
                this.$parent.$refs.scroll_wrap.scrollTo(0, this.$parent.$refs.scroll_wrap.scrollTop - distance)    
            }
            this.move_last = ev.touches[0].pageY;
            this.move_last_scrollTop = this.$refs.content.scrollTop
            this.get_curr_cate();
        },
        
        end(ev) {
            let timer,
                that = this;
            function trigger() {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    if (that.$refs.content.scrollTop != that.move_last_scrollTop) {
                        if (that.$parent.$refs.scroll_wrap.scrollTop <= 130 && that.$refs.content.scrollTop <= 170) {
                            let distance = that.$refs.content.scrollTop - that.move_last_scrollTop
                            console.log(distance)
                            that.$parent.$refs.scroll_wrap.scrollBy(0, distance);
                        }
                        that.move_last_scrollTop = that.$refs.content.scrollTop
                        trigger();
                        that.get_curr_cate();
                    } else {
                        clearTimeout(timer);
                        that.move_start = 0;
                        that.move_last = 0;
                    }
                }, 20)
                
            }
            trigger();
        },

        get_curr_cate(start) {
            start = start || 0;
            let len = this.cate_h_list.length,
                disY = 10;
            if (start < len) {
                if (this.$refs.content.scrollTop >= (this.cate_h_list[start] - disY) && this.$refs.content.scrollTop <= (this.cate_h_list[start + 1] - disY)) {
                    this.curr_cate = this.nav[start].name
                    return false;
                } else {
                    this.get_curr_cate(start + 1);
                }
            } else {
                this.curr_cate = this.nav[len - 1].name;
            }
        },

        jump_to_cate(idx, distance) {
            let ref_sTop = this.$refs.content.scrollTop,
                targ_sTop = this.cate_h_list[idx] - 8;
            this.requestFram = requestAnimationFrame(() => {
                if (ref_sTop != targ_sTop) {
                    let disY = targ_sTop - this.$refs.content.scrollTop;
                    distance = distance ? (Math.abs(disY) > Math.abs(distance) ? distance : disY) : Math.ceil((targ_sTop - ref_sTop) / 10);
                    this.$refs.content.scrollBy(0, distance);
                    this.jump_to_cate(idx, distance)
                } else {
                    cancelAnimationFrame(this.requestFram);
                    this.get_curr_cate();
                }
            });
        },

        // 添加到购物车
        set_to_cart(count, food_idx, food_name, food_price, cate_idx, cate, food_standard) {
            let _cart = Object.assign({}, this.cart_local);
            if (_cart[cate]) {
                if (_cart[cate][food_name]) {
                    _cart[cate][food_name].count += count;
                    _cart[cate][food_name].count <= 0 && delete _cart[cate][food_name]
                    Object.keys(_cart[cate]).length <= 0 && delete _cart[cate]
                } else {
                    _cart[cate][food_name] = { count: count, price: food_price, food_idx, cate_idx, cate, food_standard }
                }
            } else {
                _cart[cate] = {};
                _cart[cate][food_name] = { price: food_price, count: 1, food_price, food_idx, cate_idx, cate, food_standard }
            }
            this.$store.commit('set_goods_to_cart', { shop_id: this.shop_id, data_obj: _cart});
            this.cart_local = this.$store.getters.cart(this.shop_id);

            this.cate_count_local = this.update_cate_count(_cart);

            this.$emit('selected');
        },

        update_cate_count(_cart) {
            let obj = {};
            Object.keys(_cart).forEach(i => {
                let count = 0;
                Object.keys(_cart[i]).forEach(food => {
                    count += _cart[i][food].count;
                });
                obj[i] = { count }
            });
            return obj
        }
    },
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#goods_list {
    @include flexBox(row, flex-start, flex-start);
    height: 100%;
    .list_nav {
        @include flexBox(column, flex-start, flex-start);
        width: 80px;
        height: 100%;
        padding-bottom: 80px;
        font-size: 13px;
        color: #666;
        overflow-y: scroll;
        background: #eee;
        a {
            padding: 15px 10px 22px;
            width: 100%;
            box-sizing: border-box;
            text-align: left;
            position: relative;
        }
        a.curr {
            background: #fff;
        }
        .cate_count {
            position: absolute;
            top: 0;
            right: 0;
            @include count;
        }
    }
    .list_content {
        position: relative;
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 100%;
        background: #fff;
        .curr_cate {
            position: fixed;
            top: 0;
            left: 80px;
            width: calc(100% - 80px);
            height: 36px;
            z-index: 99;
            padding-left: 10px;
            font-size: 12px;
            line-height: 36px;
            background: #fff;
            box-sizing: border-box;
        }
        .g_l_item:last-of-type {
            min-height: 100%;
        }
    }

    .g_l_item {
        .g_l_i_title {
            width: 100%;
            height: 36px;
            padding-left: 10px;
            font-size: 12px;
            line-height: 36px;
            background: #fff;
        }
        .g_l_i_content {
            ul {
                padding: 0 10px;
                li {
                    @include flexBox(row, flex-start, flex-start);
                    margin-bottom: 20px;
                    .goods_left {
                        width: 75px;
                        height: 75px;
                        flex: 0 0 75px;
                        margin-right: 10px;
                        img {
                            display: inline-block;
                            width: 100%;
                            height: 100%;    
                            background: #ccc;
                        }
                    }
                    .goods_right {
                        flex: 1;
                        overflow: hidden;
                        .goods_name {
                            margin-bottom: 3px;
                            font-size: 16px;
                            font-weight: 600;
                        }
                        .goods_intro,
                        .goods_meta {
                            margin-bottom: 3px;
                            font-size: 12px;
                            color: #666;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .goods_price {
                            @include flexBox(row, space-between);
                            font-size: 18px;
                            color: #fb4e44;
                            > div {
                                color: #333;
                                @include flexBox(row, space-between);
                                .goods_count {
                                    margin: 0 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>