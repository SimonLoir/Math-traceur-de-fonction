import './scss/drawer.scss';
import canvas from './canvas';
import parser from './parser.v2';
import modal from './modal';
import { $ } from './extjs';
import Menu from './drawer_obj';

let menu = new Menu();

// We get the default canvas
let html_canvas_element = document.querySelector('canvas');

//We create a new smath canvas
let smath = new canvas(html_canvas_element);
smath.object_list = [];

// We create a new expression parser
let parse = new parser();

//We create an object that will contain all the functions
let fdata: any = {};
smath.funcs = fdata;
smath.reload();

// Function name attribution
let row = 0;
let letter = 0;
let letters = 'fghpqrst';

// Points name attribution
let pprimes = 0;

// We create the menu system
document.getElementById('menu').addEventListener('click', () => {
    let panel = document.querySelector('.panel');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
    } else {
        panel.classList.add('hidden');
    }
});

//@ts-ignore
let buttons: Array = document.querySelectorAll('.tab_manager span');
//@ts-ignore
let tabs: Array = document.querySelectorAll('.tab');

for (let i = 0; i < buttons.length; i++) {
    const e = buttons[i];
    e.addEventListener('click', () => {
        let id = e.dataset['link'];
        for (let i2 = 0; i2 < tabs.length; i2++) {
            const tab = tabs[i2];
            tab.style.display = 'none';
        }
        for (let i2 = 0; i2 < buttons.length; i2++) {
            const button = buttons[i2];
            button.classList.remove('active');
        }
        e.classList.add('active');
        document.getElementById(id).style.display = 'block';
    });
}

buttons[0].click();

$('#function_add_button').click(() => {
    //Gets the value
    let val = $('#function_add_input')
        .value()
        .trim();
    //Checks if teh value is not empty
    if (val == '') {
        return false;
    }
    //We check if it's an object or a function
    if (/^\((.+),(.+)\)$/i.test(val) || /^point\((.+),(.+)\)$/i.test(val)) {
        let r = /\((.+),(.+)\)/g.exec(val);
        smath.object_list = smath.object_list.push({
            type: 'point',
            x: r[1],
            y: parse.Functionize(r[2], true)
        });
        console.log(smath.object_list);
        smath.reload();
    } else {
        //Saves the inital value
        let initial = val;
        //Parses the value for the first time
        val = parse.getComputedValue(val);
        //Creates a function name
        let fname = letters[letter] + '' + (row == 0 ? '' : `${row}`);
        //We create a js function from teh math function
        let func = parse.Functionize(val, true);
        //We draw the function for the first time
        let color = smath.drawFromFunc(func);
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
        } else {
            row++;
            letter = 0;
        }
        console.log(fdata);
    }
    menu.update(fdata);
});
