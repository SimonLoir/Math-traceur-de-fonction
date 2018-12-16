import CanvasSubstitute from './svg/canvas';
import canvas from './canvas';
import Parser, { MathObject } from './parser.v2';

export default class SVGGraph {
    constructor(fstring: string, build: (done: string) => void) {
        let c = new CanvasSubstitute(750, 750);
        //@ts-ignore
        let xc = new canvas(c);
        xc.init();

        let parser = new Parser();
        let math = new MathObject();

        xc.init();
        xc.funcs = {};
        let func_str = fstring;
        let func = parser.Functionize(func_str);
        let color = xc.drawFromFunc(func);

        xc.funcs = {
            func: {
                visible: true,
                color: color,
                array: func,
                exp: func_str,
                initial: func_str
            }
        };
        build(c.toSVG());
    }
}
