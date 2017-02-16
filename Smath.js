/*
SMath toolkit
*/
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
var SMath = function () {

    this.ctx = "";

    this.setContext = function (ctx){
        this.ctx = ctx;
    }

    this.newPoint = function (X, Y, color){
        var X = this.x_zero + X * parseFloat(this.interval);
        var Y = this.y_zero - Y * parseFloat(this.interval);
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        if (color != undefined) {
            this.ctx.fillStyle = color;
        }else{
            this.ctx.fillStyle = "black";
        }
        this.ctx.arc(X, Y, 1, 0, Math.PI * 2)
        this.ctx.fill();
    }

    this.newLine = function (X, Y, X2, Y2, color){
        var X = this.x_zero + X * parseFloat(this.interval);
        var Y = this.y_zero - Y * parseFloat(this.interval);
        var X2 = this.x_zero + X2 * parseFloat(this.interval);
        var Y2 = this.y_zero - Y2 * parseFloat(this.interval);
        this.ctx.beginPath();
        if (color == undefined) {
            this.ctx.strokeStyle = "#eee";
        }else{
            this.ctx.strokeStyle = color;
        }
       	this.ctx.moveTo(X,Y);
       	this.ctx.lineTo(X2,Y2);
       	this.ctx.lineWidth = 1;
       	this.ctx.stroke();
    }
    
    this.label = function (text, X, Y, color){
        var X = this.x_zero + X * parseFloat(this.interval);
        var Y = this.y_zero - Y * parseFloat(this.interval);

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        if (color != undefined) {
            this.ctx.fillStyle = color;
        }else{
            this.ctx.fillStyle = "black";
        }
        this.ctx.fillText(text, X, Y);
        this.ctx.fill();
    }

    this.makeGrid = function (){
        this.label(0, 0, 0);
       var max_x = this.x_zero / this.interval;
       var max_y = this.y_zero / this.interval;

       var x_right = 1;
       while (x_right < max_x + 5) {
           this.newLine(x_right, -500 ,x_right,500);
           this.label(x_right, x_right, 0);
           x_right++;
       }
       x_right = -1;
       while (x_right > -max_x - 5 ) {
           this.newLine(x_right, -500 ,x_right,500);
           this.label(x_right, x_right, 0);
           x_right--;
       }

       var y_bottom = 1;
       while (y_bottom < max_y + 5) {
           this.newLine(-500, y_bottom, 500 ,y_bottom);
           this.label(y_bottom,0, y_bottom);
           y_bottom++;
       }
       y_bottom = -1;
       while (y_bottom > -max_y - 5 ) {
           this.newLine(-500, y_bottom, 500 ,y_bottom);
           this.label(y_bottom,0, y_bottom);
           y_bottom--;
       }

    }

    this.draw = function(val){
            console.log(val);
            val = val.replace("^2", "²");
            val = val.replace("³", "^3");
            val = val.replace("-x", "-1x");

            val = val.replace(/\(([0-9]+)\/([0-9]+)\)/i, function (value, p1, p2) {
                return p1/p2;
            });

            if(val == "x²"){
                this.power2(1,0,0);
                return;
            }
            if(val == "x^3"){
                this.power3(1,0,0);
                return;
            }
            
            matchs = val.match(/^(.+)x²$/i);
            
            if(matchs != null){
                this.power2(matchs[1], 0, 0);
                return;
            }
            
            matchs = val.match(/^(.+)x²\+([0-9||\-||\.]+)$/i);
            
            if(matchs != null){
                val = matchs[1] + "(x-" + 0 + ")²+" + matchs[2];
                macths = null;
            }

            matchs = val.match(/^x²\+(.+)$/i);
            
            if(matchs != null){
                val =  "1(x-" + 0 + ")²+" + matchs[1];
                macths = null;
            }

            matchs = val.match(/^(.+)x\^3$/i);
            
            if(matchs != null){
                this.power3(matchs[1], 0, 0);
                return;
            }
            
            matchs = val.match(/(.+)\(x\-(.+)\)²\+(.+)/i);
            
            if(matchs != null){
                this.power2(matchs[1], matchs[2], parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\+(.+)\)²\+(.+)/i);
            
            if(matchs != null){
                this.power2(matchs[1], -matchs[2], parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\-(.+)\)²\-(.+)/i);
            
            if(matchs != null){
                this.power2(matchs[1], matchs[2], -parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\+(.+)\)²\-(.+)/i);
            
            if(matchs != null){
                this.power2(matchs[1], -matchs[2], -parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)x²\+(.+)x\+(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = parseFloat(matchs[2]);
                c = parseFloat(matchs[3]);
                
                this.toCan(a, b,c, val);
                 return;
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\+(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = parseFloat(matchs[3]);
                
                this.toCan(a, b,c, val);
                 return;
            }
            
            matchs = val.match(/(.+)x²\+(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                this.toCan(a, b,c, val);
                 return;
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                this.toCan(a, b,c, val);
                 return;
            }

             return this.execPlugin(val);

    }

    this.power2 = function (a, m, p){
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

            /*var start = -40;
            while(start <= 40){
                this.newPoint(start, parseFloat(a * Math.pow(start - m, 2) + p), this.color);
                start += 0.002;
            }*/
            var start = -40;
            var last = parseFloat(a * Math.pow(start - m, 2) + p);
            while(start <= 40){
                var from = [start,last];
                start += 0.002;
                last = parseFloat(a * Math.pow(start - m, 2) + p);
                this.newLine(from[0], from[1],start, last, this.color);
            }  
        }
    this.power3 = function(a, m, p){
            if(a == undefined){
                a = 0;
            }
            if(m == undefined){
                m = 0;
            }
            if(p == undefined){
                p = 0;
            }
            var start = -40;
            while(start <= 40){
                this.newPoint(start, a * Math.pow(start - m, 3) + p, this.color);
                start += 0.002;
            }
    }
    this.toCan = function (a, b,c, val){
        var first_exp = (b/a) * (1/2);
        var exp_2 = -a * Math.pow(first_exp,2);
        exp_2 = (exp_2 + c);
        this.draw(a + "(x+" + first_exp + ")²+" + exp_2);
    } 

    this.plugin = [
        [/cos\(x\)/i, function (m) {
            this.cos();
        }],
        [/sin\(x\)/i, function (m) {
            this.sin();
        }],
        [/tan\(x\)/i, function (m) {
            this.tan();
        }]
    ];
    this.execPlugin = function (val) {
        for (var i = 0; i < this.plugin.length; i++) {
            var element = this.plugin[i];
            
            var matchs = val.match(element[0]);
            
            if(matchs != null){

                this.plugin_exec_function = element[1];
                this.plugin_exec_function(matchs);
                this.plugin_exec_function = function () {};

                 return;
            }
        }
        return "error";
    }
    this.plugin_exec_function = function () {};
    
    this.cos = function () {
        var start = -40;
        var last = Math.cos(start);
            while(start <= 40){
                var from = [start,last];
                start += 0.002;
                last = Math.cos(start);
                this.newLine(from[0], from[1],start, last, this.color);
            }   
    }

    this.sin = function () {
        var start = -40;
        var last = Math.sin(start);
            while(start <= 40){
                var from = [start,last];
                start += 0.002;
                last = Math.sin(start);
                this.newLine(from[0], from[1],start, last, this.color);
            }   
    }
    
    this.tan = function () {
             var start = -40;
            while(start <= 40){
                this.newPoint(start, Math.tan(start), this.color);
                start += 0.001;
            }     
    }
}