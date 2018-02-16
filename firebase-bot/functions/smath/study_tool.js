"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_v2_1 = require("./parser.v2");
var parser = new parser_v2_1.default();
var math = new parser_v2_1.MathObject();
['x²', 'x²/x', '1/2x', '1/x+1/2x'].forEach(function (e) {
    console.log("dom f " + e + " = " + math.getDomF(e));
});
