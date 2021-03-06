const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  const name = JSON.parse(localStorage.getItem("user"));//
    if (name && name?.usuario) {
    document.getElementById("username").innerHTML = name.usuario;
  }
});
/*  var nombre = document.getElementById("name");
var apellido = document.getElementById("lastname");
var edad = document.getElementById("age");
var email = document.getElementById("email");
var telefono = document.getElementById("tel");

    if(nombre !="" && apellido != "" && edad !="" && email !="" && telefono != ""){
        localStorage.setItem("form", JSON.stringify({ value = nombre,value = apellido,value = edad,value = email,value = telefono }));

    }




       const formulario = JSON.parse(localStorage.getItem("form"));
    function guardarDatos(){
    if (formulario && formulario.nombre && formulario.apellido && formulario.edad && formulario.email && formulario.telefono) {
    document.getElementById("form").innerHTML = formulario;
    
  }
}
    */