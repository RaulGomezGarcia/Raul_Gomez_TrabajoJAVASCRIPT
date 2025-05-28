const presentacionDiv = document.querySelector('.contenedor-presentacion');

const presentacion = [
    {
        nombre: "Raúl Gómez García",
        trabajo: "Programador Junior (en proceso)",
        descripcion: "Hola buenas soy Raúl Gómez, como ya has podido leer. Te preguntaras ¿Por que la descripcion esta tan abajo?, siempre he pensado que se conoce mejor a una persona por lo que hace que por lo que dice.",
        linkedin: "https://www.linkedin.com",
        github: "https://github.com/RaulGomezGarcia",
        cvLink: "./assets/miCV.pdf"
    }
];

presentacion.map((item)=>{
    presentacionDiv.innerHTML += 
    `   
        <img class="img-circular" src="./assets/mifoto.png" alt="foto de perfil" height="500" width="700">
        <h3>${item.nombre} - ${item.trabajo}</h3>
        <p>${item.descripcion}</p>

        <div class="iconos">
            <a href=${item.linkedin} target="_blank">
                <img class="icono" src="./assets/linkedin.png" alt="icono Linkedins" height="40" width="40">
            </a>
            <a href=${item.github}  target="_blank">
                <img class="icono" src="./assets/github.png" alt="icono de github" height="40" width="40">
            </a>
            <a href=${item.cvLink} target="-blank" download="miCV.pdf">
                <img class="icono" src="./assets/cv_102350.svg" alt="icono cv" height="40" width="40">
            </a>
        </div>
    `
})