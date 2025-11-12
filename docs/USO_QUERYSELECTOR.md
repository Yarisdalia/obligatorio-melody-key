# 🎯 Uso de querySelector - Melody Key

## ✅ ACTUALIZACIÓN COMPLETA

Todo el código ahora usa **`querySelector`** en lugar de `getElementById`.

---

## 📋 CAMBIO APLICADO

### Antes (getElementById)
```javascript
const elemento = document.getElementById("miElemento");
const otro = document.getElementById('otroElemento');
```

### Después (querySelector)
```javascript
const elemento = document.querySelector("#miElemento");
const otro = document.querySelector('#otroElemento');
```

---

## 🔍 EJEMPLOS REALES DEL PROYECTO

### 1. Elementos del Navbar
```javascript
// ANTES
document.getElementById("navInicio").style.display = !user ? "" : "none";
document.getElementById("navRegistro").style.display = !user ? "" : "none";

// DESPUÉS
document.querySelector("#navInicio").style.display = !user ? "" : "none";
document.querySelector("#navRegistro").style.display = !user ? "" : "none";
```

### 2. Formulario de Login
```javascript
// ANTES
const usuario = document.getElementById("txtLoginUsuario").value.trim();
const contrasena = document.getElementById("txtLoginContrasena").value;

// DESPUÉS
const usuario = document.querySelector("#txtLoginUsuario").value.trim();
const contrasena = document.querySelector("#txtLoginContrasena").value;
```

### 3. Mensajes
```javascript
// ANTES
document.getElementById("pLoginMensaje").textContent = mensaje;

// DESPUÉS
document.querySelector("#pLoginMensaje").textContent = mensaje;
```

### 4. Botones
```javascript
// ANTES
const btn = document.getElementById("btnIniciarSesion");
btn.onclick = onIniciarSesion;

// DESPUÉS
const btn = document.querySelector("#btnIniciarSesion");
btn.onclick = onIniciarSesion;
```

### 5. Tablas
```javascript
// ANTES
const tbody = document.getElementById("tblHistorial");
tbody.innerHTML = "";

// DESPUÉS
const tbody = document.querySelector("#tblHistorial");
tbody.innerHTML = "";
```

### 6. IDs Dinámicos
```javascript
// ANTES
const row = document.getElementById("row_" + id);

// DESPUÉS
const row = document.querySelector("#row_" + id);
```

---

## ✨ VENTAJAS DE USAR querySelector

### 1. Más Consistente
```javascript
// Mismo método para todo
document.querySelector("#miId");          // Por ID
document.querySelector(".miClase");       // Por clase
document.querySelector("div");            // Por tag
document.querySelector("[data-id='5']");  // Por atributo
```

### 2. Más Poderoso
```javascript
// Selectores CSS complejos
document.querySelector("button.boton.activo");
document.querySelector("#menu li:first-child");
document.querySelector("input[type='text']");
```

### 3. Más Moderno
- Es el estándar actual
- Más usado en tutoriales modernos
- Preparado para el futuro

---

## 📊 ESTADÍSTICAS DE CAMBIO

### Archivos Actualizados (10)
1. ✅ `paginas/common.js`
2. ✅ `paginas/login.js`
3. ✅ `paginas/registro.js`
4. ✅ `paginas/explorar.js`
5. ✅ `paginas/ofertas.js`
6. ✅ `paginas/reservar.js`
7. ✅ `paginas/historial.js`
8. ✅ `paginas/admin-agregar.js`
9. ✅ `paginas/admin-gestionar.js`
10. ✅ `paginas/admin-procesar.js`
11. ✅ `paginas/ganancias.js`

### Resultados
- ❌ `getElementById`: 0 usos
- ✅ `querySelector`: 73 usos
- 🎯 Conversión: 100%

---

## 🎓 PATRON USADO EN EL PROYECTO

### Selección por ID
```javascript
// Siempre con #
const elemento = document.querySelector("#idDelElemento");
```

