//-------Recogemos los input del HTML
const nombreInput= document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const telefonoInput = document.getElementById("telefono");
const emailInput = document.getElementById("email");
const formulario = document.getElementById("formulario");

function validarNombre(){
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-Z]{3,15}$/
    if(nombre.length >= 3 && nombrePattern.test(nombre)){
        nombreInput.classList.add('valido');
        nombreInput.classList.remove('invalido');
        document.getElementById('nombreError').textContent = '';
    }else{
        nombreInput.classList.add('invalido');
        nombreInput.classList.remove('valido');
        document.getElementById('nombreError').textContent = 'El nombre debe tener entre 3 y 15 caracteres y empezar con una letra';
    }
}

function validarApellidos(){
    const apellidos = apellidosInput.value;
    const apellidosPattern = /^[a-zA-Z]{3,40}$/
    if(apellidos.length >= 3 && apellidosPattern.test(apellidos)){
        apellidosInput.classList.add('valido');
        apellidosInput.classList.remove('invalido');
        document.getElementById('apellidosError').textContent = '';
    }else{
        apellidosInput.classList.add('invalido');
        apellidosInput.classList.remove('valido');
        document.getElementById('apellidosError').textContent = 'El apellido debe tener entre 3 y 40 caracteres y solo contener letras';
    }
}

function validarTelefono(){
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{9}$/;
    if(telefonoPattern.test(telefono)){
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        document.getElementById('telefonoError').textContent = '';
    }else{
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido');
        document.getElementById('telefonoError').textContent = 'El numero de telefono debe tener 9 digitos y contener solo números';
    }
}

function validarEmail(){
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(emailPattern.test(email)){
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        document.getElementById('emailError').textContent = '';
    }else{
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        document.getElementById('emailError').textContent = 'Ingrese un correo electronico válido';
    }
}


function resetFormulario(){
    formulario.reset();
    nombreInput.classList.remove('valido');
    apellidosInput.classList.remove('valido')
    telefonoInput.classList.remove('valido');
    emailInput.classList.remove('valido');

    //Reseteamos el carrito
    carrito= [];
    actualizarCarrito();
    actualizarTotalFinal();
}

nombreInput.addEventListener('input', validarNombre);
apellidosInput.addEventListener('input', validarApellidos)
telefonoInput.addEventListener('input', validarTelefono);
emailInput.addEventListener('input', validarEmail);


//----------------------Logica Presupuesto

let carrito = [];

const selectorProductos = document.getElementById('seleccion-productos');
const pushCarrito = document.getElementById('push-carrito');
const articulosCont = document.getElementById('articulos-carrito');
const totalFinal = document.getElementById('total-final');
const plazoInput = document.getElementById('plazo')

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
    
    actualizarCarrito()
})

//Actualizamos el carrito y lo metemos en el html
function actualizarCarrito(){
    articulosCont.innerHTML='';

    let totalCarrito = 0;

    //Mostramos los productos
    carrito.forEach((producto, index) =>{
        totalCarrito += producto.precio;

        const articuloCarrito = document.createElement('div');
        articuloCarrito.classList.add('articulo-carrito');
        articuloCarrito.innerHTML = 
        `
            ${producto.nombre} - ${producto.precio.toFixed(2)}
            <button type= 'button' class='eliminar-articulo' data-index = '${index}'>Eliminar</button>
        `

        articulosCont.appendChild(articuloCarrito);
    })

    //Para eliminar el producto
   document.querySelectorAll('.eliminar-articulo').forEach((boton)=>{
        boton.addEventListener('click', (e)=>{
            const index = e.target.dataset.index
            eliminarArticulo(index)
        })
    })

    actualizarTotalFinal();
}

//Funcion eliminar
function eliminarArticulo(index){
    carrito.splice(index, 1);

    actualizarCarrito()
}

//Funcion para sumar el total final del precio
function actualizarTotalFinal(){
    let total = carrito.reduce((suma, item) => suma + item.precio, 0)

    //Sumar el precio de los extras
    const extrasSelect = document.querySelectorAll('.checkbox-extra:checked');
    extrasSelect.forEach((checkbox)=>{
        const [, precioExtra] = checkbox.value.split(':')
        total += parseFloat(precioExtra)
    })

    //Descuento
    let descuento = 0;
    const plazo = parseInt(plazoInput.value);

    if(plazo >= 1 && plazo <= 3){
        descuento = 0.05;
    }else if(plazo >= 4 && plazo <= 6){
        descuento = 0.10;
    }else if(plazo > 6){
        descuento = 0.15;
    }

    const totalConDescuento = total * (1 - descuento);
    const descuentoAplicado = total * descuento;


    totalFinal.textContent = `Total sin descueneto: ${total.toFixed(2)}€`;
    if(descuento > 0){
        totalFinal.textContent += ` - Descuento (${(descuento * 100).toFixed(0)}%)= -${descuentoAplicado.toFixed(2)}€`
    }
    totalFinal.textContent += ` | Total final: ${totalConDescuento.toFixed(2)}€`
}

const checkboxExtras = document.querySelectorAll('.checkbox-extra')
checkboxExtras.forEach((checkbox)=>{
    checkbox.addEventListener('change', actualizarTotalFinal)
})

plazoInput.addEventListener('change', actualizarTotalFinal)



//Llamada del boton del formulario
formulario.addEventListener('submit', function(event){
    event.preventDefault();
    validarNombre();
    validarApellidos();
    validarTelefono();
    validarEmail();

    //Llamamos al actualizarTotalFinal() aquí, despues de la validacion para que se actualize todo
    actualizarTotalFinal();

    if(nombreInput.classList.contains("valido") && apellidosInput.classList.contains("valido") && telefonoInput.classList.contains("valido") && emailInput.classList.contains("valido")){
        alert("Formulario enviado correctamente");
        resetFormulario();
        //Aqui estaria donde lo quieres enviar
    }else{
        alert("Por favor, corrija los errores en el formulario");
    }
})