<template>
    <div id="self_addr_edit">
        <section class="edit_item"><span>联系人：</span><input type="text" v-model="addr_obj.contact_name"></section>
        <div class="edit_item set_sex">
            <div @click="set_sex('先生')"><i :class="[addr_obj.sex ? (addr_obj.sex == '先生' ? 'checked' : '')  : 'checked']"></i>先生</div>
            <div @click="set_sex('女士')"><i :class="[addr_obj.sex == '女士' ? 'checked' : '']"></i>女士</div>
        </div>
        <section class="edit_item"><span>手机号：</span><input type="text" v-model="addr_obj.contact_phone"></section>
        <section class="edit_item set_addr" @click="change_addr">
            <div>
                <span>收货地址：</span>
                <i class="iconfont iconlocation"></i>
                {{addr_obj.contact_addr}}
            </div>
            
            <i class="iconfont iconarrowdown"></i>
        </section>
        <section class="edit_item"><span>门牌号：{{addr_obj.contact_addr_detail}}</span><input type="text"></section>

        <section class="btn_group">
            <div @click="save" :class="['btn_save', can_save ? '' : 'disabled']">保存</div>
            <div v-if="!!addr_id" @click="remove" class="btn_remove">删除</div>
            <div @click="go_back" class="btn_back">返回</div>
        </section>

        <cconfirm ref="confirm" @confirm="remove_handle">确认删除该收货地址？</cconfirm>
    </div>
</template>
<script>
import { parseUrl } from '@/common/javascript/util'
export default {
    data() {
        return {
            addr_obj: {
                contact_name: null,
                contact_phone: null,
                sex: null,
                contact_addr: null,
                contact_addr_detail: null,
            }
        }
    },
    computed: {
        // 收货地址id
        addr_id() {
            return this.$route.params.addr_id
        },

        // 是否能够保存
        can_save() {
            return this.addr_obj['contact_name'] && this.addr_obj['contact_phone'] && /^1[\d+]{10}$/.test(this.addr_obj['contact_phone'].toString())
        }
    },
    created() {
        // 判断是否存在last_addr_edit_route
        let { route, address } = this.$store.state.last_addr_edit_route,
            addr_id = parseUrl(route, 'addr_id');

        if (route && address && !!this.addr_id == !!addr_id) {
            this.addr_obj.contact_addr = address;
        }
    },
    destroyed() {
        console.log(this.$route)
    },
    methods: {
        set_sex(sex) {
            this.addr_obj['sex'] = sex;
        },

        save() {
            if (this.can_save) {
                // 保存
            }
        },

        remove() {
            this.$refs.confirm.show();
        },

        remove_handle() {},

        go_back() {
            // 清除last_addr_edit_route
            this.$store.commit('set_addr_edit_route', { route: null, address: null })
            this.$router.push('self_addr')
        },

        // 修改收货地址
        change_addr() {
            this.$store.commit('set_addr_edit_route', { route: this.$route.fullPath })
            this.$router.push('/location?source=addr_edit');
        }
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#self_addr_edit {
    padding-left: 15px;
    font-size: 16px;
    .edit_item {
        position: relative;
        padding: 15px;
        &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            @include borderBottom(100%, 1px, #ccc);
        }
        input {
            outline: none;
            border: none;
            font-size: 16px;
        }
    }

    .set_sex {
        @include flexBox(row, space-around);
        > div {
            @include flexBox(row, space-between);
            i {
                display: inline-block;
                width: 17px;
                height: 17px;
                margin-right: 10px;
                font-size: 17px!important;
                border: 1px solid #999;
                border-radius: 100%;
                background-size: 100%;
            }
            i.checked {
                background-image: url('~src/assets/checked.png');
                border: none;
            }
        }
        
    }
    .set_addr {
        @include flexBox(row, space-between);
        .iconarrowdown {
            transform: rotate(-90deg);
            color: #999;
        }
    }
    .iconchecked,
    .set_addr .iconlocation {
        color: rgb(255, 209, 97);
    }

    .btn_group {
        margin-right: 15px;
        > div {
            width: 100%;
            margin: 15px 0;
            font-size: 14px;
            border-radius: 4px;
            text-align: center;
            line-height: 40px;
            box-sizing: border-box;
        }
        .btn_save {
            background-image: linear-gradient(135deg, #FFD266 0%, #FFBD27 100%);
        }
        .btn_save.disabled {
            opacity: .45;
        }
        .btn_remove,
        .btn_back {
            border: 1px solid #FFB000;
        }
    }
}
</style>
