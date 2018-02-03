import parser from "./parser";

export default class canvas{

    private ctx:CanvasRenderingContext2D;

    private canvas:HTMLCanvasElement;

    private center_x: number = 0;

    private center_y: number = 0;

    private x_unit:number = 50;

    private y_unit:number = 50;

    private stored:any = {};

    constructor(canvas:HTMLCanvasElement){
        
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();

    }

    public init(){
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
        this.draw();
    }

    public draw(){
        this.drawGrid();
    }

    private drawGrid(){
        // Clears the view
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = "#fafafa";
        this.ctx.rect(0,0, this.canvas.width, this.canvas.height)
        this.ctx.fill();
        this.ctx.closePath();
        
        let to = 100;

        let xpos = 0 - to;

        while(xpos < to){
            this.drawLine(
                this.getRelativePositionX(xpos), 
                this.getRelativePositionY(this.center_y + to),
                this.getRelativePositionX(xpos), 
                this.getRelativePositionY(this.center_y - to),
                (xpos == 0) ? "black":undefined
                
            )
            xpos++;
        }

        let ypos = 0 - to;

        while (ypos < to) {     
            this.drawLine(
                this.getRelativePositionX(this.center_x + to), 
                this.getRelativePositionY(ypos),
                this.getRelativePositionX(this.center_x - to), 
                this.getRelativePositionY(ypos),
                (ypos == 0) ? "black":undefined
            )
            ypos++
        }

    }
    
    private drawLine(x:number, y:number, x2:number, y2:number, color?:string, width?:number){
        this.ctx.beginPath();
        if (color == undefined) {
            this.ctx.strokeStyle = "#eee";
        } else {
            this.ctx.strokeStyle = color;
        }
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        } else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();
    }

    private getRelativePositionX(point:number){
        return (this.canvas.width / 2) + point * this.x_unit - this.center_x * this.x_unit;
    }

    private getRelativePositionY(point:number){
        return (this.canvas.height / 2) - point * this.y_unit + this.center_y * this.y_unit;
    }

    public drawFromArray(array:any){
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        let x = -50
        let last = undefined
        let label = (new parser).stringify(array);
        while (x < 50) {
            let new_y = this.getRelativePositionY(this.getFor(x, array, label));
            let new_x = this.getRelativePositionX(x);
            if(last != undefined){
                this.drawLine(new_x, new_y, last.x, last.y, color, 2);
            }
            last = {
                x: new_x,
                y:new_y
            }
            x+= 0.01;
        }
        return color;
    }

    private getFor (start:number, array:any, label:string) {
        if(this.stored[label] == undefined){
            this.stored[label] = {};
        }

        if(this.stored[label][start] != undefined){
            return this.stored[label][start];
        }else{
            var result = 0;
            for (var i = 0; i < Object.keys(array).length; i++) {
                var element = Object.keys(array)[i];
                if (element == "~") {
                    if (array[element] != "") {
                        result += array[element];
                    }
                } else if (element == "x") {
                    result += array[element] * start;
                } else if (element.indexOf("^m") >= 0) {
                    result += array[element] * (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
                } else if (element == "over") {
    
                    result = result / this.getFor(start, array[element], (new parser).stringify(array[element]));
    
                } else {
                    result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
                }
            }
            
            this.stored[label][start] = result;

            return result;
        }


    }
}