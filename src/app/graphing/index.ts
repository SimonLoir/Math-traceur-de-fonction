import smath from "../../core";
import "../style/graphing.scss";
import canvas from "../../core/graph/canvas";
import { $ } from "../../extjs";

let s = new smath();
let g = s.graph.create(new canvas(document.querySelector("canvas")));
g.register("function", {});
g.draw();

$("#objectButton").click(() => {
    let tk = $("#toolkit");
    if (tk.hasClass("hidden")) tk.removeClass("hidden");
    else tk.addClass("hidden");
});

s.expression
    .create("0.1*2*10+1*10+0.2*10+0")
    .assembly()
    .then(nativecode => {
        console.log(nativecode(3));
    });
