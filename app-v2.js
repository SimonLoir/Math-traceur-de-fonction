/*
Copyright (C) 2017  Simon Loir

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program.  If not, see http://www.gnu.org/licenses/.
*/
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
            color.css('background', f.color);
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

            if(f.draw(math_func) == "error"){
                alert('Cette fonction n\'est pas encore reconnue');
            }
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

    $('#need-help').click(function () {
        var action = $(document.body).child('div').addClass('action');
        var title = action.child('div').addClass('action-header').html('Aide rapide');
        var content = action.child('div').addClass('action-content').html('Utilisez la barre à votre gauche pour utiliser les outils rapides. Le panneau de droite est le panneau des calques et de personnalisation. C\'est sur ce panneau que vous pouvez modifier la couleur du tracé. <br /><br />Vous  pouvez cliquer sur le bouton à droite du nom de chaque fonction (dans calques) pour afficher/masquer la fonction.<br /><br />Dans affichage, au plus l\'intervalle est grand, au plus plus le graphique sera précis et au plus le zoom sera important.');
        var buttons = action.child('div').addClass('btn-group');
        buttons.child('button').html('Ok, merci').click(function () {
            action.remove();
        });    
    });

    if(page.get('browser') == "moz"){
         $('.canvas').css('height', '400%');
         $('.canvas').css('width', '400%');
         
    }

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
        var math_func = window.prompt('Fonction à tracer \nUtilisez des parenthèse pour effectuer les fractions exemple 1/2 => (1/2)', "(1/2)x²");
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

    $('#pen-tool').click(function () {
        if(this.classList.contains("active")){
            $(this).removeClass('active');
            $('.pencil-tool-board').css('display', "none");
            $('#zoom-more').css('display', "block");
            $('#zoom-less').css('display', "block");
        }else{
            $(this).addClass('active');
           $('.pencil-tool-board').css('display', "block");
           zoom = 1;
             $('#zoom-level').html(zoom);
            $('.canvas').css("transform", "");
            $('#zoom-more').css('display', "none");
            $('#zoom-less').css('display', "none");
        }
    });

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

    
    /* 
    Drawing-Tool
    */
    var click = 0;
    var last_point = [];
    $('.draw-area').click(function (e){
        if($('#pen-tool').node.classList.contains("active")){
           var draw_area = {
               x: e.clientX - this.offsetLeft,
               y: e.clientY - this.offsetTop,
               relativex : 0,
               relativey: 0
           }
          draw_area.relativex = draw_area.x + this.scrollLeft;
          draw_area.relativey = draw_area.y + this.scrollTop;
          if (click == 0) {
              last_point[0] = draw_area.relativex;
              last_point[1] = draw_area.relativey;
              click ++;
          }else if(click == 1){
              click = 0;
              if ($('#line-type').node.options[$('#line-type').node.selectedIndex].value == "h") {
                 var x1 = last_point[0];
                 var x2 = draw_area.relativex;
                 var y1 = last_point[1];
                 var y2 = last_point[1];                 
              }else if ($('#line-type').node.options[$('#line-type').node.selectedIndex].value == "o") {
                 var x1 = last_point[0];
                 var x2 = draw_area.relativex;
                 var y1 = last_point[1];
                 var y2 = draw_area.relativey;                 
              }else if ($('#line-type').node.options[$('#line-type').node.selectedIndex].value == "v") {
                 var x1 = last_point[0];
                 var x2 = last_point[0];
                 var y1 = last_point[1];
                 var y2 = draw_area.relativey;                 
              }else{
                  alert('erreur');
              }

              x1 = (x1 - x_zero) / interval;
              x2 = (x2 - x_zero) / interval;              
              y1 = -(y1 - y_zero) / interval;              
              y2 = -(y2 - y_zero) / interval;              
              

              trace("[(" + x1 + ";" + y1 + ") (" + x2 + ";" + y2 + ")]");
              
          }
        }else{
            console.log("pen-tool is not enabled");
        }
    });
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
