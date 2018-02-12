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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(1);
//@ts-ignore
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
var MathObject = /** @class */ (function () {
    function MathObject() {
        this.multiply = (new parser_1.default).multiply;
        this.add = (new parser_1.default).add;
        this.sub = (new parser_1.default).sub;
    }
    MathObject.prototype.getFunctions = function () {
        return "\n            let sin = Math.sin;\n            let tan = Math.tan;\n            let cos = Math.cos;\n            let asin = Math.asin;\n            let atan = Math.atan;\n            let acos = Math.acos;\n\n            let sinh = Math.sinh;\n            let tanh = Math.tanh;\n            let cosh = Math.cosh;\n            let asinh = Math.asinh;\n            let atanh = Math.atanh;\n            let acosh = Math.acosh;\n\n            let ceil = Math.ceil;\n            let floor = Math.floor;\n            let abs = Math.abs;\n            let exp = Math.exp;\n            let log = Math.log\n            \n            let e = Math.E;\n            let pi = Math.PI\n        ";
    };
    MathObject.getFor = function (start, array) {
        var result = 0;
        for (var i = 0; i < Object.keys(array).length; i++) {
            var element = Object.keys(array)[i];
            if (element == "~") {
                if (array[element] != "") {
                    result += array[element];
                }
            }
            else if (element == "x") {
                result += array[element] * start;
            }
            else if (element.indexOf("^m") >= 0) {
                result += array[element] * (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
            }
            else if (element == "over") {
                result = result / this.getFor(start, array[element]);
            }
            else {
                result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
            }
        }
        return result;
    };
    MathObject.prototype.derivate = function (array) {
        var _this = this;
        console.log('=>', array);
        var keys = Object.keys(array);
        if (keys.length == 1) {
            if (keys[0] == "~") {
                return { "~": 0 };
            }
            else if (keys[0] == "x") {
                return { "~": array[keys[0]] };
            }
            else if (keys[0].indexOf("x^") == 0) {
                var exp = parseFloat(keys[0].replace('x^', ""));
                var a = {};
                a["x" + ((exp - 1 != 1) ? "^" + (exp - 1) : "")] = exp * array[keys[0]];
                console.log(a);
                return a;
            }
            else {
                return {};
            }
        }
        else if (array["over"] != undefined) {
            var a = array;
            var over = array["over"];
            delete a["over"];
            console.log(this.derivate(a), over, this.multiply(this.derivate(a), over));
            console.log(this.derivate(a), over, this.multiply(this.derivate(over), a));
            var narray = (this.multiply(this.derivate(a), over));
            var narray2 = (this.multiply(this.derivate(over), a));
            var sub = this.sub(narray2, narray);
            console.log("sub", sub);
            //@ts-ignore
            var second_over = Object.assign({}, over);
            var under = this.multiply(over, second_over);
            if (!sub["over"]) {
                sub["over"] = under;
            }
            else {
                sub["over"] = this.multiply(sub["over"], under);
            }
            return sub;
        }
        else {
            var a_1 = {};
            keys.forEach(function (key) {
                var e = {};
                e[key] = array[key];
                a_1 = _this.add(a_1, _this.derivate(e));
            });
            return a_1;
        }
    };
    return MathObject;
}());
exports.default = MathObject;


/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var math_1 = __webpack_require__(0);
var parser = /** @class */ (function () {
    function parser() {
        this.index = 0;
        this.byIndexes = {};
        this.byIndexes2 = {};
        /**
         * Pareses and expression that contains ( or )
         */
        this.parseExp = function (exp) {
            if (exp[0] == "(") {
                exp = "1*" + exp;
            }
            var inside = "";
            var level = 0;
            for (var i = 0; i < exp.length; i++) {
                var char = exp[i];
                if (char == "(") {
                    level++;
                    if (level == 1) {
                        inside = "";
                    }
                    else {
                        inside += "(";
                    }
                }
                else if (char == ")") {
                    level--;
                    if (level == 0) {
                        this.index++;
                        var index = this.index;
                        this.byIndexes["$" + index] = this.exec(inside);
                        this.byIndexes2["$" + index] = this.stringify(this.exec(inside));
                        exp = exp.replace('(' + inside + ')', "$" + index);
                    }
                    else {
                        inside += ")";
                    }
                }
                else {
                    inside += char;
                }
            }
            return this.exec(exp);
        };
        this.stringify = function (array) {
            var text = "";
            var keys = Object.keys(array); //.sort().reverse()
            var new_keys = [];
            for (var i = 0; i < keys.length; i++) {
                var element = keys[i];
                if (element == "~") {
                }
                else {
                    if (element.indexOf('x') == 0) {
                        if (element == "x") {
                            new_keys.push("1");
                        }
                        else {
                            new_keys.push(element.replace('x^', ""));
                        }
                    }
                    else {
                        //log('Unknown error while parsing');
                    }
                }
            }
            new_keys.sort().reverse();
            keys = [];
            for (var i = 0; i < new_keys.length; i++) {
                var key = new_keys[i];
                if (key == "1") {
                    keys.push("x");
                }
                else {
                    keys.push('x^' + key);
                }
            }
            for (var i = 0; i < keys.length; i++) {
                var element = keys[i];
                if (element == "~") {
                }
                else {
                    if (array[element] != 1) {
                        var e = array[element] + "" + element;
                    }
                    else {
                        var e = element;
                    }
                    text += e + "+";
                }
            }
            if (array["~"] != undefined) {
                text += array["~"];
            }
            text = text.replace('x^2+', "x²+");
            text = text.replace('x^3+', "x³+");
            text = text.replace('+-', "-");
            text = text.replace('--', "+");
            if (text[text.length - 1] == "+") {
                text += "end";
                text = text.replace('+end', "");
            }
            if (text == "x^2") {
                text = "x²";
            }
            if (text == "x^3") {
                text = "x³";
            }
            if (array["over"] != undefined) {
                text = "(" + text + ")/(" + this.stringify(array["over"]) + ")";
            }
            return text;
        };
    }
    parser.prototype.getComputedValue = function (value) {
        var math = new math_1.default;
        if (value.indexOf('dérivée ') == 0) {
            value = this.stringify(math.derivate(this.exec(value.replace('dérivée ', ""))));
        }
        else if (value.indexOf("dérivée_seconde ") == 0) {
            value = this.stringify(math.derivate(math.derivate(this.exec(value.replace('dérivée_seconde ', "")))));
        }
        return value;
    };
    /**
     * Verifies if an expression is valid or not
     */
    parser.prototype.verify = function (exp) {
        var o_count = 0;
        var c_count = 0;
        for (var i = 0; i < exp.length; i++) {
            var char = exp[i];
            if (char == "(") {
                o_count++;
            }
            else if (char == ")") {
                c_count++;
            }
        }
        if (o_count == c_count) {
            return true;
        }
        else {
            return "Erreur de syntaxe";
        }
    };
    /**
     * Parses an expression
     * @param expression
     */
    parser.prototype.exec = function (expression) {
        if (expression.indexOf('(') < 0) {
            return this.exec_and_sort(expression);
        }
        else {
            var ver = this.verify(expression);
            if (ver == true) {
                return this.parseExp(expression);
            }
            else {
                return 'Cette expression n\'est pas correcte : ' + ver;
            }
        }
    };
    parser.prototype.exec_and_sort = function (expression) {
        expression = expression.replace(/\-\-/i, "+");
        expression = expression.replace(/\+\-/i, "-");
        if (expression.indexOf('-') == 0) {
            expression = "0" + expression;
        }
        expression = expression.replace(/²/g, "^2");
        expression = expression.replace(/³/g, "^3");
        expression = expression.replace(/\^\-/g, "^m");
        expression = expression.replace(/(\d|[a-z])\$/g, function (m, $1) {
            //log('');
            return $1 + "*$";
        });
        expression = expression.replace(/(\d|[a-z])pi/g, function (m, $1) {
            //log('');
            return $1 + "*pi";
        });
        //log(expression);
        /*
        Séparation des +
        */
        var sum_of = expression.split('+');
        var sum_result = {};
        for (var i = 0; i < sum_of.length; i++) {
            var element = sum_of[i];
            /*
            Séparation des -
            */
            var sub_of = element.split("-");
            var sub_result = {};
            for (var sub = 0; sub < sub_of.length; sub++) {
                var sube = sub_of[sub];
                /*
                Séparation des *
                */
                var mult_of = sube.split("*");
                var mult_result = {};
                for (var mult = 0; mult < mult_of.length; mult++) {
                    var multe = mult_of[mult];
                    var div_result = {};
                    var div_of = multe.split("/");
                    for (var div = 0; div < div_of.length; div++) {
                        var dive = div_of[div];
                        //Division ici
                        /**
                         * When it's the fist element term
                         */
                        if (div == 0) {
                            if (dive.indexOf("x") < 0) {
                                if (dive.indexOf('$') == 0) {
                                    div_result = this.byIndexes[dive];
                                }
                                else if (dive == "pi") {
                                    div_result["~"] = Math.PI;
                                }
                                else {
                                    div_result["~"] = parseFloat(dive);
                                }
                            }
                            else {
                                div_result[function () {
                                    if (dive.split('x')[1] != "") {
                                        return "x" + dive.split('x')[1];
                                    }
                                    else {
                                        return "x";
                                    }
                                }()] = function () {
                                    if (dive.split('x')[0] != "") {
                                        return parseFloat(dive.split('x')[0]);
                                    }
                                    else {
                                        return 1;
                                    }
                                }();
                            }
                            //log('==>', expression, div_result["over"])
                        }
                        else if (div >= 1) {
                            try {
                                if (div_result["over"] == undefined) {
                                    div_result["over"] = { "~": 1 };
                                }
                                var over1 = div_result["over"];
                                var d1 = this.del(div_result, "over");
                                var x = this.exec_and_sort(dive);
                                var over2 = x["over"] || { "~": 1 };
                                var d2 = this.del(x, "over");
                                //log(d1, d2, over1, over2)
                                div_result = this.multiply(d1, over2);
                                div_result["over"] = this.multiply(d2, over1);
                            }
                            catch (error) {
                                //log(error)
                            }
                        }
                        ////log(div_result);
                    }
                    //Multiplication ici
                    if (mult == 0) {
                        mult_result = div_result;
                    }
                    else {
                        mult_result = this.multiply(mult_result, div_result);
                    }
                }
                //Sourstraction ici
                if (sub == 0) {
                    sub_result = mult_result;
                }
                else {
                    if (mult_result["over"] == undefined) {
                        mult_result["over"] = { "~": 1 };
                    }
                    if (sub_result["over"] == undefined) {
                        sub_result["over"] = { "~": 1 };
                    }
                    try {
                        var over = this.multiply(sub_result["over"], mult_result["over"]);
                        var sum_over = sub_result["over"];
                        var sub_over = mult_result["over"];
                        var smr = sub_result;
                        var sbr = mult_result;
                        delete smr["over"];
                        delete sbr["over"];
                        var first_term = this.multiply(sbr, sum_over);
                        var second_term = this.multiply(smr, sub_over);
                        sub_result = this.sub(first_term, second_term);
                        sub_result["over"] = over;
                    }
                    catch (error) {
                        //log(error)
                        //log(error)
                    }
                }
            }
            //Somme ici
            if (i == 0) {
                sum_result = sub_result;
            }
            else {
                if (sub_result["over"] == undefined) {
                    sub_result["over"] = { "~": 1 };
                }
                if (sum_result["over"] == undefined) {
                    sum_result["over"] = { "~": 1 };
                }
                try {
                    var over = this.multiply(sum_result["over"], sub_result["over"]);
                    var sum_over = sum_result["over"];
                    var sub_over = sub_result["over"];
                    var smr = sum_result;
                    var sbr = sub_result;
                    delete smr["over"];
                    delete sbr["over"];
                    var first_term = this.multiply(smr, sub_over);
                    var second_term = this.multiply(sbr, sum_over);
                    sum_result = this.add(first_term, second_term);
                    sum_result["over"] = over;
                }
                catch (error) {
                    //log(error)
                    //log(error)
                }
            }
        }
        if (sum_result["over"] != undefined) {
            if (Object.keys(sum_result["over"]).length == 1 && Object.keys(sum_result["over"])[0] == "~" && sum_result["over"]["~"] == 1) {
                //log("over_one")
                delete sum_result["over"];
            }
        }
        return this.array_to_exp(sum_result);
    };
    parser.prototype.del = function (array, item) {
        delete array[item];
        return array;
    };
    parser.prototype.add = function (sub_result, sum_result) {
        var keys = Object.keys(sub_result);
        for (var ixxxx = 0; ixxxx < keys.length; ixxxx++) {
            var key = keys[ixxxx];
            if (sum_result[key] != undefined) {
                sum_result[key] = parseFloat(sum_result[key]) + parseFloat(sub_result[key]);
            }
            else {
                sum_result[key] = parseFloat(sub_result[key]);
            }
        }
        return sum_result;
    };
    parser.prototype.sub = function (mult_result, sub_result) {
        var used = [];
        var mk = Object.keys(mult_result);
        mk.forEach(function (key) {
            if (sub_result[key] != undefined) {
                sub_result[key] = parseFloat(sub_result[key]) - parseFloat(mult_result[key]);
            }
            else {
                sub_result[key] = 0 - parseFloat(mult_result[key]);
            }
            used.push(key);
        });
        return sub_result;
    };
    parser.prototype.multiply = function (mult_result, div_result) {
        var div_keys = Object.keys(div_result);
        var mult_keys = Object.keys(mult_result);
        var new_mult_result = {};
        var over = {};
        if (mult_result["over"] == undefined) {
            mult_result["over"] = { "~": 1 };
            if (div_result["over"] == undefined) {
                over = { "~": 1 };
            }
            else {
                over = this.multiply(mult_result["over"], div_result["over"]);
            }
        }
        else if (div_result["over"] == undefined) {
            div_result["over"] = { "~": 1 };
            over = this.multiply(mult_result["over"], div_result["over"]);
        }
        else {
            over = this.multiply(mult_result["over"], div_result["over"]);
        }
        for (var index_mult_keys = 0; index_mult_keys < mult_keys.length; index_mult_keys++) {
            var e_mult = mult_keys[index_mult_keys];
            var number_of_e_mult = mult_result[e_mult];
            if (e_mult != "over") {
                for (var index_div_keys = 0; index_div_keys < div_keys.length; index_div_keys++) {
                    var e_div = div_keys[index_div_keys];
                    var number_of_e_div = div_result[e_div];
                    if (e_div != "over") {
                        if (e_mult == "~" && e_div == e_mult) {
                            var e_end_power = "~";
                        }
                        else if (e_mult == "x" && e_div == e_mult) {
                            var e_end_power = "x^2";
                        }
                        else if (e_mult == "~" && e_div.indexOf('x') == 0) {
                            var e_end_power = e_div;
                        }
                        else if (e_div == "~" && e_mult.indexOf('x') == 0) {
                            var e_end_power = e_mult;
                        }
                        else if (e_div == "x" && "~" && e_mult.indexOf('x^') == 0) {
                            var e_end_power = "x^" + (parseFloat(e_mult.replace("x^", "")) + 1);
                        }
                        else if (e_mult == "x" && "~" && e_div.indexOf('x^') == 0) {
                            var e_end_power = "x^" + (parseFloat(e_div.replace("x^", "")) + 1);
                        }
                        else {
                            var e_end_power = "x^" + (parseFloat(e_div.replace("x^", "")) + parseFloat(e_mult.replace("x^", "")));
                        }
                        if (new_mult_result[e_end_power] != undefined) {
                            new_mult_result[e_end_power] += parseFloat(number_of_e_mult) * parseFloat(number_of_e_div);
                        }
                        else {
                            new_mult_result[e_end_power] = parseFloat(number_of_e_mult) * parseFloat(number_of_e_div);
                        }
                    }
                }
            }
        }
        new_mult_result["over"] = over;
        mult_result = new_mult_result;
        if (mult_result["over"] != undefined) {
            if (Object.keys(mult_result["over"]).length == 1 && Object.keys(mult_result["over"])[0] == "~" && mult_result["over"]["~"] == 1) {
                //log("over_one")
                delete mult_result["over"];
            }
        }
        return mult_result;
    };
    parser.prototype.array_to_exp = function (array) {
        return array;
    };
    return parser;
}());
exports.default = parser;


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = __webpack_require__(5);
var parser = new parser_v2_1.default();
console.log(parser.parse("x²+6x+3"));
console.log(parser.parse("x²"));
console.log(parser.parse("x²+6"));
console.log(parser.parse("x^(2^2)+6x"));
//http://jsben.ch/D2xTG
console.log(parser.parse("(sqrt(x²+6x+3)+6x+33)/2"), (new Function("x", "return " + parser.parse("(sqrt(x²+6x+3)+6x+33)/2"))(0)));
console.log(">", parser.parse("x²+(x²-6x)*x"));
console.log(parser.parse("x²+(x²-6x*x"));


/***/ }),

/***/ 5:
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
var math_1 = __webpack_require__(0);
var parser_1 = __webpack_require__(1);
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
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        // 3) We really parse the expression
        // We transform math functions into valid js code
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
    Parser.prototype.getComputedValue = function (value) {
        var math = new math_1.default;
        var parse = new parser_1.default;
        if (value.indexOf('dérivée ') == 0) {
            value = parse.stringify(math.derivate(parse.exec(value.replace('dérivée ', ""))));
        }
        else if (value.indexOf("dérivée_seconde ") == 0) {
            value = parse.stringify(math.derivate(math.derivate(parse.exec(value.replace('dérivée_seconde ', "")))));
        }
        return value;
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