<template>
    <div id="order_info">
        <!-- 订单状态 -->
        <section class="order_status">
            <div class="order_status_top">
                <div class="status">
                    <p class="current_status">订单已完成 <i class="img_right_arrow"></i></p>
                    <p class="status_meta">感谢您对美团外卖的信任，期待再次光临。</p>
                </div>
                <div class="operate">
                    <span class="refundment">申请退款</span>
                    <span class="one_more">再来一单</span>
                    <span class="commit">评价</span>
                </div>
            </div>
            <div class="order_status_bottom">
                <div class="deliver_meta">
                    <div class="meta_img img_deliver"></div>
                    <div class="meta_right">
                        <div class="meta_right_top">赵钱孙<span class="meituan_deliver">美团快送</span></div>
                        <div class="meta_right_bottom"><star :score="4.8" :scale=".7"></star><span>4.8分</span></div>
                    </div>
                </div>
                <div class="deliver_phone img_phone"></div>
            </div>
        </section>
        
        <!-- 订单明细 -->
        <section class="order_detail order_section">
            <div class="o_s_title">订单明细</div>
            <div class="o_s_content">
                <div class="o_s_c_item shop_info">
                    <div class="shop_meta">
                        <span>龙门花甲（青阳北路店）</span>
                        <i class="img_right_arrow"></i>
                    </div>
                    <div class="img_phone"></div>
                </div>
                <div class="o_s_c_item">
                    <ul class="food_list">
                        <li>
                            <span class="food_name">花甲+米线(微辣)</span>
                            <span class="food_count">1份</span>
                            <span>¥16.98</span>
                        </li>
                        <li>
                            <span class="food_name">花甲+米线(微辣)</span>
                            <span class="food_count">1份</span>
                            <span>¥16.98</span>
                        </li>
                        <li>
                            <span class="food_name">花甲+米线(微辣)</span>
                            <span class="food_count">1份</span>
                            <span>¥16.98</span>
                        </li>
                    </ul>
                </div>
                <div class="o_s_c_item deliver_price">
                    <span>配送费</span><span>¥3.5</span>
                </div>

                <div class="o_s_c_item order_discount">
                    <ul class="discount_list">
                        <li><div><i class="img_jian"></i>减配送费</div><span>-￥1</span></li>
                        <li><div><i class="img_jian"></i>美团红包</div><span>-￥4</span></li>
                        <li><div><i class="img_zhe"></i>满减优惠</div><span>-￥8</span></li>
                    </ul>
                </div>

                <div class="o_s_c_item order_total_price">
                    <div class="price_meta">总计：¥49.48&nbsp;&nbsp;优惠: <span class="price">-¥13</span></div>
                    <div>实付: <span class="price">¥36.48</span></div>
                </div>
            </div>
        </section>

        <!-- 配送信息 -->
        <section class="order_deliver order_section">
            <div class="o_s_title">配送信息</div>
            <div class="o_s_content">
                <div class="o_s_c_item">
                    <span>送餐时间</span>
                    <div class="deliver_info">立即配送</div>
                </div>
                <div class="o_s_c_item">
                    <span>送餐时间</span>
                    <div class="deliver_info">
                        <p class="contact">沈(先生)18855185457</p>
                        <p>天鹅花园(xxxxxx)</p>
                    </div>
                </div>
                <div class="o_s_c_item">
                    <span>订单编号</span>
                    <div class="deliver_info">xxxx xxxx xxxx xxxx x</div>
                </div>
                <div class="o_s_c_item">
                    <span>下单时间</span>
                    <div class="deliver_info">2019-05-04 19:24</div>
                </div>
                <div class="o_s_c_item">
                    <span>支付方式</span>
                    <div class="deliver_info">在线支付</div>
                </div>
                <div class="o_s_c_item">
                    <span>备注</span>
                    <div class="deliver_info"></div>
                </div>
            </div>
        </section>

        <!-- 常见问题 -->
        <section class="order_problem order_section">
            <div class="o_s_title"></div>
            <div class="o_s_content">
                <div class="o_s_c_item online_service"><span>常见问题</span><span>在线客服<i class="img_right_arrow"></i></span></div>
                <ul class="problem_list">
                    <li v-for="(i, idx) in problem_list" :key="idx">
                        <span>{{i}}</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
