<template>
    <div id="comments" ref="content">
        <header ref="header">
            <div class="header_left">
                <div class="shop_score">4.3</div>
                <div class="score_meta">商家评分</div>
            </div>
            <div class="header_center">
                <section>
                    <span>口味</span>
                    <span class="score"><star :score="4.4" :scale="0.7" /></span>
                    <span>4.4</span>
                </section>
                <section>
                    <span>包装</span>
                    <span class="score"><star :score="4.4" :scale="0.7" /></span>
                    <span>4.4</span>
                </section>
            </div>
            <div class="header_right">
                <div class="deliver_score">5</div>
                <div class="score_meta">配送评分</div>
            </div>
        </header>
        <main ref="main">
            <ul class="comments_title">
                <template v-if="comments_titles.length > 0">
                    <li v-for="(i, idx) in comments_titles" :key="idx" :class='["title_item", current_title_idx === idx ? "current" : ""]'>{{i.name}}({{i.count}})</li>
                </template>
            </ul>
            <div class="comments_content" @touchstart="start" @touchmove="move" @touchend="end">
                <template v-if="comments_list.length > 0">
                    <div v-for="(i, idx) in comments_list" :key="idx" class="comment_item">
                        <div class="c_i_left">
                            <img src="@/assets/comment_user.png" :alt="i.user_name">
                        </div>
                        <div class="c_i_right">
                            <div class="c_i_r_user">
                                <span class="user_name">{{i.user_name}}</span>
                                <span class="comment_time">{{i.comment_time}}</span>
                            </div>
                            <div class="c_i_r_deliver_time">{{i.deliver_time}}</div>
                            <div class="c_i_r_text">{{i.comment_text}}</div>
                            <div class="c_i_r_food_label" v-if="i.food_label">
                                <span class="img_zan"></span>
                                <span>{{i.food_label}}</span>
                            </div>
                            <div class="c_i_r_deliver_label" v-if="i.deliver_label">
                                <span class="img_label"></span>
                                <span>{{i.deliver_label}}</span>
                            </div>
                            <div class="c_i_r_seller" v-if="i.seller_reply">商家回复：{{i.seller_reply}}</div>
                        </div>
                    </div>
                </template>

            </div>
        </main>
    </div>
</template>
<script>
import star from '@/components/star/star'
import Comments from '@/assets/comments.json'
import { getStyle } from '@/common/javascript/util'
export default {
    data() {
        return {
            move_start: 0,
            move_last: 0,
            direction: null,
            move_last_scrollTop: 0,
            comments_titles: [
                { name: '全部', count: 163 },
                { name: '好评', count: 148 },
                { name: '差评', count: 7 },
                { name: '有图评价', count: 6 },
            ],
            current_title_idx: 0,
            comments_list: [],
            _flag: true
        }
    },
    created() {
        this.comments_list = Comments.slice(0);
    },
    watch: {
        comments_list(new_val, old_val) {
            if (new_val && new_val.length > old_val.length) {
                this._flag = true
            }
        }
    },
    methods: {
        start(ev) {
            this.move_start = ev.touches[0].pageY;
            this.move_last = ev.touches[0].pageY;
        },

        move(ev) {
            let distance = ev.touches[0].pageY - this.move_last;
            this.direction = ev.touches[0].pageY > this.move_last;
            if (this.$refs.content.scrollTop <= 130) {
                this.$parent.$refs.scroll_wrap.scrollBy(0, distance * -1)
                // this.$parent.$refs.scroll_wrap.scrollTo(0, this.$parent.$refs.scroll_wrap.scrollTop - distance)
            }
            this.move_last = ev.touches[0].pageY;
            this.move_last_scrollTop = this.$refs.content.scrollTop;

            this.load_more()
        },
        
        end(ev) {
            let timer,
                that = this;
            function trigger() {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    if (that.$refs.content.scrollTop != that.move_last_scrollTop) {
                        if (that.$parent.$refs.scroll_wrap.scrollTop <= 130 && that.$refs.content.scrollTop <= 170) {
                            let distance = that.$refs.content.scrollTop - that.move_last_scrollTop
                            that.$parent.$refs.scroll_wrap.scrollBy(0, distance);
                        }
                        that.move_last_scrollTop = that.$refs.content.scrollTop
                        trigger();
                    } else {
                        clearTimeout(timer);
                        that.move_start = 0;
                        that.move_last = 0;
                        that.load_more()
                    }
                }, 20)
                
            }
            trigger();
        },

        load_more() {
            let wH = document.documentElement.clientHeight,
                scrollTop = this.$refs.content.scrollTop,
                headH = getStyle(this.$refs.header, 'height'),
                mainH = getStyle(this.$refs.main, 'height'),
                distance = 100;
            if ((scrollTop + wH + distance) >= (headH + mainH) && this._flag) {
                this._flag = false;
                this.load_comments();
            }
        },

        load_comments() {
            this.comments_list = [...this.comments_list, ...this.comments_list.slice(0, 10)]
        }
    },
    components: {
        star,
    }
}
</script>
<style lang="scss" scoped>
@import 'src/common/style/mixin.scss';
#comments {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    background: #f5f5f5;
    .score_meta {
        font-size: 12px;
        color: #999;
    }
    header {
        @include flexBox(row, flex-start);
        background: #fff;
        padding: 15px 0;
        box-sizing: border-box;
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
            section {
                @include flexBox(row, flex-start);
                font-size: 12px;
                color: #666;
                .score {
                }
                .star {
                    transform-origin: center!important;
                }
            }
        }
    }
    main {
        margin-top: 10px;
        box-sizing: border-box;
        background: #fff;
        .comments_title {
            position: relative;
            padding: 15px 15px 10px 15px;
            &::before {
                position: absolute;
                left: 0;
                bottom: 0;
                @include borderBottom;
            }
            .title_item {
                position: relative;
                display: inline-block;
                height: 26px;
                margin: 0 10px 10px 0;
                padding: 0 12px;
                line-height: 26px;
                font-size: 13px;
                color: #666;
                &::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    bottom: -50%;
                    left: -50%;
                    
                    transform: scale(0.5);
                    border: 1px solid #bbb;
                    border-radius: 26px;
                    
                }
            }
            .title_item.current {
                color: #FFB000;
                background: #fffbf1;
                &::before {
                    border-color: #FFB000;
                }
            }
        }

        .comments_content {
            padding: 0 15px 50px;
            .comment_item {
                margin: 10px 0;
                @include flexBox(row, flex-start, flex-start);
                .c_i_left {
                    > img {
                        width: 40px;
                        height: 40px;
                    }
                }
                .c_i_right {
                    margin-left: 10px;
                    .c_i_r_user {
                        @include flexBox(row, space-between);
                        .user_name {}
                        .comment_time {
                            font-size: 12px;
                            color: #666;
                        }
                    }
                    .c_i_r_deliver_time {
                        margin: 8px 0 0 0;
                        font-size: 12px;
                        color: #666;
                    }
                    .c_i_r_text {
                        padding: 15px 0 10px 0;
                        font-size: 14px;
                    }
                    .c_i_r_seller {
                        margin: 10px 0;
                        padding: 5px 10px;
                        font-size: 12px;
                        color: #666;
                        background: #f5f5f5;
                    }
                    .c_i_r_food_label,
                    .c_i_r_deliver_label {
                        margin: 4px 0;
                        font-size: 12px;
                        color: #999;
                        .img_label,
                        .img_zan {
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }
    
}
</style>
