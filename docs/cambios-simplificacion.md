# Cambios de Simplificación

## Resumen de cambios realizados

### Variable global única
- Se cambió de `system` a `sistema` como única variable global
- Se eliminó la duplicación de código entre `common.js` y `sistema.js`
- La inicialización del sistema ahora está en `sistema.js`

### Sistema de navegación
- Se simplificó el sistema de navegación en `utils/navegacion.js`
- Se usa `style.display` para ocultar/mostrar secciones (más simple que clases CSS)
- Se removieron console.log innecesarios
- La navegación valida permisos automáticamente según el rol del usuario

### Patrón de eventos
Todos los archivos en `paginas/` ahora siguen el patrón de la profesora:

```javascript
// Los listeners se agregan UNA SOLA VEZ al cargar la página
document.querySelector("#btnAlgo").addEventListener("click", miFuncion);

function miFuncion() {
  // lógica aquí
}
```

### Patrón de tablas
Todas las tablas ahora siguen el patrón de la profesora:

```javascript
function renderTabla() {
  let contenidoTabla = "";
  
  for (let i = 0; i < datos.length; i++) {
    const dato = datos[i];
    contenidoTabla += `<tr>
      <td>${dato.campo}</td>
      <td><button class="btnAccion" data-id="${dato.id}">Acción</button></td>
    </tr>`;
  }
  
  tbody.innerHTML = contenidoTabla;
  
  // Agregar eventos después de crear el HTML
  let botones = document.querySelectorAll(".btnAccion");
  for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
    boton.addEventListener("click", funcionAccion);
  }
}

function funcionAccion() {
  const id = this.getAttribute("data-id");
  // lógica aquí
}
```

### Archivos modificados

#### utils/
- `navegacion.js` - Simplificado, usa `style.display`, removidos console.log

#### paginas/
- `common.js` - Solo funciones comunes, sin inicialización
- `login.js` - Ya estaba bien
- `registro.js` - Ya estaba bien
- `explorar.js` - Patrón de tabla simplificado
- `ofertas.js` - Patrón de tabla simplificado
- `reservar.js` - Listener movido fuera de render
- `historial.js` - Patrón de tabla simplificado
- `admin-agregar.js` - Listener movido fuera de render
- `admin-gestionar.js` - Patrón de tabla simplificado
- `admin-procesar.js` - Patrón de tabla simplificado
- `ganancias.js` - Patrón de tabla simplificado

#### Raíz
- `sistema.js` - Ahora incluye inicialización y variable global `sistema`

## Ventajas de la simplificación

1. **Más fácil de entender** para estudiantes de primer año
2. **Sin duplicación** de listeners (cada botón solo tiene un listener)
3. **Código más limpio** sin complejidad innecesaria
4. **Patrón consistente** en todos los archivos
5. **Navegación más simple** usando display en lugar de clases CSS
6. **Variable global única** `sistema` en lugar de múltiples variables

## Estructura del código

```
index.html
├── utils/ (cargan primero)
│   ├── validaciones-contrasena.js
│   ├── tipo-de-usuario.js
│   ├── ids.js
│   ├── libreria.js
│   ├── precarga.js
│   └── navegacion.js
├── clases/ (cargan después)
│   ├── cliente.js
│   ├── administrador.js
│   ├── concierto.js
│   └── reserva.js
├── sistema.js (inicializa sistema y arranca todo)
└── paginas/ (controladores de UI)
    ├── common.js
    ├── login.js
    ├── registro.js
    ├── explorar.js
    ├── ofertas.js
    ├── reservar.js
    ├── historial.js
    ├── admin-agregar.js
    ├── admin-gestionar.js
    ├── admin-procesar.js
    └── ganancias.js
```
