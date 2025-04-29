
//Hacemos la busqueda del JSON
fetch('experiencias.json')  
    //Nos aseguramos que la respuesta  sea en formato JSON
    .then(response => response.json())
    .then(experiencias => {
        //DIV general del HTML
        const contenedorExp = document.getElementById('experiencias');

        //Creamos los DIV con sus clases para poder darle dinamismo y estilos con el css he introducimos los datos del JSON
        experiencias.forEach(seccion => {
            const bloqueExp = document.createElement('div');
            bloqueExp.classList.add('target-exp');

            const cabecera = document.createElement('div');
            cabecera.classList.add('cabecera');
            cabecera.innerHTML = `<h3>${seccion.puesto}</h3>`

            const contenido = document.createElement('div');
            contenido.classList.add('descripcion-exp');
            contenido.style.display = 'none';
            contenido.innerHTML = `<p>${seccion.descripcion}</p>`

            //Los introducimos mediante los metodos de JS
            bloqueExp.appendChild(cabecera);
            bloqueExp.appendChild(contenido);
            contenedorExp.appendChild(bloqueExp)
        });

        //Creamos los eventos para que se vea el contenido "descripcion"
        const cabeceras = document.querySelectorAll('.cabecera');
        cabeceras.forEach(cabecera => {
            cabecera.addEventListener('click', ()=>{
                const contenidoActual = cabecera.nextElementSibling;//Me he pegado un rato para averiguar este metodo

                //Creamos esta condicional junto a la constante de arriba para que solo un contenido de los 3 se muestre al mismo tiempo
                document.querySelectorAll('.descripcion-exp').forEach(contenido => {
                    if(contenido != contenidoActual){
                        contenido.style.display = 'none'
                    }
                });

                if(contenidoActual.style.display === 'none'){
                    contenidoActual.style.display = 'block'
                }else{
                    contenidoActual.style.display = 'none'
                }
            });
        })
    })
    .catch(error =>{console.error('Error al cargar el archivo JSON ' + error)})
