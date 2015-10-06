if (localStorage.getItem("nombre")) {
    location.href = "clase.html";
}


function guardar() {
    var ele = document.getElementById("txtNom").value;
    if (ele == "") {
        alert("El nombre no puede estar vacio");
        return;
    }
    localStorage.setItem("nombre",ele);
    location.href = "clase.html";
}


document.getElementById("btnOk").addEventListener("click",guardar);