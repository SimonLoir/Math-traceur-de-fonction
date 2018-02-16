"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = require("./parser.v2");
var parser = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
[
    '1',
    'x',
    '2x',
    '2*2x',
    'x²',
    'x^3',
    '2*x²',
    '(2x)^2',
    '1/x',
    'sin(x)',
    'sin(1/x)',
    'sin(x^2)'
].forEach(function (e) {
    console.log('=> ' + e, math.derivative(e));
});
//http://jsben.ch/D2xTG
console.log(parser.parse('(sqrt(x²+6x+3)+6x+33)/2'), new Function('x', 'return ' + parser.parse('(sqrt(x²+6x+3)+6x+33)/2'))(0));
