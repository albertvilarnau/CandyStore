let usuarios = {
    "user0": {user:"admin", password:"1111", q1:0, q2:0, q3:0, q4:0, q5:0, q6:0, q7:0, q8:0, active:false},
    "user1": {user:"albert", password:"1111", q1:0, q2:0, q3:0, q4:0, q5:0, q6:0, q7:0, q8:0, active:false},
    "user2": {user:"kike", password:"1111", q1:0, q2:0, q3:0, q4:0, q5:0, q6:0, q7:0, q8:0, active:false},
}

let usuariosString = JSON.stringify(usuarios);

localStorage.setItem("usuarios", usuariosString);

function LogIn(){
    usuariosString = localStorage.getItem("usuarios");
    usuarios = JSON.parse(usuariosString)

    let ui_user  = document.getElementById("ui_user").value;
    let ui_password  = document.getElementById("ui_password").value;

    console.log(ui_user, ui_password);

    for(let i = 0; i < Object.keys(usuarios).length; i++){
        if (usuarios[`user${i}`].active = true){
            alert(`Welcome, ${usuarios[`user${i}`].user} to the Sugar Cave`);
            location.href = "store.html"
        } if(!ui_password){
            document.getElementById("error_password").innerHTML = "Password is required"
        } if(!ui_user){
            document.getElementById("error_user").innerHTML = "User is required"
        } if( (ui_user && ui_password) && ui_user != usuarios[`user${i}`].user || ui_password != usuarios[`user${i}`].password){
            document.getElementById("error_general").innerHTML = "User or password is incorrect"
        } if(ui_user == usuarios[`user${i}`].user && ui_password == usuarios[`user${i}`].password){
            usuarios[`user${i}`].active = true;
            alert(`Welcome, ${usuarios[`user${i}`].user} to the Sugar Cave`);
            location.href = "store.html"
        } 
    }
}