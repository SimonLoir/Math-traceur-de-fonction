import smath from "../../core";
import "../style/graphing.scss";
import canvas from "../../core/graph/canvas";
import { $ } from "../../extjs";
import TimersManager from "../../benchmark/time";

let s = new smath();
let g = s.graph.create(new canvas(document.querySelector("canvas")));
g.register("function", {});
g.draw();

$("#objectButton").click(() => {
    let tk = $("#toolkit");
    if (tk.hasClass("hidden")) tk.removeClass("hidden");
    else tk.addClass("hidden");
});

let f = s.expression.create("Math.sin(x)");
f.assembly().then(nativecode => {
    let sum = 0;
    const t = new TimersManager();
    t.start("assembly");
    for (let i = 0; i < 250000; i++) {
        sum += nativecode(1000 + i);
    }
    t.end("assembly");
    sum = 0;
    t.start("js");
    for (let i = 0; i < 250000; i++) {
        sum += f.getFor(1000 + i);
    }
    t.end("js");
    t.export();
});
