"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var loop_1 = (0, tslib_1.__importDefault)(require("../utils/loop"));
var delayRates = [0, 0.3, 0.8, 0.1, 0.6, 0.4, 0.7, 0.5, 0.2];
function useBlinking(duration) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var elements = ref.current.querySelectorAll('circle');
        var cancels = [];
        var _loop_1 = function (i, v) {
            cancels[i] = (0, loop_1.default)({
                duration: duration,
                delay: duration * delayRates[i],
                update: function (n) {
                    var progress = Math.abs(1 - n * 2);
                    elements[i].setAttribute('fill-opacity', String(0.2 + 0.8 * progress));
                },
            });
        };
        for (var i = 0, v = elements.length; i < v; i = i + 1) {
            _loop_1(i, v);
        }
        return function () {
            for (var i = 0, n = cancels.length; i < n; i = i + 1) {
                cancels[i]();
            }
        };
    }, [duration]);
    return ref;
}
var Grid = function (_a) {
    var strokeColor = _a.strokeColor, duration = _a.duration;
    var ref = useBlinking(duration);
    return (react_1.default.createElement("div", { className: "preloader-icon__grid" },
        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100" },
            react_1.default.createElement("g", { ref: ref, fill: strokeColor },
                react_1.default.createElement("circle", { cx: "12", cy: "12", r: "12" }),
                react_1.default.createElement("circle", { cx: "50", cy: "12", r: "12" }),
                react_1.default.createElement("circle", { cx: "88", cy: "12", r: "12" }),
                react_1.default.createElement("circle", { cx: "12", cy: "50", r: "12" }),
                react_1.default.createElement("circle", { cx: "50", cy: "50", r: "12" }),
                react_1.default.createElement("circle", { cx: "88", cy: "50", r: "12" }),
                react_1.default.createElement("circle", { cx: "12", cy: "88", r: "12" }),
                react_1.default.createElement("circle", { cx: "50", cy: "88", r: "12" }),
                react_1.default.createElement("circle", { cx: "88", cy: "88", r: "12" })))));
};
exports.default = Grid;
