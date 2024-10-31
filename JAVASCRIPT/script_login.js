function LogIn() {
    // Primero, si el local storage no existe, lo creamos y definimos un usuario base, que es ADMIN
    if (!localStorage.getItem("usuarios")) {
        let usuarios = [
            ["admin", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 1],
        ];
        // Una vez definido el array de usuarios, lo guardamos en el local storage. 
        // Ya que solo se puede guardar un valor en el local storage, lo convertimos a string con JSON.stringify
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Reiniciamos los usuarios 
    document.getElementById("error_password").innerHTML = "";
    document.getElementById("error_user").innerHTML = "";
    document.getElementById("error_general").innerHTML = "";

    // Declaramos los usuarios y el input de lusuario
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let ui_user = document.getElementById("ui_user").value;
    let ui_password = document.getElementById("ui_password").value;

    // Errores por si el input es vacio
    if (!ui_user) {
        document.getElementById("error_user").innerHTML = "User is required";
    }
    if (!ui_password) {
        document.getElementById("error_password").innerHTML = "Password is required";
    }
    if (!ui_user || !ui_password) {
        return;
    }
    
    // Funcion que recorre todos los usuarios y los compara con nuestro input
    let validUser = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (ui_user === usuarios[i][0] && ui_password === usuarios[i][1]) {
            //  Si el usuario y contraseña son correctos, validamos el usuario y le ponemos [i][4] 
            // como true, que es si el usuario esta validado en ese momento
            usuarios[i][4] = true;
            alert(`Welcome, ${usuarios[i][0]} to the Sugar Cave`);
            // Devolvemos el array de usuarios  actualizado y redirigimos a la store
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            location.href = "store.html";
            validUser = true;
            break;
        }
    }

    // Si no se valida el user, mostramos el error
    if (!validUser) {
        document.getElementById("error_general").innerHTML = "User or password is incorrect";
    }
}

// Al cargar la pagina de login, si hay un usuario activo, por lo tanto, esta logueado, redirigimos a la store
window.onload = function CheckUsers() {
    let usuariosString = localStorage.getItem("usuarios");
    if (!usuariosString) return;

    let usuarios = JSON.parse(usuariosString);
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][4]) {
            alert(`Welcome, ${usuarios[i][0]} to the Sugar Cave`);
            location.href = "store.html";
            break;
        }
    }
};

// Usamos una funcion de Clean Cache que se usa para predefinir el valor del local storage, usado en el desarrollo de la web
function ClearCache() {
    let usuarios = [
        ["admin", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 1],

    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Funcion que añade un usuario, creando un array con los datos que introduce,  y lo añade al array de usuarios
function AddUser() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let ui_user = document.getElementById("ui_user").value;
    let ui_password = document.getElementById("ui_password").value;
    
    if (!ui_user) {
        document.getElementById("error_user").innerHTML = "User is required";
        return;
    }
    if (!ui_password) {
        document.getElementById("error_password").innerHTML = "Password is required";
        return;
    }
    // Creamos el array  con los datos del usuario y lo asignamos  a la variable usuarios

    newUsuario = [ui_user, ui_password, [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, (usuarios.length+1)],

    usuarios.push(newUsuario);

    alert("Usuario creado");
    // Devolvemos usuarios actualizado
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}
