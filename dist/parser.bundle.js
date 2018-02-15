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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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
        expression = expression.replace(/([\$0-9x]+)\^([\$0-9x]+)/gi, function (e, $1, $2) { return "Math.pow(" + $1 + ", " + $2 + ")"; });
        // We rebuild the complete expression
        expression = expression.replace(/\$([0-9]+)/gi, function (e, $1) { return '(' + _this.parse(_this.partials['$' + $1]) + ')'; });
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
        processed_exp = processed_exp.replace(/([0-9]+)x\^([\$0-9]+)/gi, function (exp, $1, $2) {
            var e = '$' + (Object.keys(_this.partials).length + 1);
            _this.partials[e] = $1 + "*x^" + $2;
            return e;
        });
        processed_exp = processed_exp.replace(/([0-9]+)x/gi, function (exp, $1) {
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
        return new Function('x', "\n            let sin = Math.sin;\n            let tan = Math.tan;\n            let cos = Math.cos;\n            let asin = Math.asin;\n            let atan = Math.atan;\n            let acos = Math.acos;\n\n            let sinh = Math.sinh;\n            let tanh = Math.tanh;\n            let cosh = Math.cosh;\n            let asinh = Math.asinh;\n            let atanh = Math.atanh;\n            let acosh = Math.acosh;\n\n            let ceil = Math.ceil;\n            let floor = Math.floor;\n            let abs = Math.abs;\n            let exp = Math.exp;\n            let log = Math.log;\n            \n            let e = Math.E;\n            let pi = Math.PI;\n            \n            return " + exp + ";\n            \n            ");
    };
    /**
     * CleanUp
     */
    Parser.prototype.clean = function (expression) {
        var _this = this;
        var pattern = /\(([0-9]+)\)/gi;
        while (pattern.test(expression)) {
            expression = expression.replace(pattern, function (e, $1) { return $1; });
        }
        expression = expression.replace(/\*([0-9])/gi, function (e, $1) { return ($1 == 1 ? '' : e); });
        expression = expression.replace(/\^([0-9])/gi, function (e, $1) { return ($1 == 1 ? '' : e); });
        expression = expression.replace(/\$([0-9]+)/g, function (e) {
            return "(" + _this.partials[e] + ")";
        });
        return expression;
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
        _this.ce = '';
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
    MathObject.prototype.getDomF = function (expression, clear) {
        var _this = this;
        if (clear === void 0) { clear = true; }
        if (clear == true) {
            this.ce = '';
        }
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        if (expression.indexOf('+') >= 0) {
            var spl = expression.split('+');
            spl.forEach(function (s) { return _this.getDomF(s, false); });
            return this.realGetDomF();
        }
        if (expression.indexOf('-') >= 0) {
            var spl = expression.split('-');
            spl.forEach(function (s) { return _this.getDomF(s, false); });
            return this.realGetDomF();
        }
        if (expression.indexOf('*') >= 0) {
            var spl = expression.split('*');
            spl.forEach(function (s) { return _this.getDomF(s, false); });
            return this.realGetDomF();
        }
        if (expression.indexOf('/') >= 0) {
            var spl = expression.split('/');
            var spl_copy = spl.slice();
            spl_copy.shift();
            var bottom = "(" + spl_copy.join(')*(') + ")";
            this.ce += '\n' + this.clean(bottom) + ' != 0';
            this.getDomF(bottom, false);
            return this.realGetDomF();
        }
        if (/^\$([0-9]+)$/.test(expression) == true) {
            var part = this.partials[expression];
            this.getDomF(part, false);
            return this.realGetDomF();
        }
        return this.realGetDomF();
    };
    MathObject.prototype.realGetDomF = function () {
        if (this.ce.trim() == '') {
            return 'R';
        }
        else {
            return 'CE: ' + this.ce;
        }
    };
    return MathObject;
}(Parser));
exports.MathObject = MathObject;


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = __webpack_require__(0);
var parser = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
[
    '1',
    'x',
    '2x',
    '2*2x',
    'x²',
    'x^3',
    '2*x²',
    '(2x)^2',
    '1/x',
    'sin(x)',
    'sin(1/x)',
    'sin(x^2)'
].forEach(function (e) {
    console.log('=> ' + e, math.derivative(e));
});
//http://jsben.ch/D2xTG
console.log(parser.parse('(sqrt(x²+6x+3)+6x+33)/2'), new Function('x', 'return ' + parser.parse('(sqrt(x²+6x+3)+6x+33)/2'))(0));


/***/ })

/******/ });