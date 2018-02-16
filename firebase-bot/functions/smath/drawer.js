"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scss/drawer.scss");
var canvas_1 = require("./canvas");
var parser_v2_1 = require("./parser.v2");
var modal_1 = require("./modal");
// We get the default canvas
var html_canvas_element = document.querySelector('canvas');
//We create a new smath canvas
var smath = new canvas_1.default(html_canvas_element);
// We create a new expression parser
var parse = new parser_v2_1.default();
//We create an object that will contain all the functions
var fdata = {};
smath.funcs = fdata;
// Function name attribution
var row = 0;
var letter = 0;
var letters = 'fghpqrst';
// We add an event listener on the (+) button so that it can add teh function
document.querySelector('#function_add_button').addEventListener('click', function () {
    var update = function (fdata) {
        var keys = Object.keys(fdata);
        var funcs = [];
        keys.forEach(function (key) {
            funcs.push(fdata[key].initial);
        });
        window.location.hash = encodeURIComponent(JSON.stringify(funcs));
    };
    var value = document
        .querySelector('#function_add_input')
        .value.trim();
    //If it's empty, we don't do anything
    if (value == '') {
        return;
    }
    //We keep the initial value in a variable
    var initial = value;
    //We get the computed value of the expression
    value = parse.getComputedValue(value);
    //Adds a text to an element
    var addText = function (e, color, row, initial, value) {
        e.innerHTML = "\n            <i style=\"background:" + color + "; width:5px;height:5px;border-radius:5px;display:inline-block;\"></i>\n            " + letters[letter] + "<sub>" + (row != 0 ? row : '') + "</sub>(x) =  " + initial + " \n            " + (initial != value ? '= ' + value : '') + "\n        ";
    };
    //We get an array from the parsed expression
    var func = parse.Functionize(value, true);
    console.log(func.toString());
    //We draw the function for the first time and we get its color
    var color = smath.drawFromFunc(func);
    //We create a new item in the functions list
    var item = document
        .querySelector('#functions')
        .appendChild(document.createElement('div'));
    item.classList.add('item');
    addText(item.appendChild(document.createElement('span')), color, row, initial, value);
    var remove = item.appendChild(document.createElement('button'));
    remove.innerHTML = '×';
    //We add the edit button
    var edit = item.appendChild(document.createElement('button'));
    edit.innerHTML = '&#128393;';
    var fname = letters[letter] + '' + row;
    //We add the ability to the user to modify the function
    edit.addEventListener('click', function () {
        var p = new modal_1.default('prompt', {
            title: 'Modifier la fonction',
            message: "Modifier l'équation de la fonction : ",
            default: fdata[fname].initial
        });
        p.confirm = function (value) {
            var initial = value;
            value = parse.getComputedValue(value);
            fdata[fname].initial = initial;
            fdata[fname].exp = value;
            fdata[fname].array = parse.Functionize(value, true);
            addText(item.querySelector('span'), color, row, initial, value);
            smath.reload(fdata);
            update(fdata);
        };
    });
    remove.addEventListener('click', function () {
        var p = new modal_1.default('ask', {
            title: 'Supprimer',
            message: 'Supprimer la fonction ?',
            default: fdata[fname].initial
        });
        p.confirm = function (value) {
            delete fdata[fname];
            smath.reload(fdata);
            update(fdata);
            item.parentElement.removeChild(item);
        };
    });
    fdata[fname] = {
        visible: true,
        color: color,
        array: func,
        exp: value,
        initial: initial
    };
    update(fdata);
    if (letter + 1 < letters.length) {
        letter++;
    }
    else {
        row++;
        letter = 0;
    }
});
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
var hash = window.location.hash.replace('#', '');
try {
    var a = JSON.parse(decodeURIComponent(hash));
    a.forEach(function (element) {
        //@ts-ignore
        document.querySelector('#function_add_input').value = element;
        //@ts-ignore
        document.querySelector('#function_add_button').click();
    });
}
catch (error) {
    //console.log(error);
}
