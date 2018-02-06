"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
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
