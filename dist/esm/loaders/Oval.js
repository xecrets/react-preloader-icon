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
var Oval = function (_a) {
    var strokeWidth = _a.strokeWidth, strokeColor = _a.strokeColor, duration = _a.duration;
    var radius = useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var pathRef = useRotate(duration);
    return (React.createElement("div", { className: "preloader-icon__oval" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
            React.createElement("g", { fill: "none", strokeWidth: strokeWidth, stroke: strokeColor },
                React.createElement("circle", { strokeOpacity: ".5", r: radius }),
                React.createElement("path", { 
                    // @ts-ignore
                    ref: pathRef, d: "M0,-".concat(radius, " a").concat(radius, ",").concat(radius, " 0 0,1 ").concat(radius, ",").concat(radius), strokeWidth: strokeWidth, stroke: strokeColor })))));
};
export default Oval;
