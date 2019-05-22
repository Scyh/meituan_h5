<template>
    <div id="goods_list">
        <nav v-if="nav.length > 0"  class="list_nav_wrap" ref="nav_wrap">
            <ul>
                <li  v-for="(i, idx) in nav" :key="idx" :class="{ 'curr': curr_cate_idx == idx }" @click="jump_to_cate(idx)">
                    {{i.name}}
                    <span v-if="i.count > 0" class="cate_count">{{i.count}}</span>
                </li>
            </ul>
        </nav>
        <main class="content_wrap" ref="content_wrap">
            <div v-if="goods_list.length > 0" class="list_content" ref="content">
                <template v-if="goods_list.length > 0">
                    <section class="g_l_item" v-for="(i, idx) in goods_list" :key="idx" ref='g_l_i'>
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
                                            <span>¥&nbsp;11.5</span>
                                            <div>
                                                <i class="img_goods_del" v-if="food.count > 0" @click="set_to_cart(-1,index,food.name,food.price,food.count,idx,food.cate)"></i>
                                                <span class="goods_count" v-if="food.count > 0">{{food.count}}</span>
                                                <i class="img_goods_add" @click="set_to_cart(1,index,food.name,food.price,food.count,idx,food.cate)"></i>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </template>
            </div>
            <div class="curr_cate" ref="curr_cate" v-if="curr_y < 0 && nav[curr_cate_idx]" :style="{'top': curr_cate_y}">{{nav[curr_cate_idx].name}}</div>
        </main>
    </div>
</template>
<script>
import BS from 'better-scroll'
import { getOffsetTop, getScrollTop, getStyle } from '@/common/javascript/util'
import { clearTimeout, setTimeout } from 'timers';
export default {
    props: ['shop_id'],
    data() {
        return {
            direction: null,
            cate_h_list: [],    // 所有分类的高度
            curr_y: 0,
            curr_cate_y: 0,
            nav: ['新品上市', '桶', '美味汉堡/卷', '鸡翅/鸡排', '原味鸡', '小食/配餐', '甜品/冰淇淋', '缤纷饮料', 'K 咖啡', '美味早餐', '夜宵套餐', '夜宵单品'],
            goods_list: [],
            cart: {},   // 购物车
            nav_s: null,    // 导航栏滚动
            goods_s: null,  // // 商品栏滚动
        }
    },
    created() {        
        this.init_goods_list();
        this.init_scroll();

    },
    computed: {
        curr_cate_idx() {
            for(let i = 0; i < this.cate_h_list.length; i ++) {
                let start = this.cate_h_list[i],
                    end = this.cate_h_list[i + 1];
                if (!end || (Math.abs(this.curr_y) >= start && Math.abs(this.curr_y) < end)) {
                    return i;
                }
            }
        }
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

            this.$nextTick(() => {
                this.cate_h_list.push(0);
                this.$refs.g_l_i.forEach((i, idx) => {
                   this.cate_h_list.push(getStyle(i, 'height') + 15 + this.cate_h_list[idx])
                });
            })
        },

        init_scroll() {
            this.$nextTick(() => {
                this.nav_s = new BS(this.$refs.nav_wrap, {
                    click: true,
                });
                this.goods_s = new BS(this.$refs.content_wrap, {
                    click: true,
                    probeType: 3
                });
                this.goods_s.on('scroll', pos => {
                    this.curr_y = pos.y;
                    //  this.curr_cate_idx; 当前的分类
                    // 差 10px
                    let disY = this.cate_h_list[this.curr_cate_idx + 1] - Math.abs(pos.y),
                        num = 20;
                    if ( disY <= num) {
                        this.curr_cate_y = Math.abs(disY - num) * -1 + 'px';
                    } else {
                        this.curr_cate_y = 0;
                    }
                })
            })
        },
        
        jump_to_cate(idx, distance) {
            let el = this.$refs.g_l_i[idx];
            this.goods_s.scrollToElement(el, 300, 0, 0);
        },

        // 添加到购物车
        set_to_cart(count, food_idx, food_name, food_price, food_count, cate_idx, cate) {
            this.goods_list[cate_idx].list[food_idx].count = this.goods_list[cate_idx].list[food_idx].count + count;
            this.nav.forEach(i => {
                i.name === cate && (i.count = i.count + count);
            });

            if(this.cart[cate]) {
                if (food_count === 0) {
                    delete this.cart[cate][food_name];
                } else {
                    this.cart[cate] = {
                        [food_name]: { price: food_price, count: food_count + count }
                    }
                }
            } else {
                this.cart[cate] = {};
                this.cart[cate][food_name] = { price: food_price, count: food_count + count };
            }
            this.$store.commit('set_goods_to_cart', { shop_id: this.shop_id, data_obj: this.cart});
            this.$emit('selected');
        },
        
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#goods_list {
    @include flexBox(row, flex-start, flex-start);
    height: 100%;
    .list_nav_wrap {
        flex: 0 0 80px;
        height: 100%;
        font-size: 13px;
        color: #666;
        background: #eee;
        ul {
            padding-bottom: 80px;
            li {
                display: inline-block;
                padding: 15px 10px 22px;
                width: 100%;
                box-sizing: border-box;
                text-align: left;
                position: relative;
            }
        }
        .curr {
        background: #fff;
        }
        .cate_count {
            position: absolute;
            top: 0;
            right: 0;
            @include count;
        }
    }
    .content_wrap {
        position: relative;
        height: 100%;
        overflow: hidden;
        .curr_cate {
            position: fixed;
            top: 0;
            left: 80px;
            width: 100%;
            height: 36px;
            padding-left: 10px;
            font-size: 12px;
            line-height: 36px;
            background: #fff;
        }
    }
    .list_content {
        overflow-x: hidden;
        background: #fff;
        padding-bottom: 50px;
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