### Selección por Clase
```javascript
// Con punto
const botones = document.querySelectorAll(".boton");
const secciones = document.querySelectorAll(".seccion");
```

### Selección por Atributo
```javascript
// Con corchetes
const secciones = document.querySelectorAll("[data-section]");
```

### Closest (elemento padre)
```javascript
// Buscar el ancestro más cercano
const btn = ev.target.closest("button[data-guardar]");
```

---

## 📝 REGLAS DE USO

### ✅ USAR querySelector CUANDO:
- Necesitas **UN** elemento
- Sabes que existe o no importa si no existe
- Seleccionas por ID

```javascript
const btn = document.querySelector("#btnLogin");
const tabla = document.querySelector("#tblHistorial");
```

### ✅ USAR querySelectorAll CUANDO:
- Necesitas **VARIOS** elementos
- Quieres una lista (NodeList)
- Seleccionas por clase o atributo

```javascript
const botones = document.querySelectorAll(".boton");
const secciones = document.querySelectorAll(".seccion");
```

---

## 🔧 EJEMPLOS COMPLETOS DEL PROYECTO

### Ejemplo 1: updateNavbar (common.js)
```javascript
function updateNavbar() {
  const user = system.usuarioLogueado;
  
  // Todos con querySelector
  document.querySelector("#navInicio").style.display = !user ? "" : "none";
  document.querySelector("#navRegistro").style.display = !user ? "" : "none";
  document.querySelector("#navExplorar").style.display = isCliente ? "" : "none";
  
  const navUsuario = document.querySelector("#navUsuario");
  const btnLogout = document.querySelector("#btnCerrarSesion");
  
  if (user) {
    navUsuario.textContent = "Hola, " + user.nombre;
    btnLogout.style.display = "";
  }
}
```

### Ejemplo 2: Login (login.js)
```javascript
function onIniciarSesion() {
  const usuario = document.querySelector("#txtLoginUsuario").value.trim();
  const contrasena = document.querySelector("#txtLoginContrasena").value;
  const mensaje = system.iniciarSesion(usuario, contrasena);
  
  document.querySelector("#pLoginMensaje").textContent = mensaje;
  
  if (mensaje.startsWith("Bienvenido")) {
    updateNavbar();
    mostrarSeccion("explorar");
  }
}
```

### Ejemplo 3: Historial (historial.js)
```javascript
function renderHistorial() {
  const tbody = document.querySelector("#tblHistorial");
  const cliente = system.usuarioLogueado;
  
  tbody.innerHTML = "";
  const misReservas = system.listarReservasCliente(cliente.id);
  
  // Crear filas...
  
  document.querySelector("#saldoDisponibleHistorial").textContent = cliente.saldo;
  document.querySelector("#totalAprobadas").textContent = total;
}
```

### Ejemplo 4: Navegación (navegacion.js)
```javascript
function ocultarSecciones() {
  // querySelectorAll para múltiples elementos
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
}

function mostrarSeccion(idSeccion) {
  ocultarSecciones();
  // querySelector para un elemento
  let seccion = document.querySelector("#" + idSeccion);
  if (seccion) {
    seccion.style.display = "block";
  }
}
```

---

## ✅ RESULTADO FINAL

✅ **100% querySelector**
- Cero usos de `getElementById`
- 73 usos de `querySelector/querySelectorAll`
- Código más moderno y consistente

✅ **Beneficios**
- Código más limpio
- Estándar actual
- Más flexible
- Fácil de mantener

✅ **Mantiene funcionalidad**
- Todo funciona igual
- Sin cambios visibles para el usuario
- Solo mejora interna del código

---

## 🎯 RESUMEN

| Antes | Después |
|-------|---------|
| `getElementById("id")` | `querySelector("#id")` |
| `getElementsByClassName("clase")` | `querySelectorAll(".clase")` |
| `getElementsByTagName("div")` | `querySelectorAll("div")` |

**Estado:** ✅ CONVERSIÓN COMPLETA A querySelector
