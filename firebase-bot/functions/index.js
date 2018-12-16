const functions = require('firebase-functions');
const url = require('url');
const smath = require('./smath/parser').default;
const Parser = require('./smath/parser.v2').default;
const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs');
const SVGGraph = require('./smath/svg').default;

exports.app = functions.https.onRequest(async (request, response) => {
    let data = url.parse(request.url, true).query;

    if (data.function == undefined) {
        response.send('Error : no function has been passed');
        return;
    }

    //let parser = new smath();

    let parserv2 = new Parser();

    //let func = parser.exec(data.function);

    let funcv2 = parserv2.parse(data.function);

    if (data.draw == 'true') {
        response.setHeader('content-type', 'image/png');
        console.log('is working');
        let graph = new SVGGraph(data.function, text => {
            console.log(text);
            fs.writeFileSync('/tmp/img.svg', text);

            gm('/tmp/img.svg')
                .setFormat('png')
                .toBuffer(function(err, buffer) {
                    if (err) console.log(err);
                    response.send(buffer);
                });
        });

        return;
    } else response.setHeader('content-type', 'application/json');

    if (data.compute != undefined) {
        try {
            let e = parserv2
                .Functionize(funcv2)(0)
                .toString();
            response.send(e);
        } catch (error) {
            response.send('error : ' + JSON.stringify(error.message));
        }

        return;
    }

    try {
        parserv2.Functionize(funcv2)(5);

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
    } catch (error) {
        response.send(
            JSON.stringify({
                error: true,
                message: error
            })
        );
    }
});
