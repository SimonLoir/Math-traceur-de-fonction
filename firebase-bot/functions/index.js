const functions = require('firebase-functions');
const url = require('url');
const smath = require('./smath/parser').default;

exports.app = functions.https.onRequest((request, response) => {
    let data = url.parse(request.url, true).query;

    if(data.function == undefined){
        response.send('Error : no function has been passed');
        return;
    }

    let parser = new smath();
    
    response.send(JSON.stringify(parser.exec(data.function)));
});
