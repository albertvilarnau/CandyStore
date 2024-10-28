function LogOut() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][10] === true) {
            usuarios[i][10] = false;
        }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    location.href = "index.html";
}

window.onload = function OnLoadPage() {
    let ActiveUser = "";
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (usuarios) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i][10] === true) {
                ActiveUser = usuarios[i][0];
            }
        }
    }
    document.getElementById("user_header").innerHTML = ActiveUser;

    initializeCesta(); // Inicializa la cesta

    let cesta = JSON.parse(localStorage.getItem("cesta"));
    if (cesta) {
        for (let i = 0; i < cesta.length; i++) {
            document.getElementById(`cesta_span${i}`).innerHTML = cesta[i];
        }
    }
}

function initializeCesta() {
    if (!localStorage.getItem("cesta")) {
        let cesta = [0, 0, 0, 0, 0, 0, 0, 0];
        localStorage.setItem("cesta", JSON.stringify(cesta));
    }
}

function Redirect(site) {
    location.href = site;
}

function ModCesta(producto, cantidad) {
    initializeCesta();
    let cesta = JSON.parse(localStorage.getItem("cesta"));
    if((cantidad == -1 && cesta[producto] > 0)||(cantidad == 1 && cesta[producto] >= 0)){
        cesta[producto] += cantidad;
        document.getElementById(`cesta_span${producto}`).innerHTML = cesta[producto];
        localStorage.setItem("cesta", JSON.stringify(cesta));
    }
}
