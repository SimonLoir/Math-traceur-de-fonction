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

    // Sum Xi*Yi
    for (let i = 0; i < xs.length; i++) {
        xitimesyi += __x[i] * __y[i];   
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
    let exp = a + "x+" + b;

    $('#result').html(
        "Résultats : <br />" + 
        "Equation de la droite de régression : " + exp
    )

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

$('#add-line').click(function() {
    var before = $('#body').node.insertBefore(document.createElement('tr'), this);
    $(before).addClass('line');
    var xi = $(before).child('td').html('')
    xi = xi.node;
    xi.contentEditable = true;
    xi.focus();

    var yi = $(before).child('td').html('')
    yi = yi.node;
    yi.contentEditable = true;

    var a = $(before).child('td').html('<button>supprimer</button>')
    a.addClass('a');
    a.click(function () {

        $(before).remove();

    });
});


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