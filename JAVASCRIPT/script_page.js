usuariosString = localStorage.getItem("usuarios");
usuarios = JSON.parse(usuariosString)

function LogOut(){
    for(let i = 0; i < Object.keys(usuarios).length; i++){
        if (usuarios[`user${i}`].active = true){
            usuarios[`user${i}`] = false;
        }
        let usuariosString = JSON.stringify(usuarios);
        localStorage.setItem("usuarios", usuariosString);
        location.href = "index.html"
    }
}