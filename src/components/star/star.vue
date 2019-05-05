<template>
    <div class="star" :style="'transform: scale('+ scale +')'">
        <div class="star_top" :style="{ width: show_w }">
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
        </div>
        <div class="star_bottom" ref="star_bottom">
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
            <i class="iconfont iconstart"></i>
        </div>
    </div>
</template>
<script>
import { getStyle } from '@/common/javascript/util.js'

export default {
    props: {
        score: Number,
        scale: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            show_w: 0,
        }
    },
    created() {},
    mounted() {
        this.initStar();        
    },
    methods: {
        initStar() {
            let num = parseFloat(this.score || 0);
            this.show_w = num / 5 * getStyle(this.$refs.star_bottom, 'width') / getStyle(document.documentElement, 'fontSize') + 'rem'
        },
    },
}
</script>
<style lang="scss" scoped>
    i {
        font-size: 12px!important;
    }
    .star {
        position: relative;
        display: inline-block;
        transform-origin: left center;
        .star_top {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            overflow: hidden;
            i {
                color: #f4ea2a;
            }
        }
        .star_bottom {
            i {
                color: #ccc;
            }
        }
    }
</style>
