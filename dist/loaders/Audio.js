"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importStar)(require("react"));
var loop_1 = (0, tslib_1.__importDefault)(require("../utils/loop"));
var levels = [
    [45, 57, 80, 64, 32, 66, 45, 64, 23, 66, 13, 64, 56, 34, 34, 2, 23, 76, 79, 20],
    [55, 33, 5, 75, 23, 73, 33, 12, 14, 60, 80],
    [34, 78, 23, 56, 23, 34, 76, 80, 54, 21, 50],
    [45, 13, 80, 56, 72, 45, 76, 34, 23, 67, 30],
];
function useRollerCoaster(level, duration) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        var partProgress = 1 / level.length;
        return (0, loop_1.default)({
            duration: duration,
            update: function (n) {
                var currIndex = Math.floor(n / partProgress);
                var prevIndex = currIndex === 0 ? level.length - 1 : currIndex - 1;
                var progress = (n - partProgress * currIndex) / partProgress;
                var h = level[prevIndex] + progress * (level[currIndex] - level[prevIndex]);
                ref.current.setAttribute('height', String(h));
            },
        });
    }, [duration]);
    return ref;
}
var AudioBar = function (_a) {
    var index = _a.index, level = _a.level, duration = _a.duration;
    var time = (0, react_1.useMemo)(function () { return (index === 0 ? duration * 2.15 : index === 2 ? duration * 0.7 : duration); }, [duration]);
    var ref = useRollerCoaster(level, time);
    return react_1.default.createElement("rect", { ref: ref, x: index * 15, rx: "3", width: "10", height: level[level.length - 1] });
};
var Audio = function (_a) {
    var strokeColor = _a.strokeColor, duration = _a.duration;
    var audioBars = [];
    for (var i = 0, n = levels.length; i < n; i = i + 1) {
        audioBars.push(react_1.default.createElement(AudioBar, { key: i, index: i, level: levels[i], duration: duration }));
    }
    return (react_1.default.createElement("div", { className: "preloader-icon__audio" },
        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 55 80" },
            react_1.default.createElement("g", { transform: "matrix(1 0 0 -1 0 80)", fill: strokeColor, strokeWidth: 0 }, audioBars))));
};
exports.default = Audio;
