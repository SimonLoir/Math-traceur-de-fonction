const functions = require('firebase-functions');
const url = require('url');
const s = require('./smath.min.js').smath;
const fs = require('fs');
const asc = require('assemblyscript/cli/asc');
const cors = require('cors')({ origin: true });
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
exports.buildWasm = functions.https.onRequest((request, response) => {
    cors(request, response, () => {});
    let exp = url.parse(request.url, true).query.exp;
    const parsed = s.expression.create(exp).parsedForm;
    const { binary, text, stdout, stderr } = asc.compileString(
        `
        function sin (x: f64):f64 { return Math.sin(x); };
        function tan (x: f64):f64 { return Math.tan(x); };
        function cos (x: f64):f64 { return Math.cos(x); };
        function asin (x: f64):f64 { return Math.asin(x); };
        function atan (x: f64):f64 { return Math.atan(x); };
        function acos (x: f64):f64 { return Math.acos(x); };
        function pow (base: f64, exponent: f64): f64{
            if(exponent % 1 != 0){
                for(let i = -7; i < 8; i = i + 2){
                    if(exponent == 1/i && base < 0) return 0 - 1 * Math.pow(0 - base, exponent);     
                }
            }
            return Math.pow(base, exponent);
        }
        export function add(x: f64): f64 {
            return ${parsed};
        }`,
        { optimizeLevel: 3 }
    );
    if (stderr != '') throw new Error(stderr);
    response.type('application/wasm');
    response.send(new Buffer(binary, 'binary'));
});

/**
 * const sin = Math.sin;
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
 */
