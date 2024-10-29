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
    let ActiveUser = GetActiveUser();
    console.log(ActiveUser);
    SetAllCesta_Span();
    document.getElementById("user_header").innerHTML = ActiveUser;
};

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
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
            }
        }
    }
    SetAllCesta_Span();
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
            }
        }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
    SetAllCesta_Span();
}

function GetActiveUser(){
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (usuarios) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i][4]) {
                return usuarios[i][0];
            }
        }
    }
}

function SetAllCesta_Span() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let total_cesta = 0;
    if (usuarios) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i][4]) { 
                for (let n = 0; n < usuarios[i][3].length; n++) {
                    let cantidad = usuarios[i][3][n];
                    let precio = cantidad * 0.5;
                    total_cesta += cantidad;
                    if (window.location.pathname.includes("store.html")) {
                        document.getElementById(`cesta_span${n}`).innerHTML = cantidad;
                    }

                    if (window.location.pathname.includes("cesta.html")) {
                            document.getElementById(`price_span${n}`).innerHTML = precio.toFixed(2);
                            document.getElementById(`cesta_span${n}`).innerHTML = cantidad;
                    }
                    let elementos = document.getElementsByClassName(`cesta_producto${n}`);
                    for (let elem of elementos) {
                        elem.style.display = (cantidad > 0) ? 'flex' : 'none';
                    }
                }
            }
        }
    }
    document.getElementById("total_cart").innerHTML = total_cesta;
}
