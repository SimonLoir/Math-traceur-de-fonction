const functions = require('firebase-functions');
const url = require('url');
const smath = require('./smath/canvas').default;
const canvas = require("canvas-prebuilt");

exports.app = functions.https.onRequest((request, response) => {
    let data = url.parse(request.url, true).query;

    if(data.function == undefined){
        response.send('Error : no function has been passed');
        return;
    }
    
    let canvas = new canvas(400,400);

    let s = new smath(canvas);

    response.send(request.url);
});