import star from '@/components/star/star'
export default {
    data() {
        return {
            problem_list: ['菜品少送', '菜品质量问题', '餐未到却显示已送到', '如何联系商家', '菜品送错了', '如何申请退款']
        }
    },
    created() {},
    components: {
        star,
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#order_info {
    background: #efefef;
    font-size: 14px;
    .order_section {
        .o_s_title {
            padding-left: 15px;
            font-size: 15px;
            line-height: 30px;
        }
        .o_s_content {
            padding: 0 15px;
            background: #fff;
            .o_s_c_item {
                position: relative;
                padding: 10px 0;
                &::after {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    @include borderBottom;
                }
            }
        }
    }
    .order_status {
        padding: 20px 15px 0;
        background: #fff;
        position: relative;
        .order_status_top {
            border-bottom: 1px dashed #e0e0e0;
        }
        .status {
            text-align: center;
            .current_status {
                font-size: 19px;
                color: #333;
                line-height: 1.4;
                i {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                }
            }
            .status_meta {
                color: #666;
                line-height: 1.4;
            }
        }
        .operate {
            @include flexBox(row, space-around);
            padding: 20px 0;
            > span {
                display: inline-block;
                width: 90px;
                line-height: 36px;
                text-align: center;
                border-radius: 4px;
            }
            .refundment {
                border: 1px solid #ccc;
            }
            .one_more {
                background: #ffd161;
            }
            .commit {
                background: #ffd161;
            }
        }
        .order_status_bottom {
            @include flexBox(row, space-around);
        }
        .deliver_meta {
            @include flexBox(row, flex-start);
            .meta_img {
                margin: 10px;
            }
            .meta_right {
                margin-top: 15px;
                @include flexBox(column, center, space-between);
                .meta_right_top {
                    @include flexBox;
                    margin-bottom: 5px;
                    text-align: left;
                    font-size: 15px;
                }
                .meta_right_bottom {
                    color: #FFB000;
                    @include flexBox(row, flex-start);
                    span {
                        margin-left: -16px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .order_detail {
        .shop_info {
            @include flexBox(row, space-between);
            .shop_meta {
                flex: 1;
                font-size: 15px;
                @include flexBox(row, space-between);
            }
        }
        .food_list {
            margin: -10px 0;
            li {
                @include flexBox(row, space-between);
                line-height: 32px;
            }
            li:first-child {
                margin-top: 0;
            }
        }
        .deliver_price {
            @include flexBox(row, space-between);
        }
        .order_discount {
            font-size: 12px;
            .discount_list {
                li {
                    @include flexBox(row, space-between);
                    margin: 5px 0;
                    div {
                        color: #777;
                        i {
                            vertical-align: middle;
                            width: 18px;
                            height: 18px;
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
        .order_total_price {
            @include flexBox(row, space-between);
            .price_meta { color: #777 }
            .price { color: #FFB000 }
        }
    }
    .order_deliver {
        .o_s_c_item {
            @include flexBox(row, flex-start, flex-start);
            .deliver_info {
                margin-left: 10px;    
            }
            .contact {
                margin-bottom: 5px;
            }
        }
        
    }
    .order_problem {
        .online_service {
            @include flexBox(row, space-between);
            i {
                width: 15px;
                height: 15px;
                margin-left: 5px;
                vertical-align: bottom;
            }
        }
        .problem_list {
            @include flexBox(row, space-between, center, wrap);
            li {
                width: 33%;
                font-size: 13px;
                
                text-align: center;
                span {
                    display: block;
                    margin: 5px;
                    padding: 6px;
                    box-sizing: border-box;
                    border: 1px solid #e5e5e5;
                    overflow: hidden;
                    text-overflow: clip;
                    white-space: nowrap;
                }
            }
        }
    }

    .meituan_deliver {
        margin-left: 5px;
        padding: 0 5px;
        border: 1px solid #ccc;
        font-size: 12px;
        color: #333;
        text-align: middle;
        vertical-align: middle;
        box-sizing: border-box;
        transform: scale(.9)
    }
}
</style>