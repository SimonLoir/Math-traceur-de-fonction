import Point from './point';
import canvas from './canvas';

export interface graphObject {
    type: string;
    coordinates: number[][];
    X?: number;
    Y?: number;
}
export default class graph {
    /**
     * The size in px of one unit
     */
    public x_scale: number = 50;
    /**
     * The size in px of one unit
     */
    public y_scale: number = 50;
    /**
     * The unit on the x axis
     */
    public x_unit: number = 1;
    /**
     * The unit on the y axis
     */
    public y_unit: number = 1;
    /**
     * The x value on the center of the graph
     */
    public x_center: number = 1;
    /**
     * The y value on the center of the graph
     */
    public y_center: number = 1;
    private objects: graphObject[] = [];
    constructor(public canvas: canvas) {
        this.objects.push(new Point(1, 0));
        console.log(this.objects[0].X);
    }
    public register(type: string, opts: any) {}
    public draw() {
        this.canvas.clear();
        this.drawGrid();
    }
    /**
     * Creates a grid
     */
    public drawGrid() {
        let size = 18;
        let phase = 15;
        let font = size + 'px Sans Serif';
        let xMax = this.canvas.width / this.x_scale / 2 + this.x_unit;
        let start = this.x_center - (this.x_center % this.x_unit);
        let y0 = this.yPos(0);
        for (let x = 0; x < xMax; x += this.x_unit) {
            let xpos = this.xPos(start + x);
            let xposMinus = this.xPos(start - x);
            this.canvas.drawLine(xpos, 0, xpos, this.canvas.height);
            this.canvas.text(
                (Math.floor((start + x) * 100) / 100).toString(),
                xpos,
                y0 + phase,
                'gray',
                font
            );
            if (xpos != xposMinus) {
                this.canvas.drawLine(
                    xposMinus,
                    0,
                    xposMinus,
                    this.canvas.height
                );
                this.canvas.text(
                    (Math.floor((start - x) * 100) / 100).toString(),
                    xposMinus,
                    y0 + phase,
                    'gray',
                    font
                );
            }
        }
        let yMax = this.canvas.height / this.y_scale / 2 + this.y_unit;
        let yStart = this.y_center - (this.y_center % this.y_unit);
        let x0 = this.xPos(0);
        for (let y = 0; y < yMax; y += this.y_unit) {
            let yPlus = yStart + y;
            let yMinus = yStart - y;
            let ypos = this.yPos(yPlus);
            let yposMinus = this.yPos(yMinus);
            this.canvas.drawLine(0, ypos, this.canvas.width, ypos);
            this.canvas.text(
                (Math.floor(yPlus * 100) / 100).toString(),
                x0 - phase,
                ypos,
                'gray',
                font
            );
            if (ypos != yposMinus) {
                this.canvas.drawLine(
                    0,
                    yposMinus,
                    this.canvas.width,
                    yposMinus
                );
                this.canvas.text(
                    (Math.floor(yMinus * 100) / 100).toString(),
                    x0 - phase,
                    yposMinus,
                    'gray',
                    font
                );
            }
        }
        this.canvas.drawLine(
            this.xPos(0),
            0,
            this.xPos(0),
            this.canvas.height,
            'black'
        );
        this.canvas.drawLine(
            0,
            this.yPos(0),
            this.canvas.width,
            this.yPos(0),
            'black'
        );
    }

    private xPos(point: number) {
        return (
            this.canvas.width / 2 +
            point * this.x_scale -
            this.x_center * this.x_scale
        );
    }

    private yPos(point: number) {
        return (
            this.canvas.height / 2 -
            point * this.y_scale +
            this.y_center * this.y_scale
        );
    }
}
