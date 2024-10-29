function LogOut() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            usuarios[i][4] = false;
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
            if (usuarios[i][4]) {
                ActiveUser = usuarios[i][0];
                for (let n = 0; n < usuarios[i][3].length; n++) {
                    document.getElementById(`cesta_span${n}`).innerHTML = usuarios[i][3][n];
                }
            }
        }
    }
    document.getElementById("user_header").innerHTML = ActiveUser;
};

function Redirect(site) {
    location.href = site;
}

function ModCesta(producto, cantidad) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            if (
                (cantidad === -1 && usuarios[i][3][producto] > 0) ||
                (cantidad === 1 && usuarios[i][3][producto] >= 0)
            ) {
                usuarios[i][3][producto] += cantidad;
                document.getElementById(`cesta_span${producto}`).innerHTML = usuarios[i][3][producto];
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }
            break;
        }
    }
}

function CompletarCompra() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            for (let n = 0; n < usuarios[i][3].length; n++) {
                usuarios[i][2][n] += usuarios[i][3][n]; 
            }
            localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
            VaciarCesta();
            break;
        }
    }
}

function VaciarCesta() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            for (let n = 0; n < usuarios[i][3].length; n++) {
                usuarios[i][3][n] = 0;
                document.getElementById(`cesta_span${n}`).innerHTML = usuarios[i][3][n];
            }
            break;
        }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
}
