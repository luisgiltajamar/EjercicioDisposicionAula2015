var disposicion = [];
var url = "https://alumnoscurso.azure-mobile.net/Tables/Clase";
function dibujarCanvas(pos) {
    var canvas = document.getElementById("clase");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle=pos.color;
    ctx.fillRect(pos.x, pos.y, pos.w, pos.h);
}
function recuperar() {
    if (localStorage["elementos"]) {
        disposicion = JSON.parse(localStorage["elementos"]);
        for (var i = 0; i < disposicion.length; i++) {
            dibujarCanvas(disposicion[i]);
        }
    }
}

function guardar() {
    var obj= {
        x: parseInt(document.getElementById("txtX").value),
        y: parseInt(document.getElementById("txtY").value),
        w: parseInt(document.getElementById("txtW").value),
        h: parseInt(document.getElementById("txtH").value),
        color: document.getElementById("txtCol").value,
        nombre: localStorage["nombre"]
    }
    disposicion.push(obj);
    dibujarCanvas(obj);
    $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(obj),
        dataType: "json",
        headers: {
            "Content-Type": "application/json"
        },
        success: function() {
            alert("Guardado");
        },
        error: function() {
            alert("Fallo");
        }
    });
    localStorage["elementos"] = JSON.stringify(disposicion);
}
function refrescar() {
    var filtro = "?$filter=nombre eq '" + localStorage["nombre"] +
        "'";
    $.get(url+filtro, null, function(res) {

        for (var i = 0; i < res.length; i++) {
            dibujarCanvas(res[i]);
        }
    });


}

if (!localStorage["nombre"])
    location.replace("index.html");


document.getElementById("btnOk").addEventListener("click", guardar);
document.getElementById("btnRefrescar").
    addEventListener("click", refrescar);
recuperar();