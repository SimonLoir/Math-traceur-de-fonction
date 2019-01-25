import { ExtJsObject } from '../../extjs';

export default class codeBuilder {
    constructor(
        private omega: ExtJsObject,
        private events: ExtJsObject,
        private search: ExtJsObject
    ) {}
    public buildCode() {
        let o: String = this.omega.text();
        let e: String = this.events.text();
        let s: String = this.search.text();

        o = o.replace(/;/g, ',');
        o = o.replace(/\(/g, '[');
        o = o.replace(/\)/g, ']');
        //e = e.replace(/=/g, '==');

        let spl = e.split(/\r\n|\n|\r/);
        e = '';
        spl.forEach(str => {
            if (str.trim() == '' || str.indexOf('=') < 0) return;
            let x = str.split('=');
            let _x = x[0].trim(); // The first part (aka the variable name)
            x.shift();
            let __x = x
                .join('=')
                .trim()
                .replace(/"/g, '')
                .replace(/[^\<\>]=/g, '==');
            if (__x.trim() == '') return;
            __x = __x.toLowerCase();
            __x = __x.replace(/est\spair/g, ' %2 == 0');
            __x = __x.replace(/est\simpair/g, ' %2 == 1');
            __x = __x.replace(/é/g, 'e');
            __x = __x.replace(/è/g, 'e');
            __x = __x.replace(/premier/g, 'isPrime');
            __x = __x.replace(/ou/g, '||');
            __x = __x.replace(/et/g, '&&');
            e += `let ${_x} = base.filter(element => ${__x});\n`;
            console.log(__x, _x);
        });

        spl = s.split(/\r\n|\n|\r/);
        s = '';
        spl.forEach(str => {
            str = str.trim();
            if (str == '') return;
            if (str.indexOf('#') == 0) s += `log(${str}, "${str} = $text");`;
            else
                s += `log(JSON.stringify(${str}).replace(/^\\[/g, "").replace(/\\]$/g, "").replace(/\\[/g, "(").replace(/\\]/g, ")"), "${str} = {$text}");`;
        });

        let code = `
        
        try {
            let base = [${o}];
            function isPrime(input) {
                let prime = true;
                for (let i = 2; i <= Math.sqrt(input); i++) {
                    if (input % i == 0) {
                        prime = false;
                        break;
                    }
                }
                return prime && (input > 1);
            }
            ${e}
            ${s}
        } catch (error) {
            log(error);
        }
        `;

        return code;
    }
}
