<!DOCTYPE html>
<html lang="en">
<head>
   <script src="index.js"></script>
   	<meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta charset="UTF-8">
    <title>Document</title>
    <?php
    if(isset($_GET["zoom"])){
        $zoom = $_GET['zoom'];
    }else{
        $zoom = 50;
    }
    ?>
</head>
<body>
   <style>
       body{
           background:grey;
           margin: 0;padding: 0;
       }
       .tool-bar{
           background: white;
           position: fixed;
           bottom: 0;left: 0;
           height: 100%;
           border-right:1px solid #c3c3c3;
           padding: 0;margin: 0;
           box-shadow: 0px 0px 5px rgba(0,0,0,0.4);
           text-align: left;
            overflow: hidden;
           width: 400px;
           max-width: 100%;
           transition: 0.5s ease-in-out;
           transform: translateX(0);

       }
       .tool-bar.hidden{
           transform: translateX(calc(-100% + 20px));
       }
       .tool-bar input{
           width: calc(100% - 28px);
           border:1px solid #eee;
           padding: 8px;
           margin:5px;
       }
       
       .tool-bar button{
           width: 100px;
           border:1px solid gray;
           padding: 8px;
           margin:8px;
           background: #a73838;
           color:white;
           float:right;
           cursor: pointer;
       }
       .tool-bar button.clear{
           width: calc(100% - 18px);
           position: absolute;
           bottom: 0;left: 0;right: 0;
       }
       .tool-bar .dev, .tool-bar .license{
           width: calc(100% - 28px);
           border:1px solid #eee;
           padding: 8px;
           margin:5px;
           text-align: left;
       }
       
       .color{
           max-width: 30px;
           height: 30px;
           padding: 0;margin: 0;
       }
       
       .hide{
           position: fixed;
           top: 0;right: 0;
           border:1px solid gray;
           padding: 8px;
           margin:8px;
           background: #a73838;
           color:white;
           float:right;
           cursor: pointer;
       }
       
    </style>
    <canvas style="position:absolute;top:0;left:0;right:0;bottom:0;background:white;display:block;width:100%;height:100%;"></canvas>
    <div class="tool-bar">
        <p><button class="clear">clear</button><input type="text" class="function" value="1(x-0)²-0"><button class="draw">draw</button><input type="color" class="color"></p>
        
        <div class="dev"></div>
        <div class="license">
           <br />
            Copyright (C) 2017  Simon Loir
            <p>This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
                (at your option) any later version.</p>
            <p>This program is distributed in the hope that it will be useful,
            but WITHOUT ANY WARRANTY; without even the implied warranty of
            MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                GNU General Public License for more details.</p>
            <p>You should have received a copy of the GNU General Public License
                along with this program.  If not, see http://www.gnu.org/licenses/.</p>
                <br />Contact : simon-loir(_at_)hotmail(_dot_)com
        </div>
    </div>
    <button class="hide">Afficher / masquer les outils</button>
    
    <script>
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        
       canvas.onclick = function () {
           
           document.querySelector('.tool-bar').classList.add('hidden');
           
       }
       
       document.querySelector('.hide').onclick = function (){
           document.querySelector('.tool-bar').classList.toggle("hidden");            
       };
       
       document.querySelector('.tool-bar').onclick= function () {
           
           document.querySelector('.tool-bar').classList.remove('hidden');
           
       }
       
       function hide(){
           canvas.click();
       }
        
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;
        
        var mid_height = canvas.scrollHeight / 2;
        var mid_width = canvas.scrollWidth / 2;
        var interval = <?php echo $zoom;?>;
        
        var Ypos = mid_height;
        var Ypos2 = mid_height;
        var Xpos = mid_width;
        var Xpos2 = mid_width;
        
        make_graph();
        
        ctx.beginPath();
        ctx.strokeStyle = "#e2a61f"
        ctx.strokeText('Designed by Simon Loir', 0, canvas.height - 10)
        
        var x_zero = mid_width;
        var y_zero = mid_height;
        
        document.querySelectorAll('button')[0].onclick = function () {
            make_graph();
        }
        
        document.querySelectorAll('button')[1].onclick = function () {
            var val = document.querySelector('.function').value;
            
            if(val == "x²"){
                power2(1,0,0);
                return;
            }
            
            if(val == "-x²"){
                power2(-1,0,0);
                return;
            }
            
            if(val == "x^3"){
                power3(1,0,0);
                return;
            }
            
            matchs = val.match(/(.+)x²/i);
            
            if(matchs != null){
                power2(matchs[1], 0, 0);
            }
            
            matchs = val.match(/(.+)x\^3/i);
            
            if(matchs != null){
                power3(matchs[1], 0, 0);
            }
            
            var matchs = val.match(/(.+)\(x\-(.+)\)²\+(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], matchs[2], parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\+(.+)\)²\+(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], -matchs[2], parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\-(.+)\)²\-(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], matchs[2], -parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\+(.+)\)²\-(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], -matchs[2], -parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)x²\+(.+)x\+(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = parseFloat(matchs[2]);
                c = parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\+(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\+(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
        }
        
        function from_dev(a, b, c, val){
            var dev = document.querySelector('.dev');
                dev.innerHTML = "<b>Développement : </b><br />"
                dev.innerHTML += "Forme développée : " + val;
                dev.innerHTML += "<br />Passage à la forme canonique :";
                dev.innerHTML += "<br />a = " + a;
                dev.innerHTML += "<br />b = " + b;
                dev.innerHTML += "<br />c = " + c;
                dev.innerHTML += "<br /><br /> ax²+bx+c<br />= ";
                dev.innerHTML += "a.(x²+b/a+c/a)<br />= ";
                dev.innerHTML += "a.(x²+ b/a + c/a + ((b/a) . (1/2))² - ((b/a) . (1/2))² + c/a)<br />= ";
                dev.innerHTML += "a.((x + (b/a) . (1/2))² - ((b/a) . (1/2))² + c/a)<br />= ";

                
                
                var first_exp = (b/a) * (1/2);
                
                dev.innerHTML += a + "(x + " + first_exp +")² - " + a +"(" + first_exp +")² + " + c + "<br />= ";

                var exp_2 = -a * Math.pow(first_exp,2);

                exp_2 = (exp_2 + c);
                
                dev.innerHTML += a + "(x + " + first_exp +")² + " +exp_2;

                
                document.querySelector('.function').value = a + "(x+" + first_exp + ")²+" + exp_2;

                document.querySelectorAll('button')[1].click();
        }
        
    </script>
</body>
</html>