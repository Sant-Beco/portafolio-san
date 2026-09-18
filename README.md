# Santiago Bedoya — Portafolio

Portafolio personal de **Santiago Bedoya Corrales**, Tecnólogo en Análisis y
Desarrollo de Software (SENA) especializado en backend con Python.

🔗 **Sitio en vivo:** https://beautiful-madeleine-97cc02.netlify.app/

## Sobre el proyecto

Sitio de una sola página (single-page) construido con HTML, CSS y JavaScript
puro — sin frameworks ni build step. Incluye animaciones hechas a mano
(partículas, telar de código, lluvia binaria) bajo una identidad visual de
"Artesano de Código" con paleta naranja/dorado (Forge Master).

## Estructura del proyecto

```
├── index.html      # Todo el contenido y estructura del sitio
├── style.css       # Estilos, variables de color, animaciones y responsive
├── script.js       # Animaciones canvas, filtros de proyectos, dark mode, scroll reveal
├── img/            # Imágenes de proyectos y foto de perfil
└── documentacion/  # PDFs de presentaciones de algunos proyectos
```

## Secciones del sitio

- **Hero** — título animado con partículas, disponibilidad y CTA
- **Sobre mí** — resumen profesional y formación
- **Valores** — 4 datos verificables sobre cómo trabaja (sin cifras infladas)
- **Caja de Herramientas** — stack técnico con barras de nivel
- **Proyectos** — 8 proyectos con filtros por categoría (Django, API, Python,
  Frontend, IoT, Freelance), cada uno explicado como problema → solución →
  para quién, no solo como lista de tecnologías
- **Experiencia** — línea de tiempo laboral y de formación
- **Testimonios**
- **Contacto** — formulario (Formspree) + redes

## Cómo verlo localmente

No requiere instalación ni dependencias. Basta con abrir `index.html` en el
navegador, o servirlo con cualquier servidor estático:

```bash
python3 -m http.server 8000
```

y visitar `http://localhost:8000`.

## Despliegue

El sitio se despliega automáticamente en **Netlify** al hacer push a la rama
principal del repositorio.

## Principio de contenido

Todo lo que aparece en este portafolio corresponde a proyectos reales,
verificables en GitHub o en producción — ninguna cifra o logro se presenta
sin poder explicarse en una entrevista técnica.

## Contacto

- GitHub: [@Sant-Beco](https://github.com/Sant-Beco)
- LinkedIn: [santiago-bedoya-corrales](https://www.linkedin.com/in/santiago-bedoya-corrales/)