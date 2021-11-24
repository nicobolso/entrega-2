//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var carrito;

function showCart(array) {// función que mostrara los productos del carrito
    document.getElementById("carrito").innerHTML = "";
    var contenido = "";
    for(i = 0;i < array.length; i++){
        contenido = `
            <div class="card col-12 col-md-6">
                <div class="card-body">
                    <img style="center" width="200px" src="${array[i].src}"><hr>
                    <h5 class="card-title">${array[i].name}</h5><br>
                    <p><strong>Cantidad:</strong> ${array[i].count}</p>
                    <p><strong>Precio por unidad:</strong> ${array[i].unitCost}</p>
                    <p><strong>Moneda:</strong> ${array[i].currency}</p>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button id="sumar${i}" onclick="addProductCount(${i});" type="button" class="btn btn-secondary btn-sm mr-2">Sumar producto</button> 
                        <button id="quitar${i}" onclick="deleteProductCount(${i});" type="button" class="btn btn-secondary btn-sm">Quitar producto</button>
                    </div>
                </div>
            </div>`;
        document.getElementById("carrito").innerHTML += contenido;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function (result) {
        if (result.status === "ok") {
            productos = result.data.articles;
            carrito = productos;
            showCart(productos);
            mostrarBoleta(productos);
        }
    })

    var btnSave = document.getElementById("btn-save");
    btnSave.addEventListener('click', function() {
        var paymentMethod = document.querySelector('input[name="payMethod"]:checked').value;
        var cardNumber = document.getElementById("cardNumber").value;
        var segurityCode = document.getElementById("cvc").value;
        var dateCard = document.getElementById("date").value;
        var accountNumber = document.getElementById("accountNumber").value;
        var errorMsj =  document.getElementById("errorMsj");
        var validateEmptyFields= true;

        
     

        if (paymentMethod === "tc"){
            
            validateEmptyFields = false;
            alert("Debe llenar los campos correctamente")
          
            console.log(validateEmptyFields, "hola");
           
             
            



        }else if(paymentMethod === "tc" && paymentMethod !== "tb" && cardNumber !== "" && segurityCode !== "" && dateCard !== ""){
            validateEmptyFields;
            console.log(validateEmptyFields, "hola");

        }
         else if (paymentMethod === "tb" &&  paymentMethod !== "tc" && accountNumber == "") {
            validateEmptyFields = false;
            alert("debe llenar los campos")
            

        } else if (paymentMethod === "tb" &&  paymentMethod !== "tc" && accountNumber !== "") {
            validateEmptyFields;
        
        }
    });
});

function mostrarBoleta(array){//función donde se mostará la boleta de compra con el subtotal y los cambios de cantidad en tiempo real
    document.getElementById("boletaCompra").innerHTML = "";
    var contenido = "";
    var percentage = document.querySelector('input[name="sendType"]:checked');
    for(i = 0;i < array.length; i++){
       var cart = array[i];
       var unitCost = cart.unitCost;
       if (cart.currency === "USD") {
           unitCost = cambioDolar(cart.unitCost);
       }
       var subTotal = unitCost * cart.count;
       var sendCost = 0;
       if (percentage) {
           sendCost = (subTotal * percentage.value) / 100;
       }
       contenido = `
            <div class="card mt-2">
                <div class="card-body">
                    <tr class="card">
                        <td>
                            <h5 class="card-title">Producto: ${cart.name}</h5>
                            <p id="count"><strong>Cantindad:</strong> ${cart.count}</p>
                            <p><strong>Precio:</strong> UYU ${unitCost}</p>
                            <p><strong>Costo de envío:</strong> UYU ${sendCost}</p>
                            <p id="subtotal"><strong>Subtotal:</strong> UYU ${subTotal}</p>
                            <p><strong>Total:</strong> UYU ${subTotal + sendCost}</p>
                        </td>
                    </tr>
                </div>
            </div>`;
       document.getElementById("boletaCompra").innerHTML += contenido;
    }
}


function cambioDolar(unitCost) {//función que cambia de dólares a pesos
    return unitCost * 40;
}

function addProductCount(idProduct) { // Pasamos un id de producto (indice del array) para actualizar la cantidad de productos
    if (carrito && carrito[idProduct]) {
        carrito[idProduct].count = carrito[idProduct].count + 1;
        showCart(carrito);
        mostrarBoleta(carrito);
    }
}

function deleteProductCount(idProduct) { // Pasamos un id de producto (indice del array) para actualizar la cantidad de productos
    if (carrito && carrito[idProduct] && carrito[idProduct].count > 0) {
        carrito[idProduct].count = carrito[idProduct].count - 1;
        showCart(carrito);
        mostrarBoleta(carrito);
    }
}

document.querySelectorAll("input[name='sendType']").forEach((input) => {
    input.addEventListener('change', function() {
        mostrarBoleta(carrito);
    });
});



