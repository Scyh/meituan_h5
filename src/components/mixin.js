import { getStyle, getScrollTop } from '@/common/javascript/util'

export const loadMore = {
    directives: {
        'load-more': {
            bind: function(el, bind) {
                let windowH = document.documentElement.clientHeight,
                    height,
                    offsetTop,
                    distanceH = 40, // 偏移量
                    lastScrollTop,  // 记录上一次的滚动距离
                    flag = true,
                    requestFram,
                    scrollEl = document.documentElement,
                    heightEl = el;

                el.addEventListener('touchstart', () => {
                    height = getStyle(el, 'height') + el.offsetTop + getStyle(el, 'paddingTop') + getStyle(el, 'paddingBottom')
                }, false);

                el.addEventListener('touchmove', () => {
                    loadMore();
                }, false);

                el.addEventListener('touchend', () => {
                    moveEnd();
                }, false);
                const loadMore = async function() {
                    // console.log('flag: ', flag, '判断一: ', (getScrollTop() + windowH) >= (height - distanceH),  '判断二: ', lastScrollTop, (getScrollTop() - distanceH))

                    // 判断元素是否已经滚动到底部
                    if ((getScrollTop() + windowH) >= (height - distanceH) &&　(!lastScrollTop || lastScrollTop <= getScrollTop())) {
                        if (flag) {
                            flag = false;
                            await Promise.resolve(bind.value())
                        }
                        flag = true;
                        height = getStyle(el, 'height') + el.offsetTop + getStyle(el, 'paddingTop') + getStyle(el, 'paddingBottom')
                    }
                };

                // 防止页面滚动，touchend 事件已经触发后，页面才滚动到底部
                const moveEnd = () => {
                    let scrollTop = getScrollTop()
                    requestFram = requestAnimationFrame(() => {
                        if (lastScrollTop != scrollTop) {
                            lastScrollTop = scrollTop;
                            moveEnd();
                        } else {
                            cancelAnimationFrame(requestFram);
                            height = getStyle(el, 'height') + el.offsetTop + getStyle(el, 'paddingTop') + getStyle(el, 'paddingBottom');
                            loadMore();
                        }
                    })
                }
            }
        }
    }
}

export const back = {
    methods: {
        back() {
            if (window.history.length <= 1) {
                this.$router.push('/');
            } else {
                this.$router.back(-1)
            }
        }
    }
}