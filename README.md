# 🚀 Portafolio — Miguel Alejandro

¡Hola! Soy Miguel Alejandro — estudiante de Ingeniería Informática y desarrollador web (HTML, CSS y JavaScript). Este repositorio contiene mi portafolio personal: una plantilla moderna, responsiva y con interacciones avanzadas (panel de bienvenida animado, fondo con partículas, tema día/noche, sección dinámica de proyectos y formulario de contacto).

---

## ✨ Lo más destacado
- Panel de bienvenida animado (SVG + typing) para una primera impresión profesional.
- Fondo dinámico con partículas en canvas para movimiento sutil.
- Tema Día / Noche persistente (se guarda la preferencia en localStorage).
- Sección de Proyectos renderizada dinámicamente desde un array en `js/main.js` (fácil de actualizar).
- Filtrado y búsqueda de proyectos por título o etiqueta.
- Modal para ver detalles de cada proyecto.
- Formulario de contacto con validación (incluyo instrucciones para conectar EmailJS / Formspree).
- Diseño accesible y responsive: pensado para móviles y pantallas grandes.

---

## 📁 Estructura del repositorio
- `index.html` — Página principal y panel de bienvenida.
- `css/styles.css` — Estilos con variables y soporte tema claro/oscuro.
- `js/main.js` — Lógica: bienvenida, canvas, tema, proyectos, modal y formulario.
- `assets/` — (opcional) Imágenes, miniaturas y CV en PDF.
- `README.md` — Este archivo.

---

## 🛠 Tecnologías
- HTML5, CSS3 (variables CSS, Grid, Flexbox)
- JavaScript (ES6+)
- Canvas API para partículas
- Accesibilidad básica (roles, aria-*)

---

## ➕ Cómo añadir / editar proyectos
Abre `js/main.js` y edita el array `projects`. Cada proyecto debe tener esta forma:

```javascript
{
  id: 'p4',
  title: 'Nombre del proyecto',
  short: 'Descripción corta para la tarjeta',
  description: 'Descripción detallada que aparece en el modal.',
  tags: ['HTML','CSS','JavaScript'],
  thumbnailText: 'Miniatura', // o reemplaza por <img> si añades soporte
  liveUrl: 'https://tudemo.com',
  repoUrl: 'https://github.com/tu/tu-repo'
}
```

Después de guardar, la página renderiza los proyectos automáticamente. Puedes añadir imágenes en `assets/` y adaptar la plantilla para mostrar `<img src="assets/mi-miniatura.jpg" />` en lugar del texto.

---

## 📈 Sección "Resultados / Avances" (cómo mostrar progreso de proyectos)
Puedes mantener un array similar para los resultados o hitos de cada proyecto. Ejemplo de entrada que puedes añadir en `js/main.js` (o en un nuevo archivo `results.js`):

```javascript
const results = [
  {
    projectId: 'p1',
    date: '2026-01-04',
    title: 'Implementación de autenticación',
    summary: 'Añadida autenticación con JWT y pruebas unitarias.',
    artifacts: ['https://link-a-demo', 'https://link-a-issue-tracker']
  }
];
```

Luego renderiza `results` en una nueva sección "Resultados" para mostrar el progreso y evidencias. Esto sirve para documentar avances en proyectos en curso o entregables a clientes.

---

## 📩 Conectar el formulario de contacto (ejemplo con EmailJS)
1. Crea una cuenta en https://www.emailjs.com/ y configura un servicio + plantilla.
2. Añade EmailJS SDK en `index.html` o en `js/main.js`:
```html
<script type="text/javascript" src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script>
<script>
  (function(){
    emailjs.init('TU_USER_ID'); // reemplaza con tu user id
  })();
</script>
```
3. En el callback del submit, reemplaza la simulación por:
```javascript
emailjs.sendForm('service_id','template_id', '#contactForm')
  .then(() => { formStatus.textContent = 'Mensaje enviado. ¡Gracias!'; })
  .catch(() => { formStatus.textContent = 'Error enviando el mensaje.'; });
```

También puedes usar Formspree (sin JS adicional) o Email API en tu backend.

---

## 🚀 Cómo desplegar
- GitHub Pages
  1. Sube los archivos a la rama `main` (o `gh-pages`).
  2. En la configuración del repo → Pages, selecciona la rama y la carpeta `/ (root)`.
  3. Espera unos minutos y tu sitio estará accesible en `https://miguelitin290907-art.github.io/Mi-Portafolio/`.

- Netlify / Vercel
  - Conecta el repo y configura la carpeta de publicación (`/`), despliegue automático con cada push.

---

## 🎨 Personalización recomendada
- Añade miniaturas reales por proyecto y optimízalas (WebP, tamaño reducido).
- Conecta el formulario a EmailJS/Formspree o a un backend para recibir mensajes.
- Añade un PDF de tu CV en `assets/MiguelAlejandro_CV.pdf` y el botón de descarga apuntará a él.
- Integra animaciones avanzadas con GSAP si quieres efectos más complejos.
- Añade pruebas A11y (axe, Lighthouse) y mejora el contraste para accesibilidad.

---

## 📞 Contacto
- Nombre: Miguel Alejandro  
- Teléfono: 53561317  
- Email: [Miguelitin290907@gmail.com](mailto:Miguelitin290907@gmail.com)

Si quieres, yo puedo:
- Preparar un Pull Request con estos archivos en tu repo en la rama `feat/portafolio-avanzado`.
- Conectar el formulario a EmailJS y dejarlo listo.
- Añadir sección "Resultados" renderizada automáticamente y un pequeño CMS (JSON) para gestionarla.

---

## 📜 Licencia
Este proyecto puede estar bajo licencia MIT (u otra que prefieras). Si quieres, añado un archivo `LICENSE` con la licencia que elijas.

---

¡Listo! Si quieres, personalizo este README con enlaces al sitio en producción, capturas de pantalla, GIF de la animación de bienvenida o badges (por ejemplo: Deploy, License, Tech). ¿Quieres que añada capturas y genere el PR en la rama `feat/portafolio-avanzado`?  
