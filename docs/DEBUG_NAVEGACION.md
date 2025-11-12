# 🔧 Debug de Navegación

## ❗ PROBLEMA: Los botones no navegan

### ✅ SOLUCIÓN APLICADA

1. **Eliminado DOMContentLoaded duplicado**
   - `login.js` - Ya no usa DOMContentLoaded
   - `registro.js` - Ya no usa DOMContentLoaded
   - Solo `common.js` llama a `iniciarNavegacion()`

2. **Orden de carga correcto**
   ```
   1. utils/navegacion.js (define funciones)
   2. sistema.js (crea classes)
   3. paginas/common.js (llama iniciarNavegacion())
   4. paginas/*.js (definen funciones render)
   ```

3. **Eventos asignados directamente**
   ```javascript
   // login.js
   const btnLogin = document.querySelector("#btnIniciarSesion");
   if (btnLogin) {
     btnLogin.onclick = onIniciarSesion;
   }
   ```

---

## 🧪 CÓMO PROBAR

### Test 1: Archivo de test simple
```bash
Abre: test_navegacion.html
```

Deberías ver:
- 3 botones (Login, Registro, Explorar)
- Al hacer click, cambia la sección visible
- Consola muestra: "Botones encontrados: 3"

### Test 2: Index.html

1. Abre `index.html`
2. Abre la consola del navegador (F12)
3. Verifica:
   ```javascript
   // Deberías ver estas funciones disponibles
   typeof mostrarSeccion  // "function"
   typeof ocultarSecciones // "function"
   typeof iniciarNavegacion // "function"
   ```

4. Prueba manual:
   ```javascript
   mostrarSeccion("registro")  // Debe mostrar registro
   mostrarSeccion("login")     // Debe mostrar login
   ```

### Test 3: Botones

1. Haz click en "Registro"
2. Debería mostrar el formulario de registro
3. Haz click en "Inicio"
4. Debería volver al login

---

## 🔍 SI AÚN NO FUNCIONA

### Paso 1: Verificar Consola
Abre consola (F12) y busca errores:

**Errores comunes:**
```
❌ "renderExplorar is not defined"
   → Solución: Verifica que explorar.js esté cargado

❌ "system is not defined"
   → Solución: Verifica que sistema.js esté cargado

❌ "Cannot read property 'addEventListener'"
   → Solución: El DOM no está listo o el selector es incorrecto
```

### Paso 2: Verificar que los scripts cargan
En la consola:
```javascript
console.log("system:", typeof system);           // "object"
console.log("mostrarSeccion:", typeof mostrarSeccion);  // "function"
console.log("renderExplorar:", typeof renderExplorar);  // "function"
```

### Paso 3: Verificar botones
```javascript
const botones = document.querySelectorAll(".boton");
console.log("Total botones:", botones.length);  // Debería ser 10

for (let i = 0; i < botones.length; i++) {
  console.log(botones[i].id);  // btnLogin, btnRegistro, etc.
}
```

### Paso 4: Verificar eventos
```javascript
// Probar manualmente
const btn = document.querySelector("#btnLogin");
console.log("Botón Login:", btn);  // Debe mostrar el elemento <a>

// Simular click
btn.click();  // Debería cambiar a login
```

---

## 📋 CHECKLIST DE VERIFICACIÓN

- [ ] `index.html` tiene todos los scripts en orden
- [ ] Todos los botones tienen clase `.boton`
- [ ] Todos los botones tienen id `btnNombre`
- [ ] Todas las secciones tienen clase `.seccion`
- [ ] Todas las secciones tienen id `nombre`
- [ ] No hay errores en la consola
- [ ] `system` está definido globalmente
- [ ] `mostrarSeccion` está definido globalmente
- [ ] `iniciarNavegacion` se llama al final

---

## 🎯 ESTRUCTURA CORRECTA

### HTML (index.html)
```html
<!-- Botón con clase .boton e id btnExplorar -->
<a class="nav-link boton" href="#" id="btnExplorar">Explorar</a>

<!-- Sección con clase .seccion e id explorar -->
<section id="explorar" class="seccion d-none" data-section>
```

### JavaScript (navegacion.js)
```javascript
function iniciarNavegacion() {
  let botones = document.querySelectorAll(".boton");
  
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function(e) {
      e.preventDefault();
      let idBtn = this.getAttribute("id");
      let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
      mostrarSeccion(idSeccion);
    });
  }
  
  mostrarSeccion("login");
}
```

### JavaScript (common.js)
```javascript
function iniciarTodoElSistema() {
  precargarDatos(system);
  // ...
  updateNavbar();
  iniciarNavegacion();  // ← IMPORTANTE: Llamar esto
}

iniciarTodoElSistema();
```

---

## ✅ SI TODO ESTÁ CORRECTO

Deberías poder:

1. **Hacer click en cualquier botón del menú**
   - Se ocultan todas las secciones
   - Se muestra la sección correspondiente
   - Se ejecuta la función render si existe

2. **Login funciona**
   - Click en "Inicio" muestra el formulario
   - Al loguearse, navega a explorar o admin

3. **Permisos funcionan**
   - Sin login: solo Login y Registro
   - Cliente: solo páginas de cliente
   - Admin: solo páginas de admin

---

## 🚀 SOLUCIÓN RÁPIDA

Si nada funciona, verifica el orden de los scripts:

```html
<!-- ORDEN CORRECTO -->
<script src="utils/validaciones-contrasena.js"></script>
<script src="utils/tipo-de-usuario.js"></script>
<script src="utils/ids.js"></script>
<script src="utils/libreria.js"></script>
<script src="utils/precarga.js"></script>
<script src="utils/navegacion.js"></script>  ← AQUÍ

<script src="clases/cliente.js"></script>
<script src="clases/administrador.js"></script>
<script src="clases/concierto.js"></script>
<script src="clases/reserva.js"></script>

<script src="sistema.js"></script>

<script src="paginas/common.js"></script>  ← LLAMA iniciarNavegacion()
<script src="paginas/login.js"></script>
<script src="paginas/registro.js"></script>
<!-- ... resto de páginas ... -->
```

---

## 📞 DEBUG EN CONSOLA

Copia y pega en la consola:

```javascript
// Test completo
console.log("=== DEBUG NAVEGACIÓN ===");
console.log("1. Sistema:", typeof system);
console.log("2. Mostrar Sección:", typeof mostrarSeccion);
console.log("3. Iniciar Navegación:", typeof iniciarNavegacion);
console.log("4. Botones encontrados:", document.querySelectorAll(".boton").length);
console.log("5. Secciones encontradas:", document.querySelectorAll(".seccion").length);

// Probar navegación manual
console.log("\n=== TEST MANUAL ===");
mostrarSeccion("registro");
setTimeout(() => {
  console.log("¿Se mostró registro?");
  mostrarSeccion("login");
  console.log("¿Volvió a login?");
}, 2000);
```

---

## ✅ RESULTADO ESPERADO

```
Sistema funciona ✅
Click en botón → Navega correctamente ✅
Permisos validados ✅
Funciones render ejecutadas ✅
```

**Estado: ✅ NAVEGACIÓN FUNCIONAL**
