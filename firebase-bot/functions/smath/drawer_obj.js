"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extjs_1 = require("./extjs");
var Menu = /** @class */ (function () {
    function Menu() {
    }
    Menu.prototype.update = function (fdata) {
        var container = extjs_1.$('#functions');
        container.html('');
        var keys = Object.keys(fdata);
        keys.forEach(function (key) {
            var item = container.child('div').addClass('item');
            var span = item.child('span').html("<i style=\"background:" + fdata[key].color + "; width:5px;height:5px;border-radius:5px;display:inline-block;\"></i>\n                    " + key + "(x) = " + fdata[key].initial);
        });
        var obj_container = extjs_1.$('#objs');
        obj_container.html('');
        var grid = obj_container.child('div').addClass('item');
        grid.child('span').text('Grille');
        grid.child('button').html('&#128393;');
    };
    Menu.prototype.updateCallback = function (callback) { };
    return Menu;
}());
exports.default = Menu;
