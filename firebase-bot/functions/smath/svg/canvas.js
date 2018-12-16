"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ctxsvg_1 = require("./ctxsvg");
var CanvasSubstitute = /** @class */ (function () {
    function CanvasSubstitute(width, height) {
        if (width === void 0) { width = 500; }
        if (height === void 0) { height = 500; }
        this.scrollHeight = this.height = height;
        this.scrollWidth = this.width = width;
    }
    CanvasSubstitute.prototype.getContext = function (type) {
        if (type == '2d') {
            console.log(this.xGet2DContext());
            return this.xGet2DContext();
        }
    };
    CanvasSubstitute.prototype.xGet2DContext = function () {
        if (this.ctx)
            return this.ctx;
        else {
            this.ctx = new ctxsvg_1.default();
            return this.ctx;
        }
    };
    CanvasSubstitute.prototype.toSVG = function () {
        var inside = "";
        this.getContext('2d').svg.forEach(function (e) {
            if (e.text != []) {
                e.text.forEach(function (text) {
                    inside += "<text x=\"" + text.x + "\" y=\"" + text.y + "\" style=\"fill:" + text.color + ";font: " + text.font + "\">" + text.text + "</text>";
                });
            }
            if (e.path == '' || e.path == 'Z' || e.path.indexOf('L') == 0)
                return;
            inside += "<path d=\"" + e.path + "\" style=\"stroke-width:" + e.stroke_width + "px;stroke:" + e.stroke + ";fill:" + e.fill + ";\"></path>";
        });
        return "<svg width=\"" + this.width + "\" height=\"" + this.height + "\">" + inside + "</svg>";
    };
    CanvasSubstitute.prototype.addEventListener = function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
    };
    return CanvasSubstitute;
}());
exports.default = CanvasSubstitute;
