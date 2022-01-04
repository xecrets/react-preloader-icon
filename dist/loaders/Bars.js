"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var loop_1 = (0, tslib_1.__importDefault)(require("../utils/loop"));
var levels = [110, 100, 90, 80, 70, 60, 50, 40, 140, 120];
var partProgress = 0.1;
function getValues(n) {
    var currIndex = Math.floor(n / partProgress);
    var prevIndex = currIndex === 0 ? levels.length - 1 : currIndex - 1;
    var progress = (n - partProgress * currIndex) / partProgress;
    var h = levels[prevIndex] + progress * (levels[currIndex] - levels[prevIndex]);
    var y = (140 - h) / 2;
    return [h, y];
}
function useBounce(duration) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var element = ref.current;
        var _a = [].slice.call(element.querySelectorAll('rect')), r1 = _a[0], r2 = _a[1], r3 = _a[2], r4 = _a[3], r5 = _a[4];
        var cancel1 = (0, loop_1.default)({
            duration: duration,
            update: function (n) {
                var _a = getValues(n), h = _a[0], y = _a[1];
                r3.setAttribute('height', String(h));
                r3.setAttribute('y', String(y));
            },
        });
        var cancel2 = (0, loop_1.default)({
            duration: duration,
            delay: duration * 0.25,
            update: function (n) {
                var _a = getValues(n), h = _a[0], y = _a[1];
                r2.setAttribute('height', String(h));
                r4.setAttribute('height', String(h));
                r2.setAttribute('y', String(y));
                r4.setAttribute('y', String(y));
            },
        });
        var cancel3 = (0, loop_1.default)({
            duration: duration,
            delay: duration * 0.5,
            update: function (n) {
                var _a = getValues(n), h = _a[0], y = _a[1];
                r1.setAttribute('height', String(h));
                r5.setAttribute('height', String(h));
                r1.setAttribute('y', String(y));
                r5.setAttribute('y', String(y));
            },
        });
        return function () {
            cancel1();
            cancel2();
            cancel3();
        };
    }, [duration]);
    return ref;
}
var Bars = function (_a) {
    var strokeColor = _a.strokeColor, duration = _a.duration;
    var ref = useBounce(duration);
    return (react_1.default.createElement("div", { className: "preloader-icon__bars" },
        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 135 140" },
            react_1.default.createElement("g", { ref: ref, fill: strokeColor },
                react_1.default.createElement("rect", { x: "0", y: "10", width: "15", height: "120", rx: "6" }),
                react_1.default.createElement("rect", { x: "30", y: "10", width: "15", height: "120", rx: "6" }),
                react_1.default.createElement("rect", { x: "60", y: "0", width: "15", height: "140", rx: "6" }),
                react_1.default.createElement("rect", { x: "90", y: "10", width: "15", height: "120", rx: "6" }),
                react_1.default.createElement("rect", { x: "120", y: "10", width: "15", height: "120", rx: "6" })))));
};
exports.default = Bars;
