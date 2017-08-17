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
    var main_window = new bw({
        width:screen.getPrimaryDisplay().size.width ,
        height:screen.getPrimaryDisplay().size.height ,
        backgroundColor:"white"
    });
    main_window.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }));
});