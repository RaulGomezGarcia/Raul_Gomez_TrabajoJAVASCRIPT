const linksBox = document.getElementById('links-box');
const linksItem = [
    {
        title: "Inicio",
        url: "#"
    },
    {
        title: "Contacto",
        url: "./views/contacto.html"
    },
    {
        title: "Galeria",
        url: "./views/galeria.html"
    },
    {
        title: "Presupuesto",
        url: "./views/presupuestos.html"
    },
]

linksItem.map((link) =>{
    linksBox.innerHTML += `<a href="${link.url}">${link.title}</a>`
})