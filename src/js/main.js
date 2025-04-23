// Zona de exportacion de Elementos
import {find, save, login} from "./api.js";
import {home, inicioSesion, formularioCreacionUsuario, formularioCreacionPersonaje} from "./ui.js"

// Zona de variables
const campos = ['nombre', 'correo', 'usuario', 'contraseña'];

// Zona de Selectores
const main = document.querySelector("main");
const irPerfil = document.getElementById("ir__Perfil");
const irHome = document.getElementById("ir__home");
const irmasInfo = document.getElementById("ir__masInfo")
const ulOpciones = document.querySelector(".ul__opciones");

// Zona de modulos funcionales

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
// Evento click logo D&D "Header"
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
// Evento click opcion "Perfil" Menu "Header"
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
    }else{
        //Modificacion de estilos
        main.style.marginTop = `15%`;
        // main.style.marginLeft = `20%`;

        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = inicioSesion; // Se agrega el nuevo contenido al main
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
// Evento de Click "¡Comienza a crear tu héroe!"
document.addEventListener("click", async function(event){
    if(event.target.closest("#ir__crearPj")){
        event.preventDefault(); // Quitar todas las acciones por defecto del evento click
        console.warn("Se entro al click de ¡Comienza a crear tu héroe!");
        
        main.innerHTML = ``; // Eliminar todo el contenido de el Main
        main.innerHTML = formularioCreacionPersonaje; // Se agrega el nuevo contenido al main
    }
});

// **************************** Eventos de Gestion de usuarios ***************************//
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

            // Creacion de opcion de cerrar sesion 
                const nuevoLi = document.createElement("li");
                const nuevoEnlace = document.createElement("a");
                nuevoEnlace.id = "cerrarSesion";
                nuevoEnlace.textContent = "Cerrar Sesion";
                nuevoLi.appendChild(nuevoEnlace);
                ulOpciones.appendChild(nuevoLi);
          } else {
            console.log(validacionInicio);
            alert("Usuario y/ó contraseña incorrectas");
        };
    };
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

