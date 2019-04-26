<template>
    <div id="location">
        <header>
            <div class="location_city">
                <i class="iconfont icondingwei"></i>
                <span>合肥市<i class="img_down_arrow"></i></span>
            </div>
            <div class="location_input">
                <input type="text" placeholder="小区/街道/大厦/学校名称" readonly>
                <i class="img_search"></i>
            </div>
        </header>
        <section class="location_current">
            <div class="current">当前位置：<span>置地·百悦公馆</span></div>
            <div class="relocate">重新定位</div>
        </section>
        <section class="location_near">
            <div class="near">附近位置</div>
            <ul>
                <li></li>
            </ul>
        </section>
        
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    created: {},
    methods: {},
    components: {}
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#location {
    font-size: 14px;
}
header {
    @include flexBox(row, flex-start);
    padding: 15px 10px;
    border-bottom: 1px solid #e7e7e7;
    .location_city {
        @include flexBox(row, flex-start);
        span {
            margin-right: 10px;
            i {
                margin-left: 2px;
            }
        }
        i.iconfont {
            margin-right: 4px;
            font-size: 17px !important;
        }
    }
    .location_input {
        @include flexBox(row, flex-start);
        position: relative;
        input {
            outline: none;
            border: none;
            text-indent: 18px;
        }
        .img_search {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}
.location_current {
    .current {}
    .relocate {}
}
.location_near {
    .near {}
    ul {
        li {}
    }
}
</style>
