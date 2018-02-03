import "./scss/drawer.scss";
import canvas from "./canvas";
import parser from "./parser";

let c: canvas = new canvas(document.querySelector('canvas'));

window.onresize = () => {
    c.init();
}

//@ts-ignore
document.querySelector('#function_add_input').focus();

let parse = new parser();

let row = 0;
let letter = 0;
let letters = "fghpqrst";

//@ts-ignore
document.querySelector("#function_add_button").onclick = () => {
    //@ts-ignore
    let value = document.querySelector('#function_add_input').value
    let color = c.drawFromArray(parse.exec(value));
    let item = document
        .querySelector('#functions')
        .appendChild(document.createElement('div'));
    item.classList.add('item');
    item
        .appendChild(document.createElement('span'))
        .innerHTML = `
            <i style="background:${color}; width:5px;height:5px;border-radius:5px;display:inline-block;"></i>
            ${value}
            `;
    let edit = item
        .appendChild(document.createElement('button'))
        .innerHTML = "&#128393;";
}