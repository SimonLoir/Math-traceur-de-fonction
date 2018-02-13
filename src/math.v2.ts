import Parser, { InvalidExpressionError } from './parser.v2';

export default class MathObject extends Parser {
    public type = 'MathObject';
    public derivative(expression: string) {
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }

        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);

        // 3) Wa have to split the expression into small pieces

        let sum_terms = expression.split('+');

        expression = '';

        sum_terms.forEach(sum_term => {
            let sub_terms = sum_term.split('-');

            sum_term = '';

            sub_terms.forEach(
                sub_term => (sum_term += `${this.derivativeItem(sub_term)}-`)
            );

            if (sum_term[sum_term.length - 1] == '-')
                sum_term = sum_term.slice(0, -1);

            expression += `${sum_term}+`;
        });

        if (expression[expression.length - 1] == '+')
            expression = expression.slice(0, -1);

        expression = expression.replace(/\$([0-9]+)/g, e => {
            return `(${this.derivative(this.partials[e])})`;
        });

        return expression;
    }
    /**
     * Gets the derivative for a single item
     */
    private derivativeItem(item: any) {
        if (!isNaN(item)) {
            return '0';
        } else if (item == 'x') {
            return 1;
        } else if (item.indexOf('*') >= 0) {
            let result = '';

            let spl: string[] = item.split('*');

            spl.forEach((element, index) => {
                result += `${this.derivativeItem(element)}*${this.getAllExpect(
                    spl,
                    index
                ).join('*')}+`;
            });

            if (result[result.length - 1] == '+') result = result.slice(0, -1);

            return result;
        } else if (item.indexOf('^') >= 1) {
            let parts: string[] = item.split('^');
            console.log(parts);
            return `${parts[1]}*${parts[0]}^(${
                parts[1]
            } - 1)*(${this.derivative(parts[0])})`;
        } else if (/^\$([0-9]+)$/.test(item) == true) {
            return `(${this.partials[item]})`;
        } else {
            return 'e';
        }
    }

    private getAllExpect(array: Array<any>, i: number) {
        let res: Array<any> = [];
        array.forEach((e, index) => {
            if (index != i) {
                res.push(e);
            }
        });
        return res;
    }
}
