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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = __webpack_require__(1);
//@ts-ignore
if (typeof Object.assign != "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            // .length of function is 2
            "use strict";
            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError("Cannot convert undefined or null to object");
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    // Skip over if undefined or null
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
        this.multiply = new parser_1.default().multiply;
        this.add = new parser_1.default().add;
        this.sub = new parser_1.default().sub;
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
                result +=
                    array[element] *
                        (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
            }
            else if (element == "over") {
                result = result / this.getFor(start, array[element]);
            }
            else {
                result +=
                    array[element] *
                        Math.pow(start, parseFloat(element.split("^")[1]));
            }
        }
        return result;
    };
    MathObject.prototype.derivate = function (array) {
        var _this = this;
        console.log("=>", array);
        var keys = Object.keys(array);
        if (keys.length == 1) {
            if (keys[0] == "~") {
                return { "~": 0 };
            }
            else if (keys[0] == "x") {
                return { "~": array[keys[0]] };
            }
            else if (keys[0].indexOf("x^") == 0) {
                var exp = parseFloat(keys[0].replace("x^", ""));
                var a = {};
                a["x" + (exp - 1 != 1 ? "^" + (exp - 1) : "")] =
                    exp * array[keys[0]];
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
            var narray = this.multiply(this.derivate(a), over);
            var narray2 = this.multiply(this.derivate(over), a);
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
/* 1 */
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
                        exp = exp.replace("(" + inside + ")", "$" + index);
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
                    if (element.indexOf("x") == 0) {
                        if (element == "x") {
                            new_keys.push("1");
                        }
                        else {
                            new_keys.push(element.replace("x^", ""));
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
                    keys.push("x^" + key);
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
            text = text.replace("x^2+", "x²+");
            text = text.replace("x^3+", "x³+");
            text = text.replace("+-", "-");
            text = text.replace("--", "+");
            if (text[text.length - 1] == "+") {
                text += "end";
                text = text.replace("+end", "");
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
        var math = new math_1.default();
        if (value.indexOf("dérivée ") == 0) {
            value = this.stringify(math.derivate(this.exec(value.replace("dérivée ", ""))));
        }
        else if (value.indexOf("dérivée_seconde ") == 0) {
            value = this.stringify(math.derivate(math.derivate(this.exec(value.replace("dérivée_seconde ", "")))));
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
        if (expression.indexOf("(") < 0) {
            return this.exec_and_sort(expression);
        }
        else {
            var ver = this.verify(expression);
            if (ver == true) {
                return this.parseExp(expression);
            }
            else {
                return "Cette expression n'est pas correcte : " + ver;
            }
        }
    };
    parser.prototype.exec_and_sort = function (expression) {
        expression = expression.replace(/\-\-/i, "+");
        expression = expression.replace(/\+\-/i, "-");
        if (expression.indexOf("-") == 0) {
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
        var sum_of = expression.split("+");
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
                                if (dive.indexOf("$") == 0) {
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
                                div_result[(function () {
                                    if (dive.split("x")[1] != "") {
                                        return "x" + dive.split("x")[1];
                                    }
                                    else {
                                        return "x";
                                    }
                                })()] = (function () {
                                    if (dive.split("x")[0] != "") {
                                        return parseFloat(dive.split("x")[0]);
                                    }
                                    else {
                                        return 1;
                                    }
                                })();
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
            if (Object.keys(sum_result["over"]).length == 1 &&
                Object.keys(sum_result["over"])[0] == "~" &&
                sum_result["over"]["~"] == 1) {
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
                sum_result[key] =
                    parseFloat(sum_result[key]) + parseFloat(sub_result[key]);
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
                sub_result[key] =
                    parseFloat(sub_result[key]) - parseFloat(mult_result[key]);
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
                        else if (e_mult == "~" && e_div.indexOf("x") == 0) {
                            var e_end_power = e_div;
                        }
                        else if (e_div == "~" && e_mult.indexOf("x") == 0) {
                            var e_end_power = e_mult;
                        }
                        else if (e_div == "x" &&
                            "~" &&
                            e_mult.indexOf("x^") == 0) {
                            var e_end_power = "x^" +
                                (parseFloat(e_mult.replace("x^", "")) + 1);
                        }
                        else if (e_mult == "x" &&
                            "~" &&
                            e_div.indexOf("x^") == 0) {
                            var e_end_power = "x^" +
                                (parseFloat(e_div.replace("x^", "")) + 1);
                        }
                        else {
                            var e_end_power = "x^" +
                                (parseFloat(e_div.replace("x^", "")) +
                                    parseFloat(e_mult.replace("x^", "")));
                        }
                        if (new_mult_result[e_end_power] != undefined) {
                            new_mult_result[e_end_power] +=
                                parseFloat(number_of_e_mult) *
                                    parseFloat(number_of_e_div);
                        }
                        else {
                            new_mult_result[e_end_power] =
                                parseFloat(number_of_e_mult) *
                                    parseFloat(number_of_e_div);
                        }
                    }
                }
            }
        }
        new_mult_result["over"] = over;
        mult_result = new_mult_result;
        if (mult_result["over"] != undefined) {
            if (Object.keys(mult_result["over"]).length == 1 &&
                Object.keys(mult_result["over"])[0] == "~" &&
                mult_result["over"]["~"] == 1) {
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
/* 2 */
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
        this.type = 'parser';
    }
    /**
     * Initialise a parsing task
     * @param {String} expression the expression that has to be parsed
     */
    Parser.prototype.parse = function (expression) {
        // 1) We have to check wheter or not the expression is valid
        var _this = this;
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
        expression = expression.replace(/\$([0-9]+)/gi, function (e, $1) { return '(' + _this.partials['$' + $1] + ')'; });
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
        exp = exp.replace(/²/gi, '^2');
        exp = exp.replace(/³/gi, '^2');
        exp = exp.replace(/X/g, 'x');
        exp = exp.replace(/([0-9]+)x/gi, function (exp, $1) {
            return "(" + $1 + "*x)";
        });
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
                        this.partials[e] = this.parse(buffer);
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
        return processed_exp;
    };
    Parser.prototype.getComputedValue = function (value) {
        var math = new math_1.default();
        var parse = new parser_1.default();
        if (value.indexOf('dérivée ') == 0) {
            value = parse.stringify(math.derivate(parse.exec(value.replace('dérivée ', ''))));
        }
        else if (value.indexOf('dérivée_seconde ') == 0) {
            value = parse.stringify(math.derivate(math.derivate(parse.exec(value.replace('dérivée_seconde ', '')))));
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
        return new Function('x', "\n            let sin = Math.sin;\n            let tan = Math.tan;\n            let cos = Math.cos;\n            let asin = Math.asin;\n            let atan = Math.atan;\n            let acos = Math.acos;\n\n            let sinh = Math.sinh;\n            let tanh = Math.tanh;\n            let cosh = Math.cosh;\n            let asinh = Math.asinh;\n            let atanh = Math.atanh;\n            let acosh = Math.acosh;\n\n            let ceil = Math.ceil;\n            let floor = Math.floor;\n            let abs = Math.abs;\n            let exp = Math.exp;\n            let log = Math.log;\n            \n            let e = Math.E;\n            let pi = Math.PI;\n\n            return " + exp + ";\n\n        ");
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(11);
var canvas_1 = __webpack_require__(13);
var parser_v2_1 = __webpack_require__(2);
var math_1 = __webpack_require__(0);
var modal_1 = __webpack_require__(14);
// We get the default canvas
var html_canvas_element = document.querySelector("canvas");
//We create a new smath canvas
var smath = new canvas_1.default(html_canvas_element);
// We create a new math object
var math = new math_1.default();
var flist = math.getFunctions();
// We create a new expression parser
var parse = new parser_v2_1.default();
//We create an object that will contain all the functions
var fdata = {};
smath.funcs = fdata;
// Function name attribution
var row = 0;
var letter = 0;
var letters = "fghpqrst";
// We add an event listener on the (+) button so that it can add teh function
document.querySelector("#function_add_button").addEventListener("click", function () {
    var update = function (fdata) {
        var keys = Object.keys(fdata);
        var funcs = [];
        keys.forEach(function (key) {
            funcs.push(fdata[key].exp);
        });
        window.location.hash = encodeURIComponent(JSON.stringify(funcs));
    };
    var value = document
        .querySelector("#function_add_input")
        .value.trim();
    //If it's empty, we don't do anything
    if (value == "") {
        return;
    }
    //We keep the initial value in a variable
    var initial = value;
    //We get the computed value of the expression
    value = parse.getComputedValue(value);
    //Adds a text to an element
    var addText = function (e, color, row, initial, value) {
        e.innerHTML = "\n            <i style=\"background:" + color + "; width:5px;height:5px;border-radius:5px;display:inline-block;\"></i>\n            " + letters[letter] + "<sub>" + (row != 0 ? row : "") + "</sub>(x) =  " + initial + " \n            " + (initial != value ? "= " + value : "") + "\n        ";
    };
    //We get an array from the parsed expression
    var func = new Function("x", "\n        " + flist + "\n        return " + parse.parse(value) + "\n    ");
    console.log(func.toString());
    //We draw the function for the first time and we get its color
    var color = smath.drawFromFunc(func);
    //We create a new item in the functions list
    var item = document
        .querySelector("#functions")
        .appendChild(document.createElement("div"));
    item.classList.add("item");
    addText(item.appendChild(document.createElement("span")), color, row, initial, value);
    var remove = item.appendChild(document.createElement("button"));
    remove.innerHTML = "×";
    //We add the edit button
    var edit = item.appendChild(document.createElement("button"));
    edit.innerHTML = "&#128393;";
    var fname = letters[letter] + "" + row;
    //We add the ability to the user to modify the function
    edit.addEventListener("click", function () {
        var p = new modal_1.default("prompt", {
            title: "Modifier la fonction",
            message: "Modifier l'équation de la fonction : ",
            default: fdata[fname].initial
        });
        p.confirm = function (value) {
            var initial = value;
            value = parse.getComputedValue(value);
            fdata[fname].initial = initial;
            fdata[fname].exp = value;
            fdata[fname].array = new Function("x", "\n                " + flist + "\n                return " + parse.parse(value) + "\n            ");
            addText(item.querySelector("span"), color, row, initial, value);
            smath.reload(fdata);
            update(fdata);
        };
    });
    remove.addEventListener("click", function () {
        var p = new modal_1.default("ask", {
            title: "Supprimer",
            message: "Supprimer la fonction ?",
            default: fdata[fname].initial
        });
        p.confirm = function (value) {
            delete fdata[fname];
            smath.reload(fdata);
            update(fdata);
            item.parentElement.removeChild(item);
        };
    });
    fdata[fname] = {
        visible: true,
        color: color,
        array: func,
        exp: value,
        initial: initial
    };
    update(fdata);
    if (letter + 1 < letters.length) {
        letter++;
    }
    else {
        row++;
        letter = 0;
    }
});
// We create the menu system
document.getElementById("menu").addEventListener("click", function () {
    var panel = document.querySelector(".panel");
    if (panel.classList.contains("hidden")) {
        panel.classList.remove("hidden");
    }
    else {
        panel.classList.add("hidden");
    }
});
//@ts-ignore
var buttons = document.querySelectorAll(".tab_manager span");
//@ts-ignore
var tabs = document.querySelectorAll(".tab");
buttons.forEach(function (e) {
    e.addEventListener("click", function () {
        var id = e.dataset["link"];
        tabs.forEach(function (tab) {
            tab.style.display = "none";
        });
        buttons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        e.classList.add("active");
        document.getElementById(id).style.display = "block";
    });
});
buttons[0].click();
var hash = window.location.hash.replace("#", "");
try {
    var a = JSON.parse(decodeURIComponent(hash));
    a.forEach(function (element) {
        //@ts-ignore
        document.querySelector("#function_add_input").value = element;
        //@ts-ignore
        document.querySelector("#function_add_button").click();
    });
}
catch (error) {
    console.log(error);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(12);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(4)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./drawer.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./drawer.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, "* {\n  font-family: sans-serif; }\n\n#menu {\n  z-index: 98;\n  position: fixed;\n  top: 0;\n  left: 0;\n  border: 1px solid gray;\n  color: gray;\n  background: white;\n  display: none;\n  height: 25px;\n  width: 100%; }\n  @media (max-width: 600px) {\n    #menu {\n      display: block; } }\n\n.panel {\n  z-index: 95;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 300px;\n  background: white;\n  border-right: 1px solid lightgray; }\n  .panel.hidden {\n    display: none; }\n  @media (max-width: 600px) {\n    .panel {\n      top: 25px;\n      width: 100%; } }\n  .panel .tab_manager {\n    display: flex;\n    height: 50px;\n    line-height: 50px;\n    text-align: center;\n    border-bottom: 1px solid lightgray; }\n    .panel .tab_manager span {\n      color: gray;\n      transition: 0.25s;\n      display: inline-block;\n      flex-grow: 1;\n      height: 100%;\n      border-bottom: 2px solid lightgray;\n      cursor: pointer; }\n      .panel .tab_manager span:hover, .panel .tab_manager span.active {\n        border-bottom: 2px solid rgba(255, 165, 0, 0.8); }\n  .panel .tabs {\n    position: absolute;\n    top: 52px;\n    left: 0;\n    right: 0;\n    bottom: 0; }\n    .panel .tabs .tab {\n      background: white;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      right: 0;\n      left: 0; }\n      .panel .tabs .tab#objects {\n        overflow: auto;\n        --w: 90%; }\n        .panel .tabs .tab#objects #function_add_input, .panel .tabs .tab#objects #function_add_button {\n          display: inline-block;\n          padding: 0;\n          height: 40px;\n          margin: 0;\n          border: none;\n          border-bottom: 1px solid lightgray; }\n        .panel .tabs .tab#objects #function_add_input {\n          padding-left: 15px;\n          padding-right: 15px;\n          width: calc(var(--w) - 30px); }\n        .panel .tabs .tab#objects #function_add_button {\n          background: #F0F0F0;\n          width: 10%;\n          cursor: pointer; }\n        .panel .tabs .tab#objects #list {\n          overflow: auto;\n          position: absolute;\n          top: 41px;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          padding: 25px; }\n          .panel .tabs .tab#objects #list .title {\n            color: gray;\n            font-weight: 700; }\n          .panel .tabs .tab#objects #list .item {\n            color: #bababa;\n            line-height: 25px; }\n            .panel .tabs .tab#objects #list .item span {\n              display: inline-block;\n              max-width: 80%;\n              word-break: break-all; }\n            .panel .tabs .tab#objects #list .item button {\n              background: transparent;\n              border: none;\n              float: right;\n              cursor: pointer; }\n          .panel .tabs .tab#objects #list #copy {\n            text-align: center;\n            color: lightgray;\n            font-size: 10px; }\n\n.drawing_area {\n  z-index: 90;\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  width: calc(100vw - 301px);\n  right: 0; }\n  @media (max-width: 600px) {\n    .drawing_area {\n      width: 100%;\n      top: 25px; } }\n  .drawing_area canvas {\n    background: #fafafa;\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    height: 100%; }\n\n.mask {\n  z-index: 99;\n  background: rgba(0, 0, 0, 0.02);\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0; }\n\n.modal {\n  z-index: 100;\n  background: white;\n  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.15);\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: 300px;\n  max-width: calc(100% - 75px);\n  padding: 25px;\n  border-radius: 4px; }\n  .modal input {\n    width: calc(100% - 16px);\n    padding: 5px;\n    padding-left: 8px;\n    padding-right: 8px;\n    border: 1px solid lightgray; }\n  .modal .clearfix {\n    height: 25px;\n    margin-top: 25px; }\n    .modal .clearfix button {\n      float: right;\n      background: gray;\n      color: white;\n      border: none;\n      padding: 5px;\n      padding-left: 8px;\n      padding-right: 8px;\n      cursor: pointer;\n      border-radius: 4px; }\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas = /** @class */ (function () {
    function canvas(canvas) {
        var _this = this;
        this.center_x = 0;
        this.center_y = 0;
        this.x_unit = 50;
        this.y_unit = 50;
        this.stored = {};
        this.pathes = {};
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.init();
        var start;
        var down = false;
        //When the user starts an action on the canvas.
        canvas.addEventListener("mousedown", function (e) {
            down = true;
            start = { x: e.pageX, y: e.pageY };
            canvas.style.cursor = "grabbing";
        });
        canvas.addEventListener("touchstart", function (e) {
            down = true;
            start = {
                x: e.touches.item(0).clientX,
                y: e.touches.item(0).clientY
            };
        });
        // When the user moves on the surface of the canvas.
        canvas.addEventListener("mousemove", function (e) {
            if (down == true) {
                var new_start = { x: e.pageX, y: e.pageY };
                var old = start;
                var drawn = _this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        canvas.addEventListener("touchmove", function (e) {
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
        canvas.addEventListener("mouseup", function (e) {
            down = false;
            canvas.style.cursor = "grab";
        });
        canvas.addEventListener("touchend", function (e) {
            down = false;
        });
        window.addEventListener("resize", function (e) {
            _this.reload();
        });
        canvas.addEventListener("mousewheel", function (e) {
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
        });
        canvas.addEventListener("DOMMouseScroll", function (e) {
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
        });
    }
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
        this.ctx.fillStyle = "#fafafa";
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
        var to = Math.floor(this.center_x + max);
        var xpos = Math.floor(this.center_x - max);
        while (xpos < to) {
            this.drawLine(this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y + max)), this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y - max)), Math.floor(xpos) == 0 ? "black" : undefined);
            this.ctx.beginPath();
            this.ctx.font = "15px Sans Serif";
            this.ctx.fillStyle = "gray";
            this.ctx.fillText(xpos.toString(), this.getRelativePositionX(xpos), this.getRelativePositionY(0) + 15);
            this.ctx.closePath();
            xpos++;
        }
        to = Math.floor(this.center_y + max);
        var ypos = Math.floor(this.center_y - max);
        while (ypos < to) {
            this.drawLine(this.getRelativePositionX(Math.floor(this.center_x + max)), this.getRelativePositionY(ypos), this.getRelativePositionX(Math.floor(this.center_x - max)), this.getRelativePositionY(ypos), Math.floor(ypos) == 0 ? "black" : undefined);
            this.ctx.beginPath();
            this.ctx.font = "15px Sans Serif";
            this.ctx.fillStyle = "gray";
            this.ctx.fillText(ypos.toString(), this.getRelativePositionX(0) -
                ypos.toString().length * 15 / 2 -
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
        if (color == undefined) {
            this.ctx.strokeStyle = "#eee";
        }
        else {
            this.ctx.strokeStyle = color;
        }
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        }
        else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();
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
            var letters = "0123456789ABCDEF";
            color = "#";
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
                this.pathes[label][x] = pos;
                new_y = this.getRelativePositionY(pos);
                new_x = this.getRelativePositionX(x);
            }
            if (last != undefined) {
                this.drawLine(new_x, new_y, last.x, last.y, color, 2);
            }
            last = {
                x: new_x,
                y: new_y
            };
            if (isPreview == true) {
                x += 0.5;
            }
            else {
                x += 0.05;
            }
            //x+= this.x_unit /500;
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
            this.stored[label][start] = func(start);
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
        });
    };
    Object.defineProperty(canvas.prototype, "funcs", {
        set: function (fdata) {
            this.fdata = fdata;
        },
        enumerable: true,
        configurable: true
    });
    return canvas;
}());
exports.default = canvas;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var modal = /** @class */ (function () {
    function modal(type, options) {
        var _this = this;
        var mask = document.createElement("div");
        mask.classList.add("mask");
        document.body.appendChild(mask);
        mask.onclick = function () {
            rm();
        };
        var div = document.createElement("div");
        div.classList.add("modal");
        document.body.appendChild(div);
        var rm = function () {
            mask.parentNode.removeChild(mask);
            div.parentNode.removeChild(div);
        };
        if (type == "prompt") {
            div.appendChild(document.createElement("b")).innerHTML =
                options.title;
            div.appendChild(document.createElement("p")).innerHTML =
                options.message;
            var input_1 = div.appendChild(document.createElement("input"));
            input_1.value = options.default;
            var clearfix = div.appendChild(document.createElement("div"));
            clearfix.classList.add("clearfix");
            var confirm_1 = clearfix.appendChild(document.createElement("button"));
            confirm_1.innerHTML = "Confirmer";
            confirm_1.addEventListener("click", function () {
                _this._c(input_1.value);
                rm();
            });
        }
        else if (type == "ask") {
            div.appendChild(document.createElement("b")).innerHTML =
                options.title;
            div.appendChild(document.createElement("p")).innerHTML =
                options.message;
            var clearfix = div.appendChild(document.createElement("div"));
            clearfix.classList.add("clearfix");
            var confirm_2 = clearfix.appendChild(document.createElement("button"));
            confirm_2.innerHTML = "Confirmer";
            confirm_2.addEventListener("click", function () {
                _this._c("");
                rm();
            });
            var cancel = clearfix.appendChild(document.createElement("button"));
            cancel.innerHTML = "Annuler";
            cancel.style.marginRight = "5px";
            cancel.addEventListener("click", function () {
                rm();
            });
        }
    }
    Object.defineProperty(modal.prototype, "confirm", {
        set: function (v) {
            this._c = v;
        },
        enumerable: true,
        configurable: true
    });
    return modal;
}());
exports.default = modal;


/***/ })
/******/ ]);