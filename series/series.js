$(document).ready(calculate)
function calculate(e) {
    var xstart = $('#xstart');
    var xend = $('#xend');
    var data = $('#data');
    var to_know = $('#to_know');
    var result = $('#result');

    var known = {
        type: undefined,
        number_of_xs: 0,
        xs: {},
        sum: undefined,
        reason:undefined
    }

    var data_array = data.node.innerText.split(/\r?\n/);
    for (var i = 0; i < data_array.length; i++) {
        data_array[i] = data_array[i].split('=');
        //console.log(data_array)
        var x = data_array[i];
        if (x.length > 1) {
             if (x[0].trim() == "x0") {
                known.u0 = parseFloat(x[1].trim());
                known.xs["0"] = parseFloat(x[1]);
                known.number_of_xs += 1;
            } else if (x[0].indexOf('x') == 0) {
                known.xs[x[0].replace('x', "").trim()] = parseFloat(x[1]);
                known.number_of_xs += 1;
            } else if (x[0].trim() == "type" && (x[1].trim() == "SA" || x[1].trim() == "SG")) {
                known.type = x[1].trim();
            } else if (x[0].trim() == "r" || x[0].trim() == "q") {
                known.reason = parseFloat(x[1].trim());
            } else {
            }
        }
    }


    /**
     * We try to verify if the program has enough data to find wether or not it's a SA or a SG
     */
    if (known.type == undefined && known.number_of_xs < 3) {
        return result.html("Merci de préciser des valeurs pour au moins trois éléments de la suite.");
    }


    var keys = Object.keys(known.xs);
    keys = keys.sort();
    var errors = 0;
    //if SA 
    var r = undefined;
    for (var i = 0; i < keys.length; i++) {
        var e = known.xs[keys[i]];
        if (i != 0) {
            var emoins1 = known.xs[keys[i - 1]];
            var er = (e - emoins1) / (keys[i] - keys[i - 1]);
            if (r == undefined) {
                r = er;
            } else {
                if (r != er) {
                    errors++;
                }
            }
            console.log(r)
        }
    }

    if (errors) {
        if(known.type == "SA"){
            return result.html('Cette suite ne peut pas être une suite arithmétique')
        }
        return result.html('Impossible de trouver la raison et le type de suite.')
    }else if(r == undefined && known.reason == undefined){
        if(known.type == "SA"){
            
        }else{

        }
    } else {
        if(known.type != "SG"){
            known.type = "SA";
            if(r != undefined){
                known.reason = r;
            }else if(known.reason == undefined){
                return result.html('Impossible de trouver la raison et le type de suite.')
            }

            if(known.u0 == undefined){
                known.u0 = known.xs[keys[0]] + (0-keys[0]) * known.reason;
            }else{
            }
        }
    }

    result.html('');

    var table = result.child('table');

    var head = table.child("tr");
    var content = table.child("tr");
    var x_sum = table.child("tr");

    var data_array = to_know.node.innerText.split(/\r?\n/);

    if (known.type == "SA") {
        var i = parseInt(xstart.node.innerText) - 1;
        while (i < parseInt(xend.node.innerText)) {
            i++;
            head.child('th').html('x<sub>' + i +'</sub>');
            var x_val = known.u0 + i * known.reason;
            content.child('td').html(x_val);
            x_sum.child("td").html(0.5 * (i+1) * (known.u0 + x_val));
        }

        for (var i = 0; i < data_array.length; i++) {
            data_array[i] = data_array[i].split('=');
            //console.log(data_array)
            var x = data_array[i];
            if (x.length > 1) {
                 if (x[0].trim() == "x0") {
                    result.html(result.html() + "<br />x<sub>0</sub> = " + known.u0);
                } else if (x[0].indexOf('x') == 0) {
                    result.html(result.html() + "<br />x<sub>" + x[0].replace('x', "").trim() + "</sub> = " + (known.u0 + parseFloat(x[0].replace('x', "").trim()) * known.reason));
                }else if (x[0].indexOf('s') == 0) {
                    x[0] = x[0].toLowerCase();
                    var n = parseFloat(x[0].replace('s', "").trim());
                    var x_val = known.u0 + n * known.reason;
                    var sum = 0.5 * (n+1) * (known.u0 + x_val);
                    result.html(result.html() + "<br />S<sub>" + n+ "</sub> = "  + sum);
                } else if (x[0].trim() == "type") {
                    result.html(result.html() + "<br />Type de suite : SA");                    
                } else if (x[0].trim() == "r") {
                    result.html(result.html() + "<br />Raison : " + known.reason);                                        
                }
            }
        }
    }

}

window.prompt = function (text, value, callback) {
    var id = "#prompt_dialog";
    var dialog = document.querySelector(id);
    dialog.style.display = "block";

    var sent = false;

    document.querySelector('.prompt_text').innerHTML = text;

    if (value != undefined) {
        document.querySelector("#prompt_default").value = value;
    }

    var validate = document.querySelector("#pvalidate");
    var val = "";
    validate.onclick = function () {
        val = document.querySelector("#prompt_default").value;
        dialog.style.display = "none";
        callback(val);
    }
    var cancel = document.querySelector("#pcancel");
    var canceled = false;
    cancel.onclick = function () {
        dialog.style.display = "none";
    }
}
