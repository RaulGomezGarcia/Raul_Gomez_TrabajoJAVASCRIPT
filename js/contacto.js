let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0
}

if(navigator.geolocation){//Para geolocalizar nuestrar coordenadas, siempre pregunta
    navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
    )
}else{
    alert("Los servicios de geolocalización no estan disponibles")
}

function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map', {
        center: [latitude,longitude],//para ver el centro del mapa
        zoom: 14
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //----------------DEFINIR ICONOS--------------
    let inicio = L.icon({
        iconUrl: '../assets/iconos_mapa/icono.png',
        shadowUrl: '../assets/iconos_mapa/sombra.png',
        iconSize: [38,95], //altura y anchura
        shadowSize: [50,64],
        iconAnchor: [22,94],//recolocamos el icono 
        shadowAnchor: [4,62],
        popupAnchor: [-3,-76]
    })

    let final = L.icon({
        iconUrl: '../assets/iconos_mapa/iconoRojo.png',
        shadowUrl: '../assets/iconos_mapa/sombra.png',
        iconSize: [38,95], //altura y anchura
        shadowSize: [50,64],
        iconAnchor: [22,94],//recolocamos el icono 
        shadowAnchor: [4,62],
        popupAnchor: [-3,-76]
    })

    let trak = L.icon({
        iconUrl: '../assets/iconos_mapa/iconoNaranja.png',
        shadowUrl: '../assets/iconos_mapa/sombra.png',
        iconSize: [38,95], //altura y anchura
        shadowSize: [50,64],
        iconAnchor: [22,94],//recolocamos el icono 
        shadowAnchor: [4,62],
        popupAnchor: [-3,-76]
    })

    //----------Calcular la ruta---------
    let control = L.Routing.control({
        waypoints: [
            //Inicio de ruta
            L.latLng(latitude, longitude),
            L.latLng(36.756069, -4.425181)
        ],
        //Para que las instrucciones salgan en español
        language: 'es',
        //Añadir las marcas
        createMarker: function(i, wp, nWps){
            switch(i){
                case 0: 
                    return L.marker(wp.latLng, {icon:inicio, draggable: true}).bindPopup("Tu posición");
                case nWps-1: 
                    return L.marker(wp.latLng, {icon:final, draggable: true}).bindPopup('<a href="https://www.google.es/" target=_blank>Tienda aleatoria</a><br>Tlfn: 666777888</br>');
                default:
                    return L.marker(wp.latLng, {icon:trak, draggable: true}).bindPopup("Intermedio");
            }
        }
    }).addTo(map)
}

function error(){
    let map = L.map('map', {
        center: [36.756069, -4.425181],//para ver el centro del mapa
        zoom: 14
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}