let usuarios = [
    ["admin",1111,0,0,0,0,0,0,0,0,false],
    ["kike",1111,0,0,0,0,0,0,0,0,false],
    ["albert",1111,0,0,0,0,0,0,0,0,false],
]

if (typeof localStorage !== "undefined") {
    if (!localStorage.getItem("usuarios")) {
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
} else {
    console.error("localStorage no está disponible en este entorno.");
}


function LogIn(){
    document.getElementById("error_password").innerHTML = "";
    document.getElementById("error_user").innerHTML = "";
    document.getElementById("error_general").innerHTML = "";

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    let ui_user = document.getElementById("ui_user").value.trim();
    let ui_password = document.getElementById("ui_password").value.trim();

    for(let i = 0; i < usuarios.length; i++){
         if(!ui_password){
            document.getElementById("error_password").innerHTML = "Password is required"
        } if(!ui_user){
            document.getElementById("error_user").innerHTML = "User is required"
        } if( (ui_user && ui_password) && ui_user != usuarios[`user${i}`].user || ui_password != usuarios[`user${i}`].password){
            document.getElementById("error_general").innerHTML = "User or password is incorrect"
        } if(ui_user == usuarios[`user${i}`].user && ui_password == usuarios[`user${i}`].password){
            usuarios[`user${i}`].active = true;
            alert(`Welcome, ${usuarios[`user${i}`].user} to the Sugar Cave`);
            let usuariosString = JSON.stringify(usuarios);
            localStorage.setItem("usuarios", usuariosString);
            console.log(usuarios[`user${i}`]);
            location.href = "store.html";

        } 
    }
}

window.onload = function CheckUsers() {
    usuariosString = localStorage.getItem("usuarios");
    usuarios = JSON.parse(usuariosString);

    for (let i = 0; i < Object.keys(usuarios).length; i++) {
        if (usuarios[`user${i}`].active) {
            alert(`Welcome, ${usuarios[`user${i}`].user} to the Sugar Cave`);
            location.href = "store.html";
            break;
        }
    }
}
function ClearCache(){
    localStorage.clear();
    let usuarios = {
        "user0": {user:"admin", password:"1111", q1:0, q2:0, q3:0, q4:0, q5:0, q6:0, q7:0, q8:0, active:false},
        "user1": {user:"albert", password:"1111", q1:0, q2:0, q3:0, q4:0, q5:0, q6:0, q7:0, q8:0, active:false},
        "user2": {user:"kike", password:"1111", q1:0, q2:0, q3:0, q4:0, q5:0, q6:0, q7:0, q8:0, active:false},
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

}