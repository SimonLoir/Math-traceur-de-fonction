"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = require("./parser.v2");
var extjs_1 = require("./extjs");
require("./scss/home.scss");
var canvas_1 = require("./canvas");
var parser = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
var canvas = new canvas_1.default(document.querySelector('canvas'));
canvas.init();
canvas.funcs = {};
extjs_1.$('header').addClass('floating');
if (window.location.hash != '') {
    var func_str = decodeURIComponent(window.location.hash.replace('#', ''));
    var func = parser.Functionize(func_str);
    var color = canvas.drawFromFunc(func);
    canvas.funcs = {
        func: {
            visible: true,
            color: color,
            array: func,
            exp: func_str,
            initial: func_str
        }
    };
    var analysis = extjs_1.$('#func_anal');
    var derivative = math.derivative(func_str);
    var sec_derivative = math.derivative(derivative);
    analysis.child('p').html("\n    f(x) = " + func_str + "\n    <br />\n    \n    <br />\n    f'(x) = " + derivative + "\n    <br /><br />\n    f''(x) = " + sec_derivative + "\n    ");
    var derivative_canvas = new canvas_1.default(extjs_1.$('#derivative_graph').get(0));
    derivative_canvas.init();
    var derfunc = parser.Functionize(derivative, true);
    var dercolor = derivative_canvas.drawFromFunc(derfunc);
    derivative_canvas.funcs = {
        func: {
            visible: true,
            color: color,
            array: derfunc,
            exp: derivative,
            initial: derivative
        }
    };
}
else {
    extjs_1.$('body').html("Ceci n'est pas une fonction");
}
