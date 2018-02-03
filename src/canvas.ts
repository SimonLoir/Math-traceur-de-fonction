export default class canvas{

    private ctx:CanvasRenderingContext2D;

    private canvas:HTMLCanvasElement;

    private center_x: number = 0;

    private center_y: number = 0;

    private x_unit:number = 0;

    private y_unit:number = 0;

    constructor(canvas:HTMLCanvasElement){
        
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;

        this.canvas = canvas;
        this.init();

    }

    public init(){
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
    }

    public draw(){
        this.drawGrid();
    }

    private drawGrid(){
        // Clears the view
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        
    }

}