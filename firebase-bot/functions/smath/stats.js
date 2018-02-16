"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scss/stats.scss");
var canvas_1 = require("./canvas");
var parser_v2_1 = require("./parser.v2");
var extjs_1 = require("./extjs");
var canvas = new canvas_1.default(document.querySelector('canvas'));
var parser = new parser_v2_1.default();
canvas.init();
canvas.funcs = {};
extjs_1.$('#process').click(calc);
function calc() {
    //@ts-ignore
    var all = document.querySelectorAll('.line');
    var _x = 0, _y = 0, n = all.length, xs = [], ys = [], __x = [], __y = [], xitimesyi = 0, sqarex = 0, sqarey = 0;
    //First pass
    all.forEach(function (e) {
        var data = e.querySelectorAll('td');
        var x = parseFloat(data[0].innerText);
        var y = parseFloat(data[1].innerText);
        xs.push(x);
        ys.push(y);
        _x += x;
        _y += y;
    });
    //Middle
    _x = _x / n;
    _y = _y / n;
    //Xi - x
    xs.forEach(function (e) {
        __x.push(e - _x);
    });
    //Yi - y
    ys.forEach(function (e) {
        __y.push(e - _y);
    });
    var xitimesyia = [];
    // Sum Xi*Yi
    for (var i = 0; i < xs.length; i++) {
        var r = __x[i] * __y[i];
        xitimesyi += r;
        xitimesyia.push(r);
    }
    // Xi^2
    __x.forEach(function (e) {
        sqarex += Math.pow(e, 2);
    });
    // Xi^2
    __y.forEach(function (e) {
        sqarey += Math.pow(e, 2);
    });
    var a = xitimesyi / sqarex;
    var b = _y - a * _x;
    if (b > 0) {
        var exp = a + 'x+' + b;
    }
    else {
        var exp = a + 'x' + b;
    }
    extjs_1.$('#result').html('Résultats : <br />' +
        'Equation de la droite de régression : ' +
        exp +
        '<br>' +
        'r = ' +
        xitimesyi / (Math.sqrt(sqarex) * Math.sqrt(sqarey)));
    var table = extjs_1.$('#result').child('table');
    var header = table.child('tr');
    header.child('th').html('x<sub>i</sub>');
    header.child('th').html('y<sub>i</sub>');
    header.child('th').html('X<sub>i</sub>');
    header.child('th').html('Y<sub>i</sub>');
    header.child('th').html('X<sub>i</sub>*Y<sub>i</sub>');
    header.child('th').html('X<sub>i</sub><sup>2<sup>');
    header.child('th').html('Y<sub>i</sub><sup>2<sup>');
    for (var i = 0; i < xs.length; i++) {
        var tr = table.child('tr');
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
function draw(exp) {
    var func = parser.Functionize(exp);
    var color = canvas.drawFromFunc(func);
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
function addLine(str) {
    var before = extjs_1.$('#body')
        .get(0)
        .insertBefore(document.createElement('tr'), this);
    extjs_1.$(before).addClass('line');
    var xi = extjs_1.$(before).child('td');
    if (typeof str == 'number') {
        xi.html(str.toString());
    }
    else {
        xi.html('');
    }
    var xii = xi.get(0);
    xii.contentEditable = true;
    xii.focus();
    var yi = extjs_1.$(before)
        .child('td')
        .html('');
    var yii = yi.get(0);
    yii.contentEditable = true;
    var a = extjs_1.$(before).child('td');
    a.addClass('a');
    a
        .child('button')
        .html('supprimer')
        .click(function () {
        extjs_1.$(before).remove();
    });
    a
        .child('button')
        .html('ajouter avant')
        .click(function () {
        addLine.bind(before)();
    });
}
function toggleActions() {
    var e = document.querySelector('table');
    var addLine = document.querySelector('#add-line td');
    if (e.classList.contains('show')) {
        addLine.colSpan = 2;
        e.classList.remove('show');
    }
    else {
        addLine.colSpan = 3;
        e.classList.add('show');
    }
}
extjs_1.$('#add-line').click(addLine);
extjs_1.$('#toggleActions').click(toggleActions);
