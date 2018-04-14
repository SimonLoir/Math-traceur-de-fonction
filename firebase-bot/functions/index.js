const functions = require('firebase-functions');
const url = require('url');
const smath = require('./smath/parser').default;
const Parser = require('./smath/parser.v2').default;

exports.app = functions.https.onRequest((request, response) => {
    response.setHeader('content-type', 'application/json');
    let data = url.parse(request.url, true).query;

    if (data.function == undefined) {
        response.send('Error : no function has been passed');
        return;
    }

    //let parser = new smath();

    let parserv2 = new Parser();

    //let func = parser.exec(data.function);

    let funcv2 = parserv2.parse(data.function);

    let interval = {};

    if (data.interval != undefined) {
        let xfunc = parserv2.Functionize(funcv2);
        let from = parseFloat(data.interval.split(';')[0]);
        let to = parseFloat(data.interval.split(';')[1]);
        let step = parseFloat(data.interval.split(';')[2]);

        while (from < to) {
            interval[from] = xfunc(from);
            from += step;
        }
    }

    response.send(
        JSON.stringify({
            /*
            processed: parser.stringify(func),
            raw: func,*/
            interval: interval,
            jsMath: funcv2
        })
    );
});
