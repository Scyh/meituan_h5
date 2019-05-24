<template>
    <div id="comments">
        <header>
            <div class="header_left">
                <div class="shop_score">4.3</div>
                <div class="score_meta">商家评分</div>
            </div>
            <div class="header_center">
                
            </div>
            <div class="header_right">
                <div class="deliver_score">5</div>
                <div class="score_meta">配送评分</div>
            </div>
        </header>
    </div>
</template>
<script>
import star from '@/components/star/star'
export default {
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#comments {
    .score_meta {
        font-size: 12px;
        color: #999;
    }
    header {
        @include flexBox(row, flex-start);
        padding: 15px 0;
        .header_left,
        .header_right {
            height: 50px;
            padding: 0 20px;
            flex: 0 0 48px;
            text-align: center;
            font-size: 27px;
        }
        .shop_score {
            color: #FFB000;
        }
        .deliver_score {
            color: #999;
        }
        .header_center {
            flex: 1;
            padding-left: 0;
        }
    }
    
}
</style>
