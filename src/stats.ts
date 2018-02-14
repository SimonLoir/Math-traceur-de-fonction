import './scss/stats.scss';
import Canvas from './canvas';
import Parser from './parser.v2';

let canvas = new Canvas(document.querySelector('canvas'));
let parser = new Parser();

canvas.init();
canvas.funcs = {};

/*canvas.funcs = {
    visible: true,
    color: color,
    array: func,
    exp: value,
    initial: initial
};
canvas.drawFromFunc(parser.Functionize('x^2', true));*/
