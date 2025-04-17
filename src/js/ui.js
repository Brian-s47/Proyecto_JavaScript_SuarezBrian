// HTML pagina inicial Click en Logo
export const home = `
  <section class="section__contenidoHome">
    <!-- Contenedor: ¿Qué es esta plataforma?  -->
    <div class="div__info-plataforma">
      <h2>¿Qué es esta plataforma?</h2>
      <p>
        Esta herramienta te permite construir personajes únicos seleccionando raza, clase, habilidades, equipo, accesorios ¡y mucho más! Todo adaptado al universo de fantasía.
      </p>
    </div>
    <!-- Contenedor: ¿Qué es D&D (Dungeons and Dragons)? -->
    <div class="div__info-juego">
      <h2>¿Qué es D&D (Dungeons and Dragons)?</h2>
      <p>
        En Dungeons & Dragons, los jugadores forman un grupo de aventureros que exploran mundos de fantasía mientras se embarcan en misiones épicas y aumentan su experiencia.
      </p>
    </div>
    <!-- Contenedor: Personaje izquierda -->
    <div class="div__personaje-izquierda">
      <img src="../assets/img/Personaje-1.png">
    </div>
    <!-- Contenedor: Bienvenida a la aplicacion -->
    <div class="div__info-aplicacion">
      <div class="div__info-bienvenida">
        <h2>Bienvenido al Generador de Personajes Épico</h2>
        <p>
          Crea, personaliza y guarda héroes legendarios del mundo de fantasía inspirado en Dungeons & Dragons.
        </p>
      </div>
      <div class="div__boton-creacion">
        <a id="ir__crearPj" href="#">¡Comienza a crear tu héroe!</a>
      </div>
    </div>
    <!-- Contenedor: Personaje derecha -->
    <div class="div__personaje-derecha">
      <img src="../assets/img/Personaje-2.png">
    </div>
  </section>
`;
// HTML inicio de sesion 
export const inicioSesion = `
<section class="section__iniciarSesion">
  <h2>Iniciar Sesión</h2>
  <form>
    <input type="text" id="usuario" placeholder="Usuario" required>
    <input type="password" id="contrasena" placeholder="Contraseña" required>
    <button id="botonIniciarsesion" type="submit">Entrar</button>
  </form>
  <div class="div__resgistrar">
    ¿No tienes cuenta? <a id="crearPerfil" href="#">Crear cuenta</a>
  </div>
</section>
`;
// HTML Formulario de Creacion de Usuario
export const formularioCreacionUsuario = `
<section class="Section__creacionUSuario">
  <h2>Creacion de Perfil</h2>
  <form>
    <input type="text" id="nombre" placeholder="Nombre" required>
    <input type="email" id="correo" placeholder="correo" required>
    <input type="text" id="usuario" placeholder="usuario" required>
    <input type="text" id="contraseña" placeholder="contraseña" required>
    <button id="botonregistrar" type="submit">Registrar</button>
  </form>
  <div class="div__resgistrar">
    ¿Ya tienes una cuenta? <a id="iniciarSesion" href="#">Iniciar Sesion</a>
  </div>
</section>
`;
// HTMML Formulario de creacion de personaje
export const formularioCreacionPersonaje = `
<section class="section__contenedorcrearPersonaje">
  
<!-- Seccion crearPersonaje -->
  <section class="section__crearPersonaje">
    <h2 id="titulocrearPersonaje">Crear Nuevo Personaje</h2>
    <div class="div__contenedorDatospj">
      <div class="div__contenedorIzquierdo">
      <!-- Datos básicos -->
      <div class="div__datosBasicos">
        <h3>Datos Basicos</h3>
        <label for="nombre">Nombre del personaje:</label>
        <input type="text" id="cp-nombre" placeholder="">
        <label for="genero">Género:</label>
        <select id="cp-genero">
          <option value="">Seleccionar</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
  
      <!-- Datos a eleccion -->
      <div class="div__raza">
        <h3>Eleccion de Raza</h3>
        <label for="raza">Raza:</label>
        <select id="cp-raza">
          <option value="">Cargando razas...</option>
        </select>
      </div>
  
      <div class="div__clase">
        <h3>Eleccion de Clase</h3>
        <label for="clase">Clase:</label>
        <select id="cp-clase">
          <option value="">Cargando clases...</option>
        </select>
      </div>
  
      <div class="div__armadura">
        <h3>Eleccion de Armadura</h3>
        <label for="armadura">Armadura:</label>
        <select id="cp-armadura">
          <option value="">Cargando armaduras...</option>
        </select>
      </div>
  
      <div class="div__armas">
        <h3>Eleccion de Arma</h3>
        <label for="arma">Armas:</label>
        <select id="cp-arma">
          <option value="">Cargando armas...</option>
        </select>
      </div>
      </div>
      <div class="div__contenedorDerecho">
          <!-- Estadisticas -->
      <div class="div__estadisticas">
        <h3>Estadísticas</h3>
        <label>Fuerza: <input type="number" id="fuerza" min="1" max="20"></label>
        <label>Destreza: <input type="number" id="destreza" min="1" max="20"></label>
        <label>Constitución: <input type="number" id="constitucion" min="1" max="20"></label>
        <label>Inteligencia: <input type="number" id="inteligencia" min="1" max="20"></label>
        <label>Sabiduría: <input type="number" id="sabiduria" min="1" max="20"></label>
        <label>Carisma: <input type="number" id="carisma" min="1" max="20"></label>
      </div>
  
      <!-- Datos habilidades -->
      <div class="div__habilidades">
        <h3>Eleccion de Habilidades</h3>
        <label for="habilidades">Habilidades especiales:</label>
        <select id="habilidades" >
          <option value="">Cargando habilidades...</option>
        </select>
      </div>
  
      <!-- Accesorios  -->
      <div class="div__accesorios">
        <h3>Eleccion de Accesorios</h3>
        <label for="accesorios">Accesorios:</label>
        <input type="text" id="accesorios" placeholder="Ej: Anillo de invisibilidad, Medalla élfica...">
      </div>
  
      <!-- Boton Crear Personaje -->
      <div class="div__botonCrear">
        <button id="crearPersonaje">Crear personaje</button>
      </div>
    </div>
    </div>
    
  </section>
  <!-- Seccion descripcion -->
  <section class="section__descripcion">
    <h2>Instrucciones de uso de "Creacion de personaje"</h2>
    <div class="div__descripccion">
      <h2>¿Qué es esta plataforma?</h2>
      <p>
        Esta herramienta te permite construir personajes únicos seleccionando raza, clase, habilidades, equipo, accesorios ¡y mucho más! Todo adaptado al universo de fantasía.
      </p>
    </div>
    <div class="div__descripccion">
      <h2>¿Qué tener en cuenta?</h2>
      <ol>
        <li>
          La aplicacion te estara guiando paso a paso en cada opcion de elijas.
        </li>
        <li>
          La aplicacion estara filtrando cada opcion siguiente a medida que elijas la opcion anterior.
        </li>
        <li>
          Lleva un orden de eleccion de las opciones superiores a las inferiores, no pases a la siguiente opcion sin elejir la anterior.
        </li>
        <li>
          Si deseas ver mas detalles de la opcion que vas a elejir usa el boton "Mas info" al lado del titulo de la casilla que estas llenando.
        </li>
      </ol>
    </div>
    <div class="div__imagenCrearPersonaje">
      <img src="../assets/img/Personajes.webp">
    </div>
  </section>
</section>
`;
