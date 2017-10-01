var server_operations = false;
var low_power_device = false;

$(document).ready(function () {
    setTimeout(function () {
        document.querySelector('.messages').innerHTML = '<div class="wrapper"><div class="message">Bonjour, je suis SMath ! Je suis un bot capable de résoudre des équations graphiquement. Je peux aussi te servir de calculatrice :-). Pour commencer, tu peux entrer l\'expression que tu voudrais résoudre. Tu peux aussi écrire aide pour que je t\'explique ce dont je suis capable et comment je fonctionne.<br /> Attention: Je suis encore en alpha, certaines fonctionnalités annoncées ne fonctionnent peut-être pas.</div></div>';

    }, 500);

    AR.GET("bot/php.php", function ( data ) {

        if(data == "ok"){
            server_operations = true;
        }

    }); 

    var form = document.querySelector('form');
    form.onsubmit = function () {
        var expbar = document.querySelector('.expression_bar');
        var exp = expbar.value;
        expbar.value = "";

        if (exp.trim() == "") {
            return false;
        }

        var wrapper = document.querySelector('.messages').appendChild(document.createElement('div'));
        wrapper.classList.add('wrapper');
        wrapper.classList.add('you');

        var message = wrapper.appendChild(document.createElement('div'));
        message.innerHTML = exp
        message.classList.add('message');

        var wrapper_answer = document.querySelector('.messages').appendChild(document.createElement('div'));
        wrapper_answer.classList.add('wrapper');

        var message_answer = wrapper_answer.appendChild(document.createElement('div'));
        message_answer.innerHTML = bot.exec(exp);
        message_answer.classList.add('message');

        scrollDown();

        return false;

    }

    function scrollDown() {
        document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight
    }

    var bot = {
        eval: function (exp){
            return eval(exp);
        },
        last: "",
        s: new SMath(),
        exec: function (exp) {

            if (exp.indexOf('json ') == 0) {
                this.last = "";
                return JSON.stringify(this.s.exec(exp.replace('json ', "")));
            } else if (exp.indexOf('eval ') == 0) {
                this.last = "";
                try {
                    var eval_r = this.eval(exp.replace('eval ', ""));
                } catch (error) {
                    var eval_r = error;
                }
                if(eval_r == undefined){

                }else{
                    return "Code javascript pris en compte : " + eval_r;
                }
            } else if (exp == ":g" || exp == "@") {

                return this.exec('graphique ' + this.last);

            } else if (exp.indexOf('graphique ') == 0 || exp.indexOf(':g ') == 0) {

                var real_exp = exp.replace('graphique ', "").replace(':g ', "");

                this.last = real_exp;

                setTimeout(function () {

                    var wrapper_answer = document.querySelector('.messages').appendChild(document.createElement('div'));
                    wrapper_answer.classList.add('wrapper');

                    var message_answer = wrapper_answer.appendChild(document.createElement('div'));
                    message_answer.classList.add('message');
                    message_answer.style.width = "100%";
                    message_answer.style.height = "50vh";

                    var big_canvas = message_answer.appendChild(document.createElement('div'));
                    big_canvas.style.height = "100%";
                    big_canvas.style.width = "100%";
                    big_canvas.style.overflow = "auto";

                    var canvas = big_canvas.appendChild(document.createElement('canvas'));

                    canvas.style.width = "300%";
                    canvas.style.height = "300%";

                    canvas.height = canvas.scrollHeight;
                    canvas.width = canvas.scrollWidth;

                    canvas.style.width = canvas.width + "px";
                    canvas.style.height = canvas.height + "px";

                    var ctx = canvas.getContext('2d');

                    var interval = 20;

                    var x_zero = canvas.width / 2;
                    var y_zero = canvas.height / 2;

                    var grid = new SMath();
                    grid.ctx = ctx;
                    grid.color = "red";
                    grid.x_zero = x_zero;
                    grid.y_zero = y_zero;
                    grid.interval = interval;

                    grid.makeGrid();
                    grid.newLine(0, -1000, 0, 1000, "black", undefined, 1);
                    grid.newLine(-1000, 0, 1000, 0, "black", undefined, 1);

                    grid.draw(real_exp);

                    scrollDown();


                    big_canvas.scrollLeft = big_canvas.scrollWidth / 2 - big_canvas.offsetWidth / 2;
                    big_canvas.scrollTop = big_canvas.scrollHeight / 2 - big_canvas.offsetHeight / 2;

                }, 300);

                return 'Voici ce que je peux dessiner :<br /><a href="graph.html#functions=%5B%5B%22' + real_exp + '%22%2C%22%23bd282b%22%5D%5D">Voir sur SMath</a>';
            } else if (exp.indexOf("aide") >= 0 || exp.indexOf("help") >= 0) {
                var s = "<br />";
                var help = "Comment fonctionne le bot SMath ?<ul>" + s
                + "<li>json {expression mathématique} retourne l'expression mathématique en JSON</li>" + s
                + "<li>graphique {expression mathématique} trace le graphique en fonction de l'expression</li>" + s
                + "<li>:g ou @ tracent un graphique par rapport à la dernière expression en mémoire</li>" + s 
                + "<li>aide ou help retournent l'aide</li>" + s
                + "<li>simplement écrire l'expression mathématique va la simplifier et tenter de l'ordonner</li></ul>"
                return help;
            } else {
                this.last = bot.stringify(this.s.exec(exp));
                return "Voici l'expression simplifiée et ordonnée : " + this.last;
            }

        },
        stringify: function (array) {
           var s = new SMath();
            return s.stringify(array);
        }
    }

});