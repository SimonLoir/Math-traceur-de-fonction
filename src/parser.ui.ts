import Parser, { MathObject } from './parser.v2';
import { $ } from './extjs';

let parser = new Parser();
let math = new MathObject();

console.log(math.tokenize('ln(x)+x/(1-(6+6))=5+2'));

let tokens = math.tokenize('x^2*1/x+1=0');

$('body').html(`<pre>${JSON.stringify(tokens, null, '  ')}</pre>`);

if (tokens.type == 'equal_sign') {
    let func = tokens.value[0];
    console.log(func);
}
