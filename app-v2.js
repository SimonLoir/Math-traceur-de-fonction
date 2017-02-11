$(document).ready(function () {
    /*
    * Grid Layer
    */
    var canvas = document.querySelector('#layer-grid');
    canvas.height = canvas.scrollHeight;
    canvas.width = canvas.scrollWidth;

    $('.draw-area').node.scrollLeft = $('.draw-area').node.scrollWidth / 2 - $('.draw-area').node.offsetWidth / 2;
    $('.draw-area').node.scrollTop = $('.draw-area').node.scrollHeight / 2 - $('.draw-area').node.offsetHeight / 2; 

    $(".color-picker").node.addEventListener("change", function () {
        $('.color-view').css('background', $(this).node.value);
    });

    $('#new_layer').click(function () {
        var math_func = window.prompt('Fonction à tracer', "x²");
        if (math_func != null) {
            
        }
    });

    var ctx = canvas.getContext('2d');
    
    var interval = $('#Interval').node.value;
    
    var x_zero = canvas.width / 2;
    var y_zero = canvas.height / 2;

    var grid = new SMath();
    grid.ctx = ctx;
    grid.x_zero = x_zero;
    grid.y_zero = y_zero;
    grid.interval = interval;

    grid.makeGrid();
    grid.newLine(0, -1000 ,0,1000, "crimson");
    grid.newLine(-1000 ,0,1000, 0, "crimson");
}); 