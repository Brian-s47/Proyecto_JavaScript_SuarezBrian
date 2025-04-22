// Zona de exportacion de Elementos
import {find, save, login, update, finddnd5eapi, urldnd5eapi, urlRazas, urlRaza, urlClases, urlClase, urlArmaduras, urlArma, urlHabilidad, urlTipoAccesorios} from "./api.js";
import {home, inicioSesion, formularioCreacionUsuario, formularioCreacionPersonaje} from "./ui.js"

// Zona de pruebas de codigos
// const datosUsuarios = await find();
// console.log(datosUsuarios);
// urldnd5eapi.pathname += `races`;
// const datosDnd5eapi = await finddnd5eapi(urldnd5eapi);
// console.log(datosDnd5eapi);

// Zona de variables
const campos = ['nombre', 'correo', 'usuario', 'contraseña'];

// Zona de Selectores
const main = document.querySelector("main");
const irPerfil = document.getElementById("ir__Perfil");
const irHome = document.getElementById("ir__home");
const irmasInfo = document.getElementById("ir__masInfo")
const ulOpciones = document.querySelector(".ul__opciones");

// Zona de modulos funcionales

// Borrar opciones de menu
function limpiarOpciones(selectElement) {
    const valorSeleccionado = selectElement.value;

    // Guardar solo la opción seleccionada
    const opcionSeleccionada = [...selectElement.options].find(opt => opt.value === valorSeleccionado);

    // Limpiar todas las opciones
    selectElement.innerHTML = "";

    // Si había una seleccionada, volver a agregarla al principio
    if (opcionSeleccionada) {
        selectElement.appendChild(opcionSeleccionada);
    } else {
        // Si no había selección previa, poner opción por defecto
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Selecciona una opción...";
        selectElement.appendChild(defaultOption);
    }
}
// Funcion para lanzar dado de 6 caras
function lanzarDado() {
    return Math.floor(Math.random() * 6) + 1;
}
// Funcion validar usuario activo
function validarUsuarioActivo(){
    const usuarioActivo = JSON.parse(localStorage.getItem("usuario")); // este tiene toda la info del usuario
    if (usuarioActivo) {
        console.warn(`Usuario Activo:${usuarioActivo} `);
        return true
    }else{
        console.warn(`No se tiene usuario activo`);
        return false
    }
}

// Zona de eventos de escucha

