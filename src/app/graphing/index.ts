import smath from '../../core';
import '../style/graphing.scss';
import canvas from '../../core/graph/canvas';
let s = new smath();
let g = s.graph.create(new canvas(document.querySelector('canvas')));
g.draw();
console.log(g);
