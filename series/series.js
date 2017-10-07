
window.prompt = function (text, value, callback) {
    var id = "#prompt_dialog";
    var dialog = document.querySelector(id);
    dialog.style.display = "block";

    var sent = false;

    document.querySelector('.prompt_text').innerHTML = text;

    if (value != undefined) {
        document.querySelector("#prompt_default").value = value;
    }

    var validate = document.querySelector("#pvalidate");
    var val = "";
    validate.onclick = function () {
        val = document.querySelector("#prompt_default").value;
        dialog.style.display = "none";
        callback(val);
    }
    var cancel = document.querySelector("#pcancel");
    var canceled = false;
    cancel.onclick = function () {
        dialog.style.display = "none";
    }
}
