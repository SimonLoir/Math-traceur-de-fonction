import Parser, { InvalidExpressionError } from './parser.v2';

export default class MathObject extends Parser {
    public type = 'MathObject';
    public derivative(expression: string): any {
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }

        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);

        // 3) Wa have to split the expression into small pieces and check step by step

        if (expression.indexOf('+') >= 0) {
            let spl = expression.split('+');
            expression = '';
            spl.forEach(s => (expression += `${this.derivative(s)}+`));
            if (expression[expression.length - 1] == '+')
                expression = expression.slice(0, -1);

            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);

            expression = this.clean(expression);

            return expression;
        }

        if (expression.indexOf('-') >= 0) {
            let spl = expression.split('-');
            expression = '';
            spl.forEach(s => (expression += `${this.derivative(s)}-`));
            if (expression[expression.length - 1] == '-')
                expression = expression.slice(0, -1);

            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);

            expression = this.clean(expression);

            return expression;
        }

        if (expression.indexOf('*') >= 0) {
            let spl = expression.split('*');
            expression = '';
            spl.forEach(
                (s, i) =>
                    (expression += `${this.derivative(s)}*${this.getAllExpect(
                        spl,
                        i
                    ).join('*')}+`)
            );
            if (expression[expression.length - 1] == '+')
                expression = expression.slice(0, -1);

            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);

            expression = this.clean(expression);

            return expression;
        }

        //@ts-ignore
        if (!isNaN(expression)) {
            // Derivative of a number is always equal to 0

            return '0';
        } else if (expression == 'x') {
            // Derivative of x is alwais equal to 1

            return 1;
        } else if (expression.indexOf('^') >= 1) {
            // Derivative of x^n is equal to n(x)^(n-1) * (x)'

            let parts: string[] = expression.split('^');
            return this.clean(
                `${parts[1]}*${parts[0]}^(${
                    !isNaN(this.Functionize(parts[1] + '-1')(NaN))
                        ? this.Functionize(parts[1] + '-1')(NaN)
                        : parts[1] + '-1'
                })*(${this.derivative(parts[0])})`
            );
        } else if (/^\$([0-9]+)$/.test(expression) == true) {
            // This replaces $.. into the expression

            return `(${this.derivative(this.partials[expression])})`;
        } else {
            throw new Error('Something went wrong');
        }
    }

    /**
     * CleanUp
     */
    public clean(expression: string) {
        expression = expression.replace(/\(([0-9]+)\)/gi, (e, $1) => $1);
        expression = expression.replace(
            /\*([0-9])/gi,
            (e, $1) => ($1 == 1 ? '' : e)
        );
        expression = expression.replace(
            /\^([0-9])/gi,
            (e, $1) => ($1 == 1 ? '' : e)
        );
        expression = expression.replace(/\$([0-9]+)/g, e => {
            return `(${this.partials[e]})`;
        });
        return expression;
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
