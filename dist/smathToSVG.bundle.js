/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ({

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = __webpack_require__(22);
var canvas_2 = __webpack_require__(7);
var parser_v2_1 = __webpack_require__(4);
var SVGGraph = /** @class */ (function () {
    function SVGGraph() {
    }
    return SVGGraph;
}());
exports.default = SVGGraph;
var c = new canvas_1.default(750, 750);
//@ts-ignore
var xc = new canvas_2.default(c);
xc.init();
var parser = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
xc.init();
xc.funcs = {};
if (window.location.hash != '') {
    var func_str = decodeURIComponent(window.location.hash.replace('#', ''));
    var func = parser.Functionize(func_str);
    var color = xc.drawFromFunc(func);
    xc.funcs = {
        func: {
            visible: true,
            color: color,
            array: func,
            exp: func_str,
            initial: func_str
        }
    };
    document.body.appendChild(document.createElement('span')).innerHTML = c.toSVG();
}


/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ctxsvg_1 = __webpack_require__(23);
var CanvasSubstitute = /** @class */ (function () {
    function CanvasSubstitute(width, height) {
        if (width === void 0) { width = 500; }
        if (height === void 0) { height = 500; }
        this.scrollHeight = this.height = height;
        this.scrollWidth = this.width = width;
    }
    CanvasSubstitute.prototype.getContext = function (type) {
        if (type == '2d') {
            console.log(this.xGet2DContext());
            return this.xGet2DContext();
        }
    };
    CanvasSubstitute.prototype.xGet2DContext = function () {
        if (this.ctx)
            return this.ctx;
        else {
            this.ctx = new ctxsvg_1.default();
            return this.ctx;
        }
    };
    CanvasSubstitute.prototype.toSVG = function () {
        var inside = "";
        this.getContext('2d').svg.forEach(function (e) {
            if (e.text != []) {
                e.text.forEach(function (text) {
                    inside += "<text x=\"" + text.x + "\" y=\"" + text.y + "\" style=\"fill:" + text.color + ";font: " + text.font + "\">" + text.text + "</text>";
                });
            }
            if (e.path == '' || e.path == 'Z' || e.path.indexOf('L') == 0)
                return;
            inside += "<path d=\"" + e.path + "\" style=\"stroke-width:" + e.stroke_width + "px;stroke:" + e.stroke + ";fill:" + e.fill + ";\"></path>";
        });
        return "<svg width=\"" + this.width + "\" height=\"" + this.height + "\">" + inside + "</svg>";
    };
    CanvasSubstitute.prototype.addEventListener = function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    };
    return CanvasSubstitute;
}());
exports.default = CanvasSubstitute;


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __webpack_require__(24);
var context = /** @class */ (function () {
    function context() {
        this.svg = [];
    }
    context.prototype.clearRect = function () {
        this.svg = [];
    };
    context.prototype.beginPath = function () {
        this.i = this.svg.push(new path_1.Path()) - 1;
    };
    context.prototype.rect = function (x, y, width, height) {
        this.moveTo(x, y);
        this.lineTo(x + width, y);
        this.lineTo(x + width, y + height);
        this.lineTo(x, y + height);
        this.closePath();
    };
    context.prototype.fill = function () {
        this.svg[this.i].fill = this.fillStyle;
    };
    context.prototype.stroke = function () {
        this.svg[this.i].stroke = this.strokeStyle;
        this.svg[this.i].stroke_width = this.lineWidth;
    };
    context.prototype.fillText = function (text, x, y) {
        this.svg[this.i].text.push(new path_1.XText(text, x, y, this.font, this.fillStyle));
    };
    context.prototype.closePath = function () {
        this.svg[this.i].path += "Z";
    };
    context.prototype.moveTo = function (x, y) {
        if (!isNaN(y))
            this.svg[this.i].path += "M" + x + " " + y + " ";
    };
    context.prototype.lineTo = function (x, y) {
        if (!isNaN(y))
            this.svg[this.i].path += "L" + x + " " + y + " ";
    };
    return context;
}());
exports.default = context;


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Path = /** @class */ (function () {
    function Path() {
        this.path = '';
        this.stroke = 'none';
        this.stroke_width = 1;
        this.fill = 'none';
        this.text = [];
    }
    return Path;
}());
exports.Path = Path;
var XText = /** @class */ (function () {
    function XText(text, x, y, style, color) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = style;
        this.color = color;
    }
    return XText;
}());
exports.XText = XText;


