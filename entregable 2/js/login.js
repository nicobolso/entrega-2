//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
document.getElementById('direccionar').addEventListener('click',function() {//mediante el id direccionar traigo el button y le agrego un evento para que cuando le de un click me redireccione a la pagina de inicio
    var usuario = document.getElementById("email").value;//declaro la variable usuario y con el id email traigo el input para asignarle un valor
    var contraseña = document.getElementById("password").value;//declaro contraseña y con el id passwor traigo el input de tipo passwor para asinarle un valor
    
        if(usuario =="nico_10" && contraseña == "12345"){//con la condicional if else le digo que si el valor de usuario es "nico_10" y si la contraseña es "12345" entonces me direccione hacia la pagina de inicio
            localStorage.setItem("user", JSON.stringify({usuario: "nico_10"}));
            window.location.href = "inicio.html";
        }else{
            alert("Usuario o contraseña incorrecta");// si los valores que se ingresaron no son correctos entonces de desplea un alert
        }
    })
});

  