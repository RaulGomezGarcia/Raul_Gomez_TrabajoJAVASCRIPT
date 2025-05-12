//----------------------Logica Presupuesto

let carrito = [];

const selectorProductos = document.getElementById('seleccion-productos');
const pushCarrito = document.getElementById('push-carrito');
const articulosCont = document.getElementById('articulos-carrito');
const totalFinal = document.getElementById('total-final');

//Añadir productos al carrito
pushCarrito.addEventListener('click', ()=>{
    const optionSelect = selectorProductos.options[selectorProductos.selectedIndex];
    const valorSeleccionado = optionSelect.value;

    //Comprobamos que hay un valor seleccionado
    if(!valorSeleccionado){
        alert('Selecciona un producto valido')
        return
    }

    //Se separa el nombre del valor y nos quedamos con el valor
    const [nombreProducto, precioProducto] = valorSeleccionado.split(":");
    const precio = parseFloat(precioProducto);

    carrito.push({nombre: nombreProducto, precio});

    
})