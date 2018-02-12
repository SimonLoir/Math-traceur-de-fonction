import Parser from "./parser.v2";

let parser = new Parser();

console.log(parser.parse("x²+6x+3"))
console.log(parser.parse("x²"))
console.log(parser.parse("x²+6"))
console.log(parser.parse("x^(2^2)+6x"))

//http://jsben.ch/D2xTG
console.log(
    parser.parse("(sqrt(x²+6x+3)+6x+33)/2"), 
    (new Function("x", "return " + parser.parse("(sqrt(x²+6x+3)+6x+33)/2"))(0))
)
console.log(">" , parser.parse("x²+(x²-6x)*x"))
console.log(parser.parse("x²+(x²-6x*x"))