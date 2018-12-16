import { SVGDrawOptions } from './ctxsvg';
export class Path {
    public path: string = '';
    public stroke: string = 'none';
    public stroke_width: number = 1;
    public fill: string = 'none';
    public text: XText[] = [];
}

export class XText {
    public text: string;
    public x: number;
    public y: number;
    public font: string;
    public color: string;

    constructor(
        text: string,
        x: number,
        y: number,
        style: string,
        color: string
    ) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.font = style;
        this.color = color;
    }
}
