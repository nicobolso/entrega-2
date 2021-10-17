//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productDetail;
var comments;

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (result) {
        if (result.status === "ok") {// si el estado del resultado es estrictamente igual al string ok
            productDetail = result.data;
            showDescription(); // función para poder cargar la información del producto
            showImages(); // función para poder cargar las imagenes en el carousel
            showComments(); // función para cargar los comentarios
            showRelatedProducts();// función para cargar  los productos relacionados
        }
    })
});

function showDescription() {
    document.getElementById("infoProduct").innerHTML = '<tr >' +
        '<td >' + productDetail.name + '</td>' +
        '<td >' + productDetail.description + '</td>' +
        '<td >' + productDetail.cost + '</td>' +
        '<td >' + productDetail.soldCount + '</td>' +
        '<td >' + productDetail.currency + '</td>' +
        '<td >' + productDetail.category + '</td>' +
        '</tr>';
}

function showImages() {
    if (productDetail && productDetail.images) {
        var divSlide = document.getElementById("slide");

        for (let i = 0; i < productDetail.images.length; i++) {
            var active = (i === 0) ? "active" : "";
            var contenido = '<div class="carousel-item ' + active + '">' +
                '<img class="d-block w-100" src="' + productDetail.images[i] + '" alt="First slide">' +
                '</div>';


            divSlide.innerHTML += contenido;
        }
    }
}

async function showComments() {
    if (!comments) {
        await getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
            if (result.status === "ok") {// si el estado del resultado es estrictamente igual al string ok
                comments = result.data;// Entro y digo que la variable comments es igual al resultado de la data
            }
        })
    }

    if (comments) {
        for (let i = 0; i < comments.length; i++) {
            document.getElementById("comments").innerHTML += '<tr>' +
                '<td>' + comments[i].score + '</td>' +
                '<td>' + comments[i].description + '</td>' +
                '<td>' + comments[i].user + '</td>' +
                '<td>' + comments[i].dateTime + '</td>' +
                '</tr>';
        }
    }
}

function submitComment() {
    const divError = document.getElementById("divError"); // Div en el cual se visualiza el error.
    const description = document.getElementById("description").value; // Valor del input description
    const score = document.getElementById("score").value; // Valor del input score
    const user = JSON.parse(localStorage.getItem("user"))?.usuario; // Obtenemos el usuario logueado. (el ? se encarvga de ver si user se encuentra definido)
    const dateTime = new Date().toISOString(); // Obtenemos fecha actual del sistema.

    let error = false; // Por defecto no hay errores;
    let msg = "";

    if (!user) {
        error = true;
        msg = "Debe estar logueado para comentar";
    } else if (!description || description === "") {
        error = true;
        msg = "Debe ingresar un comentario";
    } else if (!score || score < 0 || score > 5) {
        error = true;
        msg = "Debe ingresar una puntuación entre 0 y 5";
    }


    // Si existe algún error
    if (error) {
        divError.style.display = "block"; // Muestro el contenedor del error
        document.getElementById("errorMsg").innerHTML = msg; // Actualizo el contenedor del mensaje.
    } else {
        divError.style.display = "none"; // Oculto el contenedor del error
        document.getElementById("errorMsg").innerHTML = msg; // Dejo el mensaje en vacío
        document.getElementById("description").value = ""; // Limpio el input de descripción
        document.getElementById("score").value = ""; // limpio el input de la puntuación
        // Genero el JSON y lo agrego a mi lista de comentarios.
        comments.push({
            score,
            description,
            user,
            dateTime
        })
        // Vuelvo a mostrar los comentarios con el nuevo comentario agregado.
        showComments().then();
    }
}


function showRelatedProducts() {
    const related = productDetail.relatedProducts;// declaro la constante related en donde le paso como valor la funcion productDetail para acceder a los relatedProducts
    if(related){//si related existe entonces a traves de la funcion getJSONData hago un llamado a la url de los prooductos
        getJSONData(PRODUCTS_URL).then(function (result) {
            if (result.status === "ok") {//si el estado del resultado es estrictamente igual al string ok
               const products = result.data;
               for(let i = 0; i < related.length; i++){//recorro los elementos de relatedProducts
                   var autos = products[related[i]];//declaro la variable autos donde guardo los elementos que se encuentran dentro de related
                   document.getElementById("relacionados").innerHTML += `<div class="lista text-center">
                        <img class="mb-2" width="auto" height="120px" src="${autos.imgSrc}" alt="Image-${i}">
                        <p><b>Nombre:</b> ${autos.name}</p>
                        <p><b>Descripción:</b> ${autos.description}</p>
                        <p><b>Costo:</b> ${autos.currency} ${autos.cost}</p>
                        <a href="product-info.html">Ver info</a>
                        </div>`;
               }
            }
        })
    }
}
