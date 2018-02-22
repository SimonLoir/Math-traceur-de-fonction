import Parser, { MathObject } from './parser.v2';

let parser = new Parser();
let math = new MathObject();

['1', '1+x', 'x²', 'x²/x', '1/2x', '1/x+1/2x'].forEach(e => {
    console.log(`dom f ${e} = ${math.getDomF(math.tokenize(e))}`);
});
