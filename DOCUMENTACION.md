# 📘 Guía de Documentación, Cambios y Mantenimiento
## Proyecto: Simulador de Capacitación App Shalom Choferes

Este documento está diseñado para que cualquier desarrollador, capacitador o líder de proyecto pueda **entender cómo funciona el sistema, hacer cambios sin romper la lógica y llevar un control profesional de versiones**.

---

## 1. 🏗️ Arquitectura del Proyecto

El proyecto es una **Single Page Application (SPA)** ligera, sin dependencias complejas ni frameworks pesados (Node/React/Vue), lo que garantiza que pueda desplegarse inmediatamente en cualquier servidor estático o **GitHub Pages**.

```text
shalom-choferes/
│
├── index.html          # Código maestro: Contiene toda la vista HTML + estilos y scripts empaquetados
├── css/
│   └── style.css       # Estilos CSS puros, variables de diseño y reglas móviles
├── js/
│   └── app.js          # Máquina de estados (rutas, escalas, cierres, cámara y audio)
├── manifest.json       # Manifiesto PWA para instalación nativa en Android/iOS
├── sw.js               # Service Worker para funcionamiento sin conexión a internet
├── assets/             # Iconos vectoriales y recursos visuales
└── DOCUMENTACION.md    # Este manual técnico
```

---

## 2. ✏️ ¿Cómo realizar los cambios más comunes?

Toda la lógica de datos reside en el objeto **`app.state`** dentro de `js/app.js` (y reflejada en `index.html`). A continuación se detallan los puntos exactos a modificar:

### A. Cambiar el Chofer por defecto o DNI de prueba
En `js/app.js` (alrededor de la línea 75):
```javascript
state: {
  driverDni: '99999999',                          // Modificar DNI
  driverName: 'pruebashalom',                     // Modificar Nombre
  ...
}
```

### B. Modificar Kilometrajes, Placa o Número de Programación
En `js/app.js` dentro de `routes.IDA` o `routes.RET`:
```javascript
IDA: {
  title: 'IDA - HUACHIPA CO - LA MARINA - MAGDALENA AYACUCHO 2',
  progNumber: '948836',   // Número de programación
  kmInicio: 29726,        // Kilometraje inicial de salida
  kmFin: 29764,           // Kilometraje final esperado
  candados: 2,            // Número de candados
  ...
}
```

### C. Agregar o Editar una Escala (Parada)
Cada ruta tiene un array `escalas`. Puedes cambiar horas estimadas, bultos o añadir nuevas paradas:
```javascript
escalas: [
  { 
    name: 'HUACHIPA CO', 
    isOrigin: true,       // true si es la escala inicial
    isDest: false,        // true si es el destino final
    status: 'PENDIENTE', 
    km: 29726, 
    embarcados: 97,       // Cantidad de paquetes
    grt: 95,              // Guías de remisión
    llegadaPrev: '--:--', 
    salidaPrev: '12:50' 
  },
  ...
]
```

### D. Cambiar los Enlaces de Videos o Evaluación Oficial
En `index.html`:
- **Carpeta de Google Drive (Videos):** Buscar `https://drive.google.com/drive/folders/...`
- **Formulario de Google Forms (Evaluación):** Buscar `https://forms.gle/...`

---

## 3. 🔄 Ciclo de Publicación de Cambios (Workflow)

Cada vez que alguien solicite un cambio, el flujo de trabajo es:

1. **Editar los archivos localmente** en tu computadora.
2. **Probarlo en el navegador:** Abre `index.html` con doble clic para verificar que los cambios funcionen como se espera.
3. **Guardar y publicar a GitHub:**
   Abre PowerShell en la carpeta del proyecto y ejecuta:
   ```powershell
   git add .
   git commit -m "tipo: descripción clara del cambio realizado"
   git push origin main
   git push origin main:gh-pages --force
   ```
4. **Despliegue automático:** GitHub Pages detecta los cambios y en **menos de 1 minuto** la web pública se actualiza automáticamente.

---

## 4. 📌 ¿Cómo gestionar solicitudes y reclamos con otras personas?

Cuando alguien (tu jefe, un colega o un usuario) te pida modificaciones, usa las herramientas que GitHub ya incluye:

### A. Uso de "GitHub Issues" (Reportes y Solicitudes)
En lugar de recibir cambios por mensajes sueltos de WhatsApp o correo:
1. Pídeles (o créalo tú mismo) abrir un **Issue** en tu repositorio:
   👉 `https://github.com/diegolp00-ui/shalom-choferes/issues`
2. Ejemplo de título: `[Mejora] Añadir escala Huancayo a la ruta de Retorno`
3. Esto deja un registro claro de **quién lo pidió, cuándo se pidió y cuándo quedó resuelto**.

### B. Buenas Prácticas de Commits (Historial Limpio)
Usa mensajes de commit estandarizados para que en el historial se entienda qué se hizo:
- `feat: ...` -> Cuando añadas una nueva funcionalidad (ej. `feat: agregar boton de reporte`).
- `fix: ...` -> Cuando corrijas un error (ej. `fix: corregir cálculo de kilometraje en llegada`).
- `docs: ...` -> Cuando actualices manuales o textos (ej. `docs: actualizar preguntas de inducción`).
- `style: ...` -> Ajustes visuales, fuentes o colores.

---

## 5. 📋 Plantilla para el Historial de Versiones (Changelog)

Puedes mantener un registro en este mismo formato:

| Versión | Fecha | Autor | Cambios Principales |
| :--- | :--- | :--- | :--- |
| **v1.0.0** | Octubre 2026 | Diego | Migración completa desde Google Apps Script a GitHub Pages. Integración de cámara real WebRTC, sonidos sintéticos y modo guiado. |
| **v1.1.0** | Octubre 2026 | Diego | Optimización 100% nativa para teléfonos móviles (eliminación de notch artificial y barras negras). |
| **v1.2.0** | Octubre 2026 | Diego | Botón interactivo de regulación de tamaño de texto e iconos (`A` / `A+` / `A++`) con persistencia local. |
| **v1.3.0** | Octubre 2026 | Diego | Optimización de fluidez (GPU `translate3d`, eliminación de latencia táctil de 300ms, vibración háptica en móvil) y restricción de acceso únicamente mediante deslizamiento Swipe. |
