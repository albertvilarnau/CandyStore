// Script 1: login
function LogIn() {
    if (!localStorage.getItem("usuarios")) {
        let usuarios = [
            ["admin", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 1],
            ["albert", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 2],
            ["kike", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 3],
        ];
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    document.getElementById("error_password").innerHTML = "";
    document.getElementById("error_user").innerHTML = "";
    document.getElementById("error_general").innerHTML = "";

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

    let validUser = false;
    for (let i = 0; i < usuarios.length; i++) {
        if (ui_user === usuarios[i][0] && ui_password === usuarios[i][1]) {
            usuarios[i][4] = true;
            alert(`Welcome, ${usuarios[i][0]} to the Sugar Cave`);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            location.href = "store.html";
            validUser = true;
            break;
        }
    }

    if (!validUser) {
        document.getElementById("error_general").innerHTML = "User or password is incorrect";
    }
}

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

function ClearCache() {
    let usuarios = [
        ["admin", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 1],
        ["albert", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 2],
        ["kike", "1111", [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], false, 3],
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
