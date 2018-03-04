import Parser, { MathObject } from './parser.v2';
import { $ } from './extjs';
import './scss/home.scss';
import Canvas from './canvas';

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
