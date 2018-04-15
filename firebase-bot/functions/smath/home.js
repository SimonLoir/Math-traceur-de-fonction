"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./scss/home.scss");
document.querySelector('header').style.backgroundImage =
    'url(./images/site-header.jpg)';
//@ts-ignore
document.querySelector('.graph').style.backgroundImage =
    'url(./images/graph.jpg)';
//@ts-ignore
document.querySelector('.stats').style.backgroundImage =
    'url(./images/stats.jpg)';
window.addEventListener('scroll', function (evt) {
    if (window.scrollY > 20) {
        document.querySelector('header').classList.add('floating');
    }
    else {
        document.querySelector('header').classList.remove('floating');
    }
});
if (typeof process !== 'undefined') {
    var fs = require('fs');
    var fcontent_1 = JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf-8'));
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://math.simonloir.be/package.json', true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (JSON.parse(xhr.responseText).version == fcontent_1.version) {
                    document.querySelector('.content-header').innerHTML =
                        'SMath est disponible hors connexion et est à jour en version ' +
                            fcontent_1.version;
                }
                else {
                    document.querySelector('.content-header').innerHTML =
                        "SMath est disponible hors connexion mais n'est pas à jour : la version  " +
                            JSON.parse(xhr.responseText).version +
                            ' est disponible pour remplacer la version locale : ' +
                            fcontent_1.version;
                }
            }
            else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}
if ('serviceWorker' in navigator)
    navigator.serviceWorker
        .register('./sw.js')
        .then(function (registration) {
        console.log('activated');
    });
/*Notification.requestPermission(function(result) {
    if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            let notification = registration.showNotification(
                'Vibration Sample',
                {
                    body: 'Buzz! Buzz!',
                    icon: '../images/scode-2.18-logo192x192.png',
                    tag: 'vibration-sample'
                }
            );
        });
    }
});*/
