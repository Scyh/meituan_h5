<template>
    <header class="header">
        <div class="head_box">
            <router-link to="/location"  :class="['head_box_left', show_location ? '' : 'no_width']" tag="div">{{ location ? location : "定位中.." }}</router-link>
            <div class="head_box_right">
                <router-link to="/search" tag="div">
                    <input type="text" readonly placeholder="请输入商家或商品名称">
                </router-link>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    props: ['show_location'],
    data() {
        return {
            location: null,
        }
    },
    created() {
        // this.$store.state.location ? (this.location = this.$store.state.location) : this.getLocation();

    },
    methods: {
        async getLocation() {
            let location = await this.$apis.location.getLocation();
            this.location = location.content.address_detail.city
        },
    }
}
</script>
<style lang="scss" scoped>
@import "src/common/style/mixin";
.header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 50px;
    background: #1C1B20;
    .head_box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 15px;
        height: 100%;
        .head_box_left {
            margin-right: 10px;
            max-width: 100px;
            font-size: 16px;
            color: #fff;
            transition: all 0.4s ease;
            @include ellipsis;
            text-overflow: clip;
        }
        .head_box_left.no_width {
            max-width: 0;
            margin-right: 0;
            text-overflow: clip;
        }
        .head_box_right {
            flex: 1;
            div {
                position: relative;
                width: 100%;
                transition: all 0.4s ease;
                input {
                    width: 100%;
                    height: 30px;
                    background: #eee;
                    border-radius: 100px;
                    text-indent: 40px;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    outline: none;
                    border: none;
                    transition: all 0.4s ease;
                    -webkit-font-smoothing: antialiased;
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 15px;
                    transform: translateY(-50%);
                    @include bg_img(15px, 15px, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAA3VJREFUSA3tlktIVFEYx52XVhNkbRrHomkzIUSQzigi1IDZiyICFSEEXfXYVxAYE9U2aFFoEL0WEREZSItcaNEwPjPaFFE65ThKWJvGmkej/b6Ze4eZO3dyUtqEB879zvnO//v/z/nuPefcoqKV8r9nwFDoAr1er7Gnp6cW/IGFhYWtWJvBYAhjQ/QHTCZTz9DQ0NdC+RYVbmpqMk1MTLRB6EVgUz5iJpFg7L7ZbO4YGBgI5MOp/j8K19XV2aPR6GMEq5WAD9huo9H4GjuDfy11C6L7sfX4iqlRxk8ODw/fop235BWurq52JhKJPiLt1AD1zOjo6EOsbnG73ZsRv0xtVQAXwZ/XBePUFfZ4PKXhcHgQEieYvuLi4ka/3/8tH0mmnwm0z8/Pd+GzUNsQv5M5rraNaiPTInpFREnhGP5DhYoKh6SYuBPSxnZKJqStLSatw+VybUe0E3+cd7V7ZGTkixazWD8UCo2Vl5dvg2cndf309PQTbYzeio8DMjLbLmY/rg0otM/XfQ6OX+CPVVVVrdPG6QkfERAzva0F/01f2VLPibEwgYPa2Cxh3ocNQXkns3wUr7TgJfSfKTFubWyWMF+jbB0pn1NmeU9W+klhUHnThFnCeNcoIz/SiOU1VB6VN82WJcx+nVFGbGnE8hpJHl6fyptmyxIuKSkJMhIjRY7a2toNadQSGwhWKqE5uyNLuL+/PwKwjwBzLBY7vES9ZJhcLvAkdwhb66mWK0tYBjk0HiigsxKsDSi0Pz4+3g62jPpucHDwjTYuR9hqtd4j1e8BVhB8WhtQSF9uNTguCRbboRdj0HNyM+3jZkqmh8Bmjs1Hejg9n3LB9JJmF7G9xO7Vw+mmcmpq6qPdbo8S0EBt5NxNOJ1OfyAQmNcjUX01NTU7IpHIC/oV1Fl2iScYDP5UxzOtrrAAONh9CMo+3EOtj8fjLfSjDocjODk5OScYKfId8Hp2lZWVXeAAuo6rlNUusNpVZG0OHplITtFNdSaK26oBnqv4ZBVSZNXT1BnI5Q9EfoesVCmyFa9hx/DfxMo35OX4Tb5v2umyqLAgZVWkuQWyZroykdVphlTjLabbYrHcUP+3mLDg7+IXcQ/iL1PQ1LMg4cwAPh4z/2EbSauNVIY5dEI+n+97JkZtV1ZWHiUDrWzRU1yxOaeXilux/zQDvwFiGVdw0BGAOQAAAABJRU5ErkJggg==')
                }
            }
        }
    }
}
</style>

