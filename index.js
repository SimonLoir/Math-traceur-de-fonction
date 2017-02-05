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

function make_graph() {

             Ypos = mid_height;
             Ypos2 = mid_height;
             Xpos = mid_width;
             Xpos2 = mid_width;

           ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.beginPath();
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '10px serif';
            ctx.textBaseline = 'hanging';
            
            ctx.strokeStyle="#eee";
            
       		 while (Ypos - interval > 0)  {
       		     ctx.beginPath();
       		     Ypos -= interval;
       		     ctx.moveTo(0,Ypos);
       		     ctx.lineTo(canvas.scrollWidth,Ypos);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }

       		  while (Ypos + interval < mid_height * 2)  {
       		     ctx.beginPath();
       		     Ypos += interval;
       		     ctx.moveTo(0,Ypos);
       		     ctx.lineTo(canvas.scrollWidth,Ypos);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }
       		 
       		  while (Xpos - interval > 0)  {
       		     ctx.beginPath();
       		     Xpos -= interval;
       		     ctx.moveTo(Xpos, 0);
       		     ctx.lineTo(Xpos, canvas.scrollHeight);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }
       		 
       		  while (Xpos + interval < mid_width * 2)  {
       		      ctx.beginPath();
       		     Xpos += interval;
       		     ctx.moveTo(Xpos, 0);
       		     ctx.lineTo(Xpos, canvas.scrollHeight);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }
       		 
       		 ctx.beginPath();
       		 ctx.moveTo(0,mid_height);
       		 ctx.lineTo(canvas.scrollWidth,mid_height);
       		 ctx.strokeStyle="#000000";
       		 ctx.stroke();
       		 
       		 //Y axis
       		 ctx.beginPath();
       		 ctx.moveTo(mid_width,0);
       		 ctx.lineTo(mid_width, canvas.scrollHeight);
       		 ctx.strokeStyle="#000000";
       		 ctx.stroke();
       		 
        }
        
        
        function new_point(X, Y){
            var X = x_zero + X * interval;
            var Y = y_zero - Y * interval;

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = document.querySelectorAll('input')[1].value;
            ctx.arc(X, Y, 1, 0, Math.PI * 2)
            ctx.fill();
        }
        

 
        
        function power2(a, m, p){
            if(a == undefined){
                a = 0;
            }else{
                a = parseFloat(a);
            }
            if(m == undefined){
                m = 0;
            }else{
                m = parseFloat(m);
            }
            if(p == undefined){
                p = 0;
            }else{
                p = parseFloat(p);
            }

            var start = -(mid_width / 2);
            while(start <= (mid_width / 2)){
                new_point(start, parseFloat(a * Math.pow(start - m, 2) + p));
                start += 0.5 / (interval * 2);
            }

            if (finfos != undefined) {
                finfos.innerHTML = "Concavité : " + function () {if (a > 0){
                    return "vers le haut";
                }else{
                    return "vers le bas";
                }}() + "<br />Sommet : (" + function (){

                    return m + ";" + p;

                }()+ ")" + "<br />Axe de symétrie : AS &#8801; x = " + m + "<br />Ordonnée à l'origine : (0;" + function () {
                    return parseFloat(a * Math.pow(0 - m, 2) + p);
                }() + ')<br />' + function () {
                    var x_result = "Racines : ";
                    try {
                        var racine1 = parseFloat(Math.pow((-p)/a, 1/2) + m);
                        var racine2 = parseFloat(-Math.pow((-p)/a, 1/2) + m);

                        if (isNaN(racine1)) {
                            throw "error";
                        }
                    } catch (error) {
                        return "Racines : impossible ou erreur";                  
                    }
                    x_result += "(" + racine1 + ";0) et ("+ racine2 + ";0)" + "<br />";
                    x_result += "Forme canonique : " + a + '(x-' +racine1+ ')' + '(x-' +racine2+ ')';
                    x_result = x_result.replace('--', "+");
                    return x_result;
                }();

                sym_axis(m);
            }
        }

        function sym_axis (x) {
            x = x_zero + x * interval;
            var start = 0;
            for (var i = 1; i <= 50; i++) {
                ctx.beginPath();
       		    ctx.moveTo(x,start);
       		    ctx.lineTo(x, start += canvas.scrollHeight / 50);
                start += canvas.scrollHeight / 50;
       		    ctx.strokeStyle="#a73838";
       		    ctx.stroke();
            }
        }

        function power3(a, m, p){
            if(a == undefined){
                a = 0;
            }
            if(m == undefined){
                m = 0;
            }
            if(p == undefined){
                p = 0;
            }
            var start = -(mid_width / 2);
            while(start <= (mid_width / 2)){
                new_point(start, a * Math.pow(start - m, 3) + p);
                start += 0.5 / (interval * 2);
            }
        }