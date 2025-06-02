//He tenido que realizar la ruta de la siguiente forma por que sino el host de gthubs me daba problemas con las rutas relativas. Pero en local no me ocurre ningun problema
const linksBox = document.getElementById('links-box');
const linksItem = [
    {
        title: "Inicio",
        url: "../index.html"
    },
    {
        title: "Contacto",
        url: "../views/contacto.html"
    },
    {
        title: "Galeria",
        url: "../views/galeria.html"
    },
    {
        title: "Presupuesto",
        url: "../views/presupuestos.html"
    },
];

linksItem.map((link) =>{
    linksBox.innerHTML += `<a href="${link.url}">${link.title}</a>`;
});
