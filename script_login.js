let user = "admin"
let password = "1111"

function LogIn(){
    ui_user = document.getElementById("ui_user").value;
    ui_password = document.getElementById("ui_password").value;

    if (ui_user == user && ui_password == password){
        localStorage.setItem("user", ui_user);
        localStorage.setItem("password", ui_password);
        location.href = "store.html";
    } else {
        if (ui_user == ""){
            document.getElementById("error_user").innerHTML = "Error, campo obligatorio"
        } else if(ui_user != user){
            document.getElementById("error_user").innerHTML = "Error, el usuario es incorecto"
        }

        if (ui_password == ""){
            document.getElementById("error_password").innerHTML = "Error, campo obligatorio"
        } else if(ui_password != password){
            document.getElementById("error_password").innerHTML = "Error, la contraseña es incorecta"
        }
    }
}

window.onload = function ComprovarLocalLogIn(){
    let ls_user = localStorage.getItem("user")
    let ls_password = localStorage.getItem("password")

    if (ls_user == user && ls_password == password){
        location.href = "store.html";
    }

}
