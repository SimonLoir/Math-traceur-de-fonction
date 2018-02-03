import "./scss/drawer.scss";
import canvas from "./canvas";

let c: canvas = new canvas(document.querySelector('canvas'));

window.onresize = () => {
    c.init();
}

