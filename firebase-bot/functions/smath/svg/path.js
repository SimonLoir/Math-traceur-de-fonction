"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path = /** @class */ (function () {
    function Path() {
        this.path = '';
        this.stroke = 'none';
        this.stroke_width = 1;
        this.fill = 'none';
        this.text = [];
    }
    return Path;
}());
exports.Path = Path;
var XText = /** @class */ (function () {
    function XText(text, x, y, style, color) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = style;
        this.color = color;
    }
    return XText;
}());
exports.XText = XText;
