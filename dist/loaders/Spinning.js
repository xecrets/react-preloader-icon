"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var loop_1 = (0, tslib_1.__importDefault)(require("../utils/loop"));
function useBlinking(duration) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var elements = ref.current.querySelectorAll('circle');
        var count = elements.length;
        var partProgress = 1 / count;
        var prevIndex = 0;
        return (0, loop_1.default)({
            duration: duration,
            update: function (n) {
                var nextIndex = Math.floor(n / partProgress);
                var nextTarget;
                var prevTarget;
                if (nextIndex - 1 !== prevIndex && !(nextIndex === 0 && prevIndex === count - 1)) {
                    prevTarget = elements[prevIndex];
                    prevTarget.style.fillOpacity = '0';
                    prevIndex = nextIndex === 0 ? count - 1 : nextIndex - 1;
                }
                var progress = (n - partProgress * nextIndex) / partProgress;
                nextTarget = elements[nextIndex];
                prevTarget = elements[prevIndex];
                nextTarget.style.fillOpacity = String(progress);
                prevTarget.style.fillOpacity = String(1 - progress);
            },
        });
    }, [duration]);
    return ref;
}
var Spinning = function (_a) {
    var strokeWidth = _a.strokeWidth, strokeColor = _a.strokeColor, duration = _a.duration;
    var radius = (0, react_1.useMemo)(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var gRef = useBlinking(duration);
    return (react_1.default.createElement("div", { className: "preloader-icon__spinning" },
        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 540 540" },
            react_1.default.createElement("g", { 
                // @ts-ignore
                ref: gRef, stroke: strokeColor, strokeWidth: strokeWidth },
                react_1.default.createElement("circle", { cx: "490", cy: "270", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                react_1.default.createElement("circle", { cx: "425.56", cy: "425.56", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                react_1.default.createElement("circle", { cx: "270", cy: "490", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                react_1.default.createElement("circle", { cx: "114.43", cy: "425.56", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                react_1.default.createElement("circle", { cx: "50", cy: "270", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                react_1.default.createElement("circle", { cx: "114.43", cy: "114.43", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                react_1.default.createElement("circle", { cx: "269.99", cy: "50", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                react_1.default.createElement("circle", { cx: "425.56", cy: "114.43", r: radius, style: { fillOpacity: 0 }, fill: strokeColor })))));
};
exports.default = Spinning;
