import Parser, { InvalidExpressionError } from "./parser.v2";

export default class MathObject extends Parser{
    public derivative(expression:string){
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError("Invalid expression given");            
        }

        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);

        return expression;
    }
}