"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fr_1 = require("./languages/fr");
var en_1 = require("./languages/en");
function setCookie(cname, cvalue, exdays) {
    if (exdays === void 0) { exdays = 30; }
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
var Translator = /** @class */ (function () {
    function Translator() {
        var lang = getCookie('sm_lang');
        if (lang == '') {
            //Show language choose tool
        }
        else {
            this.lang = lang;
        }
    }
    Translator.prototype.get = function () {
        if (this.lang == 'fr')
            return fr_1.default;
        if (this.lang == 'en')
            return en_1.default;
        return fr_1.default;
    };
    return Translator;
}());
exports.default = Translator;
