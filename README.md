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
- Figma "Para plandear diseño inicial" (https://www.figma.com/design/OYxfFLx16UOZMgtBCubkox/Untitled?node-id=0-1&p=f&t=i96RT8uo0oCZLQdH-0)

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
├── 📂 assets/                                        # Código fuente
│   ├── 📂 font/                                      # Fuentes
│   ├── 📂 icon/                                      # Iconos
│   ├── 📂 img/                                       # Imágenes
├── 📂 data/                                          # Archivos Json para documentacion
│   ├── 📂 dnd5eap/                                   # Archivos Json API D&D
│   │   ├── dnd5eap-1-races.js                         # Archivos razas Json API D&D
│   │   ├── dnd5eap-2-classes.js                       # Archivos clases Json API D&D
│   │   ├── dnd5eap-3-equipment-categories.js          # Archivos equipos Json API D&D
│   │   ├── dnd5eap-4-ability-scores.js                # Archivos habilidades Json API D&D
│   │   ├── dnd5eap-5-skills.js                        # Archivos skills Json API D&D
│   │   ├── dnd5eap-6-spells.js                        # Archivos spells Json API D&D
│   │   ├── dnd5eap-7-equipment.js                     # Archivos equipos Json API D&D
│   │   ├── dnd5eap.js                                 # Archivos Json API D&D
│   ├── mockapi.htm                                    # Archivos razas Json API mokapi 
├── 📂 src/                                           # Código fuente 
│   ├── 📂 js/                                        # Scripts de JavaScript 
│   │   ├── api.js                                     # Modulo de manojo de APIS
│   │   ├── main.js                                    # Archivo principal, punto de entrada
│   │   ├── ui.js                                      # Modulos de HTML para incertar
│   ├── index.htm                                      # Página principal 
├── 📂 style/                                          # Código fuente 
│   │   ├── main.css                                    # Estilos principales
│   │   ├── variables.css                               # Variables de colores y temas 
├── README.md                                           # Instrucciones generales
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