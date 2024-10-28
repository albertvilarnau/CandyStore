
function LogOut(){
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for(let i = 0; i < usuarios.length; i++){
        if (usuarios[i][10] = true){
            usuarios[i][10] = false;
        }
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        location.href = "index.html"
    }
}

window.onload = function OnLoadPage(){
    let ActiveUser = "";
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for(let i = 0; i < usuarios.length; i++){
        if (usuarios[i][10] == true){
            ActiveUser = usuarios[i][0];
        }
    }
    document.getElementById("user_header").innerHTML = ActiveUser;

    if (!localStorage.getItem("cesta")) {
        let cesta = [0,0,0,0,0,0,0,0,];
        localStorage.setItem("cesta", JSON.stringify(cesta));
    }
    
    let cesta = JSON.parse(localStorage.getItem("cesta"));
    for(let i = 0; i < cesta.length; i++){
        document.getElementById(`cesta_span${i}`).innerHTML = cesta[i];
    }
}

function Redirect(site){
    location.href = site
}

function AddCesta(num){
    if (!localStorage.getItem("cesta")) {
        let cesta = [0,0,0,0,0,0,0,0,];
        localStorage.setItem("cesta", JSON.stringify(cesta));
    }

    let cesta = JSON.parse(localStorage.getItem("cesta"));
    cesta[num]++;
    document.getElementById(`cesta_span${num}`).innerHTML = cesta[num];
    localStorage.setItem("cesta", JSON.stringify(cesta))
}
