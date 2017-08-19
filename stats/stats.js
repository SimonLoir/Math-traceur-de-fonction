var s = new SMath();

$(document).ready(function () {

    var chart = jsChart(".graph", {

        chart: {

            title: "SMath stats",
            title_color: "darkgray",
            type: "circular",
            width: "fit",
            height: "fit",
            theme: "none",
            hide: []
        },

        datasets: [] // dataset structure : {"label": "Test 1","value": 500}

    });



    $("#new").click(function () {

        prompt('xi (caractère)', "", function ( x ) {
            if (x == null || x.trim() == "") {
                return;
            }
            prompt('Effectif', 1, function (e){

                if (e == null || e.trim() == "") {
                    return;
                }
                e = parseFloat(e);
                chart.setDataSets([]);
                if (s.stats.buffer.tab[x.trim()] != undefined) {
                    s.stats.buffer.tab[x.trim()] += e;
                } else {
                    s.stats.buffer.tab[x.trim()] = e;
                }
        
                var keys = Object.keys(s.stats.buffer.tab);
        
                keys = keys.sort();
        
                var table = document.querySelector('.e_table');
        
                table.innerHTML = "<tr><th>xi</th><th>effectif</th><th>effectif cumulé</th></tr>"
                var eff = 0;
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    eff += s.stats.buffer.tab[key];
                    table.innerHTML += "<tr>"
                        + "<td>" + key + "</td>"
                        + "<td>" + s.stats.buffer.tab[key] + "</td>"
                        + "<td>" + eff + "</td>"
                        + "</tr>";
                    chart.newDataSet({ "label": key, "value": s.stats.buffer.tab[key] })
                }

            });
        });
        
    });

});

window.prompt = function (text, value, callback) {
    var id = "#prompt_dialog";
    var dialog = document.querySelector(id);
    dialog.style.display = "block";

    var sent = false;

    document.querySelector('.prompt_text').innerHTML = text;

    if (value != undefined) {
        document.querySelector("#prompt_default").value = value;
    }

    //pvalidate
    //pcancel

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

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) { }
} 