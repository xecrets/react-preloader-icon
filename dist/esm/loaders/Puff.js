import bezierEasing from 'bezier-easing';
import React, { useEffect, useMemo, useRef } from 'react';
import loop from '../utils/loop';
var spread = bezierEasing(0.165, 0.84, 0.44, 1);
var fade = bezierEasing(0.3, 0.61, 0.355, 1);
function useWave(radius, duration) {
    var ref = useRef();
    useEffect(function () {
        var circles = ref.current.querySelectorAll('circle');
        return loop({
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
    var radius = useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var gRef = useWave(radius, duration);
    return (React.createElement("div", { className: "preloader-icon__puff" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
            React.createElement("g", { 
                // @ts-ignore
                ref: gRef, strokeWidth: strokeWidth, stroke: strokeColor, fill: "none" },
                React.createElement("circle", { r: "0", style: { strokeOpacity: 1 } }),
                React.createElement("circle", { r: "0", style: { strokeOpacity: 1 } })))));
};
export default Puff;
