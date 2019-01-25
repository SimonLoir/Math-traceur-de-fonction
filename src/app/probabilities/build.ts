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

        let spl = e.split(/\r\n|\n|\r/);
        e = '';
        spl.forEach(str => {
            if (str.trim() == '' || str.indexOf('=') < 0) return;
            let x = str.split('=');
            let event_name = x[0].trim(); // The first part (aka the variable name)
            x.shift();
            let event = x
                .join('=')
                .trim()
                .replace(/"/g, '')
                .replace(/[^\<\>]=/g, '==');
            if (event.trim() == '') return;
            event = event.toLowerCase();
            event = event.replace(/est\spair/g, ' %2 == 0');
            event = event.replace(/est\simpair/g, ' %2 == 1');
            event = event.replace(/é/g, 'e');
            event = event.replace(/è/g, 'e');
            event = event.replace(/premier/g, 'isPrime');
            event = event.replace(/ou/g, '||');
            event = event.replace(/et/g, '&&');
            e += `let ${event_name} = base.filter(element => ${event});\n`;
            console.log(event, event_name);
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