// **************************** Eventos de Menu principal ***************************//
// Evento Click logo D&D "Header"
irHome.addEventListener("click", function(event){
    event.preventDefault(); // Quitar todas las acciones por defecto del evento click

    //Modificacion de estilos
    console.warn("Se entro al click de home");
    main.style.flexDirection = ``;
    main.style.alignItems = ``;
    main.style.marginTop = ``;
    main.style.marginBottom = ``;
    main.style.marginLeft = ``;
    main.style.gap = ``;

    main.innerHTML = home; // Se agrega el nuevo contenido al main
});
// Evento de Click "¡Comienza a crear tu héroe!"
document.addEventListener("click", async function(event){
    if(event.target.closest("#ir__crearPj")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de ¡Comienza a crear tu héroe!");
        
        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = formularioCreacionPersonaje; // Se agrega el nuevo contenido al main
    }
});
// Evento click opcion "Mostrar Personajes"
irmasInfo.addEventListener("click", async function (event) {
    event.preventDefault();

    // Buscar al usuario completo desde la API
    const usuarios = await find();
    console.log(usuarios, typeof(usuarios));

    // Limpiamos y preparamos el <main>
    const sectionPerfilContainer = document.createElement("section");
    sectionPerfilContainer.className = "perfil__container"; // Añadimos clase para css
    main.innerHTML = "";
    main.appendChild(sectionPerfilContainer);
    
    // Recorrido de todos los usuarios
    usuarios.forEach(usuario =>{
        console.log(JSON.stringify(usuario.usuario)); 
        if(usuario.personajes.length > 0) {
            console.log(usuario.personajes, usuario.personajes.length);  
            usuario.personajes.forEach(personaje => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("card__personaje");
                tarjeta.innerHTML = `
                    <h2>${personaje.nombrePj}</h2>
                    <img src="../assets/img/${personaje.Raza.toLowerCase()}.webp" alt="${personaje.Raza}" class="raza-img"/>
                    <p><strong>Género:</strong> ${personaje.Genero}</p>
                    <p><strong>Raza:</strong> ${personaje.Raza}</p>
                    <p><strong>Clase:</strong> ${personaje.Clase}</p>
                    <p><strong>Armadura:</strong> ${personaje.tipoArmor} - ${personaje.Armadura}</p>
                    <p><strong>Arma:</strong> ${personaje.tipoArma} - ${personaje.Arma}</p>
                    <p><strong>Accesorio:</strong> ${personaje.tipoAccesorio} - ${personaje.Accesorio}</p>
                    <p><strong>Habilidad:</strong> ${personaje.Habilidad}</p>

                    <div class="estadisticas">
                        <h3>Estadísticas</h3>
                        <ul>
                        <li>Fuerza: ${personaje.Estadisticas.fuerza}</li>
                        <li>Destreza: ${personaje.Estadisticas.destreza}</li>
                        <li>Constitución: ${personaje.Estadisticas.constitucion}</li>
                        <li>Inteligencia: ${personaje.Estadisticas.inteligencia}</li>
                        <li>Sabiduría: ${personaje.Estadisticas.sabiduria}</li>
                        <li>Carisma: ${personaje.Estadisticas.carisma}</li>
                        </ul>
                    </div>
                `;
                sectionPerfilContainer.appendChild(tarjeta);
                // Modificacion de estylos main
                main.style.marginTop = "";
                main.style.marginLeft = "";
            });    
        }else {
            // main.innerHTML = `<p class="mensaje__vacio">No tienes personajes guardados aún.</p>`;
        }       
    });
});
// **************************** Eventos de Creacion de pj ***************************//
// Evento para guardar el nombre del personaje en localStorage
document.addEventListener("input", function(event){
    if (event.target.id === "cp-nombre") {
        const nombre = event.target.value;
        localStorage.setItem("nombrePj", nombre);
        console.log("Nombre guardado:", nombre);
    }
});
// Evento de seleccion de Genero para guardar en Local Storage
document.addEventListener("change", async function(event){
    if (event.target.id === "cp-genero") {
        const generoSelec = event.target.value;
        console.log("Genero:", generoSelec);

        // Guardamos dato del Genero seleccionado en Local Storage
        const genero = "Genero";
        localStorage.setItem(genero, generoSelec);
    }
});
// Evento de despliegue de razas 
document.addEventListener("click", async function (event) {
    if(event.target.closest("#cp-raza")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de Ejir raza");
        const selectRaza = document.getElementById("cp-raza");

        // Para limpiar menu y que no se acumule con cada click
        limpiarOpciones(selectRaza);
        
        // Traemos los datos de todas las razas
        const urlnueva = urlRazas();  
        const datosRazas = await finddnd5eapi(urlnueva);

        datosRazas.results.forEach(raza => {
            const option = document.createElement("option");
            option.value = raza.index;
            option.textContent = raza.name;
            selectRaza.appendChild(option);
        });
    }
});
// Evento de seleccion de raza para cambio de descripcion
document.addEventListener("change", async function(event){
    if (event.target.id === "cp-raza") {
        const razaSelec = event.target.value;
        console.log("Raza seleccionada:", razaSelec);

        // Traemos los datos de la raza seleccionada
        const urlnueva = urlRaza(razaSelec);  
        const datosRaza = await finddnd5eapi(urlnueva);
        console.log(datosRaza);

        // Guardamos dato de raza seleccionada en Local Storage
        const nombreRaza = "Raza";
        localStorage.setItem(nombreRaza, razaSelec);

        // Insertamos descripción en el contenedor derecho
        const razaDescripcion = document.querySelector(".section__descripcion");
        razaDescripcion.innerHTML = `
            <div class="div__imagenPersonaje">
                <img src="../assets/img/${razaSelec}.webp">
            </div>
            <h2>Descripcion Raza : ${razaSelec}</h2>
            <div class="div__descripccionRaza">
                <h2>Alineamiento</h2>
                <p>${datosRaza.alignment}</p>
            </div>
            <div class="div__descripccionRaza">
                <h2>Caracteristicas Principales</h2>
                <ol>
                    <li>
                        Bonus de Estadística: ${datosRaza.ability_bonuses[0].ability_score.name} + ${datosRaza.ability_bonuses[0].bonus}
                    </li>
                    <ul>
                        Competencias Iniciales:
                        ${datosRaza.starting_proficiencies.map(p => `<li>${p.name}</li>`).join("")}
                    </ul>
                    ${datosRaza.starting_proficiency_options ? `
                        <ul>
                            Competencias:
                            <li>${datosRaza.starting_proficiency_options.desc}</li>
                        </ul>
                    ` : ""}
                </ol>
            </div>
            
        `;
    }
});
// Evento de despliegue de Clases
document.addEventListener("click", async function (event) {
    if(event.target.closest("#cp-clase")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de Ejir Clases");
        const selectRaza = document.getElementById("cp-clase");

        // Para limpiar menu y que no se acumule con cada click
        limpiarOpciones(selectRaza);

        // Traemos los datos de todas las Clases
        const urlnueva = urlClases(); 
        console.log(urlnueva); // Validar URL         
        const datosClases = await finddnd5eapi(urlnueva);
        console.log(datosClases);
        
        datosClases.results.forEach(clase => {
            const option = document.createElement("option");
            option.value = clase.index;
            option.textContent = clase.name;
            selectRaza.appendChild(option);
        });
    }
});
// Evento de seleccion de clase para cambio de descripcion
document.addEventListener("change", async function(event){
    if (event.target.id === "cp-clase") {
        const claseSelec = event.target.value;
        console.log("Clase seleccionada:", claseSelec);

        // Traemos los datos de la clase seleccionada
        const urlnueva = urlClase(claseSelec);  
        const datosClase = await finddnd5eapi(urlnueva);
        console.log(datosClase);

        // Guardamos dato de clase seleccionada en Local Storage
        const nombreClase = "Clase";
        localStorage.setItem(nombreClase, claseSelec);

        // Insertamos descripción en el contenedor derecho
        const claseDescripcion = document.querySelector(".section__descripcion");
        claseDescripcion.innerHTML = `
            <h2>Descripcion Clase : ${claseSelec}</h2>
            <div class="div__descripccionClase">
                <h2>Elecciones Iniciales</h2>
                <p>${datosClase.proficiency_choices[0].desc}</p>
            </div>
            <div class="div__opcionesIniciales">
                <h2>Opciones Iniciales</h2>
                <ol>
                    <li>
                        Opciones de Armas: ${datosClase.starting_equipment_options[0].desc}}
                    </li>
                </ol>
            </div>
            <div class="div__imagenSeleccionarClase">
                <img src="../assets/img/${claseSelec}.png">
            </div>
        `;
    }
});
// Evento de Seleccion de tipo de armadura
document.addEventListener("click", async function(event){
    if(event.target.closest("#cp-tipoArmadura")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entró al click de elegir Tipo de Armadura");
        const selectTipoArmadura = document.getElementById("cp-tipoArmadura");

        // Para limpiar menu y que no se acumule con cada click
        limpiarOpciones(selectTipoArmadura);

        // Traer la clase seleccionada actual
        const claseSelec = localStorage.getItem("Clase");

        try {
            // Traer datos de la clase seleccionada
            const urlnueva = urlClase(claseSelec);  
            const datosClase = await finddnd5eapi(urlnueva);

            let armaduras = [];

            // Condiciones especiales
            if (claseSelec === "monk") {
                armaduras = [{
                    index: "medium-armor",
                    name: "Medium Armor"
                }];
            } else if (claseSelec === "sorcerer" || claseSelec === "wizard") {
                armaduras = [{
                    index: "light-armor",
                    name: "Light Armor"
                }];
            } else {
                // Filtrar proficiencies que contienen "armor"
                armaduras = datosClase.proficiencies.filter(p => p.index.includes("armor"));
            }
            // Limpiar y agregar opciones válidas
            armaduras.forEach(armadura => {
                const option = document.createElement("option");
                option.value = armadura.index;
                option.textContent = armadura.name;
                selectTipoArmadura.appendChild(option);
            });

        } catch (error) {
            console.error("Error obteniendo datos de clase:", error);
            selectTipoArmadura.innerHTML = `<option value="">Error cargando armaduras</option>`;
        }
    }
});
// Evento de seleccion de tipo de armadura para guardar dato seleccionado
document.addEventListener("change", async function(event){
    if (event.target.id === "cp-tipoArmadura") {
        const tipoArmorSelec = event.target.value;
        console.log("Tipo de Armadura seleccionada:", tipoArmorSelec);

        // Condicional para seleccion de "all-armor"
        if(tipoArmorSelec === "all-armor"){
            // Guardamos dato de clase seleccionada en Local Storage
            const tipoArmor = "tipoArmor";
            localStorage.setItem(tipoArmor, "armor");
        }else{
            // Guardamos dato de clase seleccionada en Local Storage
            const tipoArmor = "tipoArmor";
            localStorage.setItem(tipoArmor, tipoArmorSelec);
        }
    }
});
// Evento de Seleccion de armadura
document.addEventListener("click", async function(event){
    if(event.target.closest("#cp-armadura")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entró al click de elegir Armadura");

        const selectTipoArmadura = document.getElementById("cp-armadura");

        // Para limpiar menu y que no se acomule con cada click
        limpiarOpciones(selectTipoArmadura);

        // Traer el tipo de clase seleccionada actual
        const tipoArmor = localStorage.getItem("tipoArmor");

        try {
            // Traemos todas las Armaduras segun eleccion
            const urlnueva = urlArmaduras(tipoArmor);  
            const datosArmaduras = await finddnd5eapi(urlnueva);
            console.log("URL usada:", urlnueva);
            console.log("Datos recibidos:", datosArmaduras);

            // Acceder a datosArmaduras.equipment, no a results
            if (datosArmaduras && Array.isArray(datosArmaduras.equipment)) {
                datosArmaduras.equipment.forEach(armadura => {
                    const option = document.createElement("option");
                    option.value = armadura.index;
                    option.textContent = armadura.name;
                    selectTipoArmadura.appendChild(option);
                });
            } else {
                console.error("No se encontraron armaduras válidas");
                selectTipoArmadura.innerHTML = `<option value="">No se encontraron armaduras</option>`;
            }
        } catch (error) {
            console.error("Error obteniendo armaduras:", error);
            selectTipoArmadura.innerHTML = `<option value="">Error cargando armaduras</option>`;
        }
    }
});
// Evento de seleccion de Armadura para guardar dato seleccionado
document.addEventListener("change", async function(event){
    if (event.target.id === "cp-armadura") {
        const armaduraSelec = event.target.value;
        console.log("Tipo de Arma seleccionada:", armaduraSelec);

        // Guardamos dato de el tipo de armadura seleccionada en Local Storage
        const armadura = "Armadura";
        localStorage.setItem(armadura, armaduraSelec);
    }
});
// Evento de Seleccion de tipo de arma
document.addEventListener("click", async function(event){
    if(event.target.closest("#cp-tipoArma")) {
        event.preventDefault();
        console.warn("Se entró al click de elegir Tipo de Arma");

        const selectTipoArma = document.getElementById("cp-tipoArma");

        // Limpiar menú antes de cargar nuevas opciones
        limpiarOpciones(selectTipoArma);

        // Obtener la clase seleccionada del localStorage
        const claseSelec = localStorage.getItem("Clase");

        try {
            const urlnueva = urlClase(claseSelec);  
            const datosClase = await finddnd5eapi(urlnueva);

            // Filtramos condiciones Especiales
            if(claseSelec === "bard"){
                const option = document.createElement("option");
                option.value = "musical-instruments";
                option.textContent = "Musical Instruments";
                selectTipoArma.appendChild(option);
            }else if (claseSelec === "druid" || claseSelec === "sorcerer" || claseSelec === "wizard")
                {
                    // Filtrar proficiencies que son armas (sin armor ni saving)
                    const armas = datosClase.proficiencies.filter(p => 
                        !p.index.includes("armor") &&
                        !p.index.includes("saving") &&
                        !p.index.includes("weapon")
                    );

                    // Agregar las armas como opciones
                    armas.forEach(arma => {
                        const option = document.createElement("option");
                        option.value = arma.index;
                        option.textContent = arma.name;
                        selectTipoArma.appendChild(option);
                    });
                }else {
                    // Filtrar proficiencies que son armas (sin armor ni saving)
                    const armas = datosClase.proficiencies.filter(p => 
                        !p.index.includes("armor") &&
                        !p.index.includes("saving") &&
                        p.index.includes("weapon")
                    );

                    // Agregar las armas como opciones
                    armas.forEach(arma => {
                        const option = document.createElement("option");
                        option.value = arma.index;
                        option.textContent = arma.name;
                        selectTipoArma.appendChild(option);
                    });
                }
        } catch (error) {
            console.error("Error obteniendo datos de clase para armas:", error);
            selectTipoArma.innerHTML = `<option value="">Error cargando armas</option>`;
        }
    }
});
// Evento de seleccion de tipo de Arma para guardar dato seleccionado
document.addEventListener("change", async function(event){
    if (event.target.id === "cp-tipoArma") {
        const tipoArmaSelec = event.target.value;
        console.log("Tipo de Arma seleccionada:", tipoArmaSelec);

        // Guardamos dato de el tipo de arma seleccionada en Local Storage
        const tipoArma = "tipoArma";
        localStorage.setItem(tipoArma, tipoArmaSelec);
    }
});
// Evento de Seleccion de Arma
document.addEventListener("click", async function(event){
    if(event.target.closest("#cp-arma")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entró al click de elegir Arma");

        const selectTipoArma = document.getElementById("cp-arma");

        // Para limpiar menu y que no se acomule con cada click
        limpiarOpciones(selectTipoArma);

        // Traer el tipo de Arma seleccionada actual
        const tipoArma = localStorage.getItem("tipoArma");
        const claseSelec = localStorage.getItem("Clase");

        if (claseSelec === "druid" || claseSelec === "sorcerer" || claseSelec === "wizard")
            {
                const option = document.createElement("option");
                option.value = "none";
                option.textContent = "None";
                selectTipoArma.appendChild(option);
            }else{
                try {
                    // Traemos todas las Armaduras segun eleccion
                    const urlnueva = urlArma(tipoArma);  
                    const datosArmas = await finddnd5eapi(urlnueva);
                    console.log("URL usada:", urlnueva);
                    console.log("Datos recibidos:", datosArmas);
        
                    // Acceder a datosArmaduras.equipment, no a results
                    if (datosArmas && Array.isArray(datosArmas.equipment)) {
                        datosArmas.equipment.forEach(arma => {
                            const option = document.createElement("option");
                            option.value = arma.index;
                            option.textContent = arma.name;
                            selectTipoArma.appendChild(option);
                        });
                    } else {
                        console.error("No se encontraron armaduras válidas");
                        selectTipoArma.innerHTML = `<option value="">No se encontraron armaduras</option>`;
                    }
                } catch (error) {
                    console.error("Error obteniendo armaduras:", error);
                    selectTipoArma.innerHTML = `<option value="">Error cargando armaduras</option>`;
                }
            }
    }
});
// Evento de seleccion de Arma para guardar dato seleccionado
document.addEventListener("change", async function(event){
    if (event.target.id === "cp-arma") {
        const armaSelec = event.target.value;
        console.log("Tipo de Arma seleccionada:", armaSelec);

        // Guardamos dato de el tipo de arma seleccionada en Local Storage
        const arma = "Arma";
        localStorage.setItem(arma, armaSelec);
    }
});
// Evento de eleccion de habilidades
document.addEventListener("click", async function(event){
    if(event.target.closest("#habilidades")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entró al click de elegir Tipo de Habilidad");
        const selectHabilidad = document.getElementById("habilidades");

        // Para limpiar menu y que no se acumule con cada click
        limpiarOpciones(selectHabilidad);

        // Traer la clase seleccionada actual
        const claseSelec = localStorage.getItem("Clase");

        try {
            const urlnueva = urlClase(claseSelec);  
            const datosClase = await finddnd5eapi(urlnueva);
            // Validar que existan opciones de proficiencia
            if (!datosClase.proficiency_choices || datosClase.proficiency_choices.length === 0) {
                console.warn("Esta clase no tiene opciones de habilidades para elegir.");
                selectHabilidad.innerHTML = `<option value="">No hay habilidades disponibles</option>`;
                return;
            }
            // Extraer habilidades desde proficiency_choices[0].from.options
            const opciones = datosClase.proficiency_choices[0]?.from?.options || [];
            // Renderizar cada habilidad
            opciones.forEach(opcion => {
                const item = opcion.item;
                const option = document.createElement("option");
                option.value = item.index;
                option.textContent = item.name;
                selectHabilidad.appendChild(option);
            });
            // Cambiamos de forma dinamica para mostras datos de esta habilidad
        } catch (error) {
            console.error("Error cargando habilidades:", error);
            selectHabilidad.innerHTML = `<option value="">Error cargando habilidades</option>`;
        }
    }
});
// Evento de seleccion de habilidad para cambio de descripcion
document.addEventListener("change", async function(event){
    if (event.target.id === "habilidades") {
        const habilidadSelec = event.target.value;
        const habilidadSelecLimpia = habilidadSelec.replace("skill-", "")
        console.log("Habiliadad seleccionada:", habilidadSelecLimpia);

        // Traemos los datos de la habilidad seleccionada
        const urlnueva = urlHabilidad(habilidadSelecLimpia);  
        const datosHabilidad = await finddnd5eapi(urlnueva);
        console.log(datosHabilidad);

        // Guardamos dato de Habilidad seleccionada en Local Storage
        const nombreHabilidad = "Habilidad";
        localStorage.setItem(nombreHabilidad, habilidadSelecLimpia);

        // Insertamos descripción en el contenedor derecho
        const habilidadDescripcion = document.querySelector(".section__descripcion");
        habilidadDescripcion.innerHTML = `
            <h2>Descripcion Habiliadad : ${habilidadSelecLimpia}</h2>
            <div class="div__descripccionHabilidad">
                <h2>Descripcion</h2>
                <p>${datosHabilidad.desc}</p>
                <h2>Estadistica Clave</h2>
                <p>${datosHabilidad.ability_score.name}</p>
            </div>
        `;
    }
});
// Evento de seleccion de tipo de accesorio para cambio de descripcion
document.addEventListener("change", async function(event){
    if (event.target.id === "tipoAccesorios") {
        const tipoAccesorioSelec = event.target.value;
        console.log("Tipo de Accesorio:", tipoAccesorioSelec);

        // Guardamos dato del tipo de accesorio seleccionado en Local Storage
        const tipoAccesorio = "tipoAccesorio";
        localStorage.setItem(tipoAccesorio, tipoAccesorioSelec);
    }
});
// Evento de Selección de Accesorio (cuando se da clic al <select>)
document.addEventListener("click", async function(event){
    if(event.target.closest("#accesorios")){
        event.preventDefault(); 
        console.warn("Se entró al click de elegir Accesorio");

        const selectAccesorios = document.getElementById("accesorios");

        // Limpiar opciones previas
        limpiarOpciones(selectAccesorios);

        // Obtener tipo de accesorio guardado en Local Storage
        const tipoAccesorio = localStorage.getItem("tipoAccesorio");

        if (!tipoAccesorio) {
            console.warn("No hay tipo de accesorio seleccionado.");
            return;
        }

        // Construir la URL y obtener datos
        const urlnueva = urlTipoAccesorios(tipoAccesorio);  
        const datosAccesorios = await finddnd5eapi(urlnueva);

        console.log("URL usada:", urlnueva);
        console.log("Datos recibidos:", datosAccesorios);

        // Validar estructura de datos
        if (datosAccesorios && Array.isArray(datosAccesorios.equipment)) {
            datosAccesorios.equipment.forEach(accesorio => {
                const option = document.createElement("option");
                option.value = accesorio.index;
                option.textContent = accesorio.name;
                selectAccesorios.appendChild(option);
            });
        } else {
            console.error("No se encontraron accesorios válidos.");
            selectAccesorios.innerHTML = `<option value="">No hay accesorios disponibles</option>`;
        }
    }
});
// Evento de seleccion de Accesorio para guardar en Local Storage
document.addEventListener("change", async function(event){
    if (event.target.id === "accesorios") {
        const accesorioSelec = event.target.value;
        console.log("Accesorio:", accesorioSelec);

        // Guardamos dato del Accesorio seleccionado en Local Storage
        const Accesorio = "Accesorio";
        localStorage.setItem(Accesorio, accesorioSelec);
    }
});
// Evento de click en el botón "Lanzar Dados"
document.addEventListener("click", function(event){
    if (event.target && event.target.id === "lanzarDados"){

        // Seleccionamos la sección donde mostraremos los lanzamientos y limpiamos cualquier contenido anterior
        const descripcionSection = document.querySelector(".section__descripcion");
        descripcionSection.innerHTML = ""; 

        // Creamos un contenedor donde irá toda la interfaz del lanzamiento de dados
        const contenedor = document.createElement("div");
        contenedor.classList.add("div_lanzamientoDados");

        // Variables de control
        let lanzamientosRestantes = 6;  // Número máximo de lanzamientos
        const resultadosDados = [];     // Array donde se guardan las sumas de cada tirada
        let statsAsignadas = 0;         // Cuántas estadísticas ya se han asignado
        const statsUsadas = new Set();  // Conjunto para evitar asignar dos veces a la misma estadística

        // Título que muestra cuántos lanzamientos quedan
        const titulo = document.createElement("h4");
        titulo.textContent = `Quedan ${lanzamientosRestantes} lanzamientos`;

        // Contenedor para mostrar los resultados de cada tirada
        const resultados = document.createElement("div");
        resultados.classList.add("resultados-dados");
        resultados.innerHTML = `<ul id="listaResultados"></ul>`;

        // Botón para lanzar los dados
        const botonLanzar = document.createElement("button");
        botonLanzar.textContent = "Lanzar Dados";

        // Lógica al hacer click en el boton "Lanzar Dados"
        botonLanzar.addEventListener("click", () => {
            if (lanzamientosRestantes > 0) {
                // Lanzamos tres dados de 6 caras
                const d1 = lanzarDado();
                const d2 = lanzarDado();
                const d3 = lanzarDado();
                const suma = d1 + d2 + d3;

                // Guardamos la suma en el array
                resultadosDados.push(suma);
                lanzamientosRestantes--;
                titulo.textContent = `Quedan ${lanzamientosRestantes} lanzamientos`;

                // Mostramos esta tirada en pantalla
                const li = document.createElement("li");
                li.textContent = `Lanzamiento ${resultadosDados.length}: ${d1} + ${d2} + ${d3} = ${suma}`;
                document.getElementById("listaResultados").appendChild(li);

                // Cuando se terminan los lanzamientos, se bloquea el botón y se muestra el asignador
                if (lanzamientosRestantes === 0) {
                    botonLanzar.disabled = true;
                    crearAsignador(); // Función que muestra la interfaz para asignar valores
                }
            }
        });

        // Función que crea el sistema de asignacion de valores a estadisticas
        function crearAsignador() {
            const asignador = document.createElement("div");
            asignador.classList.add("asignador-estadisticas");

            const instrucciones = document.createElement("p");
            instrucciones.textContent = "Ahora asigna cada valor a una estadística:";

            // Lista para elegir una suma lanzada
            const selectValor = document.createElement("select");
            selectValor.id = "selectValor";
            selectValor.innerHTML = `<option value="">Seleccionar Valor</option>` + 
                resultadosDados.map((val, i) => `<option value="${val}">${val}</option>`).join("");

            // Lista para elegir una estadística
            const selectStat = document.createElement("select");
            selectStat.id = "selectStat";
            const stats = ["fuerza", "destreza", "constitucion", "inteligencia", "sabiduria", "carisma"];
            selectStat.innerHTML = `<option value="">Asignar a...</option>` + 
                stats.map(stat => `<option value="${stat}">${stat.charAt(0).toUpperCase() + stat.slice(1)}</option>`).join("");

            // Boton para confirmar la asignación del valor a la estadistica
            const botonAsignar = document.createElement("button");
            botonAsignar.textContent = "Asignar Valor";

            // Logica de asignación
            botonAsignar.addEventListener("click", () => {
                const valor = parseInt(selectValor.value);
                const stat = selectStat.value;

                // Guardamos La estadistica y el valor en local storage
                localStorage.setItem(stat, valor);

                // Validación: que se haya seleccionado valor y estadística no repetida
                if (!valor || !stat || statsUsadas.has(stat)) {
                    alert("Selecciona un valor válido y una estadística no usada.");
                    return;
                }

                // Asignamos el valor al input de la estadística seleccionada
                document.getElementById(stat).value = valor;

                // Guardamos que ya usamos esa estadística
                statsUsadas.add(stat);

                // Eliminamos el valor y la estadística del menú para no repetir
                selectValor.querySelector(`option[value="${valor}"]`).remove();
                selectStat.querySelector(`option[value="${stat}"]`).remove();

                // Reseteamos las listas
                selectValor.value = "";
                selectStat.value = "";

                // Si ya se usaron las 6 estadísticas, bloqueamos el botón
                if (statsUsadas.size === 6) {
                    botonAsignar.disabled = true;
                    instrucciones.textContent = "¡Terminaste con Todas tus estadísticas!";
                }
            });

            // Agregamos los elementos creados al contenedor
            asignador.appendChild(instrucciones);
            asignador.appendChild(selectValor);
            asignador.appendChild(selectStat);
            asignador.appendChild(botonAsignar);
            contenedor.appendChild(asignador);
        }

        // Agregamos todo el contenido a la seccion del DOM
        contenedor.appendChild(titulo);
        contenedor.appendChild(resultados);
        contenedor.appendChild(botonLanzar);
        descripcionSection.appendChild(contenedor);
    }
});
// Evento de Click en el boton "Crear Personaje"
document.addEventListener("click", function(event){
    if(event.target.closest("#crearPersonaje")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click

        // Traer todos los datos del local storage
        const nombrePj = localStorage.getItem("nombrePj");
        const Genero = localStorage.getItem("Genero");
        const Raza = localStorage.getItem("Raza");
        const Clase = localStorage.getItem("Clase");
        const tipoArmor = localStorage.getItem("tipoArmor");
        const Armadura = localStorage.getItem("tipoArmor");
        const tipoArma = localStorage.getItem("tipoArma");
        const Arma = localStorage.getItem("Arma");
        const Habilidad = localStorage.getItem("Habilidad");
        const tipoAccesorio = localStorage.getItem("tipoAccesorio");
        const Accesorio = localStorage.getItem("Accesorio");
        const destreza = localStorage.getItem("destreza");
        const carisma = localStorage.getItem("carisma");
        const inteligencia = localStorage.getItem("inteligencia");
        const constitucion = localStorage.getItem("constitucion");
        const sabiduria = localStorage.getItem("sabiduria");
        const fuerza = localStorage.getItem("fuerza");

        // Creacion de obgeto de heroe
        const nuevoPJ =
        {
            "nombrePj": nombrePj,
            "Genero": Genero,
            "Raza": Raza,
            "Clase": Clase,
            "tipoArmor": tipoArmor,
            "Armadura": Armadura,
            "tipoArma": tipoArma,
            "Arma": Arma,
            "Habilidad": Habilidad,
            "tipoAccesorio": tipoAccesorio,
            "Accesorio": Accesorio,
            "Estadisticas": {
                "destreza": destreza,
                "carisma": carisma,
                "inteligencia": inteligencia,
                "constitucion": constitucion,
                "sabiduria": sabiduria,
                "fuerza": fuerza,
            }
        }

        // Guardamos el nuevo pj en el local storage
        localStorage.setItem("nuevoPJ", JSON.stringify(nuevoPJ));

        // Cargamos contenido en Descripcion dependiendo si se tiene o no usuario activo
        const section = document.querySelector(".section__descripcion");
        section.innerHTML = ""; // Limpiar contenido previo
    
        const usuarioActivo = localStorage.getItem("usuario");
    
        const stats = nuevoPJ.Estadisticas;
        const imagenRaza = `../assets/img/${nuevoPJ.Raza.toLowerCase()}.webp`;
    
        const tarjetaHTML = `
          <div class="div__personaje">
            <h2>${nuevoPJ.nombrePj}</h2>
            <img src="${imagenRaza}" alt="${nuevoPJ.Raza}" class="raza-img" />
            <p><strong>Género:</strong> ${nuevoPJ.Genero}</p>
            <p><strong>Raza:</strong> ${nuevoPJ.Raza}</p>
            <p><strong>Clase:</strong> ${nuevoPJ.Clase}</p>
            <p><strong>Armadura:</strong> ${nuevoPJ.tipoArmor} - ${nuevoPJ.Armadura}</p>
            <p><strong>Arma:</strong> ${nuevoPJ.tipoArma} - ${nuevoPJ.Arma}</p>
            <p><strong>Accesorio:</strong> ${nuevoPJ.tipoAccesorio} - ${nuevoPJ.Accesorio}</p>
            <p><strong>Habilidad especial:</strong> ${nuevoPJ.Habilidad}</p>
    
            <div class="estadisticas">
              <h3>Estadísticas</h3>
              <ul>
                <li>Fuerza: ${stats.fuerza}</li>
                <li>Destreza: ${stats.destreza}</li>
                <li>Constitución: ${stats.constitucion}</li>
                <li>Inteligencia: ${stats.inteligencia}</li>
                <li>Sabiduría: ${stats.sabiduria}</li>
                <li>Carisma: ${stats.carisma}</li>
              </ul>
            </div>
    
            <div class="card__footer">
              ${
                usuarioActivo
                  ? `<button id="guardarPersonaje">Guardar Personaje</button>`
                  : `<button id="iniciarSesionGuardar">Inicia sesión para guardar</button>`
              }
            </div>
          </div>
        `;
        section.innerHTML = tarjetaHTML;
    }
});
// Evento de Click en el boton "Guardar Personaje"
document.addEventListener("click", async function (event) {
    if(event.target.closest("#guardarPersonaje")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click

        const personajeGuardado = JSON.parse(localStorage.getItem("nuevoPJ"));
        const usuarioActivo = JSON.parse(localStorage.getItem("usuario")); // este tiene toda la info del usuario
        console.log(usuarioActivo);
        

        if (!personajeGuardado || !usuarioActivo) {
        alert("No se encontró personaje o usuario activo.");
        return;
        }

        try {
        // Traer todos los usuarios
        const usuarios = await find();

        // Buscar el usuario activo en la API por su nombre de usuario
        const usuarioDB = usuarios.find(u => u.usuario === usuarioActivo);
        if (!usuarioDB) {
            alert("Usuario no encontrado en la base de datos.");
            return;
        }

        // Agregar el personaje al array existente
        const personajesActualizados = [...usuarioDB.personajes, personajeGuardado];

        // Actualizar en la API
        const usuarioActualizado = await update(usuarioDB.id, {
            ...usuarioDB,
            personajes: personajesActualizados
        });

        // Actualizar en localStorage
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));

        alert("¡Personaje guardado con éxito!");
        // Limpiar todo el localStorage excepto "usuario"
        const usuarioData = localStorage.getItem("usuarioActivo"); // Guardamos temporalmente
        const usuario = localStorage.getItem("usuario"); // Guardamos temporalmente
        localStorage.clear(); // Borramos todo
        localStorage.setItem("usuarioActivo", usuarioData); // Restauramos datos de sesion
        localStorage.setItem("usuario", usuario); // Restauramos datos de sesion
            //Modificacion de estilos
            main.style.flexDirection = ``;
            main.style.alignItems = ``;
            main.style.marginTop = ``;
            main.style.marginBottom = ``;
            main.style.marginLeft = ``;
            main.style.gap = ``;

            main.innerHTML = home; // Se agrega el nuevo contenido al main
        } catch (error) {
        console.error("Error al guardar el personaje:", error);
        alert("Error al guardar el personaje.");
        }
  }
});
// Evento de Click en el boton "iniciar sesion para Guardar Personaje"
document.addEventListener("click", async function (event) {
    if(event.target.closest("#iniciarSesionGuardar")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        //Modificacion de estilos
        main.style.gap = ""

        main.style.flexDirection = 'row';
        main.style.alignItems = `center`;
        main.style.marginTop = `17%`;
        main.style.marginBottom = `50%`;
        main.style.marginLeft = `35%`;

        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = inicioSesion; // Se agrega el nuevo contenido al main
  }
});
// **************************** Eventos de Perfil ***************************//
// Evento Click opcion "Perfil" Menu "Header"
irPerfil.addEventListener("click", async function(event){
    event.preventDefault(); // Quitar todas las acciones por defecto del evento click
    console.warn("Se entro al click de perfil");

    if(validarUsuarioActivo()){
        const usuarioActivo = localStorage.getItem("usuario"); // ← "Brian1114" por ejemplo

        // Buscar al usuario completo desde la API
        const usuarios = await find();
        console.log(usuarios, typeof(usuarios));
        

        // Limpiamos y preparamos el <main>
        const sectionPerfilContainer = document.createElement("section");
        sectionPerfilContainer.className = "perfil__container"; // Añadimos clase para css
        main.innerHTML = "";
        main.appendChild(sectionPerfilContainer);

        // Si tiene personajes, los mostramos
        usuarios.forEach(usuario =>{
            console.log(usuarioActivo, JSON.stringify(usuario.usuario)); 
            if(JSON.stringify(usuario.usuario) === usuarioActivo && usuario.personajes.length > 0) {
                console.log(usuario.personajes, usuario.personajes.length);  
                usuario.personajes.forEach(personaje => {
                    const tarjeta = document.createElement("div");
                    tarjeta.classList.add("card__personaje");
                    tarjeta.innerHTML = `
                        <h2>${personaje.nombrePj}</h2>
                        <img src="../assets/img/${personaje.Raza.toLowerCase()}.webp" alt="${personaje.Raza}" class="raza-img"/>
                        <p><strong>Género:</strong> ${personaje.Genero}</p>
                        <p><strong>Raza:</strong> ${personaje.Raza}</p>
                        <p><strong>Clase:</strong> ${personaje.Clase}</p>
                        <p><strong>Armadura:</strong> ${personaje.Armadura}</p>
                        <p><strong>Arma:</strong> ${personaje.Arma}</p>
                        <p><strong>Accesorio:</strong> ${personaje.Accesorio}</p>
                        <p><strong>Habilidad:</strong> ${personaje.Habilidad}</p>
    
                        <div class="estadisticas">
                          <h3>Estadísticas</h3>
                          <ul>
                            <li>Fuerza: ${personaje.Estadisticas.fuerza}</li>
                            <li>Destreza: ${personaje.Estadisticas.destreza}</li>
                            <li>Constitución: ${personaje.Estadisticas.constitucion}</li>
                            <li>Inteligencia: ${personaje.Estadisticas.inteligencia}</li>
                            <li>Sabiduría: ${personaje.Estadisticas.sabiduria}</li>
                            <li>Carisma: ${personaje.Estadisticas.carisma}</li>
                          </ul>
                        </div>
                    `;
                    sectionPerfilContainer.appendChild(tarjeta);
                });    
            }else {
                // main.innerHTML = `<p class="mensaje__vacio">No tienes personajes guardados aún.</p>`;
            }       
        });
            // Creacion de opcion de cerrar sesion 
            if (!document.getElementById("cerrarSesion")) {
                const nuevoLi = document.createElement("li");
                const nuevoEnlace = document.createElement("a");
                nuevoEnlace.id = "cerrarSesion";
                nuevoEnlace.textContent = "Cerrar Sesion";
                nuevoLi.appendChild(nuevoEnlace);
                ulOpciones.appendChild(nuevoLi);
            }
    }else{
        //Modificacion de estilos
        main.style.marginTop = `15%`;
        // main.style.marginLeft = `20%`;

        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = inicioSesion; // Se agrega el nuevo contenido al main
    }
});
// Evento click opcion "Crear Cuenta" Formulario "Iniciar Sesion"
document.addEventListener("click", async function(event){
    if(event.target.closest("#crearPerfil")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de crear Cuenta");
    
        //Modificacion de estilos
        // main.style.marginTop = `15%`;
    
        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = formularioCreacionUsuario; // Se agrega el nuevo contenido al main

        // Cargar datos del local storage en formulario
        campos.forEach(id => {
            const valorGuardado = localStorage.getItem(id);       
            if (valorGuardado) {
                document.getElementById(id).value = valorGuardado;
            }
        });
        // Para guardar los datos en el local storage cada que el usuario los escriba
        campos.forEach(id => {
            const input = document.getElementById(id);
            input.addEventListener('input', () => {
            localStorage.setItem(id, input.value);
            });
        });

    }
});
// Evento Click opcion "Cerrar Sesion"
document.addEventListener("click", function(event){
    event.preventDefault();
    if(event.target.closest("#cerrarSesion")){
        localStorage.clear(); // Borramos todo
        //Modificacion de estilos
        console.warn("Se entro al click de home");
        main.style.flexDirection = ``;
        main.style.alignItems = ``;
        main.style.marginTop = ``;
        main.style.marginBottom = ``;
        main.style.marginLeft = ``;
        main.style.gap = ``;

        main.innerHTML = home; // Se agrega el nuevo contenido al main
        // Eliminar el elemento "Cerrar Sesion" de la lista
        const cerrarSesionLi = document.querySelector("#cerrarSesion").closest("li"); // Encuentra el <li> que contiene el enlace
        if (cerrarSesionLi) {
            cerrarSesionLi.remove(); // Elimina el <li> del DOM
        }
    }
});
// Evento click opcion "Entrar" Formulario "Iniciar Sesion"
document.addEventListener("click", async function (event) {
    if(event.target.closest("#botonIniciarsesion")){
        event.preventDefault();
        console.warn("Se entro al click de Entrar");
        // Obtener valores del formulario
        const usuario = document.getElementById("usuario").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();

        console.log("Usuario ingresado:", usuario, typeof(usuario));
        console.log("Contraseña ingresada:", contrasena, typeof(contrasena));

        //llamamos la funcion de inicio se sesion y capturamos la respuesta
        const validacionInicio = await login({ usuario, contraseña: contrasena });

        if (validacionInicio) {    
            alert(`Inicio de sesión usuario: ${usuario} correcto`);       
            // Guardamos el estado actual de sesion en local storage
            localStorage.setItem("usuarioActivo", JSON.stringify(validacionInicio));
            localStorage.setItem("usuario", JSON.stringify(usuario));

            // Limpiar el formulario
            document.getElementById("usuario").value = "";
            document.getElementById("contrasena").value = "";

            // Recagamos Main a Home de forma dinamica
            // Modificacion de estilos
            main.style.marginTop = ``;

            main.innerHTML = home; // Se agrega el nuevo contenido al main

          } else {
            console.log(validacionInicio);
            alert("Usuario y/ó contraseña incorrectas");
        };
    };
});
// Evento click opcion "Registrar" Formulario "Creacion de Perfil"
document.addEventListener("click", async function (event) {
    if(event.target.closest("#botonregistrar")){
        event.preventDefault();
        console.warn("Se entro al click de Registrar");
        
        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const usuario = document.getElementById("usuario").value;
        const contrasena = document.getElementById("contraseña").value;

            // Crear objeto JS con el contenido base de un usuario
        const nuevoUsuario = {
            id: "",
            nombre: nombre,
            correo: correo,
            usuario: usuario,
            contraseña: contrasena,
            personajes: []
        };
        // Guardar en la API
        await save(nuevoUsuario);
        alert(`El usuario ${nuevoUsuario.usuario} se registro correctamente`)

        // Limpiar localStorage
        campos.forEach(id => {
            localStorage.removeItem(id);
        });

        // Limpiar el formulario
        campos.forEach(id => {
            document.getElementById(id).value = "";
        });

        // Volver a Pagina de Inicio de Sesion

        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = inicioSesion; // Se agrega el nuevo contenido al maineacionUsuario; // Se agrega el nuevo contenido al main
    }
});
// Evento click opcion "Iniciar Sesion" Formulario "Creacion de Perfil"
document.addEventListener("click", function(event){
    if(event.target.closest("#iniciarSesion")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de iniciar Sesion");
        //Modificacion de estilos
        main.style.gap = ""

        //Modificacion de estilos
        // main.style.marginTop = `15%`;

        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = inicioSesion; // Se agrega el nuevo contenido al main
    }
});
