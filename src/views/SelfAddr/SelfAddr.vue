<template>
    <div id="self_addr">
        <header>
            <i class="iconfont iconarrowdown"></i>
            <p>地址列表</p>
        </header>
        <main>
            <template v-if="addr_list.length > 0">
                <section class="addr_item" v-for="(i, idx) in addr_list" :key="idx">
                    <div class="addr_meta">
                        <span>地址地址</span>
                        <span>门牌号门牌号门牌号</span>
                    </div>
                    <div class="addr_contact">
                        <span>联系人</span>
                        <span>xxxxxxxxxxx</span>
                    </div>
                    <i class="iconfont iconedit"></i>
                </section>
            </template>
            <template v-else>
                <p class="text-c no_addr">暂无收货地址！</p>
            </template>
        </main>

        <footer>
            <router-link to="/self_addr_edit" tag="div">
                <i class="iconfont iconadd"></i>新增收获地址
            </router-link>
        </footer>
    </div>
</template>
<script>
export default {
    data() {
        return {
            addr_list: []
        }
    }
}
</script>
<style lang="scss" scoped>
#self_addr {
    header {
        position: relative;
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        .iconfont {
            position: absolute;
            top: 0;
            left: 0;
            width: 50px;
            height: 50px;
            text-align: center;
            transform: rotate(90deg);
        }
    }

    main {
        padding-left: 15px;
        .addr_item {
            position: relative;
            padding: 10px;
            border-bottom: 1px solid #E4E4E4;
            div {
                width: 90%;
                line-height: 1.6;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            div > span:first-child {
                margin-right: 10px;
            }
            .addr_meta {
                font-size: 16px;
            }
            .addr_contact {
                font-size: 14px;
                color: #666;
            }
            .iconfont {
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                font-size: 20px!important;
                color: #777;
            }
        }
        .no_addr {
            margin: 60px auto 0;
            font-size: 16px;
            color: #666;
        }
    }

    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #ccc;
        div {
            font-size: 16px;
            text-align: center;
            line-height: 45px;
            color: #000;
            i {
                margin-right: 5px;
                color: #ffb000;
            }
        }
    }
}
</style>

