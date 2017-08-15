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
var global_canvas;
var function_list = [];
var zoom = 1;
var trace = function (math_func) {
         var layer = $('.layer-function-view').child('div');
            layer.addClass('layer');

            var color = layer.child('div').addClass('preview');
            var layer_name = layer.child('span').addClass('layer-name').html(math_func);
            var show_hide = layer.child("button").html("&#128064;");

            var c = $('.canvas').child('canvas').node;
            c.height = global_canvas.height;
            c.width = global_canvas.width;
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

            layer.click(function (e){
                if(e.target != show_hide.node){
                    layer.css('display', "none");
                    var action = $('body').child('div').addClass('action');
                    var action_title = action.child('div').addClass('action-header').html('Informations supplémentaires');
                    var action_content = action.child('div').addClass('action-content').html(function (){
                            var roots = functions_informations[layer.node.querySelector('.layer-name').innerText];
                            if(roots != undefined){
                                if(isNaN(roots.root1)){
                                    return "Cette fonction n'a pas de racines";
                                }else{
                                    var to_show = "Racine(s) : (" + roots.root1 + ";0)";
                                    if(isNaN(roots.root2) || roots.root1 == roots.root2){
                                        return to_show + ", cette fonction n'a qu'une racine";
                                    }else{
                                        return to_show + "  et (" + roots.root2 + ";0)";
                                    }

                                }
                            }else{
                                return "Pas de racine à afficher, cette fonctionnalité viendra dans les prochaines mises à jour.";
                            }
                        }());

                    var action_btns = action.child('div').addClass('btn-group');
                    var cancel_button = action_btns.child('button').html('annuler').addClass('btn');
                    cancel_button.click(function () {
                        layer.css('display', "block");
                        action.remove();
                    });
                }
            });
            
            f.to_eval = math_func;

            var draw_result = f.draw(math_func);

            if(draw_result == "error"){
                alert('Cette fonction n\'est pas encore reconnue');
                layer.remove();
                c.remove()
                return;
            }else if(draw_result == "no-trace"){
                layer.remove();
                c.remove()
            }
            function_list.push([math_func, f.color]);                
            
 }
$(document).ready(function () {

    $('.show-hide').click(function () {

        if($(this).node.innerHTML == "Options"){
            $(this).node.innerHTML = "Masquer";
            $('.right-tool-bar').addClass('force-show');       
        }else{
            $(this).node.innerHTML = "Options";
            $('.right-tool-bar').removeClass('force-show');       
            
        }

    });


    /*
    * Grid Layer
    */

    window.onhashchange = function () {
        window.location.reload();
    }

    $('.left-tool-bar').click(function () {
        $('.popup-start').css('display', "none");
    });

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

    global_canvas = canvas;

    $('.canvas').css('width', canvas.width + 'px');
    $('.canvas').css('height', canvas.height + 'px');
    

    $('.draw-area').node.scrollLeft = $('.draw-area').node.scrollWidth / 2 - $('.draw-area').node.offsetWidth / 2;
    $('.draw-area').node.scrollTop = $('.draw-area').node.scrollHeight / 2 - $('.draw-area').node.offsetHeight / 2; 

    $(".color-picker").node.addEventListener("change", function () {
        $('.color-view').css('background', $(this).node.value);
    });

    $(".color-picker").node.value = "#bd282b";

    $('.color-view').css('background', $(".color-picker").node.value);

    $('#new_layer').click(function () {
        $('#ftrace_dialog').css('display', "block");
    });

    $('#no-formule-mode').click(function() {
        $('#ftrace_no_formule_dialog').css('display', "block");
        $('#ftrace_no_formule_dialog .action-content').html('Bienvenue sur le mode sans formule (ou découverte). Ce mode vous aide à découvrir les différentes formules qui sont disponibles sur SMath.');
        
        var w = $('#ftrace_no_formule_dialog .action-content');
            w.child('span').html(' Sélectionnez une des catégories ci-dessous.');
            w.child('br');
            w.child('br');

        var functions_sd = w.child('button').html('Fonctions du second degré').addClass('btn');
        var vectors = w.child('button').html('Vecteurs').addClass('btn');
        var lines = w.child('button').html('Tracé de segments').addClass('btn');
                    w.child('br');
                    w.child('br');
        
        var x_panel = w.child("div").html('Rien à afficher, sélectionnez une catégorie');

        functions_sd.click(function () {
            
            x_panel.html('Bienvenue dans l\'assistant dédié aux fonctions du second degré');

            x_panel.child('br');

            x_panel.child('br');

            x_panel.child("button").html('Tracer une fonction de la forme a(x+m)²+p').addClass('btn').click(function () {
                $('#new_layer').click();
                $('#ftrace_dialog input').node.value = "1(x-0)²+0";
                $('#nf-cancel').click()
            });

            x_panel.child('br');

            x_panel.child('br');

            x_panel.child("button").html('Tracer une fonction à partir de la forme développée').addClass('btn').click(function () {
                $('#new_layer').click();
                $('#ftrace_dialog input').node.value = "ax²+bx+c";
                $('#nf-cancel').click()
            });
        });

    });

    $('#ftrace').click(function () {
        if ($('#ftrace_dialog input').node.value == "") {
            alert('Incorrect');
        }else{
            trace($('#ftrace_dialog input').node.value);
             $('#ftrace_dialog').css('display', "none");
        }
    });

    $('#fcancel').click(function () {
        $('#ftrace_dialog').css("display", "none");
    });

    $('#nf-cancel').click(function () {
        $('#ftrace_no_formule_dialog').css("display", "none");
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
    grid.newLine(0, -1000 ,0,1000, "black", undefined, 1);
    grid.newLine(-1000 ,0,1000, 0, "black", undefined, 1); 

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

                draw_area.relativey = draw_area.y + this.scrollTop;
                draw_area.relativex = draw_area.x + this.scrollLeft;
           
               

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
              
           if($('#round').node.checked == true){
                x1 = Math.round(x1); 
                x2 = Math.round(x2);               
                y1 = Math.round(y1);               
                y2 = Math.round(y2);
            }

              trace("[(" + x1 + ";" + y1 + ") (" + x2 + ";" + y2 + ")]");
              
          }
        }else{
            console.log("pen-tool is not enabled");
        }
    });
}); 


$(document).ready(function () {

    if(page.get('lang') == "" || page.get('lang') == "fr"){
        // the actual version
    }else{
        if(translations[page.get('lang')] != undefined){
            try {
            
            } catch (error) {
                alert(error);
            }
        }else{
            alert("Cette langue n'est pas supportée");
        }
    }

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
