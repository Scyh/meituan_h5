export const getOffsetTop =  function (dom) {
    if (!dom) return;
    return dom.offsetTop + (dom.offsetParent ? getOffsetTop(dom.offsetParent) : 0);
}

export const getStyle = function(dom, attr) {
    if (!dom) return;
    dom = dom._uid ? dom._vnode.elm : dom
    let style = null;

    if (window.getComputedStyle) {
        style = window.getComputedStyle(dom, null)[attr]
    } else {
        style = dom.currentStyle[attr]
    }
    
    return /(px|pt|rem|em)$/.test(style) ? parseFloat(style) : style
}