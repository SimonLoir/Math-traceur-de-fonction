"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = require("./parser.v2");
var extjs_1 = require("./extjs");
var parser = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
console.log(math.tokenize('ln(x)+x/(1-(6+6))=5+2'));
var tokens = math.tokenize('x^2*1/x+1=0');
extjs_1.$('body').html("<pre>" + JSON.stringify(tokens, null, '  ') + "</pre>");
if (tokens.type == 'equal_sign') {
    var func = tokens.value[0];
    console.log(func);
}
