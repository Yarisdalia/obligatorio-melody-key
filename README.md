# 🎵 Melody Key - Sistema de Gestión de Conciertos

Sistema web para gestión de conciertos y reservas de entradas.

---

## 🚀 Inicio Rápido

1. **Abrir** `index.html` en un navegador
2. **Usuarios de prueba:**
   - Cliente: `usuario1` / `Pass1234`
   - Admin: `admin` / `admin123`

---

## 📚 Documentación

Toda la documentación está en la carpeta **[`/docs`](docs/)**

### Documentos principales:
- 📖 **[LEEME_PRIMERO.txt](docs/LEEME_PRIMERO.txt)** - Resumen ejecutivo
- 📘 **[GUIA_COMPLETA.md](docs/GUIA_COMPLETA.md)** - Guía completa
- ✅ **[ANALISIS_CUMPLIMIENTO.md](docs/ANALISIS_CUMPLIMIENTO.md)** - Cumplimiento 100%

Ver **[docs/README.md](docs/README.md)** para índice completo.

---

## ✨ Características

### Para Clientes
- 🎵 Explorar conciertos disponibles
- 💰 Ver ofertas especiales
- 🎫 Reservar entradas
- 📋 Ver historial de reservas
- 🎁 Descuento 10% en 4+ entradas

### Para Administradores
- ➕ Agregar nuevos conciertos
- ⚙️ Administrar conciertos
- ✅ Procesar reservas
- 💵 Ver informe de ganancias

---

## 🎯 Funcionalidades (10/10 ✅)

| # | Funcionalidad | Estado |
|---|---------------|--------|
| F01 | Registro de Cliente | ✅ |
| F02 | Inicio de Sesión | ✅ |
| F03 | Explorar Conciertos | ✅ |
| F04 | Reservar Entradas | ✅ |
| F05 | Historial de Reservas | ✅ |
| F06 | Conciertos en Oferta | ✅ |
| F07 | Procesar Reservas | ✅ |
| F08 | Agregar Conciertos | ✅ |
| F09 | Administrar Conciertos | ✅ |
| F10 | Informe de Ganancias | ✅ |

---

## 📁 Estructura del Proyecto

```
obligatorio-melody-key/
│
├── index.html                  # Página principal
├── sistema.js                  # Lógica del sistema
├── styles.css                  # Estilos
│
├── clases/                     # Clases del dominio
│   ├── cliente.js
│   ├── administrador.js
│   ├── concierto.js
│   └── reserva.js
│
├── utils/                      # Funciones auxiliares
│   ├── libreria.js
│   ├── ids.js
│   ├── validaciones-contrasena.js
│   ├── tipo-de-usuario.js
│   └── precarga.js
│
├── paginas/                    # Controladores de UI
│   ├── common.js              # Variable global + routing
│   ├── login.js
│   ├── registro.js
│   ├── explorar.js
│   ├── ofertas.js
│   ├── reservar.js
│   ├── historial.js
│   ├── admin-agregar.js
│   ├── admin-gestionar.js
│   ├── admin-procesar.js
│   └── ganancias.js
│
├── Img/                        # Imágenes
│
├── docs/                       # 📚 Documentación completa
│   ├── README.md              # Índice de documentación
│   ├── LEEME_PRIMERO.txt
│   ├── GUIA_COMPLETA.md
│   ├── ANALISIS_CUMPLIMIENTO.md
│   ├── RESUMEN_FINAL.md
│   ├── CAMBIOS_APLICADOS.md
│   ├── SIMPLIFICACION_SISTEMA.md
│   ├── SISTEMA_PERMISOS.md
│   └── RESUMEN_PERMISOS.txt
│
├── test_simple.html            # Test de funcionalidades
└── test_permisos.html          # Test de permisos
```

---

## 🔒 Sistema de Permisos

Cada usuario ve solo lo que le corresponde:

- **Sin login:** Login, Registro
- **Cliente:** Explorar, Ofertas, Reservar, Historial
- **Admin:** Agregar, Administrar, Procesar, Ganancias

Ver **[SISTEMA_PERMISOS.md](docs/SISTEMA_PERMISOS.md)** para detalles.

---

## 🛠️ Tecnologías

- HTML5
- CSS3 (Bootstrap 5.3.8)
- JavaScript (ES5/ES6 básico)
- POO básica

---

## 📊 Estadísticas

- **Líneas de código:** 1,216
- **Archivos JavaScript:** 19
- **Clases:** 4
- **Funcionalidades:** 10/10 ✅
- **Cumplimiento:** 100% ✅
- **Documentación:** 8 archivos (~65 KB)

---

## 🎓 Código Educativo

El código está diseñado para ser:
- ✅ **Simple** - Fácil de leer y entender
- ✅ **Didáctico** - Apropiado para estudiantes
- ✅ **Limpio** - Sin complejidad innecesaria
- ✅ **Directo** - Lógica visible

Variable global única: `var system = new Sistema();`

---

## 🧪 Testing

### Test Manual
1. Abre `index.html`
2. Prueba las funcionalidades

### Test Automático
- `test_simple.html` - Test de funcionalidades
- `test_permisos.html` - Test de permisos

---

## 📖 Documentación Detallada

La carpeta **[`/docs`](docs/)** contiene:

1. **LEEME_PRIMERO.txt** - Resumen ejecutivo (9.7 KB)
2. **GUIA_COMPLETA.md** - Guía completa (8.2 KB)
3. **ANALISIS_CUMPLIMIENTO.md** - Análisis vs requisitos (6.5 KB)
4. **RESUMEN_FINAL.md** - Estado completo (8.1 KB)
5. **CAMBIOS_APLICADOS.md** - Correcciones aplicadas (9.1 KB)
6. **SIMPLIFICACION_SISTEMA.md** - Sistema simplificado (6.4 KB)
7. **SISTEMA_PERMISOS.md** - Documentación de permisos (8.9 KB)
8. **RESUMEN_PERMISOS.txt** - Resumen de permisos (7.8 KB)

---

## ✅ Estado del Proyecto

- ✅ **Completo** - Todas las funcionalidades implementadas
- ✅ **Correcto** - Cumple 100% con requisitos
- ✅ **Simple** - Código didáctico
- ✅ **Probado** - Validaciones según especificación
- ✅ **Documentado** - Documentación completa

---

## 📝 Licencia

Proyecto educativo - Universidad ORT Uruguay

---

## 👥 Autores

Proyecto de Programación 1 - Analista Programador

---

**Estado:** ✅ LISTO PARA ENTREGAR

**Última actualización:** 2025-11-12
