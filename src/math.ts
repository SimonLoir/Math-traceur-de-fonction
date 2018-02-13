import parser from "./parser";
//@ts-ignore
if (typeof Object.assign != "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target: any, varArgs: any) {
            // .length of function is 2
            "use strict";
            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError(
                    "Cannot convert undefined or null to object"
                );
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (
                            Object.prototype.hasOwnProperty.call(
                                nextSource,
                                nextKey
                            )
                        ) {
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
export default class MathObject {
    public multiply: any;
    public add: any;
    public sub: any;

    constructor() {
        this.multiply = new parser().multiply;
        this.add = new parser().add;
        this.sub = new parser().sub;
    }

    public getFunctions() {
        return `
            let sin = Math.sin;
            let tan = Math.tan;
            let cos = Math.cos;
            let asin = Math.asin;
            let atan = Math.atan;
            let acos = Math.acos;

            let sinh = Math.sinh;
            let tanh = Math.tanh;
            let cosh = Math.cosh;
            let asinh = Math.asinh;
            let atanh = Math.atanh;
            let acosh = Math.acosh;

            let ceil = Math.ceil;
            let floor = Math.floor;
            let abs = Math.abs;
            let exp = Math.exp;
            let log = Math.log
            
            let e = Math.E;
            let pi = Math.PI
        `;
    }

    public static getFor(start: number, array: any) {
        var result = 0;
        for (var i = 0; i < Object.keys(array).length; i++) {
            var element = Object.keys(array)[i];
            if (element == "~") {
                if (array[element] != "") {
                    result += array[element];
                }
            } else if (element == "x") {
                result += array[element] * start;
            } else if (element.indexOf("^m") >= 0) {
                result +=
                    array[element] *
                    (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
            } else if (element == "over") {
                result = result / this.getFor(start, array[element]);
            } else {
                result +=
                    array[element] *
                    Math.pow(start, parseFloat(element.split("^")[1]));
            }
        }

        return result;
    }

    public derivate(array: any) {
        console.log("=>", array);
        let keys = Object.keys(array);

        if (keys.length == 1) {
            if (keys[0] == "~") {
                return { "~": 0 };
            } else if (keys[0] == "x") {
                return { "~": array[keys[0]] };
            } else if (keys[0].indexOf("x^") == 0) {
                let exp = parseFloat(keys[0].replace("x^", ""));

                let a: any = {};
                a[`x${exp - 1 != 1 ? "^" + (exp - 1) : ""}`] =
                    exp * array[keys[0]];

                console.log(a);
                return a;
            } else {
                return {};
            }
        } else if (array["over"] != undefined) {
            let a = array;
            let over = array["over"];
            delete a["over"];

            console.log(
                this.derivate(a),
                over,
                this.multiply(this.derivate(a), over)
            );
            console.log(
                this.derivate(a),
                over,
                this.multiply(this.derivate(over), a)
            );

            let narray: any = this.multiply(this.derivate(a), over);
            let narray2: any = this.multiply(this.derivate(over), a);

            let sub = this.sub(narray2, narray);

            console.log("sub", sub);

            //@ts-ignore
            let second_over = Object.assign({}, over);

            let under = this.multiply(over, second_over);

            if (!sub["over"]) {
                sub["over"] = under;
            } else {
                sub["over"] = this.multiply(sub["over"], under);
            }

            return sub;
        } else {
            let a = {};

            keys.forEach(key => {
                let e: any = {};
                e[key] = array[key];
                a = this.add(a, this.derivate(e));
            });

            return a;
        }
    }
}
