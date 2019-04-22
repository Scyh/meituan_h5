<template>
    <div class="shop_item">
        <router-link to="/shop/id" is="div">
            <div class="shop_box">
                <div class="shop_box_left">
                    <img src class="shop_img">
                    <div class="img_pinpai"></div>
                </div>
                <div class="shop_box_right">
                    <div class="shop_name">卡旺卡（合肥新地中心店）</div>
                    <div class="shop_meta font-s">
                        <div class="shop_meta_info text-l">
                            <span>
                                <star :score="4.8"></star>4.8
                            </span>
                            <span>月售2153</span>
                        </div>
                        <div class="shop_meta_deliver text-r">
                            <span>30分钟</span>
                            <span>1.6km</span>
                        </div>
                    </div>
                    <div class="shop_price font-s">
                        <div class="shop_price_info">
                            <span>起送￥20</span>
                            <span>配送￥3.5</span>
                            <span>人均￥16</span>
                        </div>
                        <div class="shop_is_meituan img_meituan"></div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
import star from "@/components/star/star";

export default {
    props: {},
    data() {
        return {};
    },
    methods: {},
    components: {
        star
    }
};
</script>
<style lang="scss" scoped>
@import "src/common/style/mixin.scss";

.shop_item {
    margin-bottom: 20px;
}
.shop_box {
    @include flexBox(row, flex-start, flex-start);
    .shop_box_left {
        position: relative;
        margin: 0 10px;
        > img.shop_img {
            width: 76px;
            height: 57px;
            background: #ccc;
        }
        > .img_pinpai {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .shop_box_right {
        flex: 1;
        margin-right: 10px;
        .shop_name {
            font-size: 16px;
            font-weight: 600;
            line-height: 1.4;
            color: #333;
            @include ellipsis;
        }
        .shop_meta {
            margin-top: 6px;
            margin-bottom: 6px;
            @include flexBox(row, space-between);
            .shop_meta_info {
                span:first-child {
                    margin-right: 10px;
                }
            }
            .shop_meta_deliver {
                span:not(:last-child) {
                    margin-right: 2px;
                    &::after {
                        margin-left: 2px;
                        @include borderBefore;
                    }
                }
            }
        }
        .shop_price {
            @include flexBox(row, space-between);
            .shop_price_info {
                span:not(:last-child) {
                    margin-right: 2px;
                    &::after {
                        margin-left: 2px;
                        margin-right: 2px;
                        @include borderBefore;
                    }
                }
            }
        }
    }
}
</style>
