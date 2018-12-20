import './scss/home.scss';

if (typeof process !== 'undefined') {
    let fs = require('fs');
    let fcontent = JSON.parse(
        fs.readFileSync(__dirname + '/package.json', 'utf-8')
    );
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://math.simonloir.be/package.json', true);
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                /*if (JSON.parse(xhr.responseText).version == fcontent.version) {
                    document.querySelector('.content-header').innerHTML =
                        'SMath est disponible hors connexion et est à jour en version ' +
                        fcontent.version;
                } else {
                    document.querySelector('.content-header').innerHTML =
                        "SMath est disponible hors connexion mais n'est pas à jour : la version  " +
                        JSON.parse(xhr.responseText).version +
                        ' est disponible pour remplacer la version locale : ' +
                        fcontent.version;
                }*/
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function(e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

if ('serviceWorker' in navigator)
    navigator.serviceWorker
        .register('./sw.js')
        .then((registration: ServiceWorkerRegistration) => {
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

let down: HTMLButtonElement = document.querySelector('#download');
down.addEventListener('click', () => {
    document.getElementById('dpage').style.display = 'block';
});
document.getElementsByClassName('mask')[0].addEventListener('click', () => {
    document.getElementById('dpage').style.display = 'none';
});
document.getElementById('d_windows').onclick = () => {
    let a = document.createElement('a');
    a.href = 'downloads/setup.exe';
    a.setAttribute('download', 'setup.exe');
    a.setAttribute('target', '_blank');
    a.click();
};
