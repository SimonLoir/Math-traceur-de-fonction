import "./scss/drawer.scss";
import canvas from "./canvas";
import parser from "./parser";
import MathObject from "./math";
import modal from "./modal";

let html_canvas = document.querySelector('canvas');

let c: canvas = new canvas(html_canvas);

let math = new MathObject;


let fdata:any = {};

//@ts-ignore
document.querySelector('#function_add_input').focus();

let parse = new parser();

let row = 0;
let letter = 0;
let letters = "fghpqrst";

//@ts-ignore
document.querySelector("#function_add_button").onclick = () => {
    //@ts-ignore
    let value:string = document.querySelector('#function_add_input').value.trim();

    if(value == ""){
        return;
    }

    let initial = value;

    if(value.indexOf('dérivée ') == 0){
        value = parse.stringify(math.derivate(parse.exec(value.replace('dérivée ', ""))));
    }else if(value.indexOf("dérivée_seconde ") == 0){
        value = parse.stringify(math.derivate(math.derivate(parse.exec(value.replace('dérivée_seconde ', "")))));
    }

    console.log(value, parse.exec(value))

    let addText = (e:any, color:any, row:any, initial:any, value:any) => {
        e.innerHTML = `
            <i style="background:${color}; width:5px;height:5px;border-radius:5px;display:inline-block;"></i>
            ${letters[letter]}<sub>${(row != 0) ? row : ""}</sub>(x) =  ${initial} 
            ${(initial != value) ? "= " + value:""}
        `;
    }

    let v = parse.exec(value);

    let color = c.drawFromArray(v, undefined);
    let item = document
        .querySelector('#functions')
        .appendChild(document.createElement('div'));
    item.classList.add('item');
    
    addText(item.appendChild(document.createElement('span')), color, row, initial, value);
        
    let edit:HTMLElement = item
        .appendChild(document.createElement('button'))
    
    edit.innerHTML = "&#128393;";

    let fname = letters[letter] + "" + row;

    edit.addEventListener('click', () => {
        let p = new modal("prompt", {
            title: "Modifier la fonction",
            message: "Modifier l'équation de la fonction : ",
            default: fdata[fname].initial
        });
        p.confirm = (value:string) => {
            let initial = value;

            if(value.indexOf('dérivée ') == 0){
                value = parse.stringify(math.derivate(parse.exec(value.replace('dérivée ', ""))));
            }else if(value.indexOf("dérivée_seconde ") == 0){
                value = parse.stringify(math.derivate(math.derivate(parse.exec(value.replace('dérivée_seconde ', "")))));
            }

            fdata[fname].initial = initial;
            fdata[fname].array = parse.exec(value);

            addText(item.querySelector('span'), color, row, initial, value);

            c.reload(fdata);
        }
    });

    fdata[fname] = {
        visible:true,
        color:color,
        array: v,
        exp : value, 
        initial:initial
    }

    if(letter+1 < letters.length){
        letter++;
    }else{
        row ++;
        letter = 0;
    }
}



window.onresize = () => {

    requestAnimationFrame(() => {
        c.reload(fdata);
    })
    
}

c.reload = function (d:any)  {

    let data = Object.keys(d);

    this.init();

    data.forEach((key) => {
        if(d[key].visible == true){
            this.drawFromArray(d[key].array, d[key].color);
        }
    });

}

let down = false;
let start:any;

function addListenerMulti(el:any, s:any, fn:any) {
    s.split(' ').forEach((e:any) => el.addEventListener(e, fn, false));
}

addListenerMulti(html_canvas, 'mousedown touchstart', (e:any) => {
    down = true;
    if(e.touches != undefined){
        let te:TouchEvent = e;
        
        start = {x: te.touches.item(0).clientX, y: te.touches.item(0).clientY}
    }else{
        start = {x: e.pageX, y: e.pageY}
        html_canvas.style.cursor = "grabbing";
    }
    console.log(start);
});

addListenerMulti(html_canvas, 'mousemove touchmove', (e:any) => {
    if(down == true){
        let old = start;
        let new_start;
        if(e.touches != undefined){
            let te:TouchEvent = e;
            new_start = {x: te.touches.item(0).clientX, y: te.touches.item(0).clientY}
        }else{
            new_start = {x: e.pageX, y: e.pageY}
        }
        let diff_x = old.x - new_start.x;
        let diff_y = old.y - new_start.y;

        if(Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2)) > 12){
            c.center_x += diff_x / c.x_unit;
            c.center_y -= diff_y / c.y_unit;
            requestAnimationFrame(() => {
                c.reload(fdata);
            })
            start = new_start;
        }

    }
});

addListenerMulti(html_canvas, 'mouseup touchend', (e:MouseEvent) => {
    down = false;
    html_canvas.style.cursor = "grab";    
});

addListenerMulti(html_canvas, 'mousewheel DOMMouseScroll', (e:any) => {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    console.log(delta);
    if(c.x_unit + delta * 10 > 10){
        c.x_unit += delta * 10 
    }
    if(c.y_unit + delta * 10 > 10){
        c.y_unit += delta * 10 
    }
    requestAnimationFrame(() => {
        c.reload(fdata);
    })
});

//@ts-ignore
document.querySelector('#menu').onclick = () => {
    let panel = document.querySelector('.panel');
    if(panel.classList.contains('hidden')){
        panel.classList.remove('hidden')
    } else { 
        panel.classList.add('hidden')
    }   
}