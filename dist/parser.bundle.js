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

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = __webpack_require__(14);
var parser = new parser_v2_1.default();
console.log(parser.parse("x²+6x+3"));
console.log(parser.parse("x²"));
console.log(parser.parse("x²+6"));
console.log(parser.parse("x^(2^2)+6x"));
console.log(parser.parse("(sqrt(x²+6x+3)+6x+33)/2"), (new Function("x", "return " + parser.parse("(sqrt(x²+6x+3)+6x+33)/2"))(0)));
console.log(">", parser.parse("x²+(x²-6x)*x"));
console.log(parser.parse("x²+(x²-6x*x"));


/***/ }),

/***/ 14:
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
    }
    /**
     * Initialise a parsing task
     * @param {String} expression the expression that has to be parsed
    */
    Parser.prototype.parse = function (expression) {
        // 1) We have to check wheter or not the expression is valid
        var _this = this;
        if (this.check(expression) == false) {
            throw new InvalidExpressionError("Invalid expression given");
        }
        // 2) We convert ...(...) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        // 3) We really parse the expression
        // We transform math functions into valide js code
        expression = expression.replace(/sqrt\$([0-9]+)/i, function (e, $1) { return "Math.pow($" + $1 + ", 0.5)"; });
        // We tranform exponants into Math.pow()
        expression = expression.replace(/([\$0-9x]+)\^([\$0-9x]+)/ig, function (e, $1, $2) { return "Math.pow(" + $1 + ", " + $2 + ")"; });
        // We rebuild the complete expression
        expression = expression.replace(/\$([0-9]+)/ig, function (e, $1) { return "(" + _this.partials["$" + $1] + ")"; });
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
        exp = exp.replace(/²/ig, "^2");
        exp = exp.replace(/³/ig, "^2");
        exp = exp.replace(/X/g, "x");
        exp = exp.replace(/([0-9]+)x/ig, function (exp, $1) {
            return $1 + "*x";
        });
        var processed_exp = "";
        var parenthesis_level = 0;
        var buffer = "";
        for (var i = 0; i < exp.length; i++) {
            var char = exp[i];
            var e = "$" + (Object.keys(this.partials).length + 1);
            if (parenthesis_level >= 1) {
                if (char == ")") {
                    parenthesis_level -= 1;
                    if (parenthesis_level == 0) {
                        this.partials[e] = this.parse(buffer);
                        buffer = "";
                    }
                    else {
                        buffer += char;
                    }
                }
                else {
                    if (char == "(") {
                        parenthesis_level += 1;
                    }
                    buffer += char;
                }
            }
            else {
                if (char == "(") {
                    parenthesis_level += 1;
                    processed_exp += e;
                }
                else {
                    processed_exp += char;
                }
            }
        }
        return processed_exp;
    };
    return Parser;
}());
exports.default = Parser;
var InvalidExpressionError = /** @class */ (function (_super) {
    __extends(InvalidExpressionError, _super);
    function InvalidExpressionError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "IE";
        return _this;
    }
    return InvalidExpressionError;
}(Error));


/***/ })

/******/ });