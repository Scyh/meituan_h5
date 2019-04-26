<template>
    <div id="agreement">
        <ul>
            <li v-for="(i, idx) in agreement_list" :key="idx">
                <span class="agreement_text">{{i}}</span>
                <span class="download">下载</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            agreement_list: [
                "营业资质",
                "入网餐饮服务提供者审查登记规范",
                "美团外卖平台信息发布管理规范",
                "美团外卖平台成人用品类目管理规范",
                "美团外卖商户服务规范",
                "美团外卖平台视频内容管理规范",
                "美团外卖品牌授权使用规范",
                "美团外卖平台用户评价规范",
                "美团外卖商户违规作弊管理规范",
                "食品安全投诉举报规范",
                "食品安全事故处置规范",
                "食品安全违法行为制止及报告规范",
                "严重违法行为平台服务停止规范",
                "美团点评餐饮安全管理办法",
                "美团外卖代金券使用规则",
                "美团外卖红包使用规则",
                "美团外卖用户服务条款",
                "美团点评平台用户服务协议",
                "食品安全协议",
                "美团外卖商家环保倡议书",
                "美团点评隐私政策"
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#agreement {
    margin: 0 15px;
    > ul {
        > li {
            padding: 10px 0;
            @include flexBox(row, space-between, center);
            font-size: 14px;
            // color: #666;
            border-bottom: 1px solid #e7e7e7;
            .agreement_text {
                text-align: left;
            }
            .download {
                padding: 0 8px;
                line-height: 20px;
                border: 1px solid #979797;
                border-radius: 10px;
            }
        }
    }
}
</style>

