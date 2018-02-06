"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
var canvas = /** @class */ (function () {
    function canvas(canvas) {
        this.center_x = 0;
        this.center_y = 0;
        this.x_unit = 50;
        this.y_unit = 50;
        this.stored = {};
        this.pathes = {};
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();
    }
    canvas.prototype.init = function () {
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
        this.draw();
    };
    canvas.prototype.draw = function () {
        this.drawGrid();
    };
    canvas.prototype.drawGrid = function () {
        // Clears the view
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = "#fafafa";
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
        var to = 100;
        var xpos = 0 - to;
        while (xpos < to) {
            this.drawLine(this.getRelativePositionX(xpos), this.getRelativePositionY(this.center_y + to), this.getRelativePositionX(xpos), this.getRelativePositionY(this.center_y - to), (xpos == 0) ? "black" : undefined);
            xpos++;
        }
        var ypos = 0 - to;
        while (ypos < to) {
            this.drawLine(this.getRelativePositionX(this.center_x + to), this.getRelativePositionY(ypos), this.getRelativePositionX(this.center_x - to), this.getRelativePositionY(ypos), (ypos == 0) ? "black" : undefined);
            ypos++;
        }
    };
    canvas.prototype.drawLine = function (x, y, x2, y2, color, width) {
        this.ctx.beginPath();
        if (color == undefined) {
            this.ctx.strokeStyle = "#eee";
        }
        else {
            this.ctx.strokeStyle = color;
        }
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        }
        else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();
    };
    canvas.prototype.getRelativePositionX = function (point) {
        return (this.canvas.width / 2) + point * this.x_unit - this.center_x * this.x_unit;
    };
    canvas.prototype.getRelativePositionY = function (point) {
        return (this.canvas.height / 2) - point * this.y_unit + this.center_y * this.y_unit;
    };
    canvas.prototype.drawFromArray = function (array, color) {
        if (color === void 0) { color = undefined; }
        if (!color) {
            var letters = '0123456789ABCDEF';
            color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        }
        var display_size = (this.canvas.width / 2) / this.x_unit;
        var x = this.center_x - display_size;
        var last = undefined;
        var label = (new parser_1.default).stringify(array);
        var was_defined = true;
        if (this.pathes[label] == undefined) {
            this.pathes[label] = {};
            was_defined = false;
        }
        while (x < this.center_x + display_size) {
            var pos = void 0;
            var new_y = void 0;
            var new_x = void 0;
            if (was_defined == true && this.pathes[label][x] != undefined) {
                new_y = this.getRelativePositionY(this.pathes[label][x]);
                new_x = this.getRelativePositionX(x);
            }
            else {
                pos = this.getFor(x, array, label);
                this.pathes[label][x] = pos;
                new_y = this.getRelativePositionY(pos);
                new_x = this.getRelativePositionX(x);
            }
            if (last != undefined) {
                this.drawLine(new_x, new_y, last.x, last.y, color, 2);
            }
            last = {
                x: new_x,
                y: new_y
            };
            x += 0.05;
            //x+= this.x_unit /500;
        }
        return color;
    };
    canvas.prototype.getFor = function (start, array, label) {
        if (this.stored[label] == undefined) {
            this.stored[label] = {};
        }
        if (this.stored[label][start] != undefined) {
            return this.stored[label][start];
        }
        else {
            var result = 0;
            for (var i = 0; i < Object.keys(array).length; i++) {
                var element = Object.keys(array)[i];
                if (element == "~") {
                    if (array[element] != "") {
                        result += array[element];
                    }
                }
                else if (element == "x") {
                    result += array[element] * start;
                }
                else if (element.indexOf("^m") >= 0) {
                    result += array[element] * (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
                }
                else if (element == "over") {
                    result = result / this.getFor(start, array[element], (new parser_1.default).stringify(array[element]));
                }
                else {
                    result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
                }
            }
            this.stored[label][start] = result;
            return result;
        }
    };
    Object.defineProperty(canvas.prototype, "reload", {
        get: function () {
            return this.r;
        },
        set: function (d) {
            this.r = d;
        },
        enumerable: true,
        configurable: true
    });
    return canvas;
}());
exports.default = canvas;
