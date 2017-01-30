document.addEventListener('DOMContentLoaded', fn, false);
function fn(){
canvas = document.querySelector('canvas');
        ctx = canvas.getContext('2d');
        
       canvas.onclick = function () {
           
           document.querySelector('.tool-bar').classList.add('hidden');
           
       }
       
       document.querySelector('.hide').onclick = function (){
           document.querySelector('.tool-bar').classList.toggle("hidden");            
       };
       
       document.querySelector('.tool-bar').onclick= function () {
           
           document.querySelector('.tool-bar').classList.remove('hidden');
           
       }
       
       function hide(){
           canvas.click();
       }
        
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;
        
        zoom = 50;

        if(window.location.hash != ""){
            zoom = parseInt(window.location.hash.replace('#', ""));
        }

        mid_height = canvas.scrollHeight / 2;
        mid_width = canvas.scrollWidth / 2;

        interval = zoom;

        window.onhashchange = function () {
            if(window.location.hash != ""){
                interval = parseInt(window.location.hash.replace('#', ""));
                document.querySelector('.clear').click();
            }
        }
        
        Ypos = mid_height;
        Ypos2 = mid_height;
        Xpos = mid_width;
        Xpos2 = mid_width;
        
        make_graph();
        
        ctx.beginPath();
        ctx.strokeStyle = "#e2a61f"
        ctx.strokeText('Designed by Simon Loir', 0, canvas.height - 10)
        
        x_zero = mid_width;
        y_zero = mid_height;
        
        document.querySelectorAll('button')[0].onclick = function () {
            make_graph();
        }
        
        document.querySelectorAll('button')[1].onclick = function () {
            val = document.querySelector('.function').value;
            
            val = val.replace("^2", "²");
            val = val.replace("³", "^3");

            if(val == "x²"){
                power2(1,0,0);
                return;
            }
            
            if(val == "-x²"){
                power2(-1,0,0);
                return;
            }
            
            if(val == "x^3"){
                power3(1,0,0);
                return;
            }
            
            matchs = val.match(/(.+)x²/i);
            
            if(matchs != null){
                power2(matchs[1], 0, 0);
            }
            
            matchs = val.match(/(.+)x\^3/i);
            
            if(matchs != null){
                power3(matchs[1], 0, 0);
            }
            
            matchs = val.match(/(.+)\(x\-(.+)\)²\+(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], matchs[2], parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\+(.+)\)²\+(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], -matchs[2], parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\-(.+)\)²\-(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], matchs[2], -parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)\(x\+(.+)\)²\-(.+)/i);
            
            if(matchs != null){
                power2(matchs[1], -matchs[2], -parseFloat(matchs[3]));
                return;
            }
            
            matchs = val.match(/(.+)x²\+(.+)x\+(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = parseFloat(matchs[2]);
                c = parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\+(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\+(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
            matchs = val.match(/(.+)x²\-(.+)x\-(.+)/i)
            
            if(matchs != null){
                
                var a, b, c;

                a = parseFloat(matchs[1]);
                b = -parseFloat(matchs[2]);
                c = - parseFloat(matchs[3]);
                
                from_dev(a, b,c, val);
            }
            
        }
}