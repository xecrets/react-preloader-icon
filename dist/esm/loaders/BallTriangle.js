import React, { useRef, useEffect, useMemo } from 'react';
import loop from '../utils/loop';
var partProgress = 0.3333333333333333;
var levelX = [237.5, 425, 50];
var levelY = [50, 425, 425];
var levelCount = 3;
function useTravel(duration) {
    var ref = useRef();
    useEffect(function () {
        var circles = ref.current.querySelectorAll('circle');
        return loop({
            duration: duration,
            update: function (n) {
                var phase = Math.floor(n / partProgress);
                var progress = (n - partProgress * phase) / partProgress;
                for (var i = 0, t = circles.length; i < t; i = i + 1) {
                    var currIndex = phase + i;
                    currIndex = currIndex >= levelCount ? currIndex - levelCount : currIndex;
                    var prevIndex = currIndex === 0 ? 2 : currIndex - 1;
                    var cx = levelX[prevIndex] + progress * (levelX[currIndex] - levelX[prevIndex]);
                    var cy = levelY[prevIndex] + progress * (levelY[currIndex] - levelY[prevIndex]);
                    circles[i].setAttribute('cx', String(cx));
                    circles[i].setAttribute('cy', String(cy));
                }
            },
        });
    }, [duration]);
    return ref;
}
var BallTriangle = function (_a) {
    var strokeWidth = _a.strokeWidth, strokeColor = _a.strokeColor, duration = _a.duration;
    var radius = useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
    var ref = useTravel(duration);
    return (React.createElement("div", { className: "preloader-icon__ball-triangle" },
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 475 475" },
            React.createElement("g", { 
                // @ts-ignore
                ref: ref, fill: "none", stroke: strokeColor, strokeWidth: strokeWidth },
                React.createElement("circle", { cx: "50", cy: "425", r: radius }),
                React.createElement("circle", { cx: "237.5", cy: "50", r: radius }),
                React.createElement("circle", { cx: "425", cy: "425", r: radius })))));
};
export default BallTriangle;
