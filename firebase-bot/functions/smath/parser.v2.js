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
