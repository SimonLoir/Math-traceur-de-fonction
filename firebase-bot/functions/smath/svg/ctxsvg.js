"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("./path");
var context = /** @class */ (function () {
    function context() {
        this.svg = [];
    }
    context.prototype.clearRect = function () {
        this.svg = [];
    };
    context.prototype.beginPath = function () {
        this.i = this.svg.push(new path_1.Path()) - 1;
    };
    context.prototype.rect = function (x, y, width, height) {
        this.moveTo(x, y);
        this.lineTo(x + width, y);
        this.lineTo(x + width, y + height);
        this.lineTo(x, y + height);
        this.closePath();
    };
    context.prototype.fill = function () {
        this.svg[this.i].fill = this.fillStyle;
    };
    context.prototype.stroke = function () {
        this.svg[this.i].stroke = this.strokeStyle;
        this.svg[this.i].stroke_width = this.lineWidth;
    };
    context.prototype.fillText = function (text, x, y) {
        this.svg[this.i].text.push(new path_1.XText(text, x, y, this.font, this.fillStyle));
    };
    context.prototype.closePath = function () {
        this.svg[this.i].path += "Z";
    };
    context.prototype.moveTo = function (x, y) {
        if (!isNaN(y))
            this.svg[this.i].path += "M" + x + " " + y + " ";
    };
    context.prototype.lineTo = function (x, y) {
        if (!isNaN(y))
            this.svg[this.i].path += "L" + x + " " + y + " ";
    };
    return context;
}());
exports.default = context;
