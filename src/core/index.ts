import expression from './expression';
import graph from './graph/graph';
import canvas from './graph/canvas';

export default class smath {
    private exp: expressionManager = undefined;
    private gr: graphManager = undefined;
    /**
     * Gives access to all the tools available
     * and that works on expressions
     */
    public get expression() {
        if (this.exp == undefined) this.exp = new expressionManager();
        return this.exp;
    }
    public get graph() {
        if (this.gr == undefined) this.gr = new graphManager();
        return this.gr;
    }
}

export class expressionManager {
    public create(code: string) {
        return new expression(code);
    }
}

export class graphManager {
    public create(canvas: canvas) {
        return new graph(canvas);
    }
}
