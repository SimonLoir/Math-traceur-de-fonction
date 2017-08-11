setTimeout(function ()  {
document.querySelector('.messages').innerHTML = '<div class="wrapper"><div class="message">Bonjour, je suis SMath ! Je suis un bot capable de résoudre des équations graphiquement. Je peux aussi te servir de calculatrice :-). Pour commencer, tu peux entrer l\'expression que tu voudrais résoudre. Tu peux aussi écrire aide pour que je t\'explique ce dont je suis capable et comment je fonctionne.</div></div>';

}, 1500);

var form = document.querySelector('form');
    form.onsubmit = function () {
        var expbar = document.querySelector('.expression_bar');
        var exp = expbar.value;
        expbar.value = "";

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
        
        document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight

        return false;

    }

var bot = {
    
    s:  new SMath(),
    exec: function ( exp ) {
        
        if(exp.indexOf('json ') == 0){
            return JSON.stringify(this.s.exec(exp.replace('json ', "")));
        }else if(exp.indexOf("aide") >= 0 || exp.indexOf("help") >= 0){
            return "";
        }else{
            return bot.stringify(this.s.exec(exp));            
        }

    },
    stringify : function ( array ) {
        var text = "";

        var keys = Object.keys(array).sort().reverse();

        for (var i = 0; i < keys.length; i++) {
            var element = keys[i];
            if(element == "~"){
                
            }else{
                if(array[element] != 1){
                    var e = array[element] + "" + element
                    
                }else{
                    var e = element;
                }

                text+= e + "+";
            }

        }

        if(array["~"] != undefined){
            text+= array["~"];
        }

        text = text.replace('x^2+', "x²+");
        text = text.replace('x^3+', "x³+");
        text = text.replace('+-', "-");
        text = text.replace('--', "+");

        if(text[text.length - 1] == "+"){
            text += "end";
            text = text.replace('+end', "");
        }
        
        if(text == "x^2"){
            text = "x²";
        }

        if(text == "x^3"){
            text = "x³";
        }

        return text;
    }
}
