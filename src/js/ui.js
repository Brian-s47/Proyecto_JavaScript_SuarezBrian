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
        <a href="#">¡Comienza a crear tu héroe!</a>
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
`
