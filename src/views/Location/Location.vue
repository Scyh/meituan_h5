<template>
    <div id="location">
        <header>
            <div class="location_city">
                <i class="iconfont icondingwei"></i>
                <router-link to="/select_city"><span :class="{ 'no_city': !city }">{{ city ? city :'选择城市' }}<i class="img_down_arrow"></i></span></router-link>
            </div>
            <div class="location_input">
                <input type="text" placeholder="小区/街道/大厦/学校名称" readonly>
                <i class="img_search"></i>
            </div>
        </header>

        <section class="location_current">
            <div class="current">当前位置：<span>{{ current_location || '暂无定位信息' }}</span></div>
            <div class="relocate"><i class="img_relocate"></i>重新定位</div>
        </section>

        <section class="location_near">
            <div class="near"><i class="iconfont iconhome"></i> 我的收获地址</div>
            <ul v-if="show_addr.length > 0">
                <li v-for="(i, idx) in show_addr" :key="idx" @click="change_receive_addr(i.address)">
                    <p class="address">{{ i.address }}</p>
                    <p class="addr_contact"><span>{{i.name}}</span><span>{{i.phone}}</span></p>
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
                    address: '置地·栢悦公馆 栢悦中心写字楼29楼',
                    name: '沈超越先生',
                    phone: '18888888888'
                },
                {
                    address: '置地·栢悦公馆 栢悦中心写字楼29楼',
                    name: '沈超越先生',
                    phone: '18888888888'
                },
                {
                    address: '置地·栢悦公馆 栢悦中心写字楼29楼',
                    name: '沈超越先生',
                    phone: '18888888888'
                },
                {
                    address: '置地·栢悦公馆 栢悦中心写字楼29楼',
                    name: '沈超越先生',
                    phone: '18888888888'
                },
                {
                    address: '置地·栢悦公馆 栢悦中心写字楼29楼',
                    name: '沈超越先生',
                    phone: '18888888888'
                },
            ],
            show_addr: [],  // 要展示的 地址数据
            show_all_add_flag: false,
            near_list: ['柏悦中心', '柏悦幼儿园', '柏悦府', '信德大厦', '西湖国际广场(习友路)'],  // 附近地址
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
        })
    },
    methods: {

        // 展开全部地址
        show_all() {
            this.show_all_add_flag = false;
            this.show_addr = [...this.receive_addr_list];
        },

        // 修改地址
        change_receive_addr(addr) {
            this.$store.commit('set_addr', addr);
            this.$router.push('/home');
        }
    },
    components: {}
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
        span {
            margin-right: 10px;
            i {
                margin-left: 2px;
            }
        }
        span.no_city {
            color: #ffb000;
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
