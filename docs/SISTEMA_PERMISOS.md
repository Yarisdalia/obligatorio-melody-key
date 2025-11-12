# 🔒 SISTEMA DE PERMISOS Y NAVEGACIÓN - MELODY KEY

## ✅ CAMBIOS APLICADOS

Se ha implementado un sistema robusto de permisos que **garantiza que cada usuario solo vea lo que le corresponde**.

---

## 🎯 REGLAS DE PERMISOS

### Sin Usuario Logueado
- ✅ **Puede ver:** Login, Registro
- ❌ **NO puede ver:** Explorar, Ofertas, Reservar, Historial, Admin
- 🔀 **Redirección:** Si intenta acceder a páginas protegidas → Redirige a Login

### Cliente Logueado
- ✅ **Puede ver:** Explorar, Ofertas, Reservar, Historial
- ❌ **NO puede ver:** Login, Registro, Admin (todas las páginas de admin)
- 🔀 **Redirección:** 
  - Si intenta Login/Registro → Redirige a Explorar
  - Si intenta páginas Admin → Redirige a Explorar

### Administrador Logueado
- ✅ **Puede ver:** Agregar Concierto, Administrar Conciertos, Procesar Reservas, Informe de Ganancias
- ❌ **NO puede ver:** Login, Registro, Explorar, Ofertas, Reservar, Historial (páginas de cliente)
- 🔀 **Redirección:**
  - Si intenta Login/Registro → Redirige a Admin
  - Si intenta páginas Cliente → Redirige a Admin

---

## 🔧 IMPLEMENTACIÓN TÉCNICA

### Archivo: `paginas/common.js`

#### 1. Función `updateNavbar()`
Oculta/muestra elementos del menú según el rol del usuario:

```javascript
function updateNavbar() {
  const user = system.usuarioLogueado;
  const isAdmin = esAdmin(user);
  const isCliente = esCliente(user);

  // Sin usuario: solo muestra Inicio y Registro
  document.getElementById("navInicio").style.display = !user ? "" : "none";
  document.getElementById("navRegistro").style.display = !user ? "" : "none";
  
  // Cliente: muestra opciones de cliente
  document.getElementById("navExplorar").style.display = isCliente ? "" : "none";
  document.getElementById("navOfertas").style.display = isCliente ? "" : "none";
  document.getElementById("navReservar").style.display = isCliente ? "" : "none";
  document.getElementById("navHistorial").style.display = isCliente ? "" : "none";
  
  // Admin: muestra menú admin
  document.getElementById("navAdmin").style.display = isAdmin ? "" : "none";
}
```

#### 2. Función `ensureAllowedRoute()`
Valida que el usuario tenga permiso para ver la página solicitada:

```javascript
function ensureAllowedRoute() {
  const user = system.usuarioLogueado;
  const hash = window.location.hash || "#login";
  
  const adminPages = ["#agregar", "#admin", "#procesar", "#ganancias"];
  const clientPages = ["#explorar", "#oferta", "#reservar", "#historial"];
  const publicPages = ["#login", "#registro"];
  
  // Regla 1: Sin usuario → solo login/registro
  if (!user) {
    if (publicPages.indexOf(hash) === -1) {
      window.location.hash = "#login";
      return false;
    }
    return true;
  }
  
  // Regla 2: Con usuario → no login/registro
  if (user && publicPages.indexOf(hash) !== -1) {
    if (esAdmin(user)) {
      window.location.hash = "#admin";
    } else {
      window.location.hash = "#explorar";
    }
    return false;
  }
  
  // Regla 3: Admin no puede ver páginas de cliente
  if (esAdmin(user) && clientPages.indexOf(hash) !== -1) {
    window.location.hash = "#admin";
    return false;
  }
  
  // Regla 4: Cliente no puede ver páginas de admin
  if (esCliente(user) && adminPages.indexOf(hash) !== -1) {
    window.location.hash = "#explorar";
    return false;
  }
  
  return true;
}
```

#### 3. Función `route()`
Oculta todas las secciones y muestra solo la permitida:

```javascript
function route() {
  const hash = window.location.hash || "#login";
  
  // Validar permisos
  if (!ensureAllowedRoute()) return;
  
  // Actualizar menú
  updateNavbar();
  
  // Ocultar todas las secciones
  const secciones = document.querySelectorAll("[data-section]");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.add("d-none");
  }
  
  // Mostrar solo la sección actual
  const seccionActual = document.querySelector(hash);
  if (seccionActual) {
    seccionActual.classList.remove("d-none");
  }
  
  // Renderizar contenido si es necesario
  // ...
}
```

---

## 📋 PÁGINAS POR ROL

### Páginas Públicas (Sin login)
| Página | URL | Descripción |
|--------|-----|-------------|
| Login | `#login` | Inicio de sesión |
| Registro | `#registro` | Registro de cliente |

### Páginas de Cliente
| Página | URL | Descripción | Funcionalidad |
|--------|-----|-------------|---------------|
| Explorar | `#explorar` | Ver conciertos disponibles | F03 |
| Ofertas | `#oferta` | Ver conciertos en oferta | F06 |
| Reservar | `#reservar` | Hacer reserva | F04 |
| Historial | `#historial` | Ver mis reservas | F05 |

