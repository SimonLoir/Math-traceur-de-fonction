import functionizer from './functionizer';

export default class expression {
    private baseExp: string;
    public code: string;
    public get baseExpression() {
        return this.baseExp;
    }
    public get function() {
        return functionizer.functionize(this.code);
    }
}
