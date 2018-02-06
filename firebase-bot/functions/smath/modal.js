"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modal = /** @class */ (function () {
    function modal(type, options) {
        var _this = this;
        var mask = document.createElement('div');
        mask.classList.add('mask');
        document.body.appendChild(mask);
        mask.onclick = function () {
            rm();
        };
        var div = document.createElement('div');
        div.classList.add('modal');
        document.body.appendChild(div);
        var rm = function () {
            mask.parentNode.removeChild(mask);
            div.parentNode.removeChild(div);
        };
        if (type == "prompt") {
            div.appendChild(document.createElement('b')).innerHTML = options.title;
            div.appendChild(document.createElement('p')).innerHTML = options.message;
            var input_1 = div.appendChild(document.createElement('input'));
            input_1.value = options.default;
            var clearfix = div.appendChild(document.createElement('div'));
            clearfix.classList.add('clearfix');
            var confirm_1 = clearfix.appendChild(document.createElement('button'));
            confirm_1.innerHTML = "Confirmer";
            confirm_1.addEventListener('click', function () {
                _this._c(input_1.value);
                rm();
            });
        }
    }
    Object.defineProperty(modal.prototype, "confirm", {
        set: function (v) {
            this._c = v;
        },
        enumerable: true,
        configurable: true
    });
    return modal;
}());
exports.default = modal;
