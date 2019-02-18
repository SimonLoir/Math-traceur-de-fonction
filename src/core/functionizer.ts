export default class functionizer {
    public static functionize(code: string) {
        return this.Functionize(code, true);
    }

    protected static partials: any = {};
    public type = 'parser';

    /**
     * Initialise a parsing task
     * @param {String} expression the expression that has to be parsed
     */
    public static parse(expression: string) {
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

        // We tranform ! into factorial
        /*expression = expression.replace(
            /([\$0-9xe]+)\^([\$0-9xe]+)/gi,
            (e, $1, $2) => `pow(${$1}, ${$2})`
        );*/

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
    protected static check(exp: string) {
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
    protected static prepareExpression(exp: string) {
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

    /**
     * Creates a function to run the expression
     */
    protected static Functionize(exp: string, parse = true) {
        if (parse == true) {
            exp = this.parse(exp);
        }
        //console.log(exp);
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
            
            const cot = (x) => 1 / Math.tan(x);
            const csc = (x) => 1 / Math.sin(x);
            const sec = (x) => 1 / Math.cos(x);
            
            const sinh = Math.sinh;
            const tanh = Math.tanh;
            const cosh = Math.cosh;
            const asinh = Math.asinh;
            const atanh = Math.atanh;
            const acosh = Math.acosh;

            const ceil = Math.ceil;
            const floor = Math.floor;
            const abs = Math.abs;
            const ln = Math.log;
            const log = function (base, y) { 
                if(y == undefined) {
                    y = base;
                    base = 10;
                }
                return Math.log(y) / Math.log(base)
            };

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

            const exp = function (base, y){
                if(y == undefined){
                    return Math.exp(base);
                } else {
                    return pow(base, y);
                }
            }; 

            const gamma = function (z) {
                let g = 7;
                let C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
                if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
                else {
                    z -= 1;
            
                    var x = C[0];
                    for (var i = 1; i < g + 2; i++)
                    x += C[i] / (z + i);
            
                    var t = z + g + 0.5;
                    return Math.sqrt(2 * Math.PI) * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;
                }
            }
            
            return ${this.FunctionizeCalls(exp)};
            
            `
        );
    }

    private static math_func = [
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
        'pow',
        'cot',
        'sec',
        'csc',
        'gamma'
    ];

    public static FunctionizeCalls(exp: string): string {
        //console.log(exp);
        return exp.replace(
            /([a-z]+)([1-9]*)\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g,
            (e, $1, $2, $3) => {
                //console.log($1);
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
    public static clean(expression: string) {
        let pattern = /([^a-z\/])\(([0-9x]+)\)/gi;

        while (pattern.test(expression)) {
            expression = expression.replace(pattern, (e, $1, $2) => $1 + $2);
        }

        expression = expression.replace(/\*([0-9]+)/gi, (e, $1) =>
            $1 == 1 ? '' : e
        );

        expression = expression.replace(/\^([0-9]+)/gi, (e, $1) =>
            $1 == 1 ? '' : e
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
