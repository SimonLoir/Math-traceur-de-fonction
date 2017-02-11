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
       var max_x = this.x_zero / 50;
       var max_y = this.y_zero / 50;

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
}