import functionizer from './functionizer';

export default class expression {
    private baseExp: string;
    public code: Function;
    public get baseExpression() {
        return this.baseExp;
    }
    public get function() {
        return functionizer.functionize(this.baseExp);
    }
    constructor(fn: string) {
        this.baseExp = fn;
        this.code = this.function;
    }
}
