import "./scss/home.scss";

document.querySelector('header').style.backgroundImage = "url(./images/site-header.jpg)";
//@ts-ignore
document.querySelector('.graph').style.backgroundImage = "url(./images/graph.jpg)";

window.addEventListener("scroll", (evt: Event) => {
    if (window.scrollY > 20) {
        document.querySelector('header').classList.add('floating')
    } else {
        document.querySelector('header').classList.remove('floating')
    }
});

if (typeof process !== "undefined") {
    let fs = require('fs');
    let fcontent = JSON.parse(fs.readFileSync(__dirname + '/package.json', "utf-8"));
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://math.simonloir.be/package.json", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if(JSON.parse(xhr.responseText).version == fcontent.version){
                    document
                        .querySelector('.content-header')
                        .innerHTML = "SMath est disponible hors connexion et est à jour en version " + fcontent.version;
                }else{
                    document
                        .querySelector('.content-header')
                        .innerHTML = "SMath est disponible hors connexion mais n'est pas à jour : la version  "+ JSON.parse(xhr.responseText).version + " est disponible pour remplacer la version locale : " + fcontent.version;
                }
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}