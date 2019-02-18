import smath from '../core';
import TimersManager from './time';
import { $ } from '../extjs';

let s = new smath();
let exp = '2x-sin(x)';
let a = 0;
let t = new TimersManager();
let from = 0;
let to = 10000;
const code = async (a: number) => {
    /**
     * Test avec fonction évaluée une fois
     */
    let x = await s.expression.create(exp).assembly();
    t.start('time_func_one_wasm' + a);
    for (let i = from; i < to; i += 0.5) {
        x(i);
    }
    t.end('time_func_one_wasm' + a);
    /**
     * Test avec fonction évaluée une fois
     */
    let f = s.expression.create(exp).function;
    t.start('time_func_one_eval' + a);
    for (let i = from; i < to; i += 0.5) {
        f(i);
    }
    t.end('time_func_one_eval' + a);
};
while (a < 1) {
    code(a);
    a++;
}

$('body')
    .child('button')
    .text('result')
    .click(() => {
        t.export();
    });

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
