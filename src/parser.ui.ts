import Parser from "./parser.v2";
import MathObject from "./math.v2";

let parser = new Parser();
let math = new MathObject();

console.log("=> ", math.derivative("5"));
console.log("=> ", math.derivative("x"));
console.log("=> ", math.derivative("4x"));
console.log("=> ", math.derivative("x²"));
console.log("=> ", math.derivative("x²+6x+3"));
console.log("=> ", math.derivative("sqrt(x²)"));
console.log("=> ", math.derivative("x²+6x+3"));
console.log("=> ", math.derivative("x²-6x"));
console.log("=> ", math.derivative("(x²)/x"));
console.log("=> ", math.derivative("x²/x/2"));

//http://jsben.ch/D2xTG
console.log(
    parser.parse("(sqrt(x²+6x+3)+6x+33)/2"),
    new Function("x", "return " + parser.parse("(sqrt(x²+6x+3)+6x+33)/2"))(0)
);
console.log(">", parser.parse("x²+(x²-6x)*x"));
console.log(parser.parse("x²+(x²-6x*x"));
