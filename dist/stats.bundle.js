!function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=16)}([function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=i(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function i(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=p[i.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](i.parts[o]);for(;o<i.parts.length;o++)r.parts.push(u(i.parts[o],e))}else{for(var s=[],o=0;o<i.parts.length;o++)s.push(u(i.parts[o],e));p[i.id]={id:i.id,refs:1,parts:s}}}}function r(t,e){for(var n=[],i={},r=0;r<t.length;r++){var o=t[r],s=e.base?o[0]+e.base:o[0],a=o[1],c=o[2],h=o[3],u={css:a,media:c,sourceMap:h};i[s]?i[s].parts.push(u):n.push(i[s]={id:s,parts:[u]})}return n}function o(t,e){var n=g(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=m[m.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),m.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=g(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,r)}}function s(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=m.indexOf(t);e>=0&&m.splice(e,1)}function a(t){var e=document.createElement("style");return t.attrs.type="text/css",h(e,t.attrs),o(t,e),e}function c(t){var e=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",h(e,t.attrs),o(t,e),e}function h(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function u(t,e){var n,i,r,o;if(e.transform&&t.css){if(!(o=e.transform(t.css)))return function(){};t.css=o}if(e.singleton){var h=b++;n=x||(x=a(e)),i=l.bind(null,n,h,!1),r=l.bind(null,n,h,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(e),i=d.bind(null,n,e),r=function(){s(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(e),i=f.bind(null,n),r=function(){s(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}function l(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=E(e,r);else{var o=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function f(t,e){var n=e.css,i=e.media;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function d(t,e,n){var i=n.css,r=n.sourceMap,o=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||o)&&(i=w(i)),r&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var s=new Blob([i],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var p={},v=function(t){var e;return function(){return void 0===e&&(e=t.apply(this,arguments)),e}}(function(){return window&&document&&document.all&&!window.atob}),y=function(t){return document.querySelector(t)},g=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=y.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),x=null,b=0,m=[],w=n(2);t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");e=e||{},e.attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=v()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=r(t,e);return i(n,e),function(t){for(var o=[],s=0;s<n.length;s++){var a=n[s],c=p[a.id];c.refs--,o.push(c)}if(t){i(r(t,e),e)}for(var s=0;s<o.length;s++){var c=o[s];if(0===c.refs){for(var h=0;h<c.parts.length;h++)c.parts[h]();delete p[c.id]}}}};var E=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r))return t;var o;return o=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")"})}},function(t,e,n){"use strict";var i=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}();Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.partials={},this.type="parser",this.math_func=["sin","tan","cos","asin","atan","acos","sinh","tanh","cosh","asinh","atanh","acosh","ceil","floor","abs","exp","ln","log","pow","cot","sec","csc"]}return t.prototype.parse=function(t){var e=this;if("number"==typeof t&&(t=t.toString()),0==this.check(t))throw new o("Invalid expression given");return t=this.prepareExpression(t),t=t.replace(/sqrt\$([0-9]+)/i,function(t,e){return"Math.pow($"+e+", 0.5)"}),t=t.replace(/([\$0-9xe]+)\^([\$0-9xe]+)/gi,function(t,e,n){return"pow("+e+", "+n+")"}),t=t.replace(/\$([0-9]+)/gi,function(t,n){return e.clean("("+e.parse(e.partials["$"+n])+")")}),t=this.clean(t)},t.prototype.check=function(t){return t.split("(").length==t.split(")").length},t.prototype.prepareExpression=function(t){var e=this;t=t.replace(/²/gi,"^2"),t=t.replace(/³/gi,"^2"),t=t.replace(/X/g,"x");for(var n="",i=0,r="",o=0;o<t.length;o++){var s=t[o],a="$"+(Object.keys(this.partials).length+1);i>=1?")"==s?(i-=1,0==i?(this.partials[a]=r,r=""):r+=s):("("==s&&(i+=1),r+=s):"("==s?(i+=1,n+=a):n+=s}return n=n.replace(/([0-9\.]+)x\^([\$0-9\.]+)/gi,function(t,n,i){var r="$"+(Object.keys(e.partials).length+1);return e.partials[r]=n+"*x^"+i,r}),n=n.replace(/([0-9\.]+)x/gi,function(t,n){var i="$"+(Object.keys(e.partials).length+1);return e.partials[i]=n+"*x",i})},t.prototype.getComputedValue=function(t){var e=new s;return 0==t.indexOf("dérivée ")?t=e.derivative(t.replace("dérivée ","")):0==t.indexOf("dérivée_seconde ")&&(t=e.derivative(e.derivative(t.replace("dérivée_seconde ","")))),t},t.prototype.Functionize=function(t,e){return void 0===e&&(e=!0),1==e&&(t=this.parse(t)),console.log(t),new Function("x","funcs","\n            const sin = Math.sin;\n            const tan = Math.tan;\n            const cos = Math.cos;\n            const asin = Math.asin;\n            const atan = Math.atan;\n            const acos = Math.acos;\n            \n            const cot = (x) => 1 / Math.tan(x);\n            const csc = (x) => 1 / Math.sin(x);\n            const sec = (x) => 1 / Math.cos(x);\n            \n            const sinh = Math.sinh;\n            const tanh = Math.tanh;\n            const cosh = Math.cosh;\n            const asinh = Math.asinh;\n            const atanh = Math.atanh;\n            const acosh = Math.acosh;\n\n            const ceil = Math.ceil;\n            const floor = Math.floor;\n            const abs = Math.abs;\n            const exp = Math.exp; \n            const ln = Math.log;\n            const log = function (base, y) { return Math.log(y) / Math.log(base)};\n\n            const e = Math.E;\n            const pi = Math.PI;\n            const pow = function (base, exponent){\n                if(exponent % 1 != 0){\n                    for(let i = -7; i < 8; i = i + 2){\n                        if(exponent == 1/i && base < 0) return 0 - 1 * Math.pow(0 - base, exponent);     \n                    }\n                }\n                return Math.pow(base, exponent);\n            }\n            \n            return "+this.FunctionizeCalls(t)+";\n            \n            ")},t.prototype.FunctionizeCalls=function(t){var e=this;return console.log(t),t.replace(/([a-z]+)([1-9]*)\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g,function(t,n,i,r){return console.log(n),e.math_func.indexOf(n)>=0?n+i+"("+e.FunctionizeCalls(r)+")":"funcs."+(n+i)+".array("+e.FunctionizeCalls(r)+", funcs)"})},t.prototype.clean=function(t){for(var e=this,n=/([^a-z\/])\(([0-9x]+)\)/gi;n.test(t);)t=t.replace(n,function(t,e,n){return e+n});return t=t.replace(/\*([0-9])/gi,function(t,e){return 1==e?"":t}),t=t.replace(/\^([0-9])/gi,function(t,e){return 1==e?"":t}),t=t.replace(/\$([0-9]+)/g,function(t){return"("+e.partials[t]+")"})},t.prototype.tokenize=function(t){var e=this;if("number"==typeof t&&(t=t.toString()),0==this.check(t))throw new o("Invalid expression given");t=this.prepareExpression(t);var n=function(t,n){for(var i=e.math_func,r=0;r<i.length;r++){var o=i[r];if(0==t.indexOf(o))return 1!=n||o}return!1};if(t=t.trim(),isNaN(t)){if("x"==t)return{type:"variable",value:"x"};if(t.indexOf("+")>=0){var i=t.split("+"),r=[];return i.forEach(function(t){r.push(e.tokenize(t))}),{type:"plus",value:r}}if(t.indexOf("-")>=0){var i=t.split("-"),s=[];return i.forEach(function(t,n){t=t.trim(),0==n&&""==t?s.push(e.tokenize(0)):s.push(e.tokenize(t))}),{type:"minus",value:s}}if(t.indexOf("*")>=0){var i=t.split("*"),a=[];return i.forEach(function(t){a.push(e.tokenize(t))}),{type:"times",value:a}}if(t.indexOf("/")>=0){var i=t.split("/");return{type:"over",value:[this.tokenize(i[0]),this.tokenize("("+function(t){return t.shift(),t}(i).join(")*(")+")")]}}if(1==/^\$([0-9]+)$/.test(t))return this.tokenize(this.partials[t]);if(t.indexOf("^")>0){var c=t.split("^");if(2==c.length)return{type:"power",value:[this.tokenize(c[0]),this.tokenize(c[1])]};throw new Error("Unexpected expression")}if(1==n(t)){var h=n(t,!0);return{type:"function",value:h,args:this.tokenize(t.replace(h,""))}}if(t.indexOf(",")>=0){var c=t.split(",");return c.map(function(t){return e.tokenize(t)})}throw new Error("Could not parse expression "+t)}return{type:"number",value:t}},t}();e.default=r;var o=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="IE",e}return i(e,t),e}(Error);e.InvalidExpressionError=o;var s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ce=[],e.type="MathObject",e}return i(e,t),e.prototype.derivative=function(t){var e=this;if(0==this.check(t))throw new o("Invalid expression given");if(t=this.prepareExpression(t),t.indexOf("+")>=0){var n=t.split("+");return t="",(n.forEach(function(n){return t+=e.derivative(n)+"+"}),"+"==t[t.length-1]&&(t=t.slice(0,-1)),isNaN(this.Functionize(t)(NaN)))?t=this.clean(t):this.Functionize(t)(NaN)}if(t.indexOf("-")>=0){var n=t.split("-");return t="",(n.forEach(function(n){return t+=e.derivative(n)+"-"}),"-"==t[t.length-1]&&(t=t.slice(0,-1)),isNaN(this.Functionize(t)(NaN)))?t=this.clean(t):this.Functionize(t)(NaN)}if(t.indexOf("*")>=0){var i=t.split("*").sort();return t="",(i.forEach(function(n,r){var o=e.getAllExpect(i,r),s=o.join("*"),a=e.derivative(n);o.indexOf("0")>=0||0!=e.Functionize(s)(NaN)&&0!=e.Functionize(a)(NaN)&&(t+=a+"*"+o.join("*")+"+")}),"+"==t[t.length-1]&&(t=t.slice(0,-1)),isNaN(this.Functionize(t)(NaN)))?t=this.clean(t):this.Functionize(t)(NaN)}if(t.indexOf("/")>=0){var n=t.split("/"),r=n.slice();r.shift();var s="("+r.join(")*(")+")",a="("+this.derivative(n[0])+")*"+s+"-"+this.derivative(s)+"*("+n[0]+")";return t="("+a+")/(("+s+")^2)",isNaN(this.Functionize(t)(NaN))?t=this.clean(t):this.Functionize(t)(NaN)}if(isNaN(t)){if("x"==t)return 1;if(t.indexOf("^")>=1){var c=t.split("^");return this.clean(c[1]+"*"+c[0]+"^("+(isNaN(this.Functionize(c[1]+"-1")(NaN))?c[1]+"-1":this.Functionize(c[1]+"-1")(NaN))+")*("+this.derivative(c[0])+")")}if(1==/^\$([0-9]+)$/.test(t)){var h=this.partials[t];return/^\$([0-9]+)$/.test(h)?"("+this.derivative(this.partials[h])+")":"("+this.derivative(h)+")"}if(1==/^sin\$([0-9]+)$/.test(t)){var u=t.replace("sin","");return this.clean("cos("+this.partials[u]+")*("+this.derivative(this.partials[u])+")")}if(1==/^cos\$([0-9]+)$/.test(t)){var u=t.replace("cos","");return this.clean("-sin("+this.partials[u]+")*("+this.derivative(this.partials[u])+")")}throw console.log(t),new Error("Something went wrong width ")}return"0"},e.prototype.getAllExpect=function(t,e){var n=[];return t.forEach(function(t,i){i!=e&&n.push(t)}),n},e.prototype.getRoots=function(){},e.prototype.getDomF=function(t,e){var n=this;if(void 0===e&&(e=!0),1==e&&(this.ce=[]),"plus"===t.type||"minus"===t.type||"times"===t.type){t.value.forEach(function(t){n.getDomF(t)})}else"over"==t.type?this.ce.push(JSON.stringify(t.value[1])+" not null"):"function"==t.type&&"sqrt"==t.value&&this.ce.push(JSON.stringify(t.args)+">=0");if(!0===e)return 0===this.ce.length?"R":"ce : "+this.ce.join("\n")},e}(r);e.MathObject=s},function(t,e,n){"use strict";function i(t,e){return void 0!=t?new o(t,e):this}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){this.message=t,this.name="IndexOutOfArrayException"}return t}();e.IndexOutOfArrayExecption=r;var o=function(){function t(t,e){var n;if("string"==typeof t)n=document.querySelectorAll(t),void 0!=e&&(n=[n[e]]);else{if(void 0==t||t==document)return this.ready=function(t){document.addEventListener("DOMContentLoaded",t)},this;if("object"!=typeof t)return"ExtJsObject"==t.type?t:void 0;n=void 0==t.length?[t]:void 0!=e?[t[e]]:t}this.type="ExtJsObject",this.node=n}return t.prototype.html=function(t){if(void 0!=t){for(var e=0;e<this.node.length;e++){var n=this.node[e];"string"!=typeof t&&"number"!=typeof t||(n.innerHTML=t)}return this}return this.node[0].innerHTML},t.prototype.text=function(t){if(void 0!=t){for(var e=0;e<this.node.length;e++){var n=this.node[e];"string"!=typeof t&&"number"!=typeof t||(n.innerText=t)}return this}return this.node[0].innerText},t.prototype.click=function(t,e){for(var n=0;n<this.node.length;n++){var i=this.node[n];if(void 0===e)void 0!==t?i.addEventListener("click",t):i.click();else if(void 0!==t){var r=i;i.addEventListener("click",function(n){if(r.querySelector(e)==n.target){var i=r.querySelector(e);i.prototype.toDo=t,i.toDo()}})}else{var r=i,o=r.querySelector(e);o.click()}}return this},t.prototype.get=function(t){if(void 0!=t){if(void 0==this.node[t])throw new r("ExtJsObject.get undefined index node["+t+"]");return this.node[t]}if(void 0==this.node[0])throw new r("ExtJsObject.get undefined index node[0]");return this.node[0]},t.prototype.height=function(t){for(var e=0;e<this.node.length;e++){var n=this.node[e];if(void 0===t)return n.offsetHeight;n.style.height=t}return this},t.prototype.width=function(t){for(var e=0;e<this.node.length;e++){var n=this.node[e];if(void 0===t)return n.offsetWidth;n.style.width=t}return this},t.prototype.addClass=function(t){for(var e=0;e<this.node.length;e++){this.node[e].classList.add(t)}return this},t.prototype.removeClass=function(t){for(var e=0;e<this.node.length;e++){this.node[e].classList.remove(t)}return this},t.prototype.remove=function(){for(var t=0;t<this.node.length;t++){var e=this.node[t];e.parentElement.removeChild(e)}},t.prototype.child=function(t){for(var e=[],n=0;n<this.node.length;n++){var r=this.node[n],o=document.createElement(t);r.appendChild(o),e.push(o)}return i(e)},t.prototype.css=function(t,e,n){var i=n;if(void 0==n&&(n=0),void 0==e)return this.node[n].style[t];if(void 0!=i)return this.node[n].style[t]=e,this;for(var r=0;r<this.node.length;r++){this.node[r].style[t]=e}return this},t.prototype.attr=function(t,e,n){var i=n;if(void 0==n&&(n=0),void 0==e)return this.node[n].getAttribute(t);if(void 0!=i)return this.node[n].style[t]=e,this;for(var r=0;r<this.node.length;r++){this.node[r].setAttribute(t,e)}return this},t.prototype.parent=function(t){for(var e=[],n=0;n<this.node.length;n++){var r=this.node[n];void 0==t?e.push(r.parentElement):e.push(r.closest(t))}return i(e)},t.prototype.value=function(t){if(void 0!=t){for(var e=0;e<this.node.length;e++){var n=this.node[e];"string"!=typeof t&&"number"!=typeof t||(n.value=t)}return this}this.node[0];return this.node[0].value},t.prototype.keypress=function(t,e){for(var n=0;n<this.node.length;n++){var i=this.node[n];if(void 0===e)void 0!==t&&i.addEventListener("keypress",t);else if(void 0!==t){var r=i;i.addEventListener("keypress",function(n){if(r.querySelector(e)==n.target){var i=r.querySelector(e);i.prototype.toDo=t,i.toDo()}})}}return this},t.prototype.input=function(t,e){for(var n=0;n<this.node.length;n++){var i=this.node[n];if(void 0===e)void 0!==t&&i.addEventListener("input",t);else if(void 0!==t){var r=i;i.addEventListener("input",function(n){if(r.querySelector(e)==n.target){var i=r.querySelector(e);i.prototype.toDo=t,i.toDo()}})}}return this},t.prototype.keydown=function(t,e){for(var n=0;n<this.node.length;n++){var i=this.node[n];if(void 0===e)void 0!==t&&i.addEventListener("keydown",t);else if(void 0!==t){var r=i;i.addEventListener("keydown",function(n){if(r.querySelector(e)==n.target){var i=r.querySelector(e);i.prototype.toDo=t,i.toDo()}})}}return this},t.prototype.change=function(t,e){for(var n=0;n<this.node.length;n++){var i=this.node[n];if(void 0===e)void 0!==t&&i.addEventListener("change",t);else if(void 0!==t){var r=i;i.addEventListener("change",function(n){if(r.querySelector(e)==n.target){var i=r.querySelector(e);i.prototype.toDo=t,i.toDo()}})}}return this},t.prototype.keyup=function(t,e){for(var n=0;n<this.node.length;n++){var i=this.node[n];if(void 0===e)void 0!==t&&i.addEventListener("keyup",t);else if(void 0!==t){var r=i;i.addEventListener("keyup",function(n){if(r.querySelector(e)==n.target){var i=r.querySelector(e);i.prototype.toDo=t,i.toDo()}})}}return this},t.prototype.prevSibling=function(){for(var t=[],e=0;e<this.node.length;e++){var n=this.node[e];t.push(n.previousSibling)}return i(t)},t.prototype.nextSibling=function(){for(var t=[],e=0;e<this.node.length;e++){var n=this.node[e];t.push(n.nextSibling)}return i(t)},t.prototype.forEach=function(t){this.node.forEach(function(e){t.bind(e)()})},t}();e.ExtJsObject=o;var s=function(){function t(){}return t.prototype.GET=function(t,e,n){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status)e(i.responseText);else if(4==i.readyState&&void 0!=n)try{n()}catch(t){}},i.open("GET",t,!0),i.send()},t.prototype.DELETE=function(t,e,n){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status)e(i.responseText);else if(4==i.readyState&&void 0!=n)try{n()}catch(t){}},i.open("GET",t,!0),i.setRequestHeader("x-http-method-override","DELETE"),i.send()},t.prototype.POST=function(t,e,n,i){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status)n(r.responseText);else if(4==r.readyState&&void 0!=i)try{i()}catch(t){}},r.open("POST",t,!0);for(var o=Object.keys(e),s="",a=0;a<o.length;a++)0!==a&&(s+="&"),s=s+o[a]+"="+e[o[a]];r.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.send(s)},t.prototype.PUT=function(t,e,n,i){var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status)n(r.responseText);else if(4==r.readyState&&void 0!=i)try{i()}catch(t){}},r.open("POST",t,!0);for(var o=Object.keys(e),s="",a=0;a<o.length;a++)0!==a&&(s+="&"),s=s+o[a]+"="+e[o[a]];r.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.setRequestHeader("x-http-method-override","PUT"),r.send(s)},t}();e.AR=new s,e.$=i},,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){var e=this;this.fdata={},this.center_x=0,this.center_y=0,this.x_unit=50,this.y_unit=50,this.stored={},this.pathes={},this.objects=[],t.height=t.scrollHeight,t.width=t.scrollWidth,this.canvas=t,this.ctx=t.getContext("2d"),this.init();var n,i=!1;t.addEventListener("mousedown",function(e){i=!0,n={x:e.pageX,y:e.pageY},t.style.cursor="grabbing"}),t.addEventListener("touchstart",function(t){i=!0,n={x:t.touches.item(0).clientX,y:t.touches.item(0).clientY}}),t.addEventListener("mousemove",function(t){if(1==i){var r={x:t.pageX,y:t.pageY},o=n;e.move(o,r)&&(n=r)}}),t.addEventListener("touchmove",function(t){if(t.preventDefault(),1==i){var r={x:t.touches.item(0).clientX,y:t.touches.item(0).clientY},o=n;e.move(o,r)&&(n=r)}}),t.addEventListener("mouseup",function(e){i=!1,t.style.cursor="grab"}),t.addEventListener("touchend",function(t){i=!1}),window.addEventListener("resize",function(t){e.reload()}),t.addEventListener("mousewheel",function(t){var n=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));e.zoom(n)}),t.addEventListener("DOMMouseScroll",function(t){t.preventDefault();var n=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));e.zoom(n)})}return t.prototype.zoom=function(t){this.x_unit+10*t>10&&(this.x_unit+=10*t),this.y_unit+10*t>10&&(this.y_unit+=10*t),this.reload()},t.prototype.init=function(){this.canvas.height=this.canvas.scrollHeight,this.canvas.width=this.canvas.scrollWidth,this.draw()},t.prototype.draw=function(){this.drawGrid()},t.prototype.drawGrid=function(){var t=Math.max(this.canvas.height,this.canvas.width);t/=Math.min(this.x_unit,this.y_unit),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.beginPath(),this.ctx.fillStyle="#fafafa",this.ctx.rect(0,0,this.canvas.width,this.canvas.height),this.ctx.fill(),this.ctx.closePath();for(var e=Math.floor(this.center_x+t),n=Math.floor(this.center_x-t);n<e;)this.drawLine(this.getRelativePositionX(n),this.getRelativePositionY(Math.floor(this.center_y+t)),this.getRelativePositionX(n),this.getRelativePositionY(Math.floor(this.center_y-t)),0==Math.floor(n)?"black":void 0),this.ctx.beginPath(),this.ctx.font="18px Sans Serif",this.ctx.fillStyle="gray",this.ctx.fillText(n.toString(),this.getRelativePositionX(n),this.getRelativePositionY(0)+15),this.ctx.closePath(),n++;e=Math.floor(this.center_y+t);for(var i=Math.floor(this.center_y-t);i<e;)this.drawLine(this.getRelativePositionX(Math.floor(this.center_x+t)),this.getRelativePositionY(i),this.getRelativePositionX(Math.floor(this.center_x-t)),this.getRelativePositionY(i),0==Math.floor(i)?"black":void 0),this.ctx.beginPath(),this.ctx.font="18px Sans Serif",this.ctx.fillStyle="gray",this.ctx.fillText(i.toString(),this.getRelativePositionX(0)-15*i.toString().length/2-5,this.getRelativePositionY(i)),this.ctx.closePath(),i++},t.prototype.move=function(t,e){var n=t.x-e.x,i=t.y-e.y;if(Math.sqrt(Math.pow(n,2)+Math.pow(i,2))>10)return this.center_x+=n/this.x_unit,this.center_y-=i/this.y_unit,this.reload(),!0},t.prototype.drawLine=function(t,e,n,i,r,o){this.ctx.beginPath(),this.ctx.strokeStyle=void 0==r?"#D0D0D0":r,this.ctx.moveTo(t,e),this.ctx.lineTo(n,i),this.ctx.lineWidth=void 0==o?1:o,this.ctx.stroke()},t.prototype.getRelativePositionX=function(t){return this.canvas.width/2+t*this.x_unit-this.center_x*this.x_unit},t.prototype.getRelativePositionY=function(t){return this.canvas.height/2-t*this.y_unit+this.center_y*this.y_unit},t.prototype.drawFromFunc=function(t,e,n){if(void 0===e&&(e=void 0),void 0===n&&(n=!1),!e){e="#";for(var i=0;i<6;i++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())]}var r=this.canvas.width/2/this.x_unit,o=this.center_x-r,s=void 0,a=t,c=!0;void 0==this.pathes[a]&&(this.pathes[a]={},c=!1);for(var h=Math.min(5*this.canvas.width/(1e3*this.x_unit),.05);o<this.center_x+r;){var u=void 0,l=void 0,f=void 0;1==c&&void 0!=this.pathes[a][o]?(l=this.getRelativePositionY(this.pathes[a][o]),f=this.getRelativePositionX(o)):(u=this.getFor(o,t,a),this.pathes[a][o]=u,l=this.getRelativePositionY(u),f=this.getRelativePositionX(o)),void 0!=s&&this.drawLine(f,l,s.x,s.y,e,2),s={x:f,y:l},o+=1==n?.5:h}return e},t.prototype.getFor=function(t,e,n){return void 0==this.stored[n]&&(this.stored[n]={}),void 0!=this.stored[n][t]?this.stored[n][t]:(this.stored[n][t]=e(t,this.fdata),this.stored[n][t])},t.prototype.reload=function(t){var e=this;void 0!=t&&(this.funcs=t),this.init();var n=Object.keys(this.fdata);requestAnimationFrame(function(){n.forEach(function(t){1==e.fdata[t].visible&&e.drawFromFunc(e.fdata[t].array,e.fdata[t].color)}),e.objects.forEach(function(t){if("point"==t.type){var n=NaN;n=isNaN(t.y)?t.y(parseFloat(t.x),e.fdata):t.y,e.point(t.x,n)}})})},t.prototype.point=function(t,e,n){void 0===n&&(n=""),n=n+"("+t+";"+e+")",t=this.getRelativePositionX(t),e=this.getRelativePositionY(e),this.ctx.beginPath(),this.ctx.arc(t,e,3,0,2*Math.PI,!0),this.ctx.fill(),this.ctx.font="12px Arial",n&&this.ctx.fillText(n,t+10,e+10)},Object.defineProperty(t.prototype,"funcs",{set:function(t){this.fdata=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"object_list",{get:function(){return{objects:this.objects,push:function(t){return this.objects.push(t),this.objects}}},set:function(t){this.objects=t},enumerable:!0,configurable:!0}),t}();e.default=i},,,,,,,,,function(t,e,n){"use strict";function i(){var t=document.querySelectorAll(".line"),e=0,n=0,i=t.length,o=[],s=[],a=[],c=[],u=0,l=0,f=0;t.forEach(function(t){var i=t.querySelectorAll("td"),r=parseFloat(i[0].innerText),a=parseFloat(i[1].innerText);o.push(r),s.push(a),e+=r,n+=a}),e/=i,n/=i,o.forEach(function(t){a.push(t-e)}),s.forEach(function(t){c.push(t-n)});for(var d=[],p=0;p<o.length;p++){var v=a[p]*c[p];u+=v,d.push(v)}a.forEach(function(t){l+=Math.pow(t,2)}),c.forEach(function(t){f+=Math.pow(t,2)});var y=u/l,g=n-y*e;if(g>0)var x=y+"x+"+g;else var x=y+"x"+g;h.$("#result").html("Résultats : <br />Equation de la droite de régression : "+x+"<br>r = "+u/(Math.sqrt(l)*Math.sqrt(f)));var b=h.$("#result").child("table"),m=b.child("tr");m.child("th").html("x<sub>i</sub>"),m.child("th").html("y<sub>i</sub>"),m.child("th").html("X<sub>i</sub>"),m.child("th").html("Y<sub>i</sub>"),m.child("th").html("X<sub>i</sub>*Y<sub>i</sub>"),m.child("th").html("X<sub>i</sub><sup>2<sup>"),m.child("th").html("Y<sub>i</sub><sup>2<sup>");for(var p=0;p<o.length;p++){var w=b.child("tr");w.child("td").html(o[p]),w.child("td").html(s[p]),w.child("td").html(a[p]),w.child("td").html(c[p]),w.child("td").html(d[p].toString()),w.child("td").html(Math.pow(a[p],2).toString()),w.child("td").html(Math.pow(c[p],2).toString())}r(x)}function r(t){var e=l.Functionize(t),n=u.drawFromFunc(e);u.funcs={func:{visible:!0,color:n,array:e,exp:t,initial:t}}}function o(t){var e=h.$("#body").get(0).insertBefore(document.createElement("tr"),this);h.$(e).addClass("line");var n=h.$(e).child("td");"number"==typeof t?n.html(t.toString()):n.html("");var i=n.get(0);i.contentEditable=!0,i.focus(),h.$(e).child("td").html("").get(0).contentEditable=!0;var r=h.$(e).child("td");r.addClass("a"),r.child("button").html("supprimer").click(function(){h.$(e).remove()}),r.child("button").html("ajouter avant").click(function(){o.bind(e)()})}function s(){var t=document.querySelector("table"),e=document.querySelector("#add-line td");t.classList.contains("show")?(e.colSpan=2,t.classList.remove("show")):(e.colSpan=3,t.classList.add("show"))}Object.defineProperty(e,"__esModule",{value:!0}),n(17);var a=n(7),c=n(3),h=n(4),u=new a.default(document.querySelector("canvas")),l=new c.default;u.init(),u.funcs={},h.$("#process").click(i),h.$("#add-line").click(o),h.$("#toggleActions").click(s)},function(t,e,n){var i=n(18);"string"==typeof i&&(i=[[t.i,i,""]]);var r={hmr:!0};r.transform=void 0,r.insertInto=void 0;n(1)(i,r);i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(0)(!1),e.push([t.i,"canvas{position:fixed;top:0;right:0;bottom:0;height:100vh;width:50vw}@media (max-width:800px){canvas{top:0;right:0;left:0;bottom:auto;height:50vh;width:100vw}}.container{position:fixed;top:0;bottom:0;left:0;height:100vh;width:50vw;background:#fff;overflow:auto;border-right:1px solid #d3d3d3}.container nav{height:50px;display:flex;border-bottom:1px solid #d3d3d3}.container nav button{cursor:pointer}.container nav button,.container nav input{padding:0;margin:0;border:none;height:100%;padding-left:8px;padding-right:8px;border-right:1px solid #d3d3d3;flex-grow:1}.container nav button:last-child,.container nav input:last-child{border:none}@media (max-width:800px){.container{top:auto;right:0;left:0;bottom:0;height:50vh;width:100vw;border-top:1px solid #d3d3d3}.container nav{display:block;height:auto}.container nav button,.container nav input{height:none;margin:5px;padding:5px;border:1px solid #d3d3d3}}table{width:100%;font-family:arial,sans-serif;border-collapse:collapse}td,th{border:1px solid #eaeaea;text-align:left;padding:8px;text-align:center;word-break:break-all}tr:nth-child(2n){background-color:#eaeaea}#action,.a{display:none}.show #action,.show .a{display:table-cell}",""])}]);