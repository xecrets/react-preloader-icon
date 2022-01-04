"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var bezier_easing_1 = (0, tslib_1.__importDefault)(require("bezier-easing"));
var react_1 = (0, tslib_1.__importStar)(require("react"));
var loop_1 = (0, tslib_1.__importDefault)(require("../utils/loop"));
var spread = (0, bezier_easing_1.default)(0.165, 0.84, 0.44, 1);
var fade = (0, bezier_easing_1.default)(0.3, 0.61, 0.355, 1);
function useWave(radius, duration) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var circles = ref.current.querySelectorAll('circle');
        return (0, loop_1.default)({
            duration: duration,
            update: function (n) {
                var n2 = n >= 0.5 ? n - 0.5 : n + 0.5;
                circles[0].setAttribute('r', String(spread(n) * radius));
                circles[0].style.strokeOpacity = String(1 - fade(n));
                circles[1].setAttribute('r', String(spread(n2) * radius));
                circles[1].style.strokeOpacity = String(1 - fade(n2));
            },
        });
    }, [radius, duration]);
    return ref;
}
var Puff = function (_a) {
    var strokeWidth = _a.strokeWidth, strokeColor = _a.strokeColor, duration = _a.duration;
    var radius = (0, react_1.useMemo)(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var gRef = useWave(radius, duration);
    return (react_1.default.createElement("div", { className: "preloader-icon__puff" },
        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
            react_1.default.createElement("g", { 
                // @ts-ignore
                ref: gRef, strokeWidth: strokeWidth, stroke: strokeColor, fill: "none" },
                react_1.default.createElement("circle", { r: "0", style: { strokeOpacity: 1 } }),
                react_1.default.createElement("circle", { r: "0", style: { strokeOpacity: 1 } })))));
};
exports.default = Puff;
