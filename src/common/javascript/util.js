export const getScrollTop = () => {
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}

export const getOffsetTop = (dom) => window.requestAnimationFrame(() => {
    if (!dom) return;
    return dom.offsetTop + (dom.offsetParent ? getOffsetTop(dom.offsetParent) : 0);
})

// export const getOffsetTop = (dom) => {
//     if (!dom) return;
//     return dom.offsetTop + (dom.offsetParent ? getOffsetTop(dom.offsetParent) : 0);
// }
export const getStyle = (dom, attr) => window.requestAnimationFrame(() => {
    if (!dom) return;
    dom = dom._uid ? dom._vnode.elm : dom
    let style = null;
    if (window.getComputedStyle) {
        style = window.getComputedStyle(dom, null)[attr]
    } else {
        style = dom.currentStyle[attr]
    }
    
    return /(px|pt|rem|em)$/.test(style) ? parseFloat(style) : style

});
// export const getStyle = (dom, attr) => {
//     if (!dom) return;
//     dom = dom._uid ? dom._vnode.elm : dom
//     let style = null;

//     if (window.getComputedStyle) {
//         style = window.getComputedStyle(dom, null)[attr]
//     } else {
//         style = dom.currentStyle[attr]
//     }
    
//     return /(px|pt|rem|em)$/.test(style) ? parseFloat(style) : style
// }

export const Store = {
    set(key, val) {
        if (!key || !val) return;
        if (typeof val !== 'string') {
            val = JSON.stringify(val);
        }
        window.localStorage.setItem(key, val);
    },
    get(key) {
        if (!key) return;
        return window.localStorage.getItem(key);
    },
    remove(key) {
        if (!key) return;
        window.localStorage.removeItem(key);
    },
    clear() {
        window.localStorage.clear();
    }
}

export const parseUrl = (url, key) => {
    if (!url || typeof url !== "string") return;

    let obj = {};
    let query = url.split("?")[1]
    if (query) {
        query.split("&").forEach((i ,idx) => {
            let [k, v] = i.split("=");
            obj[k] = v;
        });
    }
    return key ? (obj[key] ? obj[key] : undefined) : obj
}

export const _throttle = function(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
        var th = this;
        var args = arguments;
        var now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}


export const  _debounce = function (fn, delay) {
    var delay = delay || 200;
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    }
}
