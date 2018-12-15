"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = require("./parser.v2");
var extjs_1 = require("./extjs");
require("./scss/home.scss");
var p = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
document.querySelector('header').style.backgroundImage =
    'url(../images/site-header.jpg)';
extjs_1.$('header').css('height', '400px');
var page = extjs_1.$('#xcontent');
page.child('h2').text('Informations');
var func_str = decodeURIComponent(window.location.hash.replace('#', ''));
page.child('p').text("f(x) = " + func_str);
page.child('p').text("f(x) = " + p.parse(func_str));
/*
let parser = new Parser();
let math = new MathObject();
let canvas = new Canvas(document.querySelector('canvas'));

canvas.init();
canvas.funcs = {};

$('header').addClass('floating');

if (window.location.hash != '') {
    let func_str = decodeURIComponent(window.location.hash.replace('#', ''));
    let func = parser.Functionize(func_str);
    let color = canvas.drawFromFunc(func);

    canvas.funcs = {
        func: {
            visible: true,
            color: color,
            array: func,
            exp: func_str,
            initial: func_str
        }
    };

    let analysis = $('#func_anal');
    let derivative = math.derivative(func_str);
    let sec_derivative = math.derivative(derivative);

    analysis.child('p').html(`
    f(x) = ${func_str}
    <br />
    
    <br />
    f'(x) = ${derivative}
    <br /><br />
    f''(x) = ${sec_derivative}
    `);

    let derivative_canvas = new Canvas($('#derivative_graph').get(0));
    derivative_canvas.init();
    let derfunc = parser.Functionize(derivative, true);
    let dercolor = derivative_canvas.drawFromFunc(derfunc);

    derivative_canvas.funcs = {
        func: {
            visible: true,
            color: color,
            array: derfunc,
            exp: derivative,
            initial: derivative
        }
    };
} else {
    $('body').html("Ceci n'est pas une fonction");
}
*/