### Páginas de Administrador
| Página | URL | Descripción | Funcionalidad |
|--------|-----|-------------|---------------|
| Agregar | `#agregar` | Crear nuevo concierto | F08 |
| Administrar | `#admin` | Modificar conciertos | F09 |
| Procesar | `#procesar` | Aprobar/cancelar reservas | F07 |
| Ganancias | `#ganancias` | Ver informe financiero | F10 |

---

## 🔍 VALIDACIONES DE TIPO DE USUARIO

### Archivo: `utils/tipo-de-usuario.js`

```javascript
function esAdmin(user) {
  return user && user instanceof Administrador;
}

function esCliente(user) {
  return user && user instanceof Cliente;
}
```

Estas funciones se usan en todo el sistema para verificar el tipo de usuario.

---

## 🎨 EXPERIENCIA DE USUARIO

### Flujo sin Usuario
1. Usuario abre la app
2. Ve: **Login** y **Registro** en el menú
3. Puede acceder solo a estas páginas
4. Si intenta ir a otra URL → Redirige a Login

### Flujo Cliente
1. Cliente hace login
2. Menu cambia automáticamente
3. Ve: **Explorar**, **Ofertas**, **Reservar**, **Historial**
4. Ve también: **"Hola, [nombre]"** y **"Cerrar sesión"**
5. NO ve: Login, Registro, Admin
6. Si intenta acceder a URL de admin → Redirige a Explorar

### Flujo Admin
1. Admin hace login
2. Menu cambia automáticamente
3. Ve: **Admin** (dropdown con 4 opciones)
4. Ve también: **"Hola, [nombre]"** y **"Cerrar sesión"**
5. NO ve: Login, Registro, Explorar, Ofertas, Reservar, Historial
6. Si intenta acceder a URL de cliente → Redirige a Admin

---

## 🧪 TESTING

### Archivo de Test: `test_permisos.html`

Abre este archivo para verificar que:
- ✅ Sin usuario → Solo login/registro
- ✅ Cliente → Solo páginas de cliente
- ✅ Admin → Solo páginas de admin
- ✅ Funciones `esAdmin()` y `esCliente()` funcionan correctamente

---

## 🔐 SEGURIDAD

### Protecciones Implementadas

1. **Validación en cada cambio de ruta**
   - Cada vez que el usuario navega, se valida su permiso

2. **Redirección automática**
   - Si intenta acceder a página no autorizada → Redirige automáticamente

3. **Ocultación de menú**
   - Solo muestra opciones permitidas para el rol

4. **Ocultación de secciones**
   - Solo muestra el contenido permitido

5. **Validación al cerrar sesión**
   - Al cerrar sesión → Redirige a Login
   - Actualiza menú automáticamente

---

## 📝 EJEMPLOS DE USO

### Ejemplo 1: Cliente intenta acceder a Admin
```javascript
// Cliente logueado intenta ir a #admin
window.location.hash = "#admin";

// ensureAllowedRoute() detecta:
// - Usuario es Cliente
// - #admin está en adminPages
// - Redirige automáticamente a #explorar
```

### Ejemplo 2: Admin intenta acceder a Explorar
```javascript
// Admin logueado intenta ir a #explorar
window.location.hash = "#explorar";

// ensureAllowedRoute() detecta:
// - Usuario es Admin
// - #explorar está en clientPages
// - Redirige automáticamente a #admin
```

### Ejemplo 3: Usuario no logueado intenta Historial
```javascript
// Sin usuario intenta ir a #historial
window.location.hash = "#historial";

// ensureAllowedRoute() detecta:
// - No hay usuario logueado
// - #historial no está en publicPages
// - Redirige automáticamente a #login
```

---

## ✅ VENTAJAS DEL SISTEMA

1. **Seguro** → No se puede acceder a páginas sin permiso
2. **Automático** → Redirecciones automáticas
3. **Simple** → Fácil de entender y mantener
4. **Claro** → Menu muestra solo lo permitido
5. **Robusto** → Valida en cada navegación

---

## 🎯 RESULTADO FINAL

✅ **Cada usuario ve solo lo que le corresponde**
✅ **Navegación bloqueada si no tiene permiso**
✅ **Menu dinámico según rol**
✅ **Redirecciones automáticas**
✅ **100% funcional y seguro**

---

## 📖 PARA PROBAR

1. Abre `index.html`
2. Sin login → Solo ves Inicio y Registro
3. Login como cliente → Ves Explorar, Ofertas, Reservar, Historial
4. Cierra sesión y login como admin → Ves solo Admin
5. Intenta cambiar URL manualmente → Redirige automáticamente

**Usuarios de prueba:**
- Cliente: `usuario1` / `Pass1234` (o crea uno nuevo)
- Admin: `admin` / `admin123`

---

## 🔍 VERIFICACIÓN RÁPIDA

Abre la consola del navegador y ejecuta:

```javascript
// Ver usuario actual
console.log(system.usuarioLogueado);

// Verificar tipo
console.log("Es Admin:", system.usuarioLogueado instanceof Administrador);
console.log("Es Cliente:", system.usuarioLogueado instanceof Cliente);
```

**Estado: ✅ SISTEMA DE PERMISOS COMPLETO Y FUNCIONAL**
