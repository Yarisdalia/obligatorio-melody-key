// Sistema de navegación con eventos y clases CSS

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
}

function mostrarSeccion(idSeccion) {
  // Validar permisos antes de mostrar
  if (!tienePermiso(idSeccion)) {
    // Redirigir según el tipo de usuario
    if (!sistema.usuarioLogueado) {
      idSeccion = "login";
    } else if (esAdmin(sistema.usuarioLogueado)) {
      idSeccion = "admin";
    } else {
      idSeccion = "explorar";
    }
    console.log("  Redirigido a:", idSeccion);
  }

  ocultarSecciones();
  let seccion = document.querySelector("#" + idSeccion);
  if (seccion) {
    seccion.style.display = "block";
  }

  // Ejecutar función de render si existe
  cargarTablasSeccion(idSeccion);
}

function tienePermiso(idSeccion) {
  const usuarioLogueado = sistema.usuarioLogueado;
  const adminPages = ["agregar", "admin", "procesar", "ganancias"];
  const clientPages = ["explorar", "oferta", "reservar", "historial"];
  const publicPages = ["login", "registro"];


  // Sin estar logeado: solo login y registro
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
  // Mostrar login por defecto
  mostrarSeccion("login");
}
