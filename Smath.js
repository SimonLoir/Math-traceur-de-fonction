/*
SMath toolkit
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
            val = val.replace("^2", "²");
            val = val.replace("³", "^3");
            val = val.replace("-x", "-1x");

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
            
            matchs = val.match(/^(.+)x²\+(.+)$/i);
            
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
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\+(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = parseFloat(matchs[3]);
                
                this.toCan(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\+(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                this.toCan(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                this.toCan(a, b,c, val);
            }

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

            var start = -40;
            while(start <= 40){
                this.newPoint(start, parseFloat(a * Math.pow(start - m, 2) + p), this.color);
                start += 0.002;
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
}