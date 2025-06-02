const presentacionDiv = document.querySelector('.contenedor-presentacion');

const presentacion = [
    {
        nombre: "Raúl Gómez García",
        trabajo: "Programador Junior (en proceso)",
        descripcion: "¡Muy buenas a ti, que estás visitanto mi pagina! Soy Raúl Gómez, como habrás podido leer :)  A lo mejor te estas preguntando ¿Por qué la descripción está tan abajo? ... Siempre he pensado que se conoce mejor a una persona por lo que hace que por lo que dice, por eso he preferido antes que todo mostrarte a lo que me dedico.",
        linkedin: "https://www.linkedin.com",
        github: "https://github.com/RaulGomezGarcia",
        cvLink: "./assets/miCV.pdf"
    }
];

presentacion.map((item)=>{
    presentacionDiv.innerHTML += 
    `   
        <img class="img-circular" src="./assets/mifoto.png" alt="foto de perfil" height="288" width="288">
        <h3>${item.nombre} - ${item.trabajo}</h3>
        <p>${item.descripcion}</p>

        <div class="iconos">
            <a href=${item.linkedin} target="_blank">
                <img class="icono" src="./assets/linkedin.png" alt="icono Linkedins" height="50" width="50">
            </a>
            <a href=${item.github}  target="_blank">
                <img class="icono" src="./assets/github.png" alt="icono de github" height="512" width="512">
            </a>
            <a href=${item.cvLink} target="-blank" download="miCV.pdf">
                <img class="icono" src="./assets/cv_102350.svg" alt="icono cv" height="150" width="150">
            </a>
        </div>
    `
})
