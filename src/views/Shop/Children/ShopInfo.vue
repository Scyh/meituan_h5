<template>
    <div id="shop_info">
        <section class="info_item">
            <div class="item">
                <div class="i_i_icon flex_start">
                    <img src="@/assets/location.png">
                </div>
                <div class="i_i_text">安徽省合肥市蜀山区潜山路与习友路交口华润万象城xxxx号</div>
            </div>
            <div class="item">
                <div class="i_i_icon">
                    <img src="@/assets/archives.png">
                </div>
                <div class="i_i_text">查看食品安全档案</div>
                <div class="i_i_icon_right img_right_arrow"></div>
            </div>
        </section>
        <section class="info_item">
            <div class="item">
                <div class="i_i_icon">
                    <img src="@/assets/list.png">
                </div>
                <div class="i_i_text">配送服务：<i class="img_meituan"></i>提供高品质配送服务</div>
                <div class="i_i_icon_right"></div>
            </div>
            <div class="item">
                <div class="i_i_icon">
                    <img src="@/assets/clock.png" class="archives">
                </div>
                <div class="i_i_text">配送时间：10:00-21:30</div>
            </div>
        </section>
        <section class="info_item">
            <div class="item">
                <div class="i_i_icon">
                    <img src="@/assets/voide.png">
                </div>
                <div class="i_i_text line1">经公司要求，保证饮品的口感，本店暂不接受备注中修改饮品，如给您造成的不便请谅解</div>
                <div class="i_i_icon_right img_right_arrow"></div>
            </div>
            <div class="item">
                <div class="i_i_icon flex_start">
                    <img src="@/assets/clock.png">
                </div>
                <div class="i_i_text shop_service">
                    <p>商家服务</p>
                    <ul>
                        <li><img src="@/assets/PPSH.png" alt="">该商户为品牌商户</li>
                        <li><img src="@/assets/ZXFK.png" alt="">该商户支持在线支付</li>
                        <li><img src="@/assets/ZCKP.png" alt="">本店支持开发票，开票金额0元起</li>
                    </ul>
                </div>
            </div>
            <div class="item discount_item">
                <div class="i_i_icon img_jian flex_start"></div>
                <div class="i_i_text">满35减6;满45减9;满62减11;满110减25;满180减72(在线支付专享)</div>
            </div>
            <div class="item discount_item">
                <div class="i_i_icon img_zhe"></div>
                <div class="i_i_text">折扣商品6.19折起(在线支付专享)</div>
            </div>
            <div class="item discount_item">
                <div class="i_i_icon"><img src="@/assets/ZXFK_2.png"></div>
                <div class="i_i_text">该商家支持在线支付</div>
            </div>
            <div class="item discount_item">
                <div class="i_i_icon"><img src="@/assets/ZCKP_2.png"></div>
                <div class="i_i_text">本店支持开发票，开票金额0元起</div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
    @import 'src/common/style/mixin.scss';

    #shop_info {
        padding: 0 0 0 15px;
        .info_item {
            position: relative;
            padding: 15px 15px 5px 0;
            &::before {
                position: absolute;
                left: 0;
                bottom: 0;
                @include borderBottom;
            }
            .item {
                margin-bottom: 15px;
                @include flexBox(row, flex-start);
            }
            .discount_item {
                margin-bottom: 5px;
            }
            .i_i_icon {
                margin-right: 10px;
                img {
                    width: 14px;
                    height: 100%;
                    vertical-align: middle;
                }
            }
            .i_i_icon.flex_start {
                align-self: flex-start;
            }
            .archives {
                img {
                    width: 16px;
                }
            }
            .img_jian {
                margin-top: 3px;
            }
            .i_i_text {
                flex: 1;
                @include flexBox(row, flex-start);
                display: inline-block;
                font-size: 14px;
                line-height: 20px;
                > i {
                    margin-right: 10px;
                }
            }
            .shop_service {
                @include flexBox(row, flex-start, flex-start);
                p {
                    margin: 0 15px 0 0;
                }
                li {
                    @include flexBox(row, flex-start);
                    font-size: 12px;
                    img {
                        width: 15px;
                        height: 15px;
                        margin-right: 5px;
                    }
                }
            }
            .line1 {
                @include ellipsis;
            }
            .i_i_icon_right {
                flex: 0 0 15px;
            }
            .img_right_arrow {
                width: 11px;
                height: 11px;
            }
        }
    }
</style>
