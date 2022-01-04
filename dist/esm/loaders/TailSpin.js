import React, { useEffect, useMemo, useRef } from 'react';
import loop from '../utils/loop';
function useRotate(duration) {
    var ref = useRef();
    useEffect(function () {
        var element = ref.current;
        return loop({
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
    var radius = useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var pathRef = useRotate(duration);
    return (React.createElement("div", { className: "preloader-icon__tail-spin" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "tail", x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%" },
                    React.createElement("stop", { stopColor: strokeColor, stopOpacity: "0", offset: "0%" }),
                    React.createElement("stop", { stopColor: strokeColor, stopOpacity: ".631", offset: "63.146%" }),
                    React.createElement("stop", { stopColor: strokeColor, offset: "100%" }))),
            React.createElement("path", { ref: pathRef, d: "M0,-".concat(radius, " a").concat(radius, ",").concat(radius, " 0 0,1 ").concat(radius, ",").concat(radius), stroke: "url(#tail)", strokeWidth: strokeWidth, strokeLinecap: "round", fill: "none" }))));
};
export default TailSpin;
