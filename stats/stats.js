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
        var use_classes = $('#use_classes').node.checked;

        if(use_classes){

            if(s.stats.buffer.brackets == undefined){
                prompt('Lors de la définition d\' une classe, nous utilisons la nomenclature suivante : [nbr;nbr[ ou ]nbr;nbr]. Utilisez-vous ] ou [ ? ', "[", function(x) {
                    s.stats.buffer.brackets = x;
                    asker_continue(x, true, chart);
                });
            }else{
                asker_continue(s.stats.buffer.brackets, true, chart);                
            }

        }else{
            asker_continue("", false, chart);
        }

        

    });

});


function asker_continue(response, use_classes, chart){
    if(use_classes == true){
        if(response.trim() != "[" && response.trim() != "]"){
            alert('Erreur : argument invalide');
            return false;
        }
        text1 = "Classe (sans les [ ou ] ). Notez que la classe est définie en séparant les valeurs par un ; et non une ,";
    }else{
        text1 = "xi";
    }
    prompt(text1, "", function (x) {
        if (x == null || x.trim() == "") {
            return;
        }
        prompt('Effectif', 1, function (e) {

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

            build(use_classes, chart);
        });
    });
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

function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) { }
}

function build(use_classes, chart) {
    var keys = Object.keys(s.stats.buffer.tab);

    keys = keys.sort();

    var table = document.querySelector('.e_table');

    

    if (use_classes == true) {
        var th0 = "<th>Classe</th>";
    } else {
        var th0 = "";
    }

    table.innerHTML = "<tr>" + th0 + "<th>xi</th><th>effectif</th><th>effectif cumulé</th></tr>"
    var eff = 0;
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if(use_classes == true){
            var td0 = "<td>" + s.stats.buffer.brackets + key +  s.stats.buffer.brackets + "</td>";
            key = key.replace('[', "").replace(']', "");
            if(key.indexOf(';') <= 0){
                text = key + ":" + key;
            }else{
                text = key;
            }
            var td1 = ""
        }else{
            var td0 = "";
            var td1 = key;
            text = key;      
        }
        eff += s.stats.buffer.tab[key];
        table.innerHTML += "<tr>"
            + td0
            + "<td>" + td1 + "</td>"
            + "<td>" + s.stats.buffer.tab[key] + "</td>"
            + "<td>" + eff + "</td>"
            + "</tr>";
        chart.newDataSet({ "label": key, "value": s.stats.buffer.tab[key] })
    }

}