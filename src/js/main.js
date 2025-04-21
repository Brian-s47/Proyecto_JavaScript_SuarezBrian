// Zona de exportacion de Elementos
import {find, save, login, finddnd5eapi, urldnd5eapi, urlRazas, urlRaza, urlClases, urlClase} from "./api.js";
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
const selectRaza = document.getElementById("#cp-raza")


// Zona de eventos de escucha

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
        
        //Modificacion de estilos
        // main.style.gap = ""
    
        // main.style.flexDirection = 'row';
        // main.style.alignItems = `center`;
        // main.style.marginTop = `17%`;
        // main.style.marginBottom = `50%`;
        // main.style.marginLeft = `35%`;
    
        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = formularioCreacionPersonaje; // Se agrega el nuevo contenido al main
    }
});
// Evento de despliegue de razas 
document.addEventListener("click", async function (event) {
    if(event.target.closest("#cp-raza")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de Ejir raza");
        const selectRaza = document.getElementById("cp-raza");

        selectRaza.innerHTML = `<option value="">Seleccionar raza...</option>`;
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
                        Rasgos:
                        ${datosRaza.traits.map(trait => `<li>${trait.name}</li>`).join("")}
                    </ul>
                    <li>Subrazas: ${datosRaza.subraces[0]?.name || "Ninguna"}</li>
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
            <div class="div__imagenCrearPersonaje">
                <img src="../assets/img/${razaSelec}.webp">
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

        selectRaza.innerHTML = `<option value="">Cargando clases...</option>`;
        // Traemos los datos de todas las Clases
        const urlnueva = urlClases();  
        const datosClases = await finddnd5eapi(urlnueva);

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
// Evento Click opcion "Perfil" Menu "Header"
irPerfil.addEventListener("click", function(event){
    event.preventDefault(); // Quitar todas las acciones por defecto del evento click
    console.warn("Se entro al click de perfil");

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
// Evento click opcion "Crear Cuenta" Formulario "Iniciar Sesion"
document.addEventListener("click", async function(event){
    if(event.target.closest("#crearPerfil")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de crear Cuenta");
    
        //Modificacion de CSS
    
        main.style.gap = ""
    
        main.style.flexDirection = 'row';
        main.style.alignItems = `center`;
        main.style.marginTop = `10%`;
        main.style.marginBottom = `100%`;
    
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
            //Modificacion de estilos
            console.warn("Se entro al click de home");
            main.style.flexDirection = ``;
            main.style.alignItems = ``;
            main.style.marginTop = ``;
            main.style.marginBottom = ``;
            main.style.marginLeft = ``;
            main.style.gap = ``;

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

        //Modificacion de estilos
        main.style.gap = ""

        main.style.flexDirection = 'row';
        main.style.alignItems = `center`;
        main.style.marginTop = `17%`;
        main.style.marginBottom = `50%`;
        main.style.marginLeft = `35%`;

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

        main.style.flexDirection = 'row';
        main.style.alignItems = `center`;
        main.style.marginTop = `17%`;
        main.style.marginBottom = `50%`;
        main.style.marginLeft = `35%`;

        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = inicioSesion; // Se agrega el nuevo contenido al main
    }
});