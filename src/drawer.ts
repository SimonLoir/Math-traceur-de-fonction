import "./scss/drawer.scss";
import canvas from "./canvas";
import parser from "./parser";
import MathObject from "./math";
import modal from "./modal";

// We get the default canvas
let html_canvas_element = document.querySelector("canvas");

//We create a new smath canvas
let smath = new canvas(html_canvas_element);

// We create a new math object
let math = new MathObject();

// We create a new expression parser
let parse = new parser();

//We create an object that will contain all the functions
let fdata: any = {};
smath.funcs = fdata;

// Function name attribution
let row = 0;
let letter = 0;
let letters = "fghpqrst";

// We add an event listener on the (+) button so that it can add teh function
document.querySelector("#function_add_button").addEventListener('click', () => {
    //@ts-ignore
    let value: string = document.querySelector('#function_add_input').value.trim();

    //If it's empty, we don't do anything
    if (value == "") {
        return;
    }

    //We keep the initial value in a variable
    let initial = value;

    //We get the computed value of the expression
    value = parse.getComputedValue(value);

    //Adds a text to an element
    const addText = (e: any, color: any, row: any, initial: any, value: any) => {
        e.innerHTML = `
            <i style="background:${color}; width:5px;height:5px;border-radius:5px;display:inline-block;"></i>
            ${letters[letter]}<sub>${(row != 0) ? row : ""}</sub>(x) =  ${initial} 
            ${(initial != value) ? "= " + value : ""}
        `;
    }

    //We get an array from the parsed expression
    let parsedArray = parse.exec(value);

    //We draw the function for the first time and we get its color
    let color = smath.drawFromArray(parsedArray);

    //We create a new item in the functions list
    let item = document
        .querySelector('#functions')
        .appendChild(document.createElement('div'));
    item.classList.add('item');
    addText(item.appendChild(document.createElement('span')), color, row, initial, value);

    //We add the edit button
    let edit: HTMLElement = item
        .appendChild(document.createElement('button'))
    edit.innerHTML = "&#128393;";

    let fname = letters[letter] + "" + row;
    
    //We add the ability to the user to modify the function
    edit.addEventListener('click', () => {
        let p = new modal("prompt", {
            title: "Modifier la fonction",
            message: "Modifier l'équation de la fonction : ",
            default: fdata[fname].initial
        });
        p.confirm = (value: string) => {
            let initial = value;

            value = parse.getComputedValue(value);

            fdata[fname].initial = initial;
            fdata[fname].array = parse.exec(value);

            addText(item.querySelector('span'), color, row, initial, value);

            smath.reload(fdata);
        }
    });

    fdata[fname] = {
        visible:true,
        color:color,
        array: parsedArray,
        exp : value, 
        initial:initial
    }

    if(letter+1 < letters.length){
        letter++;
    }else{
        row ++;
        letter = 0;
    }

});