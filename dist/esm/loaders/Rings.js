import React, { useEffect, useRef } from 'react';
import loop from '../utils/loop';
var radius = 50;
var spreadLevel = [1, 2.2, 4.4, 6.7, 8.9, 11.1, 13.3];
var partProgress = 0.14285714285714285; // 1 / spreadLevel.length;
function useSpread(strokeWidth, duration) {
    var c1Ref = useRef();
    var c2Ref = useRef();
    var c3Ref = useRef();
    useEffect(function () {
        var cancel1 = loop({
            duration: duration / 2,
            update: function (n) {
                var currIndex = Math.floor(n / partProgress);
                var prevIndex = currIndex === 0 ? spreadLevel.length - 1 : currIndex - 1;
                var progress = (n - partProgress * currIndex) / partProgress;
                var r = spreadLevel[prevIndex] + progress * (spreadLevel[currIndex] - spreadLevel[prevIndex]);
                c3Ref.current.setAttribute('r', String(r));
            },
        });
        var cancel2 = loop({
            duration: duration,
            delay: duration / 2,
            update: function (n) {
                c1Ref.current.setAttribute('r', String(n * (radius - 13.3) + 13.3));
                c1Ref.current.setAttribute('stroke-opacity', String(1 - n));
                c1Ref.current.setAttribute('stroke-width', String(strokeWidth - strokeWidth * n));
            },
        });
        var cancel3 = loop({
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
    return (React.createElement("div", { className: "preloader-icon__oval" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
            React.createElement("g", { stroke: strokeColor, strokeWidth: strokeWidth, fill: "none" },
                React.createElement("circle", { ref: c1Ref, cx: "0", cy: "0", r: "13.3", strokeOpacity: "0" }),
                React.createElement("circle", { ref: c2Ref, cx: "0", cy: "0", r: "13.3", strokeOpacity: "0" }),
                React.createElement("circle", { ref: c3Ref, cx: "0", cy: "0", r: "13.3" })))));
};
export default Rings;
