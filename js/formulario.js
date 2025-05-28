//-------Recogemos los input del HTML
const nombreInput= document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const telefonoInput = document.getElementById("telefono");
const emailInput = document.getElementById("email");
const formulario = document.getElementById("formulario");

//----Terminos y condiciones
const aceptaTerminosCheckbox = document.getElementById("aceptaTerminos");
const terminosErrorSpan = document.getElementById("terminosError");

//Array para el carrito
let carrito = [];

function validarNombre(){
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]{3,15}$/
    if(nombre.length >= 3 && nombrePattern.test(nombre)){
        nombreInput.classList.add('valido');
        nombreInput.classList.remove('invalido');
        document.getElementById('nombreError').textContent = '';
        return true
    }else{
        nombreInput.classList.add('invalido');
        nombreInput.classList.remove('valido');
        document.getElementById('nombreError').textContent = 'El nombre debe tener entre 3 y 15 caracteres y empezar con una letra';
        return false
    }
}

function validarApellidos(){
    const apellidos = apellidosInput.value;
    const apellidosPattern = /^[a-zA-Z\sñÑáéíóúÁÉÍÓÚ]{3,40}$/
    if(apellidos.length >= 3 && apellidosPattern.test(apellidos)){
        apellidosInput.classList.add('valido');
        apellidosInput.classList.remove('invalido');
        document.getElementById('apellidosError').textContent = '';
        return true
    }else{
        apellidosInput.classList.add('invalido');
        apellidosInput.classList.remove('valido');
        document.getElementById('apellidosError').textContent = 'El apellido debe tener entre 3 y 40 caracteres y solo contener letras';
        return false
    }
}

function validarTelefono(){
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{9}$/;
    if(telefonoPattern.test(telefono)){
        telefonoInput.classList.add('valido');
        telefonoInput.classList.remove('invalido');
        document.getElementById('telefonoError').textContent = '';
        return true
    }else{
        telefonoInput.classList.add('invalido');
        telefonoInput.classList.remove('valido');
        document.getElementById('telefonoError').textContent = 'El numero de telefono debe tener 9 digitos y contener solo números';
        return false
    }
}

function validarEmail(){
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(emailPattern.test(email)){
        emailInput.classList.add('valido');
        emailInput.classList.remove('invalido');
        document.getElementById('emailError').textContent = '';
        return true
    }else{
        emailInput.classList.add('invalido');
        emailInput.classList.remove('valido');
        document.getElementById('emailError').textContent = 'Ingrese un correo electronico válido';
        return false
    }
}

//---Funcion Terminos y condiciones
function validarTerminos(){
    if(aceptaTerminosCheckbox.checked){
        terminosErrorSpan.textContent= '';
        aceptaTerminosCheckbox.classList.remove('invalido');
        return true
    }else{
        terminosErrorSpan.textContent = ' Debe aceptar los términos y condicones'
        aceptaTerminosCheckbox.classList.add('invalido')
        return false
    }
}


function resetFormulario(){
    formulario.reset();
    nombreInput.classList.remove('valido', 'invalido');
    apellidosInput.classList.remove('valido', 'invalido')
    telefonoInput.classList.remove('valido', 'invalido');
    emailInput.classList.remove('valido', 'invalido');

    //Reseteamos el chekcbox terminos
    aceptaTerminosCheckbox.checked = false;
    aceptaTerminosCheckbox.classList.remove('invalido');
    terminosErrorSpan.textContent='';

    //Reseteamos el carrito
    carrito= [];
    actualizarCarrito();
    actualizarTotalFinal();
}

nombreInput.addEventListener('input', validarNombre);
apellidosInput.addEventListener('input', validarApellidos)
telefonoInput.addEventListener('input', validarTelefono);
emailInput.addEventListener('input', validarEmail);
aceptaTerminosCheckbox.addEventListener('change', validarTerminos);


//----------------------Logica Presupuesto


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
    event.preventDefault(); // Evita el envío por defecto del formulario

    // Validar todos los campos antes de intentar enviar
    const nombreValido = validarNombre();
    const apellidosValidos = validarApellidos();
    const telefonoValido = validarTelefono();
    const emailValido = validarEmail();
    const terminosAceptados = validarTerminos(); // NUEVO: Validar términos

    // Asegurarse de que haya al menos un producto en el carrito si es necesario
    if (carrito.length === 0) {
        alert("Por favor, añade al menos un producto al carrito.");
        return; // Detiene el envío si no hay productos
    }

    // Actualizamos el total final una última vez
    actualizarTotalFinal();

    // Comprobamos que TODOS los campos y el checkbox de términos son válidos
    if(nombreValido && apellidosValidos && telefonoValido && emailValido && terminosAceptados){
        alert("Formulario enviado correctamente");
        resetFormulario();
        // Aquí es donde enviarías los datos a un servidor
    }else{
        alert("Por favor, corrija los errores en el formulario.");
    }
})