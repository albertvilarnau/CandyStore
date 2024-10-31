function LogOut() {
    // Funcion para hacer log out
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;
    // El usuario actual lo volvemos active = false cosa que hace el logout
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            usuarios[i][4] = false;
        }
    }
    //  Guardamos los cambios en el localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    location.href = "index.html";
}

// Al cargar la pagina
window.onload = function OnLoadPage() {
    SetAllCesta_Span();
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (usuarios) {
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i][4]) {
                document.getElementById("user_header").innerHTML = usuarios[i][0];
            }
        }
    }    // Ponemos el usuario en el header
    ValidarUser();

};

// Con esta funcion modificamos cesta. tiene dos parametros, el producto, que es la "ID" del producto, y la cantidad, siempre +1 o -1
function ModCesta(producto, cantidad) {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;

    // Logica que recorre los usuarios y resta o suma a la cesta, y se asegura que no baje nunca de 0 la cesta, luego actualizamos todos los span   
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            if (
                (cantidad == -1 && usuarios[i][3][producto] > 0) ||
                (cantidad == 1 && usuarios[i][3][producto] >= 0)
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
    // Para completar la compra, sumamos todos los  productos de la cesta del usuario al array de compra confirmada (2)
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            for (let n = 0; n < usuarios[i][3].length; n++) {
                usuarios[i][2][n] += usuarios[i][3][n]; 
            }
            // Actualizamos local storage y vaciamos la cesta
            localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
            VaciarCesta();
            alert("Compra completada")
            break;
        }
    }
}

function VaciarCesta() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) return;
    // Vaciamos la cesta, llevandolo todo a 0 del user activo
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            for (let n = 0; n < usuarios[i][3].length; n++) {
                usuarios[i][3][n] = 0;
            }
        }
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios)); 
    //  Luego actualizamos todos los span
    SetAllCesta_Span();
}

function SetAllCesta_Span() {
    // Recupera la lista de usuarios almacenada en localStorage y la convierte de JSON a un objeto JavaScript
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    // Inicializa una variable para mantener el total de la cesta
    let total_cesta = 0;

    // Verifica si existen usuarios en el localStorage
    if (usuarios) {
        // Itera sobre cada usuario
        for (let i = 0; i < usuarios.length; i++) {
            // Comprueba si el usuario tiene un valor verdadero en el 4, que indica que esta activo
            if (usuarios[i][4]) { 
                // Itera sobre los productos del usuario
                let precio_total_cesta = 0;
                for (let n = 0; n < usuarios[i][3].length; n++) {
                    // Obtiene la cantidad de productos y la cantidad de compra
                    let cantidad = usuarios[i][3][n];
                    let cantidad_compra = usuarios[i][2][n];

                    // Calcula el precio del producto (asumiendo un precio fijo de 0.5 por unidad)
                    let precio = 0;
                    // Suma la cantidad total a la cesta
                    total_cesta += cantidad;
                    

                    if(n == 0 || n == 1){
                        precio = cantidad * 0.5
                    } else if(n == 2 || n == 3){
                        precio = cantidad * 0.99;
                    } else if(n == 4){
                        precio = cantidad * 2.20;
                    } else if(n == 5){
                        precio = cantidad * 6.99;
                    } else if(n == 6 || n == 7){
                        precio = cantidad * 4.99;
                    }

                    precio_total_cesta += precio;

                    // Actualiza el contenido del HTML dependiendo de la página actual
                    if (window.location.pathname.includes("store.html")) {
                        // Si estamos en la página de tienda, muestra la cantidad en el span correspondiente
                        document.getElementById(`cesta_span${n}`).innerHTML = cantidad;
                    }

                    if (window.location.pathname.includes("cesta.html")) {
                        // Si estamos en la página de la cesta, muestra el precio y la cantidad
                        document.getElementById(`price_span${n}`).innerHTML = precio.toFixed(2);
                        document.getElementById(`cesta_span${n}`).innerHTML = cantidad;
                        document.getElementById("precio_total_cesta").innerHTML = precio_total_cesta.toFixed(2);
                    }

                    if (window.location.pathname.includes("user.html")) {
                        // Si estamos en la página de usuario, muestra la cantidad de compra
                        document.getElementById(`cantidad_compra${n}`).innerHTML = cantidad_compra;
                    }

                    // Muestra u oculta los elementos de la cesta según la cantidad de productos
                    let elementos = document.getElementsByClassName(`cesta_producto${n}`);
                    for (let elem of elementos) {
                        elem.style.display = (cantidad > 0) ? 'flex' : 'none';
                    }

                    // Muestra u oculta los elementos de usuario según la cantidad de compra
                    let elementos2 = document.getElementsByClassName(`product_user${n}`);
                    for (let elem of elementos2) {
                        elem.style.display = (cantidad_compra > 0) ? 'flex' : 'none';
                    }
                }
            }
        }
    }
    // Actualiza el total de la cesta en el HTML
    document.getElementById("total_cart").innerHTML = total_cesta;
}

function ValidarUser () {
    // Recupera la lista de usuarios almacenada en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    // Inicializa un contador para contar usuarios activos
    let contador = 0;

    // Verifica si existen usuarios en el localStorage
    if (usuarios) {
        // Itera sobre cada usuario
        for (let i = 0; i < usuarios.length; i++) {
            // Comprueba si el usuario tiene un valor verdadero en la posición 4 del array
            if (usuarios[i][4]) { 
                contador++; // Incrementa el contador si el usuario está activo
            }
        }
    }
    
    // Si no hay usuarios activos, muestra una alerta y redirige a la página principal
    if (contador == 0) {
        alert("No estas logueado");
        location.href = "index.html";
    }
}