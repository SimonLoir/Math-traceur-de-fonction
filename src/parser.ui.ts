import Parser, { MathObject } from './parser.v2';

let parser = new Parser();
let math = new MathObject();

['1', 'x', '2x', 'x²', 'x^3', '2*x²', '(2x)^2', '1/x'].forEach(e => {
    console.log('=> ' + e, math.Functionize(math.derivative(e))(0));
});

//http://jsben.ch/D2xTG
console.log(
    parser.parse('(sqrt(x²+6x+3)+6x+33)/2'),
    new Function('x', 'return ' + parser.parse('(sqrt(x²+6x+3)+6x+33)/2'))(0)
);
