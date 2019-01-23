import { $ } from '../../extjs';

let area = $('#area');
area.child('span').html('&Omega; = {');
let omega = area
    .child('span')
    .attr('contentEditable', 'true')
    .text('...');
area.child('span').text('}');

area.child('h3').text('Évènements');
let events = area.child('div');
