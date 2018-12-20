"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("./svg/canvas");
var canvas_2 = require("./canvas");
var parser_v2_1 = require("./parser.v2");
var SVGGraph = /** @class */ (function () {
    function SVGGraph(fstring, build) {
        var c = new canvas_1.default(550, 550);
        //@ts-ignore
        var xc = new canvas_2.default(c);
        xc.fastDrawing = true;
        xc.init();
        var parser = new parser_v2_1.default();
        var math = new parser_v2_1.MathObject();
        xc.init();
        xc.funcs = {};
        var func_str = fstring;
        var func = parser.Functionize(func_str);
        var color = xc.drawFromFunc(func);
        xc.funcs = {
            func: {
                visible: true,
                color: color,
                array: func,
                exp: func_str,
                initial: func_str
            }
        };
        build(c.toSVG());
    }
    return SVGGraph;
}());
exports.default = SVGGraph;
