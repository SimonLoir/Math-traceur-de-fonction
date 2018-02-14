import './scss/drawer.scss';
import canvas from './canvas';
import parser from './parser.v2';
import modal from './modal';

// We get the default canvas
let html_canvas_element = document.querySelector('canvas');

//We create a new smath canvas
let smath = new canvas(html_canvas_element);

// We create a new expression parser
let parse = new parser();

//We create an object that will contain all the functions
let fdata: any = {};
smath.funcs = fdata;

// Function name attribution
let row = 0;
let letter = 0;
let letters = 'fghpqrst';

// We add an event listener on the (+) button so that it can add teh function
document.querySelector('#function_add_button').addEventListener('click', () => {
    const update = (fdata: any) => {
        let keys = Object.keys(fdata);

        let funcs: Array<String> = [];

        keys.forEach(key => {
            funcs.push(fdata[key].initial);
        });

        window.location.hash = encodeURIComponent(JSON.stringify(funcs));
    };

    let value: string = document
        .querySelector('#function_add_input')
        //@ts-ignore
        .value.trim();

    //If it's empty, we don't do anything
    if (value == '') {
        return;
    }

    //We keep the initial value in a variable
    let initial = value;

    //We get the computed value of the expression
    value = parse.getComputedValue(value);

    //Adds a text to an element
    const addText = (
        e: any,
        color: any,
        row: any,
        initial: any,
        value: any
    ) => {
        e.innerHTML = `
            <i style="background:${color}; width:5px;height:5px;border-radius:5px;display:inline-block;"></i>
            ${letters[letter]}<sub>${
            row != 0 ? row : ''
        }</sub>(x) =  ${initial} 
            ${initial != value ? '= ' + value : ''}
        `;
    };

    //We get an array from the parsed expression
    let func = parse.Functionize(value, true);
    console.log(func.toString());

    //We draw the function for the first time and we get its color
    let color = smath.drawFromFunc(func);

    //We create a new item in the functions list
    let item = document
        .querySelector('#functions')
        .appendChild(document.createElement('div'));
    item.classList.add('item');
    addText(
        item.appendChild(document.createElement('span')),
        color,
        row,
        initial,
        value
    );

    let remove: HTMLElement = item.appendChild(
        document.createElement('button')
    );
    remove.innerHTML = '×';

    //We add the edit button
    let edit: HTMLElement = item.appendChild(document.createElement('button'));
    edit.innerHTML = '&#128393;';

    let fname = letters[letter] + '' + row;

    //We add the ability to the user to modify the function
    edit.addEventListener('click', () => {
        let p = new modal('prompt', {
            title: 'Modifier la fonction',
            message: "Modifier l'équation de la fonction : ",
            default: fdata[fname].initial
        });
        p.confirm = (value: string) => {
            let initial = value;

            value = parse.getComputedValue(value);

            fdata[fname].initial = initial;
            fdata[fname].exp = value;
            fdata[fname].array = parse.Functionize(value, true);

            addText(item.querySelector('span'), color, row, initial, value);

            smath.reload(fdata);
            update(fdata);
        };
    });

    remove.addEventListener('click', () => {
        let p = new modal('ask', {
            title: 'Supprimer',
            message: 'Supprimer la fonction ?',
            default: fdata[fname].initial
        });
        p.confirm = (value: string) => {
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
    } else {
        row++;
        letter = 0;
    }
});

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

let hash = window.location.hash.replace('#', '');
try {
    let a: Array<string> = JSON.parse(decodeURIComponent(hash));

    a.forEach(element => {
        //@ts-ignore
        document.querySelector('#function_add_input').value = element;
        //@ts-ignore
        document.querySelector('#function_add_button').click();
    });
} catch (error) {
    console.log(error);
}
