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

    let letters_x = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

    if (/^droite\(([A-Z1-9]+),([A-Z1-9]+)\)$/i.test(val)) {
        let r = /\((.+),(.+)\)/g.exec(val);
        let letter_pt_1 = r[1][0];
        let letter_pt_2 = r[2][0];
        //@ts-ignore
        let pt_1_i = parseInt(r[1].replace(letter_pt_1, '') || 0);
        //@ts-ignore
        let pt_2_i = parseInt(r[2].replace(letter_pt_2, '') || 0);
        console.log(letter_pt_1, pt_1_i);
        let i1 = pt_1_i * 25 + letters_x.indexOf(letter_pt_1);
        let i2 = pt_2_i * 25 + letters_x.indexOf(letter_pt_2);

        let pt1 = smath.object_list.objects[i1];
        let pt2 = smath.object_list.objects[i2];

        let pt1_x = parseFloat(pt1.x);
        let pt2_x = parseFloat(pt2.x);

        let pt1_y = parseFloat(pt1.y(pt1_x));
        let pt2_y = parseFloat(pt2.y(pt2_x));

        let m = (pt1_y - pt2_y) / (pt1_x - pt2_x);

        let y = pt1_y;
        let x = pt1_x;

        let p = y - m * x;

        val = `((${pt1_y} - ${pt2_y}) / (${pt1_x} - ${pt2_x}))*x+${p}`;
        console.log('New from points : ' + val);
    }

    //We check if it's an object or a function
    if (/^\((.+),(.+)\)$/i.test(val) || /^point\((.+),(.+)\)$/i.test(val)) {
        let r = /\((.+),(.+)\)/g.exec(val);
        smath.object_list = smath.object_list.push({
            type: 'point',
            x: r[1],
            y: parse.Functionize(r[2], true),
            yString: r[2]
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
    menu.update(fdata, smath.object_list.objects);
});
