"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scss/drawer.scss");
var canvas_1 = require("./canvas");
var parser_v2_1 = require("./parser.v2");
var extjs_1 = require("./extjs");
var drawer_obj_1 = require("./drawer_obj");
var menu = new drawer_obj_1.default();
// We get the default canvas
var html_canvas_element = document.querySelector('canvas');
//We create a new smath canvas
var smath = new canvas_1.default(html_canvas_element);
smath.object_list = [];
// We create a new expression parser
var parse = new parser_v2_1.default();
//We create an object that will contain all the functions
var fdata = {};
smath.funcs = fdata;
smath.reload();
// Function name attribution
var row = 0;
var letter = 0;
var letters = 'fghpqrst';
// Points name attribution
var pprimes = 0;
// We create the menu system
document.getElementById('menu').addEventListener('click', function () {
    var panel = document.querySelector('.panel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
    }
    else {
        panel.classList.add('hidden');
    }
});
//@ts-ignore
var buttons = document.querySelectorAll('.tab_manager span');
//@ts-ignore
var tabs = document.querySelectorAll('.tab');
var _loop_1 = function (i) {
    var e = buttons[i];
    e.addEventListener('click', function () {
        var id = e.dataset['link'];
        for (var i2 = 0; i2 < tabs.length; i2++) {
            var tab = tabs[i2];
            tab.style.display = 'none';
        }
        for (var i2 = 0; i2 < buttons.length; i2++) {
            var button = buttons[i2];
            button.classList.remove('active');
        }
        e.classList.add('active');
        document.getElementById(id).style.display = 'block';
    });
};
for (var i = 0; i < buttons.length; i++) {
    _loop_1(i);
}
buttons[0].click();
extjs_1.$('#function_add_button').click(function () {
    //Gets the value
    var val = extjs_1.$('#function_add_input')
        .value()
        .trim();
    //Checks if teh value is not empty
    if (val == '') {
        return false;
    }
    var letters_x = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    if (/^droite\(([A-Z1-9]+),([A-Z1-9]+)\)$/i.test(val)) {
        var r = /\((.+),(.+)\)/g.exec(val);
        var letter_pt_1 = r[1][0];
        var letter_pt_2 = r[2][0];
        //@ts-ignore
        var pt_1_i = parseInt(r[1].replace(letter_pt_1, '') || 0);
        //@ts-ignore
        var pt_2_i = parseInt(r[2].replace(letter_pt_2, '') || 0);
        console.log(letter_pt_1, pt_1_i);
        var i1 = pt_1_i * 25 + letters_x.indexOf(letter_pt_1);
        var i2 = pt_2_i * 25 + letters_x.indexOf(letter_pt_2);
        var pt1 = smath.object_list.objects[i1];
        var pt2 = smath.object_list.objects[i2];
        var pt1_x = parseFloat(pt1.x);
        var pt2_x = parseFloat(pt2.x);
        var pt1_y = parseFloat(pt1.y(pt1_x));
        var pt2_y = parseFloat(pt2.y(pt2_x));
        var m = (pt1_y - pt2_y) / (pt1_x - pt2_x);
        var y = pt1_y;
        var x = pt1_x;
        var p = y - m * x;
        val = "((" + pt1_y + " - " + pt2_y + ") / (" + pt1_x + " - " + pt2_x + "))*x+" + p;
        console.log('New from points : ' + val);
    }
    //We check if it's an object or a function
    if (/^\((.+),(.+)\)$/i.test(val) || /^point\((.+),(.+)\)$/i.test(val)) {
        var r = /\((.+),(.+)\)/g.exec(val);
        smath.object_list = smath.object_list.push({
            type: 'point',
            x: r[1],
            y: parse.Functionize(r[2], true),
            yString: r[2]
        });
        console.log(smath.object_list);
        smath.reload();
    }
    else {
        //Saves the inital value
        var initial = val;
        //Parses the value for the first time
        val = parse.getComputedValue(val);
        //Creates a function name
        var fname = letters[letter] + '' + (row == 0 ? '' : "" + row);
        //We create a js function from teh math function
        var func = parse.Functionize(val, true);
        //We draw the function for the first time
        var color = smath.drawFromFunc(func);
        //Adds the function to the function list so that it can be redrawn later
        fdata[fname] = {
            visible: true,
            color: color,
            array: func,
            exp: val,
            initial: initial
        };
        //We update the function name
        if (letter + 1 < letters.length) {
            letter++;
        }
        else {
            row++;
            letter = 0;
        }
        console.log(fdata);
    }
    menu.update(fdata, smath.object_list.objects);
});
