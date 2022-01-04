(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PreloaderIcon = {}, global.React));
})(this, (function (exports, React) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

  function loop(options) {
      var duration = options.duration, _a = options.delay, delay = _a === void 0 ? 0 : _a, update = options.update;
      var startTime;
      var reqId;
      var step = function (timestamp) {
          if (!startTime) {
              startTime = timestamp + delay;
          }
          if (timestamp > startTime) {
              var pastTime = timestamp - startTime;
              var progress = (pastTime % duration) / duration;
              if (update) {
                  update(progress);
              }
          }
          reqId = window.requestAnimationFrame(step);
      };
      reqId = window.requestAnimationFrame(step);
      return function () { return window.cancelAnimationFrame(reqId); };
  }

  var levels$1 = [
      [45, 57, 80, 64, 32, 66, 45, 64, 23, 66, 13, 64, 56, 34, 34, 2, 23, 76, 79, 20],
      [55, 33, 5, 75, 23, 73, 33, 12, 14, 60, 80],
      [34, 78, 23, 56, 23, 34, 76, 80, 54, 21, 50],
      [45, 13, 80, 56, 72, 45, 76, 34, 23, 67, 30],
  ];
  function useRollerCoaster(level, duration) {
      var ref = React.useRef();
      React.useEffect(function () {
          var partProgress = 1 / level.length;
          return loop({
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
      var time = React.useMemo(function () { return (index === 0 ? duration * 2.15 : index === 2 ? duration * 0.7 : duration); }, [duration]);
      var ref = useRollerCoaster(level, time);
      return React__default["default"].createElement("rect", { ref: ref, x: index * 15, rx: "3", width: "10", height: level[level.length - 1] });
  };
  var Audio = function (_a) {
      var strokeColor = _a.strokeColor, duration = _a.duration;
      var audioBars = [];
      for (var i = 0, n = levels$1.length; i < n; i = i + 1) {
          audioBars.push(React__default["default"].createElement(AudioBar, { key: i, index: i, level: levels$1[i], duration: duration }));
      }
      return (React__default["default"].createElement("div", { className: "preloader-icon__audio" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 55 80" },
              React__default["default"].createElement("g", { transform: "matrix(1 0 0 -1 0 80)", fill: strokeColor, strokeWidth: 0 }, audioBars))));
  };

  function useRotate$2(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
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
      var radius = React.useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
      var pathRef = useRotate$2(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__oval" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
              React__default["default"].createElement("g", { fill: "none", strokeWidth: strokeWidth, stroke: strokeColor },
                  React__default["default"].createElement("circle", { strokeOpacity: ".5", r: radius }),
                  React__default["default"].createElement("path", { 
                      // @ts-ignore
                      ref: pathRef, d: "M0,-".concat(radius, " a").concat(radius, ",").concat(radius, " 0 0,1 ").concat(radius, ",").concat(radius), strokeWidth: strokeWidth, stroke: strokeColor })))));
  };

  function useRotate$1(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
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
      var radius = React.useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
      var pathRef = useRotate$1(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__tail-spin" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
              React__default["default"].createElement("defs", null,
                  React__default["default"].createElement("linearGradient", { id: "tail", x1: "8.042%", y1: "0%", x2: "65.682%", y2: "23.865%" },
                      React__default["default"].createElement("stop", { stopColor: strokeColor, stopOpacity: "0", offset: "0%" }),
                      React__default["default"].createElement("stop", { stopColor: strokeColor, stopOpacity: ".631", offset: "63.146%" }),
                      React__default["default"].createElement("stop", { stopColor: strokeColor, offset: "100%" }))),
              React__default["default"].createElement("path", { ref: pathRef, d: "M0,-".concat(radius, " a").concat(radius, ",").concat(radius, " 0 0,1 ").concat(radius, ",").concat(radius), stroke: "url(#tail)", strokeWidth: strokeWidth, strokeLinecap: "round", fill: "none" }))));
  };

  function useBlinking$2(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
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
      var radius = React.useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
      var gRef = useBlinking$2(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__spinning" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 540 540" },
              React__default["default"].createElement("g", { 
                  // @ts-ignore
                  ref: gRef, stroke: strokeColor, strokeWidth: strokeWidth },
                  React__default["default"].createElement("circle", { cx: "490", cy: "270", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                  React__default["default"].createElement("circle", { cx: "425.56", cy: "425.56", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                  React__default["default"].createElement("circle", { cx: "270", cy: "490", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                  React__default["default"].createElement("circle", { cx: "114.43", cy: "425.56", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                  React__default["default"].createElement("circle", { cx: "50", cy: "270", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                  React__default["default"].createElement("circle", { cx: "114.43", cy: "114.43", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                  React__default["default"].createElement("circle", { cx: "269.99", cy: "50", r: radius, style: { fillOpacity: 0 }, fill: strokeColor }),
                  React__default["default"].createElement("circle", { cx: "425.56", cy: "114.43", r: radius, style: { fillOpacity: 0 }, fill: strokeColor })))));
  };

  /**
   * https://github.com/gre/bezier-easing
   * BezierEasing - use bezier curve for transition easing function
   * by Gaëtan Renaudeau 2014 - 2015 – MIT License
   */

  // These values are established by empiricism with tests (tradeoff: performance VS precision)
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 0.001;
  var SUBDIVISION_PRECISION = 0.0000001;
  var SUBDIVISION_MAX_ITERATIONS = 10;

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  var float32ArraySupported = typeof Float32Array === 'function';

  function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
  function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
  function C (aA1)      { return 3.0 * aA1; }

  // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
  function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

  // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
  function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

  function binarySubdivide (aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }

  function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
   for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
     var currentSlope = getSlope(aGuessT, mX1, mX2);
     if (currentSlope === 0.0) {
       return aGuessT;
     }
     var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
     aGuessT -= currentX / currentSlope;
   }
   return aGuessT;
  }

  function LinearEasing (x) {
    return x;
  }

  var src = function bezier (mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      throw new Error('bezier x values must be in [0, 1] range');
    }

    if (mX1 === mY1 && mX2 === mY2) {
      return LinearEasing;
    }

    // Precompute samples table
    var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }

    function getTForX (aX) {
      var intervalStart = 0.0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;

      // Interpolate to provide an initial guess for t
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;

      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }

    return function BezierEasing (x) {
      // Because JavaScript number are imprecise, we should guarantee the extremes are right.
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  };

  var spread = src(0.165, 0.84, 0.44, 1);
  var fade = src(0.3, 0.61, 0.355, 1);
  function useWave(radius, duration) {
      var ref = React.useRef();
      React.useEffect(function () {
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
      var radius = React.useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
      var gRef = useWave(radius, duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__puff" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
              React__default["default"].createElement("g", { 
                  // @ts-ignore
                  ref: gRef, strokeWidth: strokeWidth, stroke: strokeColor, fill: "none" },
                  React__default["default"].createElement("circle", { r: "0", style: { strokeOpacity: 1 } }),
                  React__default["default"].createElement("circle", { r: "0", style: { strokeOpacity: 1 } })))));
  };

  var radius = 50;
  var spreadLevel = [1, 2.2, 4.4, 6.7, 8.9, 11.1, 13.3];
  var partProgress$2 = 0.14285714285714285; // 1 / spreadLevel.length;
  function useSpread(strokeWidth, duration) {
      var c1Ref = React.useRef();
      var c2Ref = React.useRef();
      var c3Ref = React.useRef();
      React.useEffect(function () {
          var cancel1 = loop({
              duration: duration / 2,
              update: function (n) {
                  var currIndex = Math.floor(n / partProgress$2);
                  var prevIndex = currIndex === 0 ? spreadLevel.length - 1 : currIndex - 1;
                  var progress = (n - partProgress$2 * currIndex) / partProgress$2;
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
      return (React__default["default"].createElement("div", { className: "preloader-icon__oval" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "-50 -50 100 100" },
              React__default["default"].createElement("g", { stroke: strokeColor, strokeWidth: strokeWidth, fill: "none" },
                  React__default["default"].createElement("circle", { ref: c1Ref, cx: "0", cy: "0", r: "13.3", strokeOpacity: "0" }),
                  React__default["default"].createElement("circle", { ref: c2Ref, cx: "0", cy: "0", r: "13.3", strokeOpacity: "0" }),
                  React__default["default"].createElement("circle", { ref: c3Ref, cx: "0", cy: "0", r: "13.3" })))));
  };

  var delayRates = [0, 0.3, 0.8, 0.1, 0.6, 0.4, 0.7, 0.5, 0.2];
  function useBlinking$1(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
          var elements = ref.current.querySelectorAll('circle');
          var cancels = [];
          var _loop_1 = function (i, v) {
              cancels[i] = loop({
                  duration: duration,
                  delay: duration * delayRates[i],
                  update: function (n) {
                      var progress = Math.abs(1 - n * 2);
                      elements[i].setAttribute('fill-opacity', String(0.2 + 0.8 * progress));
                  },
              });
          };
          for (var i = 0, v = elements.length; i < v; i = i + 1) {
              _loop_1(i);
          }
          return function () {
              for (var i = 0, n = cancels.length; i < n; i = i + 1) {
                  cancels[i]();
              }
          };
      }, [duration]);
      return ref;
  }
  var Grid = function (_a) {
      var strokeColor = _a.strokeColor, duration = _a.duration;
      var ref = useBlinking$1(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__grid" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100" },
              React__default["default"].createElement("g", { ref: ref, fill: strokeColor },
                  React__default["default"].createElement("circle", { cx: "12", cy: "12", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "50", cy: "12", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "88", cy: "12", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "12", cy: "50", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "50", cy: "50", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "88", cy: "50", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "12", cy: "88", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "50", cy: "88", r: "12" }),
                  React__default["default"].createElement("circle", { cx: "88", cy: "88", r: "12" })))));
  };

  function useBlinking(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
          var element = ref.current;
          var _a = [].slice.call(element.querySelectorAll('path')), p1 = _a[0], p2 = _a[1];
          return loop({
              duration: duration,
              update: function (n) {
                  var progress1 = n <= 0.5 ? n * 2 : (1 - n) * 2;
                  var progress2 = 1 - progress1;
                  p1.setAttribute('fill-opacity', String(0.5 + 0.5 * progress1));
                  p2.setAttribute('fill-opacity', String(0.5 + 0.5 * progress2));
              },
          });
      }, [duration]);
      return ref;
  }
  var Hearts = function (_a) {
      var strokeColor = _a.strokeColor, duration = _a.duration;
      var ref = useBlinking(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__hearts" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 140 64" },
              React__default["default"].createElement("g", { ref: ref, fill: strokeColor },
                  React__default["default"].createElement("path", { d: "M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z" }),
                  React__default["default"].createElement("path", { d: "M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z" }),
                  React__default["default"].createElement("path", { d: "M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z" })))));
  };

  function useThump(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
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
      return (React__default["default"].createElement("div", { className: "preloader-icon__three-dots" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 120 30" },
              React__default["default"].createElement("g", { ref: ref, fill: strokeColor },
                  React__default["default"].createElement("circle", { cx: "15", cy: "15", r: "15" }),
                  React__default["default"].createElement("circle", { cx: "60", cy: "15", r: "9" }),
                  React__default["default"].createElement("circle", { cx: "105", cy: "15", r: "15" })))));
  };

  function useRotate(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
          var element = ref.current;
          var _a = [].slice.call(element.querySelectorAll('path')), p1 = _a[0], p2 = _a[1];
          var cancel1 = loop({
              duration: duration * 0.3125,
              update: function (n) {
                  p1.setAttribute('transform', "rotate(".concat(n * -360, ", 67, 67)"));
              },
          });
          var cancel2 = loop({
              duration: duration,
              update: function (n) {
                  p2.setAttribute('transform', "rotate(".concat(n * 360, ", 67, 67)"));
              },
          });
          return function () {
              cancel1();
              cancel2();
          };
      }, [duration]);
      return ref;
  }
  var Circles = function (_a) {
      var strokeColor = _a.strokeColor, duration = _a.duration;
      var ref = useRotate(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__circles" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 135 135" },
              React__default["default"].createElement("g", { ref: ref, fill: strokeColor },
                  React__default["default"].createElement("path", { d: "M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z" }),
                  React__default["default"].createElement("path", { d: "M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z" })))));
  };

  var levels = [110, 100, 90, 80, 70, 60, 50, 40, 140, 120];
  var partProgress$1 = 0.1;
  function getValues(n) {
      var currIndex = Math.floor(n / partProgress$1);
      var prevIndex = currIndex === 0 ? levels.length - 1 : currIndex - 1;
      var progress = (n - partProgress$1 * currIndex) / partProgress$1;
      var h = levels[prevIndex] + progress * (levels[currIndex] - levels[prevIndex]);
      var y = (140 - h) / 2;
      return [h, y];
  }
  function useBounce(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
          var element = ref.current;
          var _a = [].slice.call(element.querySelectorAll('rect')), r1 = _a[0], r2 = _a[1], r3 = _a[2], r4 = _a[3], r5 = _a[4];
          var cancel1 = loop({
              duration: duration,
              update: function (n) {
                  var _a = getValues(n), h = _a[0], y = _a[1];
                  r3.setAttribute('height', String(h));
                  r3.setAttribute('y', String(y));
              },
          });
          var cancel2 = loop({
              duration: duration,
              delay: duration * 0.25,
              update: function (n) {
                  var _a = getValues(n), h = _a[0], y = _a[1];
                  r2.setAttribute('height', String(h));
                  r4.setAttribute('height', String(h));
                  r2.setAttribute('y', String(y));
                  r4.setAttribute('y', String(y));
              },
          });
          var cancel3 = loop({
              duration: duration,
              delay: duration * 0.5,
              update: function (n) {
                  var _a = getValues(n), h = _a[0], y = _a[1];
                  r1.setAttribute('height', String(h));
                  r5.setAttribute('height', String(h));
                  r1.setAttribute('y', String(y));
                  r5.setAttribute('y', String(y));
              },
          });
          return function () {
              cancel1();
              cancel2();
              cancel3();
          };
      }, [duration]);
      return ref;
  }
  var Bars = function (_a) {
      var strokeColor = _a.strokeColor, duration = _a.duration;
      var ref = useBounce(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__bars" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 135 140" },
              React__default["default"].createElement("g", { ref: ref, fill: strokeColor },
                  React__default["default"].createElement("rect", { x: "0", y: "10", width: "15", height: "120", rx: "6" }),
                  React__default["default"].createElement("rect", { x: "30", y: "10", width: "15", height: "120", rx: "6" }),
                  React__default["default"].createElement("rect", { x: "60", y: "0", width: "15", height: "140", rx: "6" }),
                  React__default["default"].createElement("rect", { x: "90", y: "10", width: "15", height: "120", rx: "6" }),
                  React__default["default"].createElement("rect", { x: "120", y: "10", width: "15", height: "120", rx: "6" })))));
  };

  var partProgress = 0.3333333333333333;
  var levelX = [237.5, 425, 50];
  var levelY = [50, 425, 425];
  var levelCount = 3;
  function useTravel(duration) {
      var ref = React.useRef();
      React.useEffect(function () {
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
      var radius = React.useMemo(function () { return 50 - strokeWidth / 2; }, [strokeWidth]);
      var ref = useTravel(duration);
      return (React__default["default"].createElement("div", { className: "preloader-icon__ball-triangle" },
          React__default["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 475 475" },
              React__default["default"].createElement("g", { 
                  // @ts-ignore
                  ref: ref, fill: "none", stroke: strokeColor, strokeWidth: strokeWidth },
                  React__default["default"].createElement("circle", { cx: "50", cy: "425", r: radius }),
                  React__default["default"].createElement("circle", { cx: "237.5", cy: "50", r: radius }),
                  React__default["default"].createElement("circle", { cx: "425", cy: "425", r: radius })))));
  };

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  var Preloader = function (_a) {
      var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.style, style = _c === void 0 ? {} : _c, use = _a.use, _d = _a.size, size = _d === void 0 ? '100%' : _d, _e = _a.strokeWidth, strokeWidth = _e === void 0 ? 3 : _e, _f = _a.strokeColor, strokeColor = _f === void 0 ? '#f0ad4e' : _f, _g = _a.duration, duration = _g === void 0 ? 800 : _g;
      var length = !Number.isNaN(Number(size)) ? "".concat(size, "px") : size;
      return (React__default["default"].createElement("div", { className: "preloader-icon ".concat(className), style: __assign({ width: length }, style) },
          React__default["default"].createElement("div", { className: "preloader-icon__inner", style: {
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  backfaceVisibility: 'hidden',
                  lineHeight: 0,
              } },
              React__default["default"].createElement("em", { className: "preloader-icon__title", style: {
                      position: 'absolute',
                      clip: 'rect(0, 0, 0, 0)',
                      whiteSpace: 'nowrap',
                      border: '0',
                  } }, "Loading..."),
              React__default["default"].createElement(use, { strokeWidth: strokeWidth, strokeColor: strokeColor, duration: duration }))));
  };

  exports.Audio = Audio;
  exports.BallTriangle = BallTriangle;
  exports.Bars = Bars;
  exports.Circles = Circles;
  exports.Grid = Grid;
  exports.Hearts = Hearts;
  exports.Oval = Oval;
  exports.Preloader = Preloader;
  exports.Puff = Puff;
  exports.Rings = Rings;
  exports.Spinning = Spinning;
  exports.TailSpin = TailSpin;
  exports.ThreeDots = ThreeDots;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=preloader.umd.js.map
