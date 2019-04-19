export const getOffsetTop =  function (dom) {
    if (!dom) return;
    return dom.offsetTop + (dom.offsetParent ? getOffsetTop(dom.offsetParent) : 0);
}

export const getOffsetLeft = function (dom) {
    if (!dom) return;
    return dom.offsetLeft + (dom.offsetParent ? getOffsetLeft(dom.offsetParent) : 0);
}
