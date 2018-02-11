"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scss/home.scss");
document.querySelector('header').style.backgroundImage = "url(./images/site-header.jpg)";
//@ts-ignore
document.querySelector('.graph').style.backgroundImage = "url(./images/graph.jpg)";
window.addEventListener("scroll", function (evt) {
    if (window.scrollY > 20) {
        document.querySelector('header').classList.add('floating');
    }
    else {
        document.querySelector('header').classList.remove('floating');
    }
});