/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    function Parser() {
        this.partials = {};
        this.type = 'parser';
        this.math_func = [
            'sin',
            'tan',
            'cos',
            'asin',
            'atan',
            'acos',
            'sinh',
            'tanh',
            'cosh',
            'asinh',
            'atanh',
            'acosh',
            'ceil',
            'floor',
            'abs',
            'exp',
            'ln',
            'log',
            'pow',
            'cot',
            'sec',
            'csc'
        ];
    }
    /**
     * Initialise a parsing task
     * @param {String} expression the expression that has to be parsed
     */
    Parser.prototype.parse = function (expression) {
        var _this = this;
        if (typeof expression == 'number') {
            //@ts-ignore
            expression = expression.toString();
        }
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        // 3) We really parse the expression
        // We transform math functions into valid js code
        expression = expression.replace(/sqrt\$([0-9]+)/i, function (e, $1) { return "Math.pow($" + $1 + ", 0.5)"; });
        /*expression = expression.replace(/derivée\$([0-9]+)/i,
            (e, $1) => `()`);*/
        // We tranform exponants into Math.pow()
        expression = expression.replace(/([\$0-9xe]+)\^([\$0-9xe]+)/gi, function (e, $1, $2) { return "pow(" + $1 + ", " + $2 + ")"; });
        // We rebuild the complete expression
        expression = expression.replace(/\$([0-9]+)/gi, function (e, $1) {
            return _this.clean('(' + _this.parse(_this.partials['$' + $1]) + ')');
        });
        expression = this.clean(expression);
        return expression;
    };
    /**
     * Checks if the number of ( is equal to the number of )
     * @param exp the expression to check
     */
    Parser.prototype.check = function (exp) {
        var open_brackets_number = exp.split('(').length;
        var close_brackets_number = exp.split(')').length;
        if (open_brackets_number == close_brackets_number) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * PrepareExpression
     */
    Parser.prototype.prepareExpression = function (exp) {
        var _this = this;
        exp = exp.replace(/²/gi, '^2');
        exp = exp.replace(/³/gi, '^2');
        exp = exp.replace(/X/g, 'x');
        var processed_exp = '';
        var parenthesis_level = 0;
        var buffer = '';
        for (var i = 0; i < exp.length; i++) {
            var char = exp[i];
            var e = '$' + (Object.keys(this.partials).length + 1);
            if (parenthesis_level >= 1) {
                if (char == ')') {
                    parenthesis_level -= 1;
                    if (parenthesis_level == 0) {
                        this.partials[e] = buffer;
                        buffer = '';
                    }
                    else {
                        buffer += char;
                    }
                }
                else {
                    if (char == '(') {
                        parenthesis_level += 1;
                    }
                    buffer += char;
                }
            }
            else {
                if (char == '(') {
                    parenthesis_level += 1;
                    processed_exp += e;
                }
                else {
                    processed_exp += char;
                }
            }
        }
        processed_exp = processed_exp.replace(/([0-9\.]+)x\^([\$0-9\.]+)/gi, function (exp, $1, $2) {
            var e = '$' + (Object.keys(_this.partials).length + 1);
            _this.partials[e] = $1 + "*x^" + $2;
            return e;
        });
        processed_exp = processed_exp.replace(/([0-9\.]+)x/gi, function (exp, $1) {
            var e = '$' + (Object.keys(_this.partials).length + 1);
            _this.partials[e] = $1 + "*x";
            return e;
        });
        return processed_exp;
    };
    Parser.prototype.getComputedValue = function (value) {
        var math = new MathObject();
        if (value.indexOf('dérivée ') == 0) {
            value = math.derivative(value.replace('dérivée ', ''));
        }
        else if (value.indexOf('dérivée_seconde ') == 0) {
            value = math.derivative(math.derivative(value.replace('dérivée_seconde ', '')));
        }
        return value;
    };
    /**
     * Creates a function to run the expression
     */
    Parser.prototype.Functionize = function (exp, parse) {
        if (parse === void 0) { parse = true; }
        if (parse == true) {
            exp = this.parse(exp);
        }
        console.log(exp);
        return new Function('x', 'funcs', "\n            const sin = Math.sin;\n            const tan = Math.tan;\n            const cos = Math.cos;\n            const asin = Math.asin;\n            const atan = Math.atan;\n            const acos = Math.acos;\n            \n            const cot = (x) => 1 / Math.tan(x);\n            const csc = (x) => 1 / Math.sin(x);\n            const sec = (x) => 1 / Math.cos(x);\n            \n            const sinh = Math.sinh;\n            const tanh = Math.tanh;\n            const cosh = Math.cosh;\n            const asinh = Math.asinh;\n            const atanh = Math.atanh;\n            const acosh = Math.acosh;\n\n            const ceil = Math.ceil;\n            const floor = Math.floor;\n            const abs = Math.abs;\n            const ln = Math.log;\n            const log = function (base, y) { \n                if(y == undefined) {\n                    y = base;\n                    base = 10;\n                }\n                return Math.log(y) / Math.log(base)\n            };\n\n            const e = Math.E;\n            const pi = Math.PI;\n            const pow = function (base, exponent){\n                if(exponent % 1 != 0){\n                    for(let i = -7; i < 8; i = i + 2){\n                        if(exponent == 1/i && base < 0) return 0 - 1 * Math.pow(0 - base, exponent);     \n                    }\n                }\n                return Math.pow(base, exponent);\n            }\n\n            const exp = function (base, y){\n                if(y == undefined){\n                    return Math.exp(base);\n                } else {\n                    return pow(base, y);\n                }\n            }; \n            \n            return " + this.FunctionizeCalls(exp) + ";\n            \n            ");
    };
    Parser.prototype.FunctionizeCalls = function (exp) {
        var _this = this;
        console.log(exp);
        return exp.replace(/([a-z]+)([1-9]*)\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g, function (e, $1, $2, $3) {
            console.log($1);
            if (_this.math_func.indexOf($1) >= 0) {
                return $1 + $2 + "(" + _this.FunctionizeCalls($3) + ")";
            }
            return "funcs." + ($1 + $2) + ".array(" + _this.FunctionizeCalls($3) + ", funcs)";
        });
    };
    /**
     * CleanUp
     */
    Parser.prototype.clean = function (expression) {
        var _this = this;
        var pattern = /([^a-z\/])\(([0-9x]+)\)/gi;
        while (pattern.test(expression)) {
            expression = expression.replace(pattern, function (e, $1, $2) { return $1 + $2; });
        }
        expression = expression.replace(/\*([0-9])/gi, function (e, $1) {
            return $1 == 1 ? '' : e;
        });
        expression = expression.replace(/\^([0-9])/gi, function (e, $1) {
            return $1 == 1 ? '' : e;
        });
        expression = expression.replace(/\$([0-9]+)/g, function (e) {
            return "(" + _this.partials[e] + ")";
        });
        return expression;
    };
    /**
     * @see https://medium.freecodecamp.org/how-to-build-a-math-expression-tokenizer-using-javascript-3638d4e5fbe9
     * But the tokenizer will be a bit different.
     */
    Parser.prototype.tokenize = function (expression) {
        var _this = this;
        if (typeof expression == 'number') {
            //@ts-ignore
            expression = expression.toString();
        }
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        // 3) We really parse the expression
        var math_functions = function (expression, returns) {
            var mfuncs = _this.math_func;
            for (var i = 0; i < mfuncs.length; i++) {
                var func = mfuncs[i];
                if (expression.indexOf(func) == 0) {
                    if (returns == true) {
                        return func;
                    }
                    else {
                        return true;
                    }
                }
            }
            return false;
        };
        var math_numbers = ['e', 'pi'];
        expression = expression.trim();
        if (expression.indexOf('=') >= 0) {
            return {
                type: 'equal_sign',
                value: expression
                    .split('=')
                    .map(function (e) { return _this.tokenize(e); })
            };
        }
        else if (!isNaN(expression)) {
            return {
                type: 'number',
                value: expression
            };
        }
        else if (!isNaN(this.Functionize(expression)(NaN))) {
            return {
                type: 'number',
                value: this.Functionize(expression)(NaN)
            };
        }
        else if (expression == 'x') {
            return {
                type: 'variable',
                value: 'x'
            };
        }
        else if (expression.indexOf('+') >= 0) {
            var exp_spl = expression.split('+');
            var value_1 = [];
            exp_spl.forEach(function (e) {
                value_1.push(_this.tokenize(e));
            });
            return {
                type: 'plus',
                value: value_1
            };
        }
        else if (expression.indexOf('-') >= 0) {
            var exp_spl = expression.split('-');
            var value_2 = [];
            exp_spl.forEach(function (e, i) {
                e = e.trim();
                if (i == 0 && e == '') {
                    value_2.push(_this.tokenize(0));
                }
                else {
                    value_2.push(_this.tokenize(e));
                }
            });
            return {
                type: 'minus',
                value: value_2
            };
        }
        else if (expression.indexOf('*') >= 0) {
            var exp_spl = expression.split('*');
            var value_3 = [];
            exp_spl.forEach(function (e) {
                value_3.push(_this.tokenize(e));
            });
            return {
                type: 'times',
                value: value_3
            };
        }
        else if (expression.indexOf('/') >= 0) {
            var exp_spl = expression.split('/');
            var rm = function (array) {
                array.shift();
                return array;
            };
            var bottom = '(' + rm(exp_spl).join(')*(') + ')';
            var value = [
                this.tokenize(exp_spl[0]),
                this.tokenize(bottom)
            ];
            return {
                type: 'over',
                value: value,
                over: this.clean(bottom)
            };
        }
        else if (/^\$([0-9]+)$/.test(expression) == true) {
            return this.tokenize(this.partials[expression]);
        }
        else if (expression.indexOf('^') > 0) {
            var spl_exp = expression.split('^');
            if (spl_exp.length == 2) {
                return {
                    type: 'power',
                    value: [
                        this.tokenize(spl_exp[0]),
                        this.tokenize(spl_exp[1])
                    ]
                };
            }
            else {
                throw new Error('Unexpected expression');
            }
        }
        else if (math_functions(expression) == true) {
            var start = math_functions(expression, true);
            return {
                type: 'function',
                value: start,
                args: this.tokenize(expression.replace(start, ''))
            };
        }
        else if (expression.indexOf(',') >= 0) {
            var spl_exp = expression.split(',');
            return spl_exp.map(function (element) {
                return _this.tokenize(element);
            });
        }
        else {
            throw new Error('Could not parse expression ' + expression);
        }
    };
    return Parser;
}());
exports.default = Parser;
var InvalidExpressionError = /** @class */ (function (_super) {
    __extends(InvalidExpressionError, _super);
    function InvalidExpressionError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'IE';
        return _this;
    }
    return InvalidExpressionError;
}(Error));
exports.InvalidExpressionError = InvalidExpressionError;
var MathObject = /** @class */ (function (_super) {
    __extends(MathObject, _super);
    function MathObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ce = [];
        _this.type = 'MathObject';
        return _this;
    }
    MathObject.prototype.derivative = function (expression) {
        var _this = this;
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        // 3) Wa have to split the expression into small pieces and check step by step
        if (expression.indexOf('+') >= 0) {
            var spl = expression.split('+');
            expression = '';
            spl.forEach(function (s) { return (expression += _this.derivative(s) + "+"); });
            if (expression[expression.length - 1] == '+')
                expression = expression.slice(0, -1);
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        if (expression.indexOf('-') >= 0) {
            var spl = expression.split('-');
            expression = '';
            spl.forEach(function (s) { return (expression += _this.derivative(s) + "-"); });
            if (expression[expression.length - 1] == '-')
                expression = expression.slice(0, -1);
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        if (expression.indexOf('*') >= 0) {
            var spl_1 = expression.split('*').sort();
            expression = '';
            spl_1.forEach(function (s, i) {
                var others = _this.getAllExpect(spl_1, i);
                var join = others.join('*');
                var derivative = _this.derivative(s);
                if (others.indexOf('0') >= 0)
                    return;
                if (_this.Functionize(join)(NaN) == 0)
                    return;
                if (_this.Functionize(derivative)(NaN) == 0)
                    return;
                expression += derivative + "*" + others.join('*') + "+";
            });
            if (expression[expression.length - 1] == '+')
                expression = expression.slice(0, -1);
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        if (expression.indexOf('/') >= 0) {
            var spl = expression.split('/');
            var spl_copy = spl.slice();
            spl_copy.shift();
            var bottom = "(" + spl_copy.join(')*(') + ")";
            var top_1 = "(" + this.derivative(spl[0]) + ")*" + bottom + "-" + this.derivative(bottom) + "*(" + spl[0] + ")";
            expression = "(" + top_1 + ")/((" + bottom + ")^2)";
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        //@ts-ignore
        if (!isNaN(expression)) {
            // Derivative of a number is always equal to 0
            return '0';
        }
        else if (expression == 'x') {
            // Derivative of x is always equal to 1
            return 1;
        }
        else if (expression.indexOf('^') >= 1) {
            // Derivative of x^n is equal to n(x)^(n-1) * (x)'
            var parts = expression.split('^');
            return this.clean(parts[1] + "*" + parts[0] + "^(" + (!isNaN(this.Functionize(parts[1] + '-1')(NaN))
                ? this.Functionize(parts[1] + '-1')(NaN)
                : parts[1] + '-1') + ")*(" + this.derivative(parts[0]) + ")");
        }
        else if (/^\$([0-9]+)$/.test(expression) == true) {
            // This replaces $.. into the expression
            var part = this.partials[expression];
            if (/^\$([0-9]+)$/.test(part))
                return "(" + this.derivative(this.partials[part]) + ")";
            else
                return "(" + this.derivative(part) + ")";
        }
        else if (/^sin\$([0-9]+)$/.test(expression) == true) {
            var partial = expression.replace('sin', '');
            return this.clean("cos(" + this.partials[partial] + ")*(" + this.derivative(this.partials[partial]) + ")");
        }
        else if (/^cos\$([0-9]+)$/.test(expression) == true) {
            var partial = expression.replace('cos', '');
            return this.clean("-sin(" + this.partials[partial] + ")*(" + this.derivative(this.partials[partial]) + ")");
        }
        else {
            console.log(expression);
            throw new Error('Something went wrong width ');
        }
    };
    MathObject.prototype.getAllExpect = function (array, i) {
        var res = [];
        array.forEach(function (e, index) {
            if (index != i) {
                res.push(e);
            }
        });
        return res;
    };
    MathObject.prototype.getRoots = function () { };
    MathObject.prototype.getDomF = function (tokens, clear) {
        var _this = this;
        if (clear === void 0) { clear = true; }
        if (clear == true)
            this.ce = [];
        if (tokens.type === 'plus' ||
            tokens.type === 'minus' ||
            tokens.type === 'times') {
            var value = tokens.value;
            value.forEach(function (e) {
                _this.getDomF(e);
            });
        }
        else if (tokens.type == 'over') {
            this.ce.push(JSON.stringify(tokens.value[1]) + ' not null');
        }
        else if (tokens.type == 'function' && tokens.value == 'sqrt') {
            this.ce.push(JSON.stringify(tokens.args) + '>=0');
        }
        if (clear === true) {
            if (this.ce.length === 0) {
                return 'R';
            }
            else {
                return 'ce : ' + this.ce.join('\n');
            }
        }
    };
    return MathObject;
}(Parser));
exports.MathObject = MathObject;


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas = /** @class */ (function () {
    function canvas(canvas) {
        var _this = this;
        this.fdata = {};
        this.center_x = 0;
        this.center_y = 0;
        this.x_unit = 50;
        this.y_unit = 50;
        this.stored = {};
        this.pathes = {};
        this.objects = [];
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();
        var start;
        var down = false;
        //When the user starts an action on the canvas.
        canvas.addEventListener('mousedown', function (e) {
            down = true;
            start = { x: e.pageX, y: e.pageY };
            canvas.style.cursor = 'grabbing';
        });
        canvas.addEventListener('touchstart', function (e) {
            down = true;
            start = {
                x: e.touches.item(0).clientX,
                y: e.touches.item(0).clientY
            };
        });
        // When the user moves on the surface of the canvas.
        canvas.addEventListener('mousemove', function (e) {
            if (down == true) {
                var new_start = { x: e.pageX, y: e.pageY };
                var old = start;
                var drawn = _this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (down == true) {
                var new_start = {
                    x: e.touches.item(0).clientX,
                    y: e.touches.item(0).clientY
                };
                var old = start;
                var drawn = _this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        //When the user stops clicking on teh surface
        canvas.addEventListener('mouseup', function (e) {
            e.preventDefault();
            e.stopPropagation();
            down = false;
            canvas.style.cursor = 'grab';
            _this.hasUpdated();
        });
        canvas.addEventListener('touchend', function (e) {
            e.stopPropagation();
            e.preventDefault();
            down = false;
            _this.hasUpdated();
        });
        window.addEventListener('resize', function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.reload();
        });
        canvas.addEventListener('mousewheel', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
            _this.hasUpdated();
        });
        canvas.addEventListener('DOMMouseScroll', function (e) {
            e.preventDefault();
            e.preventDefault();
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
            _this.hasUpdated();
        });
    }
    canvas.prototype.getValues = function () {
        return {
            center_x: this.center_x,
            center_y: this.center_y,
            x_unit: this.x_unit,
            y_unit: this.y_unit
        };
    };
    canvas.prototype.setValues = function (values) {
        this.center_x = values['center_x'];
        this.center_y = values['center_y'];
        this.x_unit = values['x_unit'];
        this.y_unit = values['y_unit'];
    };
    canvas.prototype.hasUpdated = function () {
        if (this.onupdate)
            this.onupdate();
    };
    canvas.prototype.zoom = function (delta) {
        if (this.x_unit + delta * 10 > 10) {
            this.x_unit += delta * 10;
        }
        if (this.y_unit + delta * 10 > 10) {
            this.y_unit += delta * 10;
        }
        this.reload();
    };
    canvas.prototype.init = function () {
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
        this.draw();
    };
    canvas.prototype.draw = function () {
        this.drawGrid();
    };
    canvas.prototype.drawGrid = function () {
        var max = Math.max(this.canvas.height, this.canvas.width);
        max = max / Math.min(this.x_unit, this.y_unit);
        // Clears the view
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fafafa';
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
        var to = Math.floor(this.center_x + max);
        var xpos = Math.floor(this.center_x - max);
        while (xpos < to) {
            this.drawLine(this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y + max)), this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y - max)), Math.floor(xpos) == 0 ? 'black' : undefined);
            this.ctx.beginPath();
            this.ctx.font = '18px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(xpos.toString(), this.getRelativePositionX(xpos), this.getRelativePositionY(0) + 15);
            this.ctx.closePath();
            xpos++;
        }
        to = Math.floor(this.center_y + max);
        var ypos = Math.floor(this.center_y - max);
        while (ypos < to) {
            this.drawLine(this.getRelativePositionX(Math.floor(this.center_x + max)), this.getRelativePositionY(ypos), this.getRelativePositionX(Math.floor(this.center_x - max)), this.getRelativePositionY(ypos), Math.floor(ypos) == 0 ? 'black' : undefined);
            this.ctx.beginPath();
            this.ctx.font = '18px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(ypos.toString(), this.getRelativePositionX(0) -
                (ypos.toString().length * 15) / 2 -
                5, this.getRelativePositionY(ypos));
            this.ctx.closePath();
            ypos++;
        }
    };
    canvas.prototype.move = function (previous, now) {
        var diff_x = previous.x - now.x;
        var diff_y = previous.y - now.y;
        if (Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2)) > 10) {
            this.center_x += diff_x / this.x_unit;
            this.center_y -= diff_y / this.y_unit;
            this.reload();
            return true;
        }
    };
    canvas.prototype.drawLine = function (x, y, x2, y2, color, width) {
        this.ctx.beginPath();
        //console.log('new path');
        if (color == undefined) {
            this.ctx.strokeStyle = '#D0D0D0';
        }
        else {
            this.ctx.strokeStyle = color;
        }
        if (y2 == Infinity)
            console.log((y2 = this.canvas.height), 'Inf' + y2);
        if (y == Infinity)
            console.log((y = this.canvas.height), 'Inf' + y);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        }
        else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();
        //console.log(this.ctx);
    };
    canvas.prototype.getRelativePositionX = function (point) {
        return (this.canvas.width / 2 +
            point * this.x_unit -
            this.center_x * this.x_unit);
    };
    canvas.prototype.getRelativePositionY = function (point) {
        return (this.canvas.height / 2 -
            point * this.y_unit +
            this.center_y * this.y_unit);
    };
    canvas.prototype.drawFromFunc = function (func, color, isPreview) {
        if (color === void 0) { color = undefined; }
        if (isPreview === void 0) { isPreview = false; }
        if (!color) {
            var letters = '0123456789ABCDEF';
            color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        }
        var display_size = this.canvas.width / 2 / this.x_unit;
        var x = this.center_x - display_size;
        var last = undefined;
        var label = func;
        var was_defined = true;
        if (this.pathes[label] == undefined) {
            this.pathes[label] = {};
            was_defined = false;
        }
        var xs_increment = Math.min((5 * this.canvas.width) / (this.x_unit * 1000), 0.05);
        var xs_save = xs_increment;
        var restore = undefined;
        while (x < this.center_x + display_size) {
            var pos = void 0;
            var new_y = void 0;
            var new_x = void 0;
            if (was_defined == true && this.pathes[label][x] != undefined) {
                new_y = this.getRelativePositionY(this.pathes[label][x]);
                new_x = this.getRelativePositionX(x);
            }
            else {
                pos = this.getFor(x, func, label);
                //console.log(x, pos);
                this.pathes[label][x] = pos;
                new_y = this.getRelativePositionY(pos);
                new_x = this.getRelativePositionX(x);
            }
            if (last != undefined) {
                var y_diff = Math.abs(new_y - last.y);
                if (y_diff > 75 && xs_increment == xs_save) {
                    if (y_diff > 200) {
                        last = undefined;
                    }
                    else {
                        x -= xs_increment;
                        xs_increment = xs_save / 50;
                        //@ts-ignore
                        new_y = last.y;
                        restore = x + 2;
                    }
                }
                else {
                    this.drawLine(new_x, new_y, last.x, last.y, color, 2);
                }
            }
            last = {
                x: new_x,
                y: new_y
            };
            if (isPreview == true) {
                x += 0.5;
            }
            else {
                if (restore && restore <= x) {
                    restore = undefined;
                    xs_increment = xs_save;
                }
                x += xs_increment;
            }
        }
        return color;
    };
    canvas.prototype.getFor = function (start, func, label) {
        if (this.stored[label] == undefined) {
            this.stored[label] = {};
        }
        if (this.stored[label][start] != undefined) {
            return this.stored[label][start];
        }
        else {
            this.stored[label][start] = func(start, this.fdata);
            return this.stored[label][start];
        }
    };
    canvas.prototype.reload = function (fdata) {
        var _this = this;
        if (fdata != undefined) {
            this.funcs = fdata;
        }
        this.init();
        var data = Object.keys(this.fdata);
        requestAnimationFrame(function () {
            data.forEach(function (key) {
                if (_this.fdata[key].visible == true) {
                    _this.drawFromFunc(_this.fdata[key].array, _this.fdata[key].color);
                }
            });
            var objs = _this.objects;
            objs.forEach(function (obj) {
                if (obj.type == 'point') {
                    var y = NaN;
                    if (!isNaN(obj.y)) {
                        y = obj.y;
                    }
                    else {
                        y = obj.y(parseFloat(obj.x), _this.fdata);
                    }
                    _this.point(obj.x, y);
                }
            });
        });
    };
    canvas.prototype.point = function (x, y, text) {
        if (text === void 0) { text = ''; }
        text = text + "(" + x + ";" + y + ")";
        x = this.getRelativePositionX(x);
        y = this.getRelativePositionY(y);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
        this.ctx.fill();
        this.ctx.font = '12px Arial';
        if (text)
            this.ctx.fillText(text, x + 10, y + 10);
    };
    Object.defineProperty(canvas.prototype, "funcs", {
        get: function () {
            return this.fdata;
        },
        set: function (fdata) {
            this.fdata = fdata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(canvas.prototype, "object_list", {
        get: function () {
            return {
                objects: this.objects,
                push: function (toAdd) {
                    this.objects.push(toAdd);
                    return this.objects;
                }
            };
        },
        set: function (objects) {
            this.objects = objects;
        },
        enumerable: true,
        configurable: true
    });
    return canvas;
}());
exports.default = canvas;


/***/ })

/******/ });