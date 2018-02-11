const functions = require('firebase-functions');
const url = require('url');
const smath = require('./smath/parser').default;
const MathObject = require('./smath/math').default;

exports.app = functions.https.onRequest((request, response) => {
    response.setHeader('content-type', 'application/json');
    let data = url.parse(request.url, true).query;

    if(data.function == undefined){
        response.send('Error : no function has been passed');
        return;
    }

    let parser = new smath();
    
    let math = new MathObject();

    let func = parser.exec(data.function);

    let interval = {};

    if(data.interval != undefined){
        let from = parseFloat(data.interval.split(';')[0]);
        let to = parseFloat(data.interval.split(';')[1]);
        let step = parseFloat(data.interval.split(';')[2]);

        while (from < to) {
            interval[from] = MathObject.getFor(from, func)
            from += step;
        }
    }

    response.send(JSON.stringify(
        {
            processed: parser.stringify(func),
            raw: func,
            interval:interval
        }
    ));
});
