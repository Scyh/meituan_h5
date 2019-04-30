<template>
    <div id="order" v-load-more="load_more_handle">
        <template v-if="order_list.length > 0" v-for="(i, idx) in order_list">
                <section class="order-item" :key="idx">
                    <div class="box">
                        <div class="box-title">
                            <div class="title-left">
                                <img src="">
                                <p>烧锅奶奶木桶饭&炖品</p>
                            </div>
                            <div class="title-right"><i class="img_right_arrow"></i></div>
                        </div>
                        <div class="box-content">
                            <ul>
                                <li><div class="food_name">虎邦辣椒30g</div><div class="food_count">x1</div></li>
                                <li><div class="food_name">鱼香肉丝木桶饭</div><div class="food_count">x1</div></li>

                                <li><div class="order_time">2019-04-08 10:50</div><div class="order_price">实付¥11.3</div></li> 
                            </ul>
                        </div>
                        <div class="box-foot">
                            <div class="foot-left">订单已完成</div>
                            <div class="foot-right">
                                <div class="btn-remove"  @click="show_confirm(idx)">删除</div>
                                <div class="btn-remore">再来一单</div>
                            </div>
                        </div>
                    </div>
                </section>
        </template>
        <template v-else>
            <p>暂无订单</p>
        </template>
        <cconfirm ref="confirm" :message="'确认删除该订单？'" @confirm="remove"></cconfirm>
    </div>
</template>
<script>
import { loadMore } from '@/components/mixin.js'

export default {
    data() {
        return {
            order_list: [
                {
                    // 订单详情
                    food_list: [
                        { name: '虎邦辣椒30g', count: 1, price: 5 },
                        { name: '鱼香肉丝木桶饭', count: 1, price: 29.8 }
                    ],
                    packing_price: 1,   // 餐盒费
                    deliver_price: 3.5, // 配送费
                    discount: [ // 优惠
                        { name: '减配送费', price: 2, icon: '' },
                        { name: '美团红包', price: 6, icon: '' },
                        { name: '满减优惠', price: 20, icon: '' },
                    ],
                    pay_way: '',    // 支付方式
                    order_time: '', // 下单时间,
                    order_id: '',   // 订单编号
                    total_price: 39.3,  // 总计
                    discount_price: 28, // 满减优惠
                    real_price: 11.3,   // 实际支付

                    // 商家详情
                    shop_info: {
                        name: '',
                        id: '',
                        img: '',
                    },
                    // 配送详情
                    deliver_info: {
                        deliver_address: {      // 配送地址
                            deliver_time: '立即配送',   // 送餐时间
                            contact_name: '赵钱孙李',   // 联系人
                            contact_phone: '18888888888',   // 联系电话
                            address: '置地·栢悦公馆 (栢悦中心写字楼29楼)',  // 地址
                        },
                            deliver_driver: {
                            name: '马军',
                            score: 4.8,
                            phone: 'xxxxxxxxxxx',
                            category: '美团快送'
                        },
                    }
                }
            ],
        }
    },
    created() {
        for(var i = 0; i < 5; i ++) {
            this.order_list.push(this.order_list[0])
        }
    },
    mixins: [loadMore],
    methods: {
        load_more_handle() {
            this.order_list = [...this.order_list, ...this.order_list.slice(0, 5)]
        },

        show_confirm(idx) {
            this.$refs.confirm.show(idx)
        },

        // 删除该订单
        remove(data) {
            if (data > -1 && data.toString()) {
                this.order_list.splice(data, 1);
                this.$tip('订单删除成功！');
            }
        }
    },
    components: {},
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#order {
    background: #f3f3f3;
}

.order-item {
    margin-bottom: 10px;
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    background: #fff;
    .box {
        margin-left: 20px;
        .box-title {
            @include flexBox(row, space-between);
            padding: 10px 0;
            position: relative;
            &:after {
                position: absolute;
                left: 0;
                bottom: 0;
                @include borderBottom(100%, 1px, #d7d7d7)
            }
            .title-left {
                @include flexBox(row, flex-start);
                font-size: 16px;
                img {
                    width: 35px;
                    height: 35px;
                    margin-right: 5px;
                    background: #ccc;
                }
                p {
                    max-width: 200px;
                    @include ellipsis;
                }
            }
            .title-right  {
                margin-right: 10px;
                i {
                    width: 15px;
                    height: 15px;
                }
            }
        }
        .box-content {
            position: relative;
            padding: 10px 0;
            &:after {
                position: absolute;
                left: 0;
                bottom: 0;
                @include borderBottom(100%, 1px, #d7d7d7)
            }
            ul {
                margin-right: 10px;
                li {
                    @include flexBox(row, space-between);
                    line-height: 1.8;
                    color: 000;
                    font-size: 14px;
                    .order_time {
                        color: #999;
                        font-size: 12px;
                    }
                }
            }
        }
        .box-foot {
            @include flexBox(row, space-between);
            margin-right: 10px;
            padding: 10px 0;
            font-size: 14px;
            .foot-left {
                color: #999;
            }
            .foot-right {
                @include flexBox(row, flex-end);
                .btn-remove {
                    margin-right: 20px;
                    padding: 5px 8px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                }
                .btn-remore {
                    padding: 5px 8px;
                    background: $global_color;
                    border-radius: 3px;
                }
            }
        }
    }
}
</style>

