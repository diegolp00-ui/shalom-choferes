# 🚛 Shalom Choferes - Simulador de Capacitación Oficial

Simulador web interactivo de la **App de Choferes Shalom Empresarial**, diseñado para la formación, inducción y evaluación práctica de conductores de distribución y transporte.

Este proyecto fue migrado desde un **Google Apps Script Web App** hacia una aplicación web moderna, optimizada, responsiva y lista para desplegarse gratuitamente en **GitHub Pages**.

---

## ✨ Mejoras Implementadas respecto a la versión de Google Apps Script

1. **Rendimiento y Carga Instantánea**: 
   - Se eliminaron los iframes y avisos de seguridad de Google Workspace.
   - Carga en milisegundos gracias al despliegue estático y CDN global.
2. **Cámara Real + Simulador**:
   - Integración con la cámara del dispositivo móvil (`navigator.mediaDevices.getUserMedia`) con botón de captura y efecto de flash real.
   - Opción alternativa de foto simulada si el conductor practica en PC sin cámara web.
3. **Efectos de Sonido Hápticos (Web Audio API)**:
   - Sonidos de toque, alerta de falta de evidencia, clic de obturador de cámara y fanfarria de éxito.
   - 100% sintetizados sin descargas pesadas de audio. Botón para silenciar disponible.
4. **Modo Guiado Paso a Paso**:
   - Asistente superior en tiempo real que indica la siguiente acción recomendada según el manual oficial de capacitación (Láminas 59, 60, 61, 62 de Canva).
   - Resalta visualmente el botón a presionar.
5. **Modo PWA (Instalable como App Móvil)**:
   - Compatible con Android y iPhone mediante `manifest.json` y `sw.js`.
   - Permite agregarse a la pantalla de inicio y ejecutarse a pantalla completa como una app nativa, incluso sin conexión a internet.
6. **Diseño y Estructura Limpia**:
   - Código modular separado en `index.html`, `css/style.css` y `js/app.js`.
   - Marco de teléfono realista en escritorio con Dynamic Island/Notch y barra de estado en tiempo real.

---

## 🚀 Cómo Subir y Publicar en GitHub / GitHub Pages

### Paso 1: Crear un nuevo repositorio en GitHub
1. Ingresa a [GitHub.com](https://github.com/new).
2. Asigna un nombre al repositorio, por ejemplo: `shalom-choferes-app`.
3. Selecciona **Public** (Público) y no marques "Add a README file" (ya lo tenemos creado).
4. Haz clic en **Create repository**.

### Paso 2: Vincular y subir tu código local
Abre PowerShell o tu terminal en la carpeta del proyecto (`C:\Users\Diego\.gemini\antigravity\scratch\shalom-choferes-app`) y ejecuta:

```bash
# 1. Inicializar git
git init

# 2. Agregar los archivos
git add .

# 3. Crear el primer commit
git commit -m "feat: Migración y mejoras del simulador Shalom Choferes"

# 4. Establecer la rama principal
git branch -M main

# 5. Conectar con tu repositorio en GitHub (Reemplaza TU-USUARIO por tu nombre en GitHub)
git remote add origin https://github.com/TU-USUARIO/shalom-choferes-app.git

# 6. Subir a GitHub
git push -u origin main
```

### Paso 3: Activar GitHub Pages (Hosting Gratuito)
1. En tu repositorio de GitHub, haz clic en la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment**:
   - **Source**: Selecciona `Deploy from a branch`.
   - **Branch**: Selecciona `main` y la carpeta `/(root)`.
4. Haz clic en **Save** (Guardar).
5. En 1 o 2 minutos, GitHub te proporcionará un enlace público como:
   `https://TU-USUARIO.github.io/shalom-choferes-app/`

---

## 📱 Flujo de la Capacitación en el Simulador

1. **Login**: Iniciar sesión con DNI (por defecto `48290476`).
2. **Menú**: Seleccionar el módulo **Programación**.
3. **Inicio de Ruta (Canva Pág 58)**: Registrar kilometraje inicial (`29726 Km`) y candados.
4. **Hoja de Ruta - Escalas (Pág 59)**:
   - Escala Origen (**Huachipa CO**): Al intentar registrar salida, exige adjuntar **evidencia fotográfica** del precinto/candado.
   - Escala Intermedia (**Magdalena del Mar**): Registro de llegada y salida.
   - Escala Destino (**Av. La Marina**): Registro de llegada y **Primer Cierre** (Cierre de Escala - Pág 60).
5. **Fin de Ruta (Pág 61)**: Ingresar kilometraje final y grabar fin de ruta (**Segundo Cierre**).
6. **Desbloqueo de Retorno (Pág 62)**: La ruta de retorno queda desbloqueada automáticamente para la siguiente etapa.
7. **Evaluación**: Acceso directo al formulario Google Forms de evaluación oficial y videos en Drive.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 & CSS3** Moderno
- **Tailwind CSS** (Utilidades de diseño rápido)
- **FontAwesome 6** (Iconografía oficial)
- **JavaScript ES6+** (Gestión de estado y lógica de simulación)
- **Web Audio API** (Efectos de sonido interactivos)
- **WebRTC / MediaDevices** (Cámara de captura de evidencia)
- **Service Workers & PWA** (Soporte offline y experiencia de app móvil)
