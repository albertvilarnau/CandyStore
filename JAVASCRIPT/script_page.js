usuariosString = localStorage.getItem("usuarios");
usuarios = JSON.parse(usuariosString)

function LogOut(){
    for(let i = 0; i < Object.keys(usuarios).length; i++){
        if (usuarios[`user${i}`].active = true){
            usuarios[`user${i}`] = false;
        }
        location.href = "index.html"
    }
}