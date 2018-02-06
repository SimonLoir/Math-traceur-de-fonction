"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scss/drawer.scss");
var canvas_1 = require("./canvas");
var parser_1 = require("./parser");
var math_1 = require("./math");
var modal_1 = require("./modal");
var html_canvas = document.querySelector('canvas');
var c = new canvas_1.default(html_canvas);
var math = new math_1.default;
var fdata = {};
//@ts-ignore
document.querySelector('#function_add_input').focus();
var parse = new parser_1.default();
var row = 0;
var letter = 0;
var letters = "fghpqrst";
//@ts-ignore
document.querySelector("#function_add_button").onclick = function () {
    //@ts-ignore
    var value = document.querySelector('#function_add_input').value.trim();
    if (value == "") {
        return;
    }
    var initial = value;
    if (value.indexOf('dérivée ') == 0) {
        value = parse.stringify(math.derivate(parse.exec(value.replace('dérivée ', ""))));
    }
    else if (value.indexOf("dérivée_seconde ") == 0) {
        value = parse.stringify(math.derivate(math.derivate(parse.exec(value.replace('dérivée_seconde ', "")))));
    }
    console.log(value, parse.exec(value));
    var addText = function (e, color, row, initial, value) {
        e.innerHTML = "\n            <i style=\"background:" + color + "; width:5px;height:5px;border-radius:5px;display:inline-block;\"></i>\n            " + letters[letter] + "<sub>" + ((row != 0) ? row : "") + "</sub>(x) =  " + initial + " \n            " + ((initial != value) ? "= " + value : "") + "\n        ";
    };
    var v = parse.exec(value);
    var color = c.drawFromArray(v);
    var item = document
        .querySelector('#functions')
        .appendChild(document.createElement('div'));
    item.classList.add('item');
    addText(item.appendChild(document.createElement('span')), color, row, initial, value);
    var edit = item
        .appendChild(document.createElement('button'));
    edit.innerHTML = "&#128393;";
    var fname = letters[letter] + "" + row;
    edit.addEventListener('click', function () {
        var p = new modal_1.default("prompt", {
            title: "Modifier la fonction",
            message: "Modifier l'équation de la fonction : ",
            default: fdata[fname].initial
        });
        p.confirm = function (value) {
            var initial = value;
            if (value.indexOf('dérivée ') == 0) {
                value = parse.stringify(math.derivate(parse.exec(value.replace('dérivée ', ""))));
            }
            else if (value.indexOf("dérivée_seconde ") == 0) {
                value = parse.stringify(math.derivate(math.derivate(parse.exec(value.replace('dérivée_seconde ', "")))));
            }
            fdata[fname].initial = initial;
            fdata[fname].array = parse.exec(value);
            addText(item.querySelector('span'), color, row, initial, value);
            c.reload(fdata);
        };
    });
    fdata[fname] = {
        visible: true,
        color: color,
        array: v,
        exp: value,
        initial: initial
    };
    if (letter + 1 < letters.length) {
        letter++;
    }
    else {
        row++;
        letter = 0;
    }
};
window.onresize = function () {
    requestAnimationFrame(function () {
        c.reload(fdata);
    });
};
c.reload = function (d) {
    var _this = this;
    var data = Object.keys(d);
    this.init();
    data.forEach(function (key) {
        if (d[key].visible == true) {
            _this.drawFromArray(d[key].array, d[key].color);
        }
    });
};
var down = false;
var start;
function addListenerMulti(el, s, fn) {
    s.split(' ').forEach(function (e) { return el.addEventListener(e, fn, false); });
}
addListenerMulti(html_canvas, 'mousedown touchstart', function (e) {
    console.log(e);
    down = true;
    start = { x: e.pageX, y: e.pageY };
    html_canvas.style.cursor = "grabbing";
});
addListenerMulti(html_canvas, 'mousemove touchmove', function (e) {
    if (down == true) {
        var old = start;
        var new_start = { x: e.pageX, y: e.pageY };
        var diff_x = old.x - new_start.x;
        var diff_y = old.y - new_start.y;
        if (Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2)) > 12) {
            c.center_x += diff_x / c.x_unit;
            c.center_y -= diff_y / c.y_unit;
            requestAnimationFrame(function () {
                c.reload(fdata);
            });
            start = new_start;
        }
    }
});
addListenerMulti(html_canvas, 'mouseup touchend', function (e) {
    down = false;
    html_canvas.style.cursor = "grab";
});
addListenerMulti(html_canvas, 'mousewheel DOMMouseScroll', function (e) {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    console.log(delta);
    if (c.x_unit + delta * 10 > 10) {
        c.x_unit += delta * 10;
    }
    if (c.y_unit + delta * 10 > 10) {
        c.y_unit += delta * 10;
    }
    requestAnimationFrame(function () {
        c.reload(fdata);
    });
});
//@ts-ignore
document.querySelector('#menu').onclick = function () {
    var panel = document.querySelector('.panel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
    }
    else {
        panel.classList.add('hidden');
    }
};
