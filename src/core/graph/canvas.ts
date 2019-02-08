import { Context } from 'vm';

export default class canvas {
    /**
     * The canvas rendering context
     */
    private ctx: CanvasRenderingContext2D;
    /**
     * Creates a new rich canvas element
     * @param canvas the base html canvas element
     */
    constructor(public canvas: HTMLCanvasElement) {
        this.resize();
        this.ctx = canvas.getContext('2d');
    }
    /**
     * Called when the canvas size has changed
     */
    public resize() {
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
    }
    /**
     * Clears the area of the canvas
     * @param color the color of the canvas area
     */
    public clear(color: string = '#fafafa') {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

    /**
     * Draws a line in the canvas
     * @param x The x of the starting point
     * @param y The y of the starting point
     * @param x2 The x of the ending point
     * @param y2 The  of the ending point
     * @param color (?) The color of the line
     * @param width (?) The thickness of the line
     */
    public drawLine(
        x: number,
        y: number,
        x2: number,
        y2: number,
        color?: string,
        width?: number
    ) {
        this.ctx.beginPath();

        if (color == undefined) {
            this.ctx.strokeStyle = '#D0D0D0';
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

    public text(
        text: string,
        x: number,
        y: number,
        color = 'gray',
        font = '18px Sans Serif'
    ) {
        this.ctx.beginPath();
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    public get height() {
        return this.canvas.height;
    }
    public get width() {
        return this.canvas.width;
    }
}
