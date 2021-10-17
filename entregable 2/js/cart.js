//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var carrito;
function showCart(array){
    var contenido = "";
    for(i = 0;i < array.length; i++){
    
         carrito = array[i];
         contenido = `
         
        <div id="carrito" class="container">
        <div class="row justify-content-center">
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <div class="col-12 col-md-6">
        </div>
        <div class="col-12 col-md-6">
        </div>
        <img  style="center"; width="200px"; src=" ${carrito.src}"><hr>
        <h5  class="card-title"> `  + carrito.name +` </h5><br>
        <p>Cantidad:` + carrito.count + `</p>
        <p>Precio por unidad: ` +  carrito.unitCost + ` </p>
        <p>Moneda: ` +carrito.currency + ` </p>
        <div class="btn-group" role="group" aria-label="Basic example">
        <button id="sumar${i}" onClick() type="button" class="btn btn-secondary btn-sm">Sumar producto</button> 
        <button id="quitar${i}" type="button" class="btn btn-secondary btn-sm">Quitar producto</button>
        </div>
        </div>
        </div>
        </div>
        </div>
    
        `
        document.getElementById("carrito").innerHTML += contenido;
        
    }
    
    }




document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(CART_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            producto = result.data.articles;
            showCart(producto);
            mostrarBoleta(producto);
        }
    })
    

});

  function mostrarBoleta(array){
      var contenido = "";
      for(i = 0;i < array.length; i++){
        let sub = 
           cart = array[i];
           contenido = `
        <div id="boletaCompra">
        <div class="container"">
        <div class="card" style="width: 18rem;">
        <div class="card-body">
        <div class="row">
        <div class="col">
        <tr class="card">
        <td>
        <h5 class="card-title">Producto: ${cart.name}</h5>
        <p id="count">Cantindad: ${cart.count}</p>
        <p>Precio: ${cart.unitCost} </p>
        <p id="subtotal">Subtotal:</p>
        </td>
        </tr>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
           `
           document.getElementById("boletaCompra").innerHTML += contenido;
      }
  }  

 

function cambioDolar(){
    if(carrito.currency === "USD"){
        carrito.unitCost * 40;

    }

}
function calcSub(unitCost, count){
    unitCost * count;
    console.log(unitCost*count);

}
function sumarProduct(){

}




    
