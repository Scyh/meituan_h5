export function getOffsetTop(dom) {
    if (!dom) return;
    return dom.offsetTop + (dom.offsetParent ? getOffset(dom.offsetParent) : 0);
}

export function getOffsetLeft(dom) {
    if (!dom) return;
    return dom.offsetLeft + (dom.offsetParent ? getOffset(dom.offsetParent) : 0);
}
