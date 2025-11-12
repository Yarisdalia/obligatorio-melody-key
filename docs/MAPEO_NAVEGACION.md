# Mapeo de Navegación - Botones → Secciones

## Sistema de Navegación

El sistema convierte automáticamente IDs de botones a IDs de secciones:
- Formato botón: `btnXxxxx` (ejemplo: `btnLogin`)
- Formato sección: `xxxxx` (ejemplo: `login`)
- Conversión: quita "btn" y pone en minúscula la primera letra

```javascript
// En navegacion.js
let idBtn = "btnLogin";
let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
// Resultado: "login"
```

## Mapeo Completo

### ✅ BOTONES DE NAVEGACIÓN

| ID del Botón    | Texto       | ID Sección  | Descripción                    |
|-----------------|-------------|-------------|--------------------------------|
| `btnLogin`      | Inicio      | `login`     | Pantalla de inicio de sesión   |
| `btnRegistro`   | Registro    | `registro`  | Formulario de registro         |
| `btnExplorar`   | Explorar    | `explorar`  | Explorar conciertos (cliente)  |
| `btnOferta`     | Ofertas     | `oferta`    | Ver ofertas (cliente)          |
| `btnReservar`   | Reservar    | `reservar`  | Hacer reserva (cliente)        |
| `btnHistorial`  | Historial   | `historial` | Ver historial (cliente)        |
| `btnAgregar`    | Agregar...  | `agregar`   | Agregar concierto (admin)      |
| `btnAdmin`      | Administrar | `admin`     | Admin conciertos (admin)       |
| `btnProcesar`   | Procesar... | `procesar`  | Procesar reservas (admin)      |
| `btnGanancias`  | Informe...  | `ganancias` | Informe ganancias (admin)      |

### 🔘 BOTONES DE ACCIÓN (No navegan)

| ID del Botón          | Función                           |
|-----------------------|-----------------------------------|
| `btnIniciarSesion`    | Submit del formulario de login    |
| `btnCerrarSesion`     | Cerrar sesión (logout)            |
| `btnRegistrar`        | Submit del formulario de registro |
| `btnAgregarConcierto` | Submit agregar concierto          |
| `btnSolicitaReserva`  | Submit solicitar reserva          |
| `btnMostrarTabla`     | Mostrar tabla de ganancias        |

## Secciones HTML

Todas las secciones tienen:
- Clase: `.seccion`
- Atributo: `data-section`
- Estado inicial: `.d-none` (ocultas) excepto `#login`

```html
<section id="login" class="seccion" data-section>
  <!-- Contenido de login (visible por defecto) -->
</section>

<section id="registro" class="seccion d-none" data-section>
  <!-- Contenido de registro (oculta) -->
</section>

<!-- ... más secciones ... -->
```

## Sistema de Permisos

### Páginas Públicas
- `login` - Sin usuario logueado
- `registro` - Sin usuario logueado

### Páginas de Cliente
- `explorar` - Ver conciertos disponibles
- `oferta` - Ver ofertas personalizadas
- `reservar` - Hacer reservas
- `historial` - Ver historial de reservas

### Páginas de Admin
- `agregar` - Agregar nuevos conciertos
- `admin` - Administrar conciertos existentes
- `procesar` - Procesar reservas pendientes
- `ganancias` - Ver informe de ganancias

## Flujo de Navegación

1. Usuario hace click en botón con clase `.boton`
2. Se captura el ID del botón (ejemplo: `btnExplorar`)
3. Se convierte a ID de sección (ejemplo: `explorar`)
4. Se verifica permiso con `tienePermiso()`
5. Si no tiene permiso, se redirige a su página por defecto
6. Se ocultan todas las secciones con `ocultarSecciones()`
7. Se muestra la sección correspondiente quitando `.d-none`
8. Se ejecuta la función de renderizado si existe

## Funciones de Renderizado

Cada sección puede tener una función que se ejecuta al mostrarse:

| Sección    | Función                     |
|------------|-----------------------------|
| explorar   | `renderExplorar()`          |
| oferta     | `renderOfertas()`           |
| reservar   | `renderReservar()`          |
| historial  | `renderHistorial()`         |
| agregar    | `agregarConcierto()`        |
| admin      | `renderAdminConciertos()`   |
| procesar   | `renderProcesarReservas()`  |
| ganancias  | `renderGanancias()`         |

## Verificación

Para verificar que todo funciona:

1. Abre la consola del navegador (F12)
2. Deberías ver: `=== INICIANDO NAVEGACIÓN ===`
3. Verifica: `Botones encontrados: 10`
4. Verifica: `Ocultando secciones: 10`
5. Haz click en cualquier botón del navbar
6. Deberías ver: `>>> Click en botón: btnXXX`
7. Deberías ver: `Mostré: XXX`
8. La pantalla debe cambiar

## Notas Importantes

- ✅ Un solo sistema de navegación (no hay `window.pages`)
- ✅ No usa hash en la URL (`#registro`)
- ✅ Todo se maneja con clases CSS (`.d-none`)
- ✅ Simple y fácil de entender para estudiantes
- ✅ Cada usuario solo ve sus secciones permitidas
