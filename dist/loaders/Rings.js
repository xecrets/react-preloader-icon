"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var loop_1 = (0, tslib_1.__importDefault)(require("../utils/loop"));
var radius = 50;
var spreadLevel = [1, 2.2, 4.4, 6.7, 8.9, 11.1, 13.3];
var partProgress = 0.14285714285714285; // 1 / spreadLevel.length;
function useSpread(strokeWidth, duration) {
    var c1Ref = (0, react_1.useRef)();
    var c2Ref = (0, react_1.useRef)();
    var c3Ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var cancel1 = (0, loop_1.default)({
            duration: duration / 2,
            update: function (n) {
                var currIndex = Math.floor(n / partProgress);
                var prevIndex = currIndex === 0 ? spreadLevel.length - 1 : currIndex - 1;
                var progress = (n - partProgress * currIndex) / partProgress;
                var r = spreadLevel[prevIndex] + progress * (spreadLevel[currIndex] - spreadLevel[prevIndex]);
                c3Ref.current.setAttribute('r', String(r));
            },
        });
        var cancel2 = (0, loop_1.default)({
            duration: duration,
            delay: duration / 2,
            update: function (n) {
                c1Ref.current.setAttribute('r', String(n * (radius - 13.3) + 13.3));
                c1Ref.current.setAttribute('stroke-opacity', String(1 - n));
                c1Ref.current.setAttribute('stroke-width', String(strokeWidth - strokeWidth * n));
            },
        });
        var cancel3 = (0, loop_1.default)({
            duration: duration,
            delay: duration,
            update: function (n) {
                c2Ref.current.setAttribute('r', String(n * (radius - 13.3) + 13.3));
                c2Ref.current.setAttribute('stroke-opacity', String(1 - n));
                c2Ref.current.setAttribute('stroke-width', String(strokeWidth - strokeWidth * n));
            },
        });
        return function () {
            cancel1();
            cancel2();
            cancel3();
        };
    }, [duration, strokeWidth]);
    return [c1Ref, c2Ref, c3Ref];
}
var Rings = function (_a) {
    var strokeColor = _a.strokeColor, strokeWidth = _a.strokeWidth, duration = _a.duration;
    var _b = useSpread(strokeWidth, duration), c1Ref = _b[0], c2Ref = _b[1], c3Ref = _b[2];
    return (react_1.default.createElement("div", { className: "preloader-icon__oval" },
        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
            react_1.default.createElement("g", { stroke: strokeColor, strokeWidth: strokeWidth, fill: "none" },
                react_1.default.createElement("circle", { ref: c1Ref, cx: "0", cy: "0", r: "13.3", strokeOpacity: "0" }),
                react_1.default.createElement("circle", { ref: c2Ref, cx: "0", cy: "0", r: "13.3", strokeOpacity: "0" }),
                react_1.default.createElement("circle", { ref: c3Ref, cx: "0", cy: "0", r: "13.3" })))));
};
exports.default = Rings;
