// Sistema de navegación simple con eventos y clases CSS

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.add("d-none");
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
    seccion.classList.remove("d-none");
  }

  // Limpiar hash de la URL si existe
  if (window.location.hash) {
    history.replaceState(null, null, " ");
  }

  // Ejecutar función de render si existe
  renderizarSeccion(idSeccion);
}

function tienePermiso(idSeccion) {
  const user = sistema.usuarioLogueado;
  const adminPages = ["agregar", "admin", "procesar", "ganancias"];
  const clientPages = ["explorar", "oferta", "reservar", "historial"];
  const publicPages = ["login", "registro"];

  // Sin usuario: solo login y registro
  if (!user) {
    return publicPages.indexOf(idSeccion) !== -1;
  }

  // Con usuario: no puede ver login/registro
  if (publicPages.indexOf(idSeccion) !== -1) {
    return false;
  }

  // Admin: solo páginas de admin
  if (esAdmin(user)) {
    return adminPages.indexOf(idSeccion) !== -1;
  }

  // Cliente: solo páginas de cliente
  if (esCliente(user)) {
    return clientPages.indexOf(idSeccion) !== -1;
  }

  return false;
}

function renderizarSeccion(idSeccion) {
  // Ejecutar funciones de render según la sección
  if (idSeccion === "explorar") {
    mostrarTablaExplorar();
  } else if (idSeccion === "reservar") {
    renderReservar();
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
    botones[i].addEventListener("click", function (e) {
      e.preventDefault();
      let idBtn = this.getAttribute("id");
      let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
      mostrarSeccion(idSeccion);
    });
  }
  // Mostrar login por defecto
  mostrarSeccion("login");
}
