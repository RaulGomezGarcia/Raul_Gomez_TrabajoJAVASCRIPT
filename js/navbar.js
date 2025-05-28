const linksBox = document.getElementById('links-box');
const linksItem = [
    {
        title: "Inicio",
        url: "/Raul_Gomez_TrabajoJAVASCRIPT/" // Esto apunta a la raíz de tu proyecto en GitHub Pages (donde suele estar tu index.html)
    },
    {
        title: "Contacto",
        url: "/Raul_Gomez_TrabajoJAVASCRIPT/views/contacto.html"
    },
    {
        title: "Galeria",
        url: "/Raul_Gomez_TrabajoJAVASCRIPT/views/galeria.html"
    },
    {
        title: "Presupuesto",
        url: "/Raul_Gomez_TrabajoJAVASCRIPT/views/presupuestos.html"
    },
];

linksItem.map((link) =>{
    linksBox.innerHTML += `<a href="${link.url}">${link.title}</a>`;
});
