export default function loop(options) {
    var duration = options.duration, _a = options.delay, delay = _a === void 0 ? 0 : _a, update = options.update;
    var startTime;
    var reqId;
    var step = function (timestamp) {
        if (!startTime) {
            startTime = timestamp + delay;
        }
        if (timestamp > startTime) {
            var pastTime = timestamp - startTime;
            var progress = (pastTime % duration) / duration;
            if (update) {
                update(progress);
            }
        }
        reqId = window.requestAnimationFrame(step);
    };
    reqId = window.requestAnimationFrame(step);
    return function () { return window.cancelAnimationFrame(reqId); };
}
