export default class Parser {
    protected partials: any = {};
    public type = 'parser';

    /**
     * Initialise a parsing task
     * @param {String} expression the expression that has to be parsed
     */
    public parse(expression: string) {
        if (typeof expression == 'number') {
            //@ts-ignore
            expression = expression.toString();
        }

        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }

        // 2) We convert ...(....) into ...$1 and $1 = ....

        expression = this.prepareExpression(expression);

        // 3) We really parse the expression

        // We transform math functions into valid js code
        expression = expression.replace(
            /sqrt\$([0-9]+)/i,
            (e, $1) => `Math.pow($${$1}, 0.5)`
        );

        /*expression = expression.replace(/derivée\$([0-9]+)/i, 
            (e, $1) => `()`);*/

        // We tranform exponants into Math.pow()
        expression = expression.replace(
            /([\$0-9x]+)\^([\$0-9x]+)/gi,
            (e, $1, $2) => `Math.pow(${$1}, ${$2})`
        );

        // We rebuild the complete expression
        expression = expression.replace(/\$([0-9]+)/gi, (e, $1) =>
            this.clean('(' + this.parse(this.partials['$' + $1]) + ')')
        );

        expression = this.clean(expression);

        return expression;
    }

    /**
     * Checks if the number of ( is equal to the number of )
     * @param exp the expression to check
     */
    protected check(exp: string) {
        let open_brackets_number = exp.split('(').length;
        let close_brackets_number = exp.split(')').length;
        if (open_brackets_number == close_brackets_number) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * PrepareExpression
     */
    protected prepareExpression(exp: string) {
        exp = exp.replace(/²/gi, '^2');
        exp = exp.replace(/³/gi, '^2');
        exp = exp.replace(/X/g, 'x');

        let processed_exp = '';
        let parenthesis_level = 0;
        let buffer = '';
        for (let i = 0; i < exp.length; i++) {
            const char = exp[i];
            let e = '$' + (Object.keys(this.partials).length + 1);
            if (parenthesis_level >= 1) {
                if (char == ')') {
                    parenthesis_level -= 1;
                    if (parenthesis_level == 0) {
                        this.partials[e] = buffer;
                        buffer = '';
                    } else {
                        buffer += char;
                    }
                } else {
                    if (char == '(') {
                        parenthesis_level += 1;
                    }
                    buffer += char;
                }
            } else {
                if (char == '(') {
                    parenthesis_level += 1;
                    processed_exp += e;
                } else {
                    processed_exp += char;
                }
            }
        }

        processed_exp = processed_exp.replace(
            /([0-9]+)x\^([\$0-9]+)/gi,
            (exp, $1, $2) => {
                let e = '$' + (Object.keys(this.partials).length + 1);
                this.partials[e] = `${$1}*x^${$2}`;
                return e;
            }
        );

        processed_exp = processed_exp.replace(/([0-9]+)x/gi, (exp, $1) => {
            let e = '$' + (Object.keys(this.partials).length + 1);
            this.partials[e] = `${$1}*x`;
            return e;
        });

        return processed_exp;
    }

    public getComputedValue(value: string) {
        const math = new MathObject();

        if (value.indexOf('dérivée ') == 0) {
            value = math.derivative(value.replace('dérivée ', ''));
        } else if (value.indexOf('dérivée_seconde ') == 0) {
            value = math.derivative(
                math.derivative(value.replace('dérivée_seconde ', ''))
            );
        }

        return value;
    }

    /**
     * Creates a function to run the expression
     */
    public Functionize(exp: string, parse = true) {
        if (parse == true) {
            exp = this.parse(exp);
        }
        return new Function(
            'x',
            `
            let sin = Math.sin;
            let tan = Math.tan;
            let cos = Math.cos;
            let asin = Math.asin;
            let atan = Math.atan;
            let acos = Math.acos;

            let sinh = Math.sinh;
            let tanh = Math.tanh;
            let cosh = Math.cosh;
            let asinh = Math.asinh;
            let atanh = Math.atanh;
            let acosh = Math.acosh;

            let ceil = Math.ceil;
            let floor = Math.floor;
            let abs = Math.abs;
            let exp = Math.exp;
            let log = Math.log;
            
            let e = Math.E;
            let pi = Math.PI;
            
            return ${exp};
            
            `
        );
    }

    /**
     * CleanUp
     */
    public clean(expression: string) {
        let pattern = /([^a-z\/])\(([0-9x]+)\)/gi;

        while (pattern.test(expression)) {
            expression = expression.replace(pattern, (e, $1, $2) => $1 + $2);
        }

        /*pattern = /^\(([0-9x]+)\)$/;

        if (pattern.test(expression))
            expression = expression.replace(pattern, (e, $1) => $1);*/

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
}

export class InvalidExpressionError extends Error {
    public type = 'IE';
}

export class MathObject extends Parser {
    private ce = '';
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
            let spl = expression.split('*').sort();
            expression = '';
            spl.forEach((s, i) => {
                let others = this.getAllExpect(spl, i);
                let join = others.join('*');
                let derivative = this.derivative(s);

                if (others.indexOf('0') >= 0) return;
                if (this.Functionize(join)(NaN) == 0) return;
                if (this.Functionize(derivative)(NaN) == 0) return;
                expression += `${derivative}*${others.join('*')}+`;
            });
            if (expression[expression.length - 1] == '+')
                expression = expression.slice(0, -1);

            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);

            expression = this.clean(expression);

            return expression;
        }

        if (expression.indexOf('/') >= 0) {
            let spl = expression.split('/');
            let spl_copy = [...spl];

            spl_copy.shift();

            let bottom = `(${spl_copy.join(')*(')})`;

            let top = `(${this.derivative(spl[0])})*${bottom}-${this.derivative(
                bottom
            )}*(${spl[0]})`;

            expression = `(${top})/((${bottom})^2)`;

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
            // Derivative of x is always equal to 1

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

            let part = this.partials[expression];

            if (/^\$([0-9]+)$/.test(part))
                return `(${this.derivative(this.partials[part])})`;
            else return `(${this.derivative(part)})`;
        } else if (/^sin\$([0-9]+)$/.test(expression) == true) {
            let partial = expression.replace('sin', '');
            return this.clean(
                `cos(${this.partials[partial]})*(${this.derivative(
                    this.partials[partial]
                )})`
            );
        } else if (/^cos\$([0-9]+)$/.test(expression) == true) {
            let partial = expression.replace('cos', '');
            return this.clean(
                `-sin(${this.partials[partial]})*(${this.derivative(
                    this.partials[partial]
                )})`
            );
        } else {
            console.log(expression);
            throw new Error('Something went wrong width ');
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

    public getDomF(expression: string, clear = true) {
        if (clear == true) {
            this.ce = '';
        }
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }

        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);

        if (expression.indexOf('+') >= 0) {
            let spl = expression.split('+');
            spl.forEach(s => this.getDomF(s, false));
            return this.realGetDomF();
        }

        if (expression.indexOf('-') >= 0) {
            let spl = expression.split('-');
            spl.forEach(s => this.getDomF(s, false));
            return this.realGetDomF();
        }

        if (expression.indexOf('*') >= 0) {
            let spl = expression.split('*');
            spl.forEach(s => this.getDomF(s, false));
            return this.realGetDomF();
        }

        if (expression.indexOf('/') >= 0) {
            let spl = expression.split('/');
            let spl_copy = [...spl];

            spl_copy.shift();

            let bottom = `(${spl_copy.join(')*(')})`;

            this.ce += '\n' + this.clean(bottom) + ' != 0';

            this.getDomF(bottom, false);

            return this.realGetDomF();
        }

        if (/^\$([0-9]+)$/.test(expression) == true) {
            let part = this.partials[expression];
            this.getDomF(part, false);
            return this.realGetDomF();
        }

        return this.realGetDomF();
    }

    public realGetDomF() {
        if (this.ce.trim() == '') {
            return 'R';
        } else {
            return 'CE: ' + this.ce;
        }
    }
}
