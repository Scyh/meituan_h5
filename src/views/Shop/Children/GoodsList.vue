<template>
    <div id="goods_list">
        <nav v-if="nav.length > 0"  class="list_nav" ref="nav" @touchstart="start" @touchmove="move" @touchend="end">
            <a v-for="(i, idx) in nav" :key="idx" :class="{ 'curr': curr_cate == i }">{{i}}</a>
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
                                    <div class="goods_name">二块新奥尔良烤翅T</div>
                                    <div class="goods_intro">鲜嫩多汁，具烧烤香和甜辣味,主要原料:鸡翅</div>
                                    <div class="goods_meta"><span>月售975</span>&nbsp;&nbsp;赞6</div>
                                    <div class="goods_price">
                                        <span>¥&nbsp;11.5</span>
                                        <div>
                                            <i class="img_goods_del"></i>
                                            <span class="goods_count">1</span>
                                            <i class="img_goods_add"></i>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </template>
        </div>
    </div>
</template>
<script>
import BS from 'better-scroll'
import { getOffsetTop, getStyle } from '@/common/javascript/util'
export default {
    data() {
        return {
            move_start: 0,
            move_last: 0,
            requestFram: null,
            direction: null,
            curr_cate: null,  // 当前分类
            cate_h_list: [],    // 所有分类的高度
            nav: ['热销', '新品上市', '桶', '美味汉堡/卷', '鸡翅/鸡排', '原味鸡', '小食/配餐', '甜品/冰淇淋', '缤纷饮料', 'K 咖啡', '美味早餐', '夜宵套餐', '夜宵单品'],
            goods_list: [
                {
                    category: '热销',
                    list: [
                        {
                            name: '',
                            intro: '这里是一段简单的介绍xxx',
                            sale: 30,
                            zan: 2,
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
                        },
                        {
                            name: '',
                            intro: '这里是一段简单的介绍xxx',
                            sale: 30,
                            zan: 2,
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
                        },
                        {
                            name: '',
                            intro: '这里是一段简单的介绍xxx',
                            sale: 30,
                            zan: 2,
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
                        },

                    ]
                },
                {
                    category: '新品上市',
                    list: [1,2,3,4]
                },
            ],
        }
    },
    created() {
        for (let i = 0; i < 1; i++ ) {
            this.goods_list = [...this.goods_list, i]
        };

        this.goods_list = [];
        this.nav.forEach((i, idx) => {
            this.goods_list.push({
                category: i,
                list: Math.random().toString().substr(2, Math.random() * 5 + 3).split('')
            });
        });
        this.curr_cate = this.nav[0];

        this.$nextTick(() => {
            let base_top = getOffsetTop(this.$refs.content);
            for(let i in this.$refs) {
                if (i.toString().indexOf('g_l_i') > -1) {
                    this.cate_h_list.push( getOffsetTop(this.$refs[i][0]) - base_top )
                }
            };

            
        })
        
    },
    mounted() {

    },
    methods: {
        start(ev) {
            this.move_start = ev.touches[0].pageX;
            this.move_last = ev.touches[0].screenY;
        },

        move(ev) {
            let distance = ev.touches[0].pageX - this.move_start;
            this.direction = ev.touches[0].screenY > this.move_last;
            if (!this.direction) {   // 向上滚
                window.scrollTo(0, Math.ceil(document.documentElement.scrollTop + 3))
                
            } else if (this.direction && this.$refs.content.scrollTop <= 100) {
                window.scrollTo(0, Math.ceil((document.documentElement.scrollTop - 3)))
            }
            this.move_last = ev.touches[0].screenY;

            this.get_curr_cate();
        },
        end(ev) {
            let that = this;
            
            this.requestFram = requestAnimationFrame(() => {
                if (that.$refs.content.scrollTop != that.move_last ) {
                    that.move_last = that.$refs.content.scrollTop;
                    that.end();
                    that.get_curr_cate()
                } else {
                    cancelAnimationFrame(that.requestFram);
                    if (that.direction) {
                        that.$refs.content.scrollTop == 0 ? window.scrollTo(0, 0) : ''
                    } else {
                        that.$refs.content.scrollTop == 0 ? window.scrollTo(0, getOffsetTop(that.$refs.content)) : ''
                    }
                    that.get_curr_cate()
                    that.move_start = 0;
                    that.move_last = 0;
                }
            });
        },

        get_curr_cate(start) {
            start = start || 0;
            let len = this.cate_h_list.length
            if (start < len) {
                if (this.$refs.content.scrollTop >= this.cate_h_list[start] && this.$refs.content.scrollTop <= this.cate_h_list[start + 1]) {
                    this.curr_cate = this.nav[start]
                    console.log(this.nav[start])
                    return false;
                } else {
                    this.get_curr_cate(start + 1);
                }
            } else {
                this.curr_cate = this.nav[len - 1];
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#goods_list {
    @include flexBox(row, flex-start, flex-start);
    height: 100%;
    .list_nav {
        width: 80px;
        height: 100%;
        font-size: 13px;
        color: #666;
        overflow-y: scroll;
        background: #eee;
        @include flexBox(column, flex-start, flex-start);
        a {
            padding: 15px 10px 22px;
            width: 100%;
            box-sizing: border-box;
            text-align: left;
        }
        a.curr {
            background: #fff;
        }
    }
    .list_content {
        flex: 1;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 100%;
        background: #fff;
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
    .g_l_item:last-child {
        min-height: 100%;
    }
}
</style>