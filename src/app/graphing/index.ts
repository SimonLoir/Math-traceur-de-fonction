import smath from '../../core';
import '../style/graphing.scss';
import canvas from '../../core/graph/canvas';
import { $ } from '../../extjs';

let s = new smath();

let g = s.graph.create(new canvas(document.querySelector('canvas')));
g.register('function', {});
g.draw();

$('#objectButton').click(() => {
    let tk = $('#toolkit');
    if (tk.hasClass('hidden')) tk.removeClass('hidden');
    else tk.addClass('hidden');
});
