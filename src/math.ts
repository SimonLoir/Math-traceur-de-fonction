import parser from "./parser";
export default class MathObject{

    public multiply:any;
    public add:any;
    public sub:any;

    constructor(){
        this.multiply = (new parser).multiply;
        this.add = (new parser).add;
        this.sub = (new parser).sub;
    }

    public static getFor (start:number, array:any) {
            var result = 0;
            for (var i = 0; i < Object.keys(array).length; i++) {
                var element = Object.keys(array)[i];
                if (element == "~") {
                    if (array[element] != "") {
                        result += array[element];
                    }
                } else if (element == "x") {
                    result += array[element] * start;
                } else if (element.indexOf("^m") >= 0) {
                    result += array[element] * (1 / Math.pow(start, parseFloat(element.split("^m")[1])));
                } else if (element == "over") {
    
                    result = result / this.getFor(start, array[element]);
    
                } else {
                    result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
                }
            }

            return result;
    }

    public derivate(array:any){
        console.log('=>', array)
        let keys = Object.keys(array);

        if(keys.length == 1){

            
            if(keys[0] == "~"){
                return {"~":0};
            } else if (keys[0] == "x"){
                return {"~" : array[keys[0]]};
            } else if (keys[0].indexOf("x^") == 0){
                
                let exp = parseFloat(keys[0].replace('x^', ""));
                
                let a:any = {};
                a[`x${(exp - 1 != 1) ? "^" + (exp - 1) : ""}`] = exp * array[keys[0]]
                
                console.log(a)
                return a;

            } else {
                return {};
            }

        }else{
            console.log(array)
            let a = {};
    
            keys.forEach(key => {
            
                let e:any = {};
                e[key] = array[key];
                a = this.add(a, this.derivate(e));
                console.log(a)
                

            });

            return a;
        }
    }
}