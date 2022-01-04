"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var loop_1 = (0, tslib_1.__importDefault)(require("../utils/loop"));
function useRotate(duration) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var element = ref.current;
        return (0, loop_1.default)({
            duration: duration,
            update: function (n) {
                element.setAttribute('transform', "rotate(".concat(n * 360, ")"));
            },
        });
    }, [duration]);
    return ref;
}
var TailSpin = function (_a) {
    var strokeWidth = _a.strokeWidth, strokeColor = _a.strokeColor, duration = _a.duration;
    var radius = (0, react_1.useMemo)(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var pathRef = useRotate(duration);
    return (react_1.default.createElement("div", { className: "preloader-icon__tail-spin" },
        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
            react_1.default.createElement("defs", null,
                react_1.default.createElement("linearGradient", { id: "tail", x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%" },
                    react_1.default.createElement("stop", { stopColor: strokeColor, stopOpacity: "0", offset: "0%" }),
                    react_1.default.createElement("stop", { stopColor: strokeColor, stopOpacity: ".631", offset: "63.146%" }),
                    react_1.default.createElement("stop", { stopColor: strokeColor, offset: "100%" }))),
            react_1.default.createElement("path", { ref: pathRef, d: "M0,-".concat(radius, " a").concat(radius, ",").concat(radius, " 0 0,1 ").concat(radius, ",").concat(radius), stroke: "url(#tail)", strokeWidth: strokeWidth, strokeLinecap: "round", fill: "none" }))));
};
exports.default = TailSpin;
