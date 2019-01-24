import { $ } from '../../extjs';
import codeBuilder from './build';

let area = $('#area');
area.child('span').html('&Omega; = {');
let omega = area
    .child('span')
    .attr('contentEditable', 'true')
    .text(
        '(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),' +
            '(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),' +
            '(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),' +
            '(4,1),(4,2),(4,3),(4,4),(4,5),(4,6),' +
            '(5,1),(5,2),(5,3),(5,4),(5,5),(5,6),' +
            '(6,1),(6,2),(6,3),(6,4),(6,5),(6,6)'
    );

area.child('span').text('}');

area.child('h3').text('Évènements');

let events = area.child('div');
events.attr('contentEditable', 'true');
events.text('A = "element[0] % 2 = 0"');

area.child('h3').text('Recherche');

let research = area.child('div');
research.attr('contentEditable', 'true');
research.text('A');

area.child('h3').text('Résultats');
let result = area.child('div');

let c = new codeBuilder(omega, events, research);
const build = () => {
    let code = c.buildCode();
    result.html('');
    console.log(code);
    const log = (text: string, p: string = '$text') => {
        p = p.replace(/\$text/g, text);
        result.html(result.html() + p + '<br />');
    };
    eval(code);
};
research.input(() => {
    build();
});
events.input(() => {
    build();
});
omega.input(() => {
    build();
});

build();
