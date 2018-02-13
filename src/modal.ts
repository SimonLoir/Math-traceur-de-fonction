export default class modal {
    public _c: (value: string) => void;

    constructor(type: string, options: ModalOptions) {
        let mask = document.createElement("div");
        mask.classList.add("mask");
        document.body.appendChild(mask);
        mask.onclick = () => {
            rm();
        };

        let div = document.createElement("div");
        div.classList.add("modal");
        document.body.appendChild(div);

        let rm = () => {
            mask.parentNode.removeChild(mask);
            div.parentNode.removeChild(div);
        };

        if (type == "prompt") {
            div.appendChild(document.createElement("b")).innerHTML =
                options.title;
            div.appendChild(document.createElement("p")).innerHTML =
                options.message;

            let input = div.appendChild(document.createElement("input"));
            input.value = options.default;

            let clearfix = div.appendChild(document.createElement("div"));
            clearfix.classList.add("clearfix");

            let confirm = clearfix.appendChild(
                document.createElement("button")
            );
            confirm.innerHTML = "Confirmer";
            confirm.addEventListener("click", () => {
                this._c(input.value);
                rm();
            });
        } else if (type == "ask") {
            div.appendChild(document.createElement("b")).innerHTML =
                options.title;
            div.appendChild(document.createElement("p")).innerHTML =
                options.message;

            let clearfix = div.appendChild(document.createElement("div"));
            clearfix.classList.add("clearfix");

            let confirm = clearfix.appendChild(
                document.createElement("button")
            );
            confirm.innerHTML = "Confirmer";
            confirm.addEventListener("click", () => {
                this._c("");
                rm();
            });

            let cancel = clearfix.appendChild(document.createElement("button"));
            cancel.innerHTML = "Annuler";
            cancel.style.marginRight = "5px";
            cancel.addEventListener("click", () => {
                rm();
            });
        }
    }

    public set confirm(v: any) {
        this._c = v;
    }
}

interface ModalOptions {
    title: string;
    message: string;
    default: string;
}
