// Zona de exportacion de Elementos
import {home, inicioSesion} from "./ui.js"

// Zona de Selectores

const main = document.querySelector("main");
const irPerfil = document.getElementById("ir__Perfil");
const irHome = document.getElementById("ir__home");

// Zona de eventos de escucha

// Evento Click logo D&D "Header"
irHome.addEventListener("click", function(event){
    event.preventDefault(); // Quitar todas las acciones por defecto del evento click

    //Modificacion de estilos
    console.log("Se entro al click de home");
    main.style.flexDirection = ``;
    main.style.alignItems = ``;
    main.style.marginTop = ``;
    main.style.marginBottom = ``;
    main.style.marginLeft = ``;
    main.style.gap = ``;

    main.innerHTML = home; // Se agrega el nuevo contenido al main
});
// Evento Click opcion "Perfil" Menu "Header"
irPerfil.addEventListener("click", function(event){
    event.preventDefault(); // Quitar todas las acciones por defecto del evento click
    console.log("Se entro al click de perfil");

    //Modificacion de estilos
    main.style.gap = ""

    main.style.flexDirection = 'row';
    main.style.alignItems = `center`;
    main.style.marginTop = `17%`;
    main.style.marginBottom = `50%`;
    main.style.marginLeft = `35%`;

    main.innerHTML = ``; // Eliminar todo el contenido de el Main
    main.innerHTML = inicioSesion; // Se agrega el nuevo contenido al main


});