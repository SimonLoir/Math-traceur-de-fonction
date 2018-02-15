import './scss/stats.scss';
import Canvas from './canvas';
import Parser from './parser.v2';
import { $, AR } from './extjs';

let canvas = new Canvas(document.querySelector('canvas'));
let parser = new Parser();

canvas.init();
canvas.funcs = {};

$('#process').click(calc);

function calc() {
    //@ts-ignore
    let all: any[] = document.querySelectorAll('.line');
    let _x = 0,
        _y = 0,
        n = all.length,
        xs: any[] = [],
        ys: any[] = [],
        __x: any[] = [],
        __y: any[] = [],
        xitimesyi = 0,
        sqarex = 0,
        sqarey = 0;

    //First pass
    all.forEach(e => {
        let data = e.querySelectorAll('td');
        let x = parseFloat(data[0].innerText);
        let y = parseFloat(data[1].innerText);

        xs.push(x);
        ys.push(y);

        _x += x;
        _y += y;
    });

    //Middle
    _x = _x / n;
    _y = _y / n;

    //Xi - x
    xs.forEach(e => {
        __x.push(e - _x);
    });

    //Yi - y
    ys.forEach(e => {
        __y.push(e - _y);
    });

    let xitimesyia = [];
    // Sum Xi*Yi
    for (let i = 0; i < xs.length; i++) {
        let r = __x[i] * __y[i];
        xitimesyi += r;
        xitimesyia.push(r);
    }

    // Xi^2
    __x.forEach(e => {
        sqarex += Math.pow(e, 2);
    });

    // Xi^2
    __y.forEach(e => {
        sqarey += Math.pow(e, 2);
    });

    let a = xitimesyi / sqarex;
    let b = _y - a * _x;
    if (b > 0) {
        var exp = a + 'x+' + b;
    } else {
        var exp = a + 'x' + b;
    }

    $('#result').html(
        'Résultats : <br />' +
            'Equation de la droite de régression : ' +
            exp +
            '<br>' +
            'r = ' +
            xitimesyi / (Math.sqrt(sqarex) * Math.sqrt(sqarey))
    );

    let table = $('#result').child('table');

    let header = table.child('tr');
    header.child('th').html('x<sub>i</sub>');
    header.child('th').html('y<sub>i</sub>');
    header.child('th').html('X<sub>i</sub>');
    header.child('th').html('Y<sub>i</sub>');
    header.child('th').html('X<sub>i</sub>*Y<sub>i</sub>');
    header.child('th').html('X<sub>i</sub><sup>2<sup>');
    header.child('th').html('Y<sub>i</sub><sup>2<sup>');

    for (let i = 0; i < xs.length; i++) {
        let tr = table.child('tr');
        tr.child('td').html(xs[i]);
        tr.child('td').html(ys[i]);
        tr.child('td').html(__x[i]);
        tr.child('td').html(__y[i]);
        tr.child('td').html(xitimesyia[i].toString());
        tr.child('td').html(Math.pow(__x[i], 2).toString());
        tr.child('td').html(Math.pow(__y[i], 2).toString());
    }

    draw(exp);
}

function draw(exp: string) {
    let func = parser.Functionize(exp);
    let color = canvas.drawFromFunc(func);

    canvas.funcs = {
        func: {
            visible: true,
            color: color,
            array: func,
            exp: exp,
            initial: exp
        }
    };
}

function addLine(str: any) {
    var before = $('#body')
        .get(0)
        .insertBefore(document.createElement('tr'), this);
    $(before).addClass('line');
    var xi = $(before).child('td');
    if (typeof str == 'number') {
        xi.html(str.toString());
    } else {
        xi.html('');
    }
    let xii = xi.get(0);
    xii.contentEditable = true;
    xii.focus();

    var yi = $(before)
        .child('td')
        .html('');
    let yii = yi.get(0);
    yii.contentEditable = true;

    let a = $(before).child('td');
    a.addClass('a');
    a
        .child('button')
        .html('supprimer')
        .click(function() {
            $(before).remove();
        });
    a
        .child('button')
        .html('ajouter avant')
        .click(function() {
            addLine.bind(before)();
        });
}

function toggleActions() {
    let e: HTMLTableElement = document.querySelector('table');
    let addLine: HTMLTableDataCellElement = document.querySelector(
        '#add-line td'
    );
    if (e.classList.contains('show')) {
        addLine.colSpan = 2;
        e.classList.remove('show');
    } else {
        addLine.colSpan = 3;
        e.classList.add('show');
    }
}
$('#add-line').click(addLine);
$('#toggleActions').click(toggleActions);
