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
    public scale: number = 50;
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
    }
    public register(type: string, opts: any) {}
    public draw() {
        this.canvas.clear();
    }
}
