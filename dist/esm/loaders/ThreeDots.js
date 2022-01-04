import React, { useEffect, useRef } from 'react';
import loop from '../utils/loop';
function useThump(duration) {
    var ref = useRef();
    useEffect(function () {
        var element = ref.current;
        var _a = [].slice.call(element.querySelectorAll('circle')), c1 = _a[0], c2 = _a[1], c3 = _a[2];
        return loop({
            duration: duration,
            update: function (n) {
                var progress1 = n <= 0.5 ? n * 2 : (1 - n) * 2;
                var progress2 = 1 - progress1;
                c1.setAttribute('r', String(9 + 6 * progress2));
                c2.setAttribute('r', String(9 + 6 * progress1));
                c3.setAttribute('r', String(9 + 6 * progress2));
                c1.setAttribute('fill-opacity', String(0.5 + 0.5 * progress2));
                c2.setAttribute('fill-opacity', String(0.5 + 0.5 * progress1));
                c3.setAttribute('fill-opacity', String(0.5 + 0.5 * progress2));
            },
        });
    }, [duration]);
    return ref;
}
var ThreeDots = function (_a) {
    var strokeColor = _a.strokeColor, duration = _a.duration;
    var ref = useThump(duration);
    return (React.createElement("div", { className: "preloader-icon__three-dots" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 120 30" },
            React.createElement("g", { ref: ref, fill: strokeColor },
                React.createElement("circle", { cx: "15", cy: "15", r: "15" }),
                React.createElement("circle", { cx: "60", cy: "15", r: "9" }),
                React.createElement("circle", { cx: "105", cy: "15", r: "15" })))));
};
export default ThreeDots;
