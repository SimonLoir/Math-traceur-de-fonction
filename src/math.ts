import parser from "./parser";
export default class math{
    public static getFor (start:number, array:any, label:string) {
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
    
                    result = result / this.getFor(start, array[element], (new parser).stringify(array[element]));
    
                } else {
                    result += array[element] * Math.pow(start, parseFloat(element.split("^")[1]));
                }
            }

            return result;
    }
}