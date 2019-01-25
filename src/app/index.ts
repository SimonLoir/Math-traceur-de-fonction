import './style/index.scss';
let down: HTMLButtonElement = document.querySelector('#download');
down.addEventListener('click', () => {
    window.location.href = 'graphing.html';
});
