import functionizer from './functionizer';

export default class expression {
    private baseExp: string;
    private code: Function;

    /**
     * Gets the default expression (plain text)
     */
    public get baseExpression() {
        return this.baseExp;
    }
    /**
     * Creates a js function for the given math expression
     */
    public get function() {
        this.code = functionizer.functionize(this.baseExp);
        return this.code;
    }
    /**
     * Gets the parsed form of the expression
     * (without the function wrapper)
     */
    public get parsedForm() {
        return functionizer.parse(this.baseExp);
    }
    /**
     * Gets the y value for x
     * @param x the value on the x axis
     */
    public getFor(x: number) {
        return this.code(x);
    }

    constructor(fn: string) {
        this.baseExp = fn;
        this.code = this.function;
    }
}
