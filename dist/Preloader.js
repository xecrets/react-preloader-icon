"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = (0, tslib_1.__importDefault)(require("react"));
var Preloader = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.style, style = _c === void 0 ? {} : _c, use = _a.use, _d = _a.size, size = _d === void 0 ? '100%' : _d, _e = _a.strokeWidth, strokeWidth = _e === void 0 ? 3 : _e, _f = _a.strokeColor, strokeColor = _f === void 0 ? '#f0ad4e' : _f, _g = _a.duration, duration = _g === void 0 ? 800 : _g;
    var length = !Number.isNaN(Number(size)) ? "".concat(size, "px") : size;
    return (react_1.default.createElement("div", { className: "preloader-icon ".concat(className), style: (0, tslib_1.__assign)({ width: length }, style) },
        react_1.default.createElement("div", { className: "preloader-icon__inner", style: {
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                backfaceVisibility: 'hidden',
                lineHeight: 0,
            } },
            react_1.default.createElement("em", { className: "preloader-icon__title", style: {
                    position: 'absolute',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: '0',
                } }, "Loading..."),
            react_1.default.createElement(use, { strokeWidth: strokeWidth, strokeColor: strokeColor, duration: duration }))));
};
exports.default = Preloader;