import smath from '../core';
import TimersManager from './time';

let s = new smath();
let exp = 'x²+6x+3';
let a = 0;
let t = new TimersManager();
let from = 0;
let to = 200;
const code = async (a: number) => {
    /**
     * Test avec fonction (évaluée à chaque tour)
     */
    t.start('time_func' + a);
    let numbers: number[] = [];
    for (let i = from; i < to; i++) {
        numbers.push(s.expression.create(exp).function(i));
    }
    t.end('time_func' + a);
    /**
     * Test avec fonction évaluée une fois
     */
    t.start('time_func_one_eval' + a);
    numbers = [];
    let f = s.expression.create(exp).function;
    for (let i = from; i < to; i++) {
        numbers.push(f(i));
    }
    t.end('time_func_one_eval' + a);
    numbers = [];
};
while (a < 10) {
    code(a);
    a++;
}

t.export();

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
