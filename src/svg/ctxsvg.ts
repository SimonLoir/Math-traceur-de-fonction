import { Path, XText } from './path';
export interface SVGDrawOptions {
    stroke?: string;
    strokeWidth?: string;
    fill?: string;
}

export default class context {
    public svg: Path[] = [];
    public i: number;
    public clearRect() {
        this.svg = [];
    }
    public strokeStyle: string;
    public fillStyle: string;
    public font: string;
    public lineWidth: number;
    public beginPath() {
        this.i = this.svg.push(new Path()) - 1;
    }
    public rect(x: number, y: number, width: number, height: number) {
        this.moveTo(x, y);
        this.lineTo(x + width, y);
        this.lineTo(x + width, y + height);
        this.lineTo(x, y + height);
        this.closePath();
    }
    public fill() {
        this.svg[this.i].fill = this.fillStyle;
    }
    public stroke() {
        this.svg[this.i].stroke = this.strokeStyle;
        this.svg[this.i].stroke_width = this.lineWidth;
    }
    public fillText(text: string, x: number, y: number) {
        this.svg[this.i].text.push(
            new XText(text, x, y, this.font, this.fillStyle)
        );
    }
    public closePath() {
        this.svg[this.i].path += `Z`;
    }
    public moveTo(x: number, y: number) {
        if (!isNaN(y)) this.svg[this.i].path += `M${x} ${y} `;
    }
    public lineTo(x: number, y: number) {
        if (!isNaN(y)) this.svg[this.i].path += `L${x} ${y} `;
    }
}
