/**
 * The only prupose of this package is to build and executable file
 */
const electron = require('electron');
const app = electron.app;
const bw = electron.BrowserWindow;
const path = require('path');
const url = require('url');

app.on("ready", function () {
    const screen = electron.screen;

    var welcome =  new bw({frame:false});

    welcome.loadURL(url.format({
        pathname: path.join(__dirname, "launch.html"),
        protocol: "file:",
        slashes: true
    }));

    setTimeout(function () {
        var main_window = new bw({show:false});
        welcome.close();
        
        main_window.maximize();
        //main_window.openDevTools();
        main_window.loadURL(url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        }));
        main_window.on("closed", function () {
            main_window = null;
            app.exit();
        }); 
        setTimeout(function() {
            main_window.show();
        }, 500);
    }, 2500);
});