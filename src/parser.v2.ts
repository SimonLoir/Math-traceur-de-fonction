import MathObject from "./math";
import P from "./parser";

export default class Parser {
    protected partials: any = {};
    public type = "parser";

    /**
     * Initialise a parsing task
     * @param {String} expression the expression that has to be parsed
     */
    public parse(expression: string) {
        // 1) We have to check wheter or not the expression is valid

        if (this.check(expression) == false) {
            throw new InvalidExpressionError("Invalid expression given");
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
        expression = expression.replace(
            /\$([0-9]+)/gi,
            (e, $1) => "(" + this.partials["$" + $1] + ")"
        );

        return expression;
    }

    /**
     * Checks if the number of ( is equal to the number of )
     * @param exp the expression to check
     */
    protected check(exp: string) {
        let open_brackets_number = exp.split("(").length;
        let close_brackets_number = exp.split(")").length;
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
        exp = exp.replace(/²/gi, "^2");
        exp = exp.replace(/³/gi, "^2");
        exp = exp.replace(/X/g, "x");
        exp = exp.replace(/([0-9]+)x/gi, (exp, $1) => {
            return `(${$1}*x)`;
        });

        let processed_exp = "";
        let parenthesis_level = 0;
        let buffer = "";
        for (let i = 0; i < exp.length; i++) {
            const char = exp[i];
            let e = "$" + (Object.keys(this.partials).length + 1);
            if (parenthesis_level >= 1) {
                if (char == ")") {
                    parenthesis_level -= 1;
                    if (parenthesis_level == 0) {
                        if (this.type == "parser") {
                            this.partials[e] = this.parse(buffer);
                        } else {
                            //@ts-ignore
                            this.partials[e] = this.derivative(buffer);
                        }
                        buffer = "";
                    } else {
                        buffer += char;
                    }
                } else {
                    if (char == "(") {
                        parenthesis_level += 1;
                    }
                    buffer += char;
                }
            } else {
                if (char == "(") {
                    parenthesis_level += 1;
                    processed_exp += e;
                } else {
                    processed_exp += char;
                }
            }
        }
        return processed_exp;
    }

    public getComputedValue(value: string) {
        const math = new MathObject();
        const parse = new P();

        if (value.indexOf("dérivée ") == 0) {
            value = parse.stringify(
                math.derivate(parse.exec(value.replace("dérivée ", "")))
            );
        } else if (value.indexOf("dérivée_seconde ") == 0) {
            value = parse.stringify(
                math.derivate(
                    math.derivate(
                        parse.exec(value.replace("dérivée_seconde ", ""))
                    )
                )
            );
        }

        return value;
    }
}

export class InvalidExpressionError extends Error {
    public type = "IE";
}
