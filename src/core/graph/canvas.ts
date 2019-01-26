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
    constructor(private canvas: HTMLCanvasElement) {
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
}
