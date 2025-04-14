// Creacion de URL para API
const key = `67fbc54b1f8b41c81684d0fa`;
const url = new URL(`https://${key}`);
url.protocol += `https:`;
url.hostname += `.mockapi.io`;
url.pathname += `usuarios/users`;

// Modulo para carga de datos de la API
export const find = async()=>{
    const response = await fetch(url.toString(), {method: "get"});
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
    const response = await fetch(url.toString(), opciones);
  };