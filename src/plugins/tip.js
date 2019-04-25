export default function(message) {
    this.message = message || '当前操作发生错误！';
    this.timer = null;
    let that = this;
    
    function _clear() {
        clearTimeout(that.timer);
        let tip = document.querySelector('._tip');
        tip && document.body.removeChild(tip);
    }

    function _init() {
        _clear();
        let div = document.createElement('div');
        div.classList.add('_tip');
        div.style = ";position: absolute;top: 15vh;left: 50%;transform: translateX(-50%);"
        div.innerHTML = `<div class="_tip_content" style="min-width: 100px;max-width: 300px;padding: 0 10px;font-size: 14px;line-height: 30px;color: #fff;border-radius: 5px;text-align: center;background: rgba(0, 0, 0, .6);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${that.message}！</div>`;
        document.body.appendChild(div);

        that.timer = setTimeout(function() {
            _clear();
        }, 1200);
    }
    _init();
}