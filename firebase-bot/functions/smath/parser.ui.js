"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = require("./parser.v2");
var parser = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
[
    '1',
    'x',
    'x+1',
    'x-1',
    '-x-1',
    '((x-1))',
    '2x',
    '2*2x',
    'x²',
    'x^3',
    '2*x²',
    '(2x)^2',
    '1/x',
    '1/x/x',
    'sin(x)',
    'sin(1/x)',
    'sin(x^2)',
    'log(2, x)',
    'sin(x)*x+x*(x²+6x+3*x-2x/x)*10'
].forEach(function (e) {
    //console.log('=> Derivative(' + e + ')', math.derivative(e));
    console.log('=> Tokenize ' + e, parser.tokenize(e));
    document.body.innerText += "\n    " + e + " =>  " + JSON.stringify(parser.tokenize(e), null, '    ') + "\n    ";
});
//http://jsben.ch/D2xTG
console.log(parser.parse('(sqrt(x²+6x+3)+6x+33)/2'), new Function('x', 'return ' + parser.parse('(sqrt(x²+6x+3)+6x+33)/2'))(0));
