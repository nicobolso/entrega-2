//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    
});

document.getElementById("guardar").addEventListener("click", function (e) {
    var nombre = document.getElementById("name").value;
    var apellido = document.getElementById("lastname").value;
    var edad = document.getElementById("age").value;
    var telefono = document.getElementById("tel").value;
    var email = document.getElementById("email").value;
    const formulario = {
        nombre,
        apellido,
        edad,
        telefono,
        email
    };
    console.log(formulario, "aca");
    
     if(form != ""){
            localStorage.setItem("data",JSON.stringify(formulario));

     }
    
});
