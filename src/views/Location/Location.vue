<template>
    <div id="location">
        <header>
            <div class="location_city">
                <i class="iconfont icondingwei"></i>
                <router-link to="/select_city" tag="div"><span :class="{ 'no_city': !city }">{{ city ? city :'选择城市' }}<i class="img_down_arrow"></i></span></router-link>
            </div>
            <div class="location_input">
                <input type="text" placeholder="小区/街道/大厦/学校名称" @focus="search_flag = true" @focusout="search_flag = false" v-model="search_key">
                <i class="img_search"></i>
            </div>
        </header>

        <template v-if="!search_flag">
            <section class="location_current">
                <div class="current">当前位置：<span>{{ current_location || '暂无定位信息' }}</span></div>
                <div class="relocate" @click="relocate"><i class="img_relocate"></i>重新定位</div>
            </section>

            <section class="location_near">
                <div class="near"><i class="iconfont iconhome"></i> 我的收获地址</div>
                <ul v-if="show_addr.length > 0">
                    <li v-for="(i, idx) in show_addr" :key="idx" @click="change_receive_addr(i.contact_addr)">
                        <p class="address">{{ i.contact_addr + '  ' + i.contact_addr_detail }}</p>
                        <p class="addr_contact"><span>{{i.contact_name}}</span><span>{{i.contact_phone}}</span></p>
                    </li>
                </ul>
                <p class="show_all_addr" v-if="show_all_add_flag" @click="show_all">展开全部地址<i class="img_down_arrow"></i></p>
            </section>

            <section class="location_near">
                <div class="near"><i class="iconfont icondingwei"></i> 附近位置</div>
                <ul v-if="near_list.length > 0">
                    <li v-for="(i,idx) in near_list" :key="idx" @click="change_receive_addr(i)">{{i}}</li>
                </ul>
            </section>
        </template>
        
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            current_location: null, // 当前位置
            receive_addr_list: [
                {
                    contact_addr: '置地·栢悦公馆',
                    contact_addr_detail: '栢悦中心写字楼29楼',
                    contact_name: '沈超越先生',
                    contact_phone: '18888888888'
                },
                {
                    contact_addr: '置地·栢悦公馆',
                    contact_addr_detail: '栢悦中心写字楼29楼',
                    contact_name: '沈超越先生',
                    contact_phone: '18888888888'
                },
                {
                    contact_addr: '置地·栢悦公馆',
                    contact_addr_detail: '栢悦中心写字楼29楼',
                    contact_name: '沈超越先生',
                    contact_phone: '18888888888'
                },
                {
                    contact_addr: '置地·栢悦公馆',
                    contact_addr_detail: '栢悦中心写字楼29楼',
                    contact_name: '沈超越先生',
                    contact_phone: '18888888888'
                },
                {
                    contact_addr: '置地·栢悦公馆',
                    contact_addr_detail: '栢悦中心写字楼29楼',
                    contact_name: '沈超越先生',
                    contact_phone: '18888888888'
                },
            ],
            show_addr: [],  // 要展示的 地址数据
            show_all_add_flag: false,
            near_list: ['柏悦中心', '柏悦幼儿园', '柏悦府', '信德大厦', '西湖国际广场(习友路)'],  // 附近地址
            search_flag: false, // 是否在搜索
            search_key: null,   // 搜索关键字
        }
    },
    created() {
        if (this.receive_addr_list.length > 3) {
            this.show_all_add_flag = true;
            this.show_addr = [...this.receive_addr_list.slice(0, 3)];
        }
    },
    computed: {
        ...mapState({
            city: 'city'
        }),

        is_addr_edit() {
            return this.$route.query.source === "addr_edit";
        }
    },
    methods: {
        // 展开全部地址
        show_all() {
            this.show_all_add_flag = false;
            this.show_addr = [...this.receive_addr_list];
        },

        // 修改地址
        change_receive_addr(addr) {
            if(this.is_addr_edit) {
                let { route } = this.$store.state.last_addr_edit_route;
                this.$store.commit('set_addr_edit_route', { route, address: addr });
                this.$router.go(-1);
                console.log(this.$route.matched)
            } else {
                this.$store.commit('set_addr', addr);
                this.$router.push('/home');
            }
        },

        // 重新定位
        relocate() {
            this.$store.commit('set_city', null)
        },

    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';

#location {
    font-size: 16px;
}
header {
    @include flexBox(row, flex-start);
    padding: 15px 10px;
    font-size: 14px;
    border-bottom: 1px solid #e7e7e7;
    .location_city {
        @include flexBox(row, flex-start);
        max-width: 100px;
        span {
            margin-right: 10px;
            i {
                margin-left: 2px;
            }
        }
        > div {
          @include ellipsis;  
        }
        span.no_city {
            color: #ffb000;
        }
        i.iconfont {
            display: inline-block;
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
    padding: 15px;
    @include flexBox(row, space-between);
    .current {
        span {
            font-weight: 600;
        }
    }
    .relocate {
        @include flexBox;
        font-size: 14px;
        color: #ffb000;
        i {
            margin-right: 3px;
        }
    }
}
.location_near {
    padding: 15px;
    .near {
        color: #999;
        font-size: 14px;
    }
    ul {
        li {
            position: relative;
            padding: 20px 0;
            &::after {
                content: ' ';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 1px;
                -webkit-transform-origin: 0 0;
                transform-origin: 0 0;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                background: #e4e4e4;
            }
            .address {
                font-size: 16px;
            }

            p.addr_contact {
                font-size: 14px;
                color: #666;
                span:first-child {
                    margin-right: 10px;
                }
            }
        }
    }
    p.show_all_addr {
        margin-top: 10px;
    }
}
</style>
