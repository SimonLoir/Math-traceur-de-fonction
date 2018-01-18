function calc() {
    let all = document.querySelectorAll('.line');
    let _x = 0, _y = 0, n = all.length, xs = [], ys = [], __x = [], __y = [], xitimesyi = 0, sqarex = 0, sqarey = 0;

    //First pass
    all.forEach((e) => {

        let data = e.querySelectorAll('td');
        let x = parseFloat(data[0].innerText);
        let y = parseFloat(data[1].innerText);
        
        xs.push(x)
        ys.push(y)
        
        _x += x;
        _y += y;
    
    });

    //Middle
    _x = _x / n;
    _y = _y / n;

    //Xi - x
    xs.forEach((e) => {
        __x.push(e - _x)
    });

    //Yi - y
    ys.forEach((e) => {
        __y.push(e - _y)
    });

    let xitimesyia = [];
    // Sum Xi*Yi
    for (let i = 0; i < xs.length; i++) {
        let r = __x[i] * __y[i];
        xitimesyi +=  r;
        xitimesyia.push(r)
    }

    // Xi^2
    __x.forEach((e) => {
        sqarex += Math.pow(e, 2);
    })

    // Xi^2
    __y.forEach((e) => {
        sqarey += Math.pow(e, 2);
    })
    

    let a = xitimesyi / sqarex;
    let b = _y - a * _x;
    if(b > 0){
        var exp = a + "x+" + b;
    }else{
        var exp = a + "x" + b;        
    }

    $('#result').html(
        "Résultats : <br />" + 
        "Equation de la droite de régression : " + exp + "<br>" +
        "r = " + ( xitimesyi / (Math.sqrt(sqarex) * Math.sqrt(sqarey) ) )
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

    console.log(_x)
    
    for (let i = 0; i < xs.length; i++) {
        console.log(i)
        let tr = table.child('tr');
        tr.child('td').html(xs[i])
        tr.child('td').html(ys[i])
        tr.child('td').html(__x[i])
        tr.child('td').html(__y[i])
        tr.child('td').html(xitimesyia[i])
        tr.child('td').html(Math.pow(__x[i], 2))
        tr.child('td').html(Math.pow(__y[i], 2))
    }

    draw(exp);
}

function draw(real_exp) {
    $('.graph').html('');

    var big_canvas = $('.graph').node;
    
    var canvas = $('.graph').node.appendChild(document.createElement('canvas'));

    canvas.style.width = "300%";
    canvas.style.height = "300%";

    canvas.height = canvas.scrollHeight;
    canvas.width = canvas.scrollWidth;

    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";

    var ctx = canvas.getContext('2d');

    var interval = 25;

    var x_zero = canvas.width / 2;
    var y_zero = canvas.height / 2;

    var grid = new SMath();
    grid.ctx = ctx;
    grid.color = "red";
    grid.x_zero = x_zero;
    grid.y_zero = y_zero;
    grid.interval = interval;

    grid.makeGrid();
    grid.newLine(0, -1000, 0, 1000, "black", undefined, 1);
    grid.newLine(-1000, 0, 1000, 0, "black", undefined, 1);

    grid.draw(real_exp);

    big_canvas.scrollLeft = big_canvas.scrollWidth / 2 - big_canvas.offsetWidth / 2;
    big_canvas.scrollTop = big_canvas.scrollHeight / 2 - big_canvas.offsetHeight / 2;

}

function addLine(str) {

    var before = $('#body').node.insertBefore(document.createElement('tr'), this);
    $(before).addClass('line');
    var xi = $(before).child('td')
    if(typeof str == "number"){
        xi.html(str);
    }else{
        xi.html('');
    }
    xi = xi.node;
    xi.contentEditable = true;
    xi.focus();

    var yi = $(before).child('td').html('')
    yi = yi.node;
    yi.contentEditable = true;

    let a = $(before).child('td')
    a.addClass('a');
    a.child("button").html("supprimer").click(function () {
    
        $(before).remove();
    
    });
    a.child("button").html("ajouter avant").click(function() {
        addLine.bind(before)();
    });
}

$('#add-line').click(addLine);


function toggleActions (){
    let e = document.querySelector("table");
    let addLine = document.querySelector('#add-line td');
    if(e.classList.contains('show')){
        addLine.colspan = 2
        e.classList.remove('show');
    }else{
        addLine.colspan = 3        
        e.classList.add('show');
    }
}

function createInterval(){
    try {
        let content = $('#int').node.value;
        let spl = content.split(':');
        let from = parseFloat(spl[0].split('->')[0]);
        let to = parseFloat(spl[0].split('->')[1]);
        let interval = parseFloat(spl[1]);
        
        if(isNaN(from) || isNaN(to) || isNaN(interval)){
            
            console.log(from, to, interval);
            
            throw "ee"; 
        }

        for (let i = from; i <= to; i+=interval) {
            addLine.bind($('#add-line').node)(i);
        }


    } catch (error) {
        console.log(error);
        alert('Format incorrect : de->à:intervalle \nex:0->10:1');
    }
    

}