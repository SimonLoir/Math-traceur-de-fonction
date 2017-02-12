var id = 0;
var function_list = [];
var zoom = 1;
var trace = function (math_func) {
         var layer = $('.layer-function-view').child('div');
            layer.addClass('layer');

            var color = layer.child('div').addClass('preview');
            var layer_name = layer.child('span').addClass('layer-name').html(math_func);
            var show_hide = layer.child("button").html("&#128064;");

            var c = $('.canvas').child('canvas').node;
            c.height = c.scrollHeight;
            c.width = c.scrollWidth;
            var context = c.getContext('2d');

            var interval = $('#Interval').node.value;
    
            var x_zero = c.width / 2;
            var y_zero = c.height / 2;

            var f = new SMath();
            f.ctx = context;
            f.x_zero = x_zero;
            f.y_zero = y_zero;
            f.interval = interval;
            f.color = $(".color-picker").node.value;
            function_list.push([math_func, f.color]);
            c.id = "x-layer" + id;
            id++;

            $(c).css('display', "block");

            show_hide.click(function() {
                if ($(c).css('display') == "block") {
                    $(c).css('display', "none");
                    $(this).html('&#10060;');
                }else{
                    $(c).css('display', "block");
                    $(this).html('&#128064;');
                    
                }
            });

            f.draw(math_func);
 }
$(document).ready(function () {
    /*
    * Grid Layer
    */

    window.onhashchange = function () {
        window.location.reload();
    }

    $('#apply_zoom').click(function () {
        window.location.hash = "zoom=" + $('#Interval').node.value + ";functions=" + encodeURIComponent(JSON.stringify(function_list));
    });

    $('#zoom-more').click(function () {
        zoom += parseFloat(0.2);
        $('#zoom-level').html(zoom);
        $('.canvas').css("transform", "scale(" +zoom+ ")");
    });
    $('#zoom-less').click(function () {
        zoom -= parseFloat(0.2);
        $('#zoom-level').html(zoom);
        $('.canvas').css("transform", "scale(" +zoom+ ")");
    });

    var canvas = document.querySelector('#layer-grid');
    canvas.height = canvas.scrollHeight;
    canvas.width = canvas.scrollWidth;

    $('.draw-area').node.scrollLeft = $('.draw-area').node.scrollWidth / 2 - $('.draw-area').node.offsetWidth / 2;
    $('.draw-area').node.scrollTop = $('.draw-area').node.scrollHeight / 2 - $('.draw-area').node.offsetHeight / 2; 

    $(".color-picker").node.addEventListener("change", function () {
        $('.color-view').css('background', $(this).node.value);
    });

    $(".color-picker").node.value = "#295CBF";
    $('.color-view').css('background', $(".color-picker").node.value);

    $('#new_layer').click(function () {
        var math_func = window.prompt('Fonction à tracer', "x²");
        if (math_func != null) {
           trace(math_func);
        }
    });

    var ctx = canvas.getContext('2d');
    
    if(page.get('zoom') != ""){
         $('#Interval').node.value = page.get('zoom');
    }

    if(page.get('functions') != ""){
         var function_list2 = JSON.parse(decodeURIComponent(page.get('functions')));
         for (var i = 0; i < function_list2.length; i++) {
             var element = function_list2[i];
             $(".color-picker").node.value = element[1];
             trace(element[0]);
         }
    }

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


var page = new ___page();
function ___page() {

    this.get = function (what) {
        var url = window.location.hash.replace("#", "");

        var informations = url.split(";");

        for (var i = 0; i < informations.length; i++) {

            var info = informations[i];

            var i_split = info.split('=');

            if (i_split[0] == what) {
                return i_split[1];
            }

        }

        return "";

    }

    this.name = function () {
        var p = "";
        if (this.get('page') != "") {
            p = this.get('page');
        } else if (this.get('p') != "") {
            p = this.get('p');
        }

        if (p != "") {
            return p;
        } else {
            return "home";
        }
    }


    return this;

}
