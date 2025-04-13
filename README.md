# 🧙‍♂️ Proyecto JavaScript - Generador de Personajes GameCampus

¡Bienvenido al Generador de Personajes Épico de GameCampus! Este proyecto forma parte de una entrega académica para el campus de programación y tiene como objetivo construir una aplicación web interactiva, visualmente impactante y completamente funcional usando **HTML**, **CSS** y **JavaScript nativo**.

---

## 🌟 Descripción

GameCampus está desarrollando un videojuego de fantasía épica basado en el universo de Dungeons & Dragons. Para ello, se construyó esta plataforma donde los usuarios pueden **crear y personalizar héroes legendarios** con razas, clases, habilidades, equipo y mucho más.

---

## 🖥️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- API pública: [D&D 5e API](https://www.dnd5eapi.co/)
- JSON Local (MockAPI para guardado de perfiles y personajes creados)

---

## 🚀 Funcionalidades

- Página de Inicio (Landing Page) con diseño responsivo.
- Sistema de creación de personajes con múltiples opciones:
  - Nombre personalizado
  - Raza (desde API)
  - Clase (desde API)
  - Género (Masculino, Femenino, Otro)
  - Armas, Armaduras, Accesorios
  - Estadísticas personalizadas (fuerza, destreza, inteligencia, etc.)
  - Habilidades especiales (desde API)
- Opción de **guardar personajes**
- Vista de lista con personajes creados y botón para **ver detalles**
- Compatibilidad en móviles, tablets y desktop

---

## 🗂️ Estructura del Proyecto
``` 
├── 📂 assets/            # Código fuente
│   ├── 📂 font/          # Fuentes
│   ├── 📂 icon/          # Iconos
│   ├── 📂 img/           # Imágenes
├── 📂 src/               # Código fuente 
│   ├── 📂 js/            # Scripts de JavaScript  
│   │   ├── main.js        # Archivo principal, punto de entrada
│   ├── index.htm          # Página principal 
├── 📂 style/             # Código fuente 
│   │   ├── main.css       # Estilos principales
│   │   ├── variables.css  # Variables de colores y temas 
├── datos.json             # datos de perfiles
├── README.md              # Instrucciones generales
```
---

## 📦 Instalación y Uso

1. Clona este repositorio:
   ```
   git clone https://github.com/tuUsuario/Proyecto_JavaScript_ApellidoNombre.git
Abre el archivo index.html en tu navegador (doble clic o desde VSCode con Live Server).

(Opcional) Si necesitas trabajar con datos locales, asegúrate de que el navegador permita leer archivos JSON locales o usa una extensión tipo [Live Server].

🔗 APIs Usadas
Dungeons & Dragons 5e API

Documentación oficial: https://www.dnd5eapi.co/docs/

🧠 Autores
Brian Fair Suarez Porras – Desarrollador
(https://github.com/Brian-s47)

📜 Licencia
Proyecto con fines educativos - Campus de Programadores
---