var productos = [];//declaro la variable productos  que es una lista vacia
var minCost; // variable para filtrar por mínimo
var maxCost; // variable para filtrar por máximo

function mostrarProductos(array) {
    document.getElementById("lista").innerHTML = ""; // de arranque, limpiamos el contenedor de lista
    for (let i = 0; i < array.length; i++) {//Con el atributo length accedo a la longitud de los elementos dentro de array
        const auto = array[i];//Creo la variable products para acceder a los elementos del array
        const contenido =//declaro la variable contendio donde voy a guardar los elementos que traigo del array
                `
                <div class=container>
                <div class= lista >
                <img width="300px"  src= "` + auto.imgSrc + `">
                <p> Modelo: `+ auto.name + `</p>
                <p> Descripcion: `+ auto.description + `</p>
                <p> Precio: `+ auto.cost + `</p>
                <p> Moneda: `+ auto.currency + `</p>
                <p>Vendidos: `+ auto.soldCount + `</p>
                <a href="product-info.html">Ver info</a>
                </div>
                </div>
            `;
        
        /** condicionales para filtros de máximo y mínimo
         if

         * 1 - si existe mínimo y es menor o igual al costo del auto y (maximo existe y maximo es mayor al costo del auto o maximo no existe)
         * 2 - si existe máximo y es mayor o igual al costo del auto y (mínimo existe y minimo es menor al costo del auto o minimo no existe)
         * 3 - si existe minimo y maximo y el costo del auto esta entre|igual al minimo y el maximo  
         
         else if

         * si no existe minimo ni maximo, esto quiere decir que no se estan usando los filtros e imprime todos los autos.
        */

        if ((minCost && parseInt(auto.cost) >= minCost
         && ((maxCost && (parseInt(auto.cost) <= maxCost) || maxCost === undefined)))
        || (maxCost && maxCost >= parseInt(auto.cost) 
        && ((minCost && (minCost <= parseInt(auto.cost)) || minCost === undefined)))
        || (maxCost && minCost && parseInt(auto.cost) <= maxCost && parseInt(auto.cost) >= minCost)) {             
            document.getElementById("lista").innerHTML += contenido;
        } else if (!minCost && !maxCost) {
            document.getElementById("lista").innerHTML += contenido;
        }
    }
}

document.addEventListener("DOMContentLoaded", function (e) {//con el evento llamo a la funcion a la que le paso por parametro la url 
    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {//si el estado del resultado es estrictamente igual al string ok
            productos = result.data;
            mostrarProductos(productos)//llamo a la funcion a la que le paso por parametro la lista con contenido
        }

    })
});
document.getElementById("filtrar").addEventListener('click', function () {
    const min = document.getElementById("minimo").value;
    const max = document.getElementById("maximo").value;
    
    if (min && min != "" && parseInt(min) >= 0) {
        minCost = parseInt(min);
    } else {
        minCost = undefined;
    }

    if(max && max != "" && parseInt(max) >= 0) {
        maxCost = parseInt(max);
    } else {
        maxCost = undefined;
    }

    mostrarProductos(productos)
});

document.getElementById("ascendente").addEventListener('click', function () {

    productos = productos.sort((a, b) => {
        if (a.cost > b.cost) { return 1 }
        if (a.cost < b.cost) { return -1 }
        return 0

    });
    mostrarProductos(productos)
});
document.getElementById("descendente").addEventListener('click', function () {
    productos = productos.sort((a, b) => {// con la funcion sort me devueve la lista de productos ordenados de forma descendente
        if (a.cost < b.cost) { return 1 }
        if (a.cost > b.cost) { return -1 }
        return 0

    });
    mostrarProductos(productos)
    
});
document.getElementById("vendidos").addEventListener('click', function () {
    productos = productos.sort((a, b) => {
        if (a.soldCount < b.soldCount) { return 1 }
        if (a.soldCount > b.soldCount) { return -1 }
        return 0

    });
    mostrarProductos(productos)

});

document.getElementById("limpiar").addEventListener("click", function () {
    document.getElementById("minimo").value = "";
    document.getElementById("maximo").value = "";

    minCost = undefined;
    maxCost = undefined;
    
    mostrarProductos(productos);
});



