"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scss/drawer.scss");
var canvas_1 = require("./canvas");
var parser_1 = require("./parser");
var math_1 = require("./math");
var modal_1 = require("./modal");
// We get the default canvas
var html_canvas_element = document.querySelector("canvas");
//We create a new smath canvas
var smath = new canvas_1.default(html_canvas_element);
// We create a new math object
var math = new math_1.default();
// We create a new expression parser
var parse = new parser_1.default();
//We create an object that will contain all the functions
var fdata = {};
smath.funcs = fdata;
// Function name attribution
var row = 0;
var letter = 0;
var letters = "fghpqrst";
// We add an event listener on the (+) button so that it can add teh function
document.querySelector("#function_add_button").addEventListener('click', function () {
    //@ts-ignore
    var value = document.querySelector('#function_add_input').value.trim();
    //If it's empty, we don't do anything
    if (value == "") {
        return;
    }
    //We keep the initial value in a variable
    var initial = value;
    //We get the computed value of the expression
    value = parse.getComputedValue(value);
    //Adds a text to an element
    var addText = function (e, color, row, initial, value) {
        e.innerHTML = "\n            <i style=\"background:" + color + "; width:5px;height:5px;border-radius:5px;display:inline-block;\"></i>\n            " + letters[letter] + "<sub>" + ((row != 0) ? row : "") + "</sub>(x) =  " + initial + " \n            " + ((initial != value) ? "= " + value : "") + "\n        ";
    };
    //We get an array from the parsed expression
    var parsedArray = parse.exec(value);
    //We draw the function for the first time and we get its color
    var color = smath.drawFromArray(parsedArray);
    //We create a new item in the functions list
    var item = document
        .querySelector('#functions')
        .appendChild(document.createElement('div'));
    item.classList.add('item');
    addText(item.appendChild(document.createElement('span')), color, row, initial, value);
    //We add the edit button
    var edit = item
        .appendChild(document.createElement('button'));
    edit.innerHTML = "&#128393;";
    var fname = letters[letter] + "" + row;
    //We add the ability to the user to modify the function
    edit.addEventListener('click', function () {
        var p = new modal_1.default("prompt", {
            title: "Modifier la fonction",
            message: "Modifier l'équation de la fonction : ",
            default: fdata[fname].initial
        });
        p.confirm = function (value) {
            var initial = value;
            value = parse.getComputedValue(value);
            fdata[fname].initial = initial;
            fdata[fname].array = parse.exec(value);
            addText(item.querySelector('span'), color, row, initial, value);
            smath.reload(fdata);
        };
    });
    fdata[fname] = {
        visible: true,
        color: color,
        array: parsedArray,
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
});
