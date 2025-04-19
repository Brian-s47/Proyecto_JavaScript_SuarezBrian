// ************************  Manejo de Api "dnd5eapi" ***************************
// Creacion de URL para API-dnd5eapi
export const urldnd5eapi = new URL(`https://www`); //https://www.dnd5eapi.co/api/2014/
urldnd5eapi.protocol += `https:`;
urldnd5eapi.hostname += `.dnd5eapi.co`;
urldnd5eapi.pathname += `api/2014/`;

// Modulo para carga de datos de la API
export const finddnd5eapi = async(url)=>{
  const response = await fetch(url.toString(), {method: "get"});
  return await response.json()  
};
// Modulo URL razas:
export const urlRazas = function(){
  return new URL("/api/races", "https://www.dnd5eapi.co");
}
// Modulo URL razas:
export const urlRaza = function(raza){
  return new URL(`/api/races/${raza}`, "https://www.dnd5eapi.co");
}

// ************************  Manejo de Api "mockapi" ***************************
// Creacion de URL para API-mockapi
const keymockapi = `67fbc54b1f8b41c81684d0fa`;
const urlmockapi = new URL(`https://${keymockapi}`); //https://67fbc54b1f8b41c81684d0fa.mockapi.io/usuarios/users
urlmockapi.protocol += `https:`;
urlmockapi.hostname += `.mockapi.io`;
urlmockapi.pathname += `usuarios/users`;

// Modulo para carga de datos de la API
export const find = async()=>{
    const response = await fetch(urlmockapi.toString(), {method: "get"});
    return await response.json()  
};
// Modulo para registrar usuario
export const save = async (formulario) => {
    const cabeceras = new Headers();
    cabeceras.set("Content-Type", "application/json");
    const opciones = {
        method: "post", 
        headers: cabeceras,
        body: JSON.stringify(formulario)
    };
    const response = await fetch(urlmockapi.toString(), opciones);
};
// Modulo para inicio de sesion de usuario
export const login = async ({ usuario, contraseña }) => {
    try {      
      const usuarios = await find(); // Cargamos todos los usuarios desde la API
      console.log("Usuarios cargados desde la API:", usuarios); 

      const usuarioEncontrado = usuarios.find(user =>
        user.usuario === usuario && user.contraseña === contraseña
      );
      if (usuarioEncontrado) {
        console.log("Usuario encontrado:", usuarioEncontrado.usuario);
        console.log("Contraseña en data:", usuarioEncontrado.contraseña);
      }
      // Si encontramos el usuario, lo retornamos. Si no, retornamos null.
      return usuarioEncontrado || null;
  
    } catch (error) {
      console.error("Error en la validación de inicio de sesión:", error);
      return null;
    }
};