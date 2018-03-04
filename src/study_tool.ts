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
    let func_str = window.location.hash.replace('#', '');
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
} else {
    $('body').html("Ceci n'est pas une fonction");
}
