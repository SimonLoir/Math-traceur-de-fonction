import Parser from './parser.v2';
import MathObject from './math.v2';

let parser = new Parser();
let math = new MathObject();

console.log('=> ', math.derivative('5'));
console.log('=> ', math.derivative('x'));
console.log('=> ', math.derivative('4+x'));
console.log('=> ', math.derivative('4-x'));
console.log('=> ', math.derivative('2x'));
console.log('=> ', math.derivative('2x^2'));
console.log('=> ', math.derivative('(2x)^2'));
console.log('=> ', math.derivative('2*x^2'));

//http://jsben.ch/D2xTG
console.log(
    parser.parse('(sqrt(x²+6x+3)+6x+33)/2'),
    new Function('x', 'return ' + parser.parse('(sqrt(x²+6x+3)+6x+33)/2'))(0)
);
console.log('>', parser.parse('x²+(x²-6x)*x'));
console.log(parser.parse('x²+(x²-6x*x'));
