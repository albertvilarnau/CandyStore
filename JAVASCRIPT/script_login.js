function LogIn() {
    let usuarios = [
        ["admin", "1111", 0,0,0,0,0,0,0,0,false],
        ["albert", "1111", 0,0,0,0,0,0,0,0,false],
        ["kike", "1111", 0,0,0,0,0,0,0,0,false],
    ];
    
    if (!localStorage.getItem("usuarios")) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    document.getElementById("error_password").innerHTML = "";
    document.getElementById("error_user").innerHTML = "";
    document.getElementById("error_general").innerHTML = "";

    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let ui_user = document.getElementById("ui_user").value;
    let ui_password = document.getElementById("ui_password").value;

    for (let i = 0; i < usuarios.length; i++) {
        if (!ui_password) {
            document.getElementById("error_password").innerHTML = "Password is required";
        }
        if (!ui_user) {
            document.getElementById("error_user").innerHTML = "User is required";
        }
        if ((ui_user && ui_password) && (ui_user != usuarios[i][0] || ui_password != usuarios[i][1])) {
            document.getElementById("error_general").innerHTML = "User or password is incorrect";
        }
        if (ui_user == usuarios[i][0] && ui_password == usuarios[i][1]) {
            usuarios[i][10] = true;
            alert(`Welcome, ${usuarios[i][0]} to the Sugar Cave`);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            location.href = "store.html";
            break;
        } 
    }
}

window.onload = function CheckUsers() {
    let usuariosString = localStorage.getItem("usuarios");
    let usuarios = JSON.parse(usuariosString);

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i][10]) {
            alert(`Welcome, ${usuarios[i][0]} to the Sugar Cave`);
            location.href = "store.html";
            break;
        }
    }
}

function ClearCache() {
    let usuarios = [
        ["admin", "1111", 0,0,0,0,0,0,0,0,false],
        ["albert", "1111", 0,0,0,0,0,0,0,0,false],
        ["kike", "1111", 0,0,0,0,0,0,0,0,false],
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
