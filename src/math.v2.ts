import Parser, { InvalidExpressionError } from "./parser.v2";

export default class MathObject extends Parser {
    public type = "MathObject";
    public derivative(expression: string) {
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError("Invalid expression given");
        }

        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);

        // 3) Wa have to split the expression into small pieces

        /**
         * First of all is the derivative of a sum because the
         * derivative of a sum is the sum of the derivative of the terms
         */
        let sum_terms = expression.split("+");

        if (sum_terms.length == 1) {
            //@ts-ignore
            if (!isNaN(sum_terms[0])) {
                return 0;
            } else if (sum_terms[0] == "x") {
                return 1;
            } else if (sum_terms[0].indexOf("$") == 0) {
                let spl = sum_terms[0].split("^");
                if (spl.length == 1) {
                    return `(${this.partials[sum_terms[0]]})`;
                } else {
                    return `(${this.partials[sum_terms[0]]})`;
                }
            } else if (sum_terms[0].indexOf("x^") == 0) {
                let replaced = sum_terms[0].replace("x^", "");
                return replaced + "x^(" + replaced + "-1)";
            } else {
                return "e";
            }
        }

        expression = "";

        sum_terms.forEach(sum_term => {
            /**
             * Second of all we have to work with the substraction
             * which is basically the same as the addition
             */
            expression += `${this.derivative(sum_term)}+`;
        });

        return expression;
    }
}
