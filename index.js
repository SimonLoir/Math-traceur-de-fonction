function make_graph() {
           ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.beginPath();
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '10px serif';
            ctx.textBaseline = 'hanging';
            
            ctx.strokeStyle="#eee";
            
       		 while (Ypos - interval > 0)  {
       		     ctx.beginPath();
       		     Ypos -= interval;
       		     ctx.moveTo(0,Ypos);
       		     ctx.lineTo(canvas.scrollWidth,Ypos);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }
       		  while (Ypos + interval < mid_height * 2)  {
       		     ctx.beginPath();
       		     Ypos += interval;
       		     ctx.moveTo(0,Ypos);
       		     ctx.lineTo(canvas.scrollWidth,Ypos);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }
       		 
       		  while (Xpos - interval > 0)  {
       		     ctx.beginPath();
       		     Xpos -= interval;
       		     ctx.moveTo(Xpos, 0);
       		     ctx.lineTo(Xpos, canvas.scrollWidth);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }
       		 
       		  while (Xpos + interval < mid_width * 2)  {
       		      ctx.beginPath();
       		     Xpos += interval;
       		     ctx.moveTo(Xpos, 0);
       		     ctx.lineTo(Xpos, canvas.scrollWidth);
       		     ctx.lineWidth = 1;
       		     ctx.stroke();
       		 }
       		 
       		 ctx.beginPath();
       		 ctx.moveTo(0,mid_height);
       		 ctx.lineTo(canvas.scrollWidth,mid_height);
       		 ctx.strokeStyle="#000000";
       		 ctx.stroke();
       		 
       		 //Y axis
       		 ctx.beginPath();
       		 ctx.moveTo(mid_width,0);
       		 ctx.lineTo(mid_width, canvas.scrollHeight);
       		 ctx.strokeStyle="#000000";
       		 ctx.stroke();
       		 
        }
        
        
        function new_point(X, Y){
            var X = x_zero + X * interval;
            var Y = y_zero - Y * interval;

            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.fillStyle = document.querySelectorAll('input')[1].value;
            //alert(document.querySelectorAll('input')[1].value)
            ctx.arc(X, Y, 1, 0, Math.PI * 2)
            ctx.fill();
        }
        

 
        
        function power2(a, m, p){
            if(a == undefined){
                a = 0;
            }
            if(m == undefined){
                m = 0;
            }
            if(p == undefined){
                p = 0;
            }
            var start = -(mid_width / 2);
            while(start <= (mid_width / 2)){
                new_point(start, a * Math.pow(start - m, 2) + p);
                start += 0.005;
            }
        }

        function power3(a, m, p){
            if(a == undefined){
                a = 0;
            }
            if(m == undefined){
                m = 0;
            }
            if(p == undefined){
                p = 0;
            }
            var start = -(mid_width / 2);
            while(start <= (mid_width / 2)){
                new_point(start, a * Math.pow(start - m, 3) + p);
                start += 0.005;
            }
        }