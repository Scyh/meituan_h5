<template>
    <div id="select_city">
        <header>
            <div class="search_input">
                <i class="img_search_input"></i>
                <input type="text" placeholder="城市中文名或拼音" v-model="search_key">
                <i class="img_close_input" v-show="!!search_key"></i>
            </div>
            <div class="btn-cancel" @click="go_back">取消</div>
        </header>
        <template v-if="search_city.length <= 0">
            <section class="locate_city" v-if="!!city">
                <i class="iconfont icondingwei"></i>
                <p>当前定位城市&nbsp;&nbsp;<span class="currernt_city">{{city}}</span></p>
            </section>

            <section class="hot_city" v-if="hot_city.length > 0">
                <p>热门城市</p>
                <ul class="hot_city_list">
                    <li v-for="(i, idx) in hot_city" :key="idx" @click="select_city(i.city_name)">{{i.city_name}}</li>
                </ul>
            </section>
            
            <!-- 城市首字母缩写导航 -->
            <ul class="classify_nav" v-if="classify_nav.length > 0">
                <li v-for="(i, index) in classify_nav" :key="i.idx" @click="change_city_nav(i.idx, index)">{{i.idx}}</li>
            </ul>

            <div class="city_nav" v-if="show_city_nav.length > 0" v-load-more="load_more_handle">
                <template v-for="(i, index) in show_city_nav">
                    <section class="city_item" :key="index" :ref="i.idx">
                        <div class="c_i_title">{{i.idx}}</div>
                        <ul class="c_i_list" v-if="i.cities.length > 0">
                            <li v-for="(c, c_idx) in i.cities" :key="c_idx" @click="select_city(c.city_name)" :class="{ 'current': city === c.city_name }">{{c.city_name}}</li>
                        </ul>
                    </section>
                </template>
            </div>
        </template>
        <template v-else>
            <ul class="c_i_list">
                <li v-for="(i, idx) in search_city" :key="idx" @click="select_city(i)">{{i}}</li>
            </ul>
        </template>
    </div>
</template>
<script>
import citys from '@/assets/city.json'
import { loadMore } from '@/components/mixin'
import { getOffsetTop } from '@/common/javascript/util'
import { mapState } from 'vuex';
export default {
    data() {
        return {
            hot_city: [],
            classify_nav: [],
            city_nav: [],
            show_city_nav: [],
            search_key: null,
        }
    },
    created() {
        this.hot_city = [...citys.hot_city];
        this.classify_nav = [{idx: '#'}, ...citys.classify_nav];
        this.city_nav = [...citys.city_nav];
        this.show_city_nav = citys.city_nav.slice(0, 4);
    },
    mixins: [loadMore],
    computed: {
        ...mapState(['city']),

        search_city() {
            let result = [];
            if (this.search_key) {
                let reg = new RegExp(`^${this.search_key}+`, 'ig');
                this.city_nav.forEach((i, idx) => {
                    i.cities.forEach(city => {
                        if (reg.test(city.city_name) || reg.test(city.city_pinyin)) {
                            result.push(city.city_name)
                        }
                    })
                })
            }
            return result;
        }
    },
    methods: {
        load_more_handle() {
            this.show_city_nav = [...this.show_city_nav, ...this.city_nav.slice(this.show_city_nav.length - 1,this.show_city_nav.length)]
        },

        change_city_nav(idx, index) {
            if (idx !== '#') {
                if (this.show_city_nav.length < index) {
                    this.show_city_nav = [...this.city_nav.slice(0, index)];
                    this.$nextTick(() => {
                        window.scrollTo(0, getOffsetTop(this.$refs[idx][0]));
                    })
                } else {
                    window.scrollTo(0, getOffsetTop(this.$refs[idx][0]));
                }
            } else {
                window.scrollTo(0, 0);
            }
        },

        select_city(city_name) {
            this.$store.commit('set_city', city_name);
            this.go_back();
        },

        go_back() {
            this.$router.push('/location')
        }
    },
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#select_city {
    header {
        position: relative;
        top: 0;
        left: 0;
        @include flexBox(row, space-between);
        padding: 10px 15px;
        &::after {
            position: absolute;
            left: 0;
            bottom: 0;
            @include borderBottom;
        }
        .search_input {
            @include flexBox(row, flex-start);
            flex: 1;
            .img_search_input {
                margin-right: 5px;
            }
            input {
                width: 100%;
                font-size: 14px;
                line-height: 20px;
                border: none;
                outline: none;
            }
            .img_close_input {
                margin-right: 5px;
            }
        }
        .btn-cancel {
            font-size: 14px;
            color: #999;
        }
    }
    .locate_city {
        @include flexBox(row, flex-start);
        padding: 20px 15px 10px;
        
        p {
            font-size: 16px;
        }
        .currernt_city {
            color: #ffb000;
        }
    }
    .hot_city {
        padding: 15px 0 15px 15px;
        p {
            color: #999;
            font-size: 14px;
        }
        .hot_city_list {
            margin-right: 30px;
            @include flexBox(row, space-between, center, wrap);
            li {
                margin: 10px 10px 10px 0;
                padding: 10px 20px;
                border: 1px solid #eee;
                border-radius: 2px;
                text-align: center;
                font-size: 14px;
            }
            li:nth-child(4n) {
                margin-right: 0;
            }
        }
    }

    .classify_nav {
        position: fixed;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        @include flexBox(column, center, flex-start);
        li {
            color: #999;
            font-size: 12px;
            line-height: 16px;
        }
    }

    .city_nav {
        margin-right: 30px;
        .city_item {
            .c_i_title {
                padding-left: 15px;
                font-size: 14px;
                line-height: 25px;
                background: #eee;
            }
        }
    }
    .c_i_list {
        padding-left: 15px;
        li {
            position: relative;
            font-size: 16px;
            line-height: 42px;
            &::after {
                position: absolute;
                left: 0;
                bottom: 0;
                @include borderBottom;
            }
        }
        li.current {
            color: #ffb000;
        }
    }
}
</style>
