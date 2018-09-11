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
            /([\$0-9xe]+)\^([\$0-9xe]+)/gi,
            (e, $1, $2) => `pow(${$1}, ${$2})`
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
            /([0-9\.]+)x\^([\$0-9\.]+)/gi,
            (exp, $1, $2) => {
                let e = '$' + (Object.keys(this.partials).length + 1);
                this.partials[e] = `${$1}*x^${$2}`;
                return e;
            }
        );

        processed_exp = processed_exp.replace(/([0-9\.]+)x/gi, (exp, $1) => {
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
        console.log(exp);
        return new Function(
            'x',
            'funcs',
            `
            const sin = Math.sin;
            const tan = Math.tan;
            const cos = Math.cos;
            const asin = Math.asin;
            const atan = Math.atan;
            const acos = Math.acos;

            const sinh = Math.sinh;
            const tanh = Math.tanh;
            const cosh = Math.cosh;
            const asinh = Math.asinh;
            const atanh = Math.atanh;
            const acosh = Math.acosh;

            const ceil = Math.ceil;
            const floor = Math.floor;
            const abs = Math.abs;
            const exp = Math.exp; 
            const ln = Math.log;
            const log = function (base, y) { return Math.log(y) / Math.log(base)};

            const e = Math.E;
            const pi = Math.PI;
            const pow = function (base, exponent){
                if(exponent % 1 != 0){
                    for(let i = -7; i < 8; i = i + 2){
                        if(exponent == 1/i && base < 0) return 0 - 1 * Math.pow(0 - base, exponent);     
                    }
                }
                return Math.pow(base, exponent);
            }
            
            return ${this.FunctionizeCalls(exp)};
            
            `
        );
    }

    private math_func = [
        'sin',
        'tan',
        'cos',
        'asin',
        'atan',
        'acos',
        'sinh',
        'tanh',
        'cosh',
        'asinh',
        'atanh',
        'acosh',
        'ceil',
        'floor',
        'abs',
        'exp',
        'ln',
        'log',
        'pow'
    ];

    public FunctionizeCalls(exp: string): string {
        console.log(exp);
        return exp.replace(
            /([a-z]+)([1-9]*)\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g,
            (e, $1, $2, $3) => {
                console.log($1);
                if (this.math_func.indexOf($1) >= 0) {
                    return `${$1 + $2}(${this.FunctionizeCalls($3)})`;
                }
                return `funcs.${$1 + $2}.array(${this.FunctionizeCalls(
                    $3
                )}, funcs)`;
            }
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

    /**
     * @see https://medium.freecodecamp.org/how-to-build-a-math-expression-tokenizer-using-javascript-3638d4e5fbe9
     * But the tokenizer will be a bit different.
     */
    public tokenize(expression: any): any {
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

        const math_functions = (expression: string, returns?: boolean) => {
            const mfuncs = [
                'sin',
                'tan',
                'cos',
                'asin',
                'atan',
                'acos',
                'cos',
                'sinh',
                'tanh',
                'cosh',
                'asinh',
                'atanh',
                'acosh',
                'cosh',
                'ceil',
                'floor',
                'abs',
                'exp',
                'ln',
                'log',
                'sqrt'
            ];
            for (let i = 0; i < mfuncs.length; i++) {
                const func = mfuncs[i];
                if (expression.indexOf(func) == 0) {
                    if (returns == true) {
                        return func;
                    } else {
                        return true;
                    }
                }
            }
            return false;
        };

        const math_numbers = ['e', 'pi'];

        expression = expression.trim();

        if (!isNaN(expression)) {
            return {
                type: 'number',
                value: expression
            };
        } else if (expression == 'x') {
            return {
                type: 'variable',
                value: 'x'
            };
        } else if (expression.indexOf('+') >= 0) {
            let exp_spl: string[] = expression.split('+');
            let value: any[] = [];

            exp_spl.forEach(e => {
                value.push(this.tokenize(e));
            });

            return {
                type: 'plus',
                value
            };
        } else if (expression.indexOf('-') >= 0) {
            let exp_spl: string[] = expression.split('-');
            let value: any[] = [];

            exp_spl.forEach((e, i) => {
                e = e.trim();
                if (i == 0 && e == '') {
                    value.push(this.tokenize(0));
                } else {
                    value.push(this.tokenize(e));
                }
            });

            return {
                type: 'minus',
                value
            };
        } else if (expression.indexOf('*') >= 0) {
            let exp_spl: string[] = expression.split('*');
            let value: any[] = [];

            exp_spl.forEach(e => {
                value.push(this.tokenize(e));
            });

            return {
                type: 'times',
                value
            };
        } else if (expression.indexOf('/') >= 0) {
            let exp_spl: string[] = expression.split('/');
            let rm = (array: any[]) => {
                array.shift();
                return array;
            };
            let value: any[] = [
                this.tokenize(exp_spl[0]),
                this.tokenize('(' + rm(exp_spl).join(')*(') + ')')
            ];

            return {
                type: 'over',
                value
            };
        } else if (/^\$([0-9]+)$/.test(expression) == true) {
            return this.tokenize(this.partials[expression]);
        } else if (expression.indexOf('^') > 0) {
            let spl_exp = expression.split('^');

            if (spl_exp.length == 2) {
                return {
                    type: 'power',
                    value: [
                        this.tokenize(spl_exp[0]),
                        this.tokenize(spl_exp[1])
                    ]
                };
            } else {
                throw new Error('Unexpected expression');
            }
        } else if (math_functions(expression) == true) {
            let start = math_functions(expression, true);
            return {
                type: 'function',
                value: start,
                args: this.tokenize(expression.replace(start, ''))
            };
        } else if (expression.indexOf(',') >= 0) {
            let spl_exp: string[] = expression.split(',');

            return spl_exp.map(element => {
                return this.tokenize(element);
            });
        } else {
            throw new Error('Could not parse expression ' + expression);
        }
    }
}

export class InvalidExpressionError extends Error {
    public type = 'IE';
}

export class MathObject extends Parser {
    private ce: string[] = [];
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

    public getRoots() {}

    public getDomF(tokens: any, clear = true) {
        if (clear == true) this.ce = [];

        if (
            tokens.type === 'plus' ||
            tokens.type === 'minus' ||
            tokens.type === 'times'
        ) {
            let value: any[] = tokens.value;
            value.forEach(e => {
                this.getDomF(e);
            });
        } else if (tokens.type == 'over') {
            this.ce.push(JSON.stringify(tokens.value[1]) + ' not null');
        } else if (tokens.type == 'function' && tokens.value == 'sqrt') {
            this.ce.push(JSON.stringify(tokens.args) + '>=0');
        }

        if (clear === true) {
            if (this.ce.length === 0) {
                return 'R';
            } else {
                return 'ce : ' + this.ce.join('\n');
            }
        }
    }
}
