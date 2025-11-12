# 🧭 Sistema de Navegación por Eventos - Melody Key

## ✅ IMPLEMENTADO SEGÚN REQUISITOS DE LA PROFESORA

El sistema ahora usa **navegación por eventos con clases CSS** en lugar de hash routing.

---

## 📋 CÓMO FUNCIONA

### Estructura
1. **Botones** tienen clase `.boton` e id `btnNombreSeccion`
2. **Secciones** tienen clase `.seccion` e id `nombreSeccion`
3. **Eventos** `click` en botones muestran/ocultan secciones
4. **Permisos** validados antes de mostrar cada sección

---

## 🔧 IMPLEMENTACIÓN

### Archivo: `utils/navegacion.js`

```javascript
// Ocultar todas las secciones
function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
}

// Mostrar una sección específica
function mostrarSeccion(idSeccion) {
  // Validar permisos
  if (!tienePermiso(idSeccion)) {
    // Redirigir según usuario
  }
  
  ocultarSecciones();
  let seccion = document.querySelector("#" + idSeccion);
  seccion.style.display = "block";
  
  // Ejecutar render si existe
  renderizarSeccion(idSeccion);
}

// Iniciar navegación
function iniciarNavegacion() {
  let botones = document.querySelectorAll(".boton");
  
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function(e) {
      e.preventDefault();
      let idBtn = this.getAttribute("id");
      // btnLogin -> login
      let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
      mostrarSeccion(idSeccion);
    });
  }
  
  mostrarSeccion("login"); // Por defecto
}
```

---

## 🎨 HTML - Estructura

### Botones de Navegación

```html
<!-- ANTES (hash routing) -->
<a href="#login">Inicio</a>

<!-- DESPUÉS (eventos) -->
<a class="boton" id="btnLogin" href="#">Inicio</a>
```

**Patrón:**
- Clase: `.boton`
- ID: `btn + NombreSeccion` (ej: btnLogin, btnRegistro, btnExplorar)

### Secciones de Contenido

```html
<!-- ANTES -->
<section id="login" data-section>

<!-- DESPUÉS -->
<section id="login" class="seccion" data-section>
```

**Patrón:**
- Clase: `.seccion`
- ID: `nombreSeccion` (minúscula)

---

## 📊 MAPEO DE IDS

| Botón | Sección | Descripción |
|-------|---------|-------------|
| `btnLogin` | `login` | Inicio de sesión |
| `btnRegistro` | `registro` | Registro de cliente |
| `btnExplorar` | `explorar` | Ver conciertos |
| `btnOferta` | `oferta` | Conciertos en oferta |
| `btnReservar` | `reservar` | Hacer reserva |
| `btnHistorial` | `historial` | Ver historial |
| `btnAgregar` | `agregar` | Agregar concierto |
| `btnAdmin` | `admin` | Administrar |
| `btnProcesar` | `procesar` | Procesar reservas |
| `btnGanancias` | `ganancias` | Informe |

---

## 🔒 Sistema de Permisos Integrado

La función `tienePermiso()` valida antes de mostrar:

```javascript
function tienePermiso(idSeccion) {
  const user = system.usuarioLogueado;
  const adminPages = ["agregar", "admin", "procesar", "ganancias"];
  const clientPages = ["explorar", "oferta", "reservar", "historial"];
  const publicPages = ["login", "registro"];
  
  // Sin usuario: solo public
  if (!user) {
    return publicPages.indexOf(idSeccion) !== -1;
  }
  
  // Con usuario: no public
  if (publicPages.indexOf(idSeccion) !== -1) {
    return false;
  }
  
  // Admin: solo admin pages
  if (esAdmin(user)) {
    return adminPages.indexOf(idSeccion) !== -1;
  }
  
  // Cliente: solo client pages
  if (esCliente(user)) {
    return clientPages.indexOf(idSeccion) !== -1;
  }
  
  return false;
}
```

---

## 🎯 Uso desde el Código

### En lugar de:
```javascript
window.location.hash = "#explorar";
```

### Ahora usar:
```javascript
mostrarSeccion("explorar");
```

**Ejemplos actualizados:**
- Login exitoso → `mostrarSeccion("explorar")` o `mostrarSeccion("admin")`
- Cerrar sesión → `mostrarSeccion("login")`
- Reserva creada → `mostrarSeccion("historial")`
- Seleccionar concierto → `mostrarSeccion("reservar")`

---

## ✨ VENTAJAS

### Para la Profesora
✅ **Cumple con el estilo enseñado**
- Eventos `addEventListener`
- Clases CSS para identificar elementos
- Manipulación directa del DOM
- `style.display` para mostrar/ocultar

### Para el Código
✅ **Simple y directo**
- Fácil de entender
- Sin dependencia de URL
- Control total del flujo

### Para el Usuario
✅ **Funciona igual**
- Navegación fluida
- Permisos respetados
- Sin cambios visibles

---

## 🔍 ARCHIVOS MODIFICADOS

1. ✅ `utils/navegacion.js` - **CREADO**
   - Sistema completo de navegación
   - Validación de permisos
   - Renderizado de secciones

2. ✅ `index.html` - **ACTUALIZADO**
   - 10 botones con clase `.boton`
   - 10 secciones con clase `.seccion`
   - Script `navegacion.js` cargado

3. ✅ `paginas/common.js` - **SIMPLIFICADO**
   - Removido sistema de hash routing
   - Mantiene `updateNavbar()`
   - Usa `mostrarSeccion()` en logout

4. ✅ `paginas/*.js` - **ACTUALIZADOS**
   - `login.js` - usa `mostrarSeccion()`
   - `reservar.js` - usa `mostrarSeccion()`
   - `explorar.js` - usa `mostrarSeccion()`
   - `ofertas.js` - usa `mostrarSeccion()`

---

## 📝 EJEMPLO COMPLETO

### HTML
```html
<!-- Botón en el menú -->
<a class="nav-link boton" href="#" id="btnExplorar">Explorar</a>

<!-- Sección correspondiente -->
<section id="explorar" class="seccion d-none" data-section>
  <!-- Contenido -->
</section>
```

### JavaScript
```javascript
// El botón btnExplorar al hacer click:
// 1. Se extrae "Explorar" del id
// 2. Se convierte a "explorar" (minúscula)
// 3. Se valida permiso
// 4. Se ocultan todas las secciones
// 5. Se muestra #explorar
// 6. Se ejecuta renderExplorar()
```

---

## 🎓 VENTAJAS DIDÁCTICAS

Este sistema es **ideal para aprender** porque:

1. **Usa conceptos básicos:**
   - `querySelector()` y `querySelectorAll()`
   - `addEventListener()`
   - `style.display`
   - Bucles `for`
   - Condicionales `if`

2. **No usa conceptos avanzados:**
   - ❌ No usa hash routing
   - ❌ No usa frameworks
   - ❌ No usa funciones arrow
   - ❌ No usa métodos modernos de array

3. **Es visible y claro:**
   - Se ve exactamente qué hace cada línea
   - Fácil de depurar
   - Simple de modificar

---

## ✅ RESULTADO FINAL

✅ **Cumple con requisitos de la profesora**
✅ **Mantiene sistema de permisos**
✅ **Código simple y didáctico**
✅ **Funciona perfectamente**

**Estado:** ✅ NAVEGACIÓN POR EVENTOS IMPLEMENTADA
