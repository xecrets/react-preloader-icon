import React, { useEffect, useMemo, useRef } from 'react';
import loop from '../utils/loop';
function useBlinking(duration) {
    var ref = useRef();
    useEffect(function () {
        var elements = ref.current.querySelectorAll('circle');
        var count = elements.length;
        var partProgress = 1 / count;
        var prevIndex = 0;
        return loop({
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
    var radius = useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var gRef = useBlinking(duration);
    return (React.createElement("div", { className: "preloader-icon__spinning" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 540 540" },
            React.createElement("g", { 
                // @ts-ignore
                ref: gRef, stroke: strokeColor, strokeWidth: strokeWidth },
                React.createElement("circle", { cx: "490", cy: "270", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                React.createElement("circle", { cx: "425.56", cy: "425.56", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                React.createElement("circle", { cx: "270", cy: "490", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                React.createElement("circle", { cx: "114.43", cy: "425.56", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                React.createElement("circle", { cx: "50", cy: "270", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                React.createElement("circle", { cx: "114.43", cy: "114.43", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                React.createElement("circle", { cx: "269.99", cy: "50", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                React.createElement("circle", { cx: "425.56", cy: "114.43", r: radius, style: { fillOpacity: 0 }, fill: strokeColor })))));
};
export default Spinning;
