import context from './ctxsvg';

export default class CanvasSubstitute {
    public height: number;
    public scrollHeight: number;
    public width: number;
    public scrollWidth: number;
    public ctx: context;
    constructor(width: number = 500, height: number = 500) {
        this.scrollHeight = this.height = height;
        this.scrollWidth = this.width = width;
    }
    public getContext(type: string) {
        if (type == '2d') {
            console.log(this.xGet2DContext());
            return this.xGet2DContext();
        }
    }
    private xGet2DContext() {
        if (this.ctx) return this.ctx;
        else {
            this.ctx = new context();
            return this.ctx;
        }
    }
    public toSVG(): string {
        let inside = ``;
        console.log(
            'Building svg with ' + this.getContext('2d').svg.length + ' lines'
        );
        this.getContext('2d').svg.forEach(e => {
            if (e.text != []) {
                e.text.forEach(text => {
                    inside += `<text x="${text.x}" y="${text.y}" style="fill:${
                        text.color
                    };font: ${text.font}">${text.text}</text>`;
                });
            }
            if (e.path == '' || e.path == 'Z' || e.path.indexOf('L') == 0)
                return;
            inside += `<path d="${e.path}" style="stroke-width:${
                e.stroke_width
            }px;stroke:${e.stroke};fill:${e.fill};"></path>`;
        });
        return `<svg width="${this.width}" height="${
            this.height
        }">${inside}</svg>`;
    }
    public addEventListener(...x: any[]) {}
}
