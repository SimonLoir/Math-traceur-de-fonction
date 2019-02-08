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
    public x_center: number = 0;
    /**
     * The y value on the center of the graph
     */
    public y_center: number = 0;
    private objects: graphObject[] = [];
    constructor(public canvas: canvas) {
        this.objects.push(new Point(1, 0));
        console.log(this.objects[0].X);

        try {
            window.addEventListener('resize', (e: Event) => {
                e.stopPropagation();
                e.preventDefault();
                this.canvas.resize();
                this.draw();
            });
        } catch (error) {
            console.log(error);
        }
        // Checking for server side execution or not
        if (window != undefined) {
            let start: any;

            let down: boolean = false;

            //When the user starts an action on the canvas.
            canvas.canvas.addEventListener('mousedown', (e: MouseEvent) => {
                down = true;
                start = { x: e.pageX, y: e.pageY };
                canvas.canvas.style.cursor = 'grabbing';
            });
            canvas.canvas.addEventListener('touchstart', (e: TouchEvent) => {
                down = true;
                start = {
                    x: e.touches.item(0).clientX,
                    y: e.touches.item(0).clientY
                };
            });
            // When the user moves on the surface of the canvas.
            canvas.canvas.addEventListener('mousemove', (e: MouseEvent) => {
                if (down == true) {
                    let new_start = { x: e.pageX, y: e.pageY };
                    let old = start;
                    let drawn = this.move(old, new_start);
                    if (drawn) {
                        start = new_start;
                    }
                }
            });
            canvas.canvas.addEventListener('touchmove', (e: TouchEvent) => {
                e.preventDefault();
                if (down == true) {
                    let new_start = {
                        x: e.touches.item(0).clientX,
                        y: e.touches.item(0).clientY
                    };
                    let old = start;
                    let drawn = this.move(old, new_start);
                    if (drawn) {
                        start = new_start;
                    }
                }
            });
            //When the user stops clicking on teh surface
            canvas.canvas.addEventListener('mouseup', (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                down = false;
                canvas.canvas.style.cursor = 'grab';
            });
            canvas.canvas.addEventListener('touchend', (e: MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();
                down = false;
            });
            canvas.canvas.addEventListener('mousewheel', (e: any) => {
                e.stopPropagation();
                e.preventDefault();
                let delta = Math.max(
                    -1,
                    Math.min(1, e.wheelDelta || -e.detail)
                );
                this.zoom(delta);
            });
            canvas.canvas.addEventListener('DOMMouseScroll', (e: any) => {
                e.preventDefault();
                e.preventDefault();
                let delta = Math.max(
                    -1,
                    Math.min(1, e.wheelDelta || -e.detail)
                );
                this.zoom(delta);
            });
        }
    }
    public register(type: string, opts: any) {}
    public zoom(delta: number) {
        if (this.x_scale + delta * 10 > 5) {
            this.x_scale += delta * 10;
        }

        if (this.y_scale + delta * 10 > 5) {
            this.y_scale += delta * 10;
        }

        this.draw();
    }
    public move(previous: any, now: any): any {
        let diff_x = previous.x - now.x;

        let diff_y = previous.y - now.y;

        if (Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2)) > 10) {
            this.x_center += diff_x / this.x_scale;

            this.y_center -= diff_y / this.y_scale;

            this.draw();
            return true;
        }
    }
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
                x0 + 2,
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
                    x0 + 2,
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
    /**
     * Gets the canvas x for the mathematical x
     * @param point X on the graph
     */
    private xPos(point: number) {
        return (
            this.canvas.width / 2 +
            point * this.x_scale -
            this.x_center * this.x_scale
        );
    }
    /**
     * Gets the canvas y for the mathematical y
     * @param point Y on the graph
     */
    private yPos(point: number) {
        return (
            this.canvas.height / 2 -
            point * this.y_scale +
            this.y_center * this.y_scale
        );
    }
}
