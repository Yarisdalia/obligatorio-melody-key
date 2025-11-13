// Sistema de navegación: Eventos, clases...

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
}

// Mostrar según tipo de usuario
function mostrarSeccion(idSeccion) {
  // Validar permisos antes de mostrar
  if (!tienePermiso(idSeccion)) {
    // Si el usuario no esta logueado...
    if (!sistema.usuarioLogueado) {
      idSeccion = "login";
      //Si el usuario es administrador
    } else if (esAdmin(sistema.usuarioLogueado)) {
      idSeccion = "admin";
      //Si no es administrador.. es cliente.
    } else {
      idSeccion = "explorar";
    }
  }

  ocultarSecciones();
  let seccion = document.querySelector("#" + idSeccion);
  if (seccion) {
    seccion.style.display = "block";
  }

  // cargar tablas de la seccion
  cargarTablasSeccion(idSeccion);
}

function tienePermiso(idSeccion) {
  const usuarioLogueado = sistema.usuarioLogueado;
  const adminPages = ["agregar", "admin", "procesar", "ganancias"];
  const clientPages = ["explorar", "oferta", "reservar", "historial"];
  const publicPages = ["login", "registro"];


  // No logeado: login y registro
  if (!usuarioLogueado) {
    return estaEnElArrayElString(publicPages, idSeccion);
  }
  // Con usuario logeados: no puede ver login/registro
  if (estaEnElArrayElString(publicPages, idSeccion)) {
    return false;
  }

  // Admin: solo páginas de admin
  if (esAdmin(usuarioLogueado)) {
    return estaEnElArrayElString(adminPages, idSeccion);
  }

  // Cliente: solo páginas de cliente
  if (esCliente(usuarioLogueado)) {
    return estaEnElArrayElString(clientPages, idSeccion);
  }

  return false;
}

//Cargar tablas automáticamente al abrir sección
function cargarTablasSeccion(idSeccion) {
  // Ejecutar funciones de render según la sección
  if (idSeccion === "explorar") {
    mostrarTablaExplorar();
  } else if (idSeccion === "historial") {
    mostrarTablaHistorial();
  } else if (idSeccion === "oferta") {
    renderOfertas();
  } else if (idSeccion === "admin") {
    mostrarTablaAdministrarConciertos();
  } else if (idSeccion === "procesar") {
    mostarTablaDeGestionarReservas();
  } else if (idSeccion === "ganancias") {
    mostraTablaGanancias();
  }
}

//Se ejecuta al empezar...
//Lee los botones, preparandolos para irAVista cuando se haga click
function iniciarNavegacion() {
  let botones = document.querySelectorAll(".boton");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", irAVista);
    function irAVista() {
      let idBtn = this.getAttribute("id");
      let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
      mostrarSeccion(idSeccion);
    }
  }
  // Forzamos mostrar login por defecto, es la primera página visible
  mostrarSeccion("login");
}
