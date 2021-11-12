//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // Obtenemos la data del localStorage y la convertimos a formato json
    var dataProfile = JSON.parse(localStorage.getItem('data'));
    if (dataProfile) {
        
        /* Si existe data, asigno a cada input su valor correspondiente.
        */
        document.getElementById("name").value = dataProfile.name;
        document.getElementById("lastName").value = dataProfile.lastName;
        document.getElementById("age").value = dataProfile.age;
        document.getElementById("email").value = dataProfile.email;
        document.getElementById("phone").value = dataProfile.phone;
    }

    // Obtengo el formulario.
    var form = document.getElementById('profileForm');

    // Defino el evento submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir que el formulario se envie.

        // Obtengo el valor de cada input y lo cargo en su variable correspondiente.
        var name = document.getElementById("name").value;
        var lastName = document.getElementById("lastName").value;
        var age = document.getElementById("age").value;
        var phone = document.getElementById("phone").value;
        var email = document.getElementById("email").value;

        // Defino un objecto donde guardo toda la data de los campos ingresados para posteriormente guardarlo en localStorage.
        const formulario = {
            name,
            lastName,
            age,
            phone,
            email
        };

        //Guardo la data en localStorage
        localStorage.setItem("data", JSON.stringify(formulario));
        form.classList.add('was-validated');
    }, false);
});
