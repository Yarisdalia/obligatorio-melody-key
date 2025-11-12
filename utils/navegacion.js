// Sistema de navegación simple con eventos y clases CSS

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  console.log("Ocultando secciones:", secciones.length);
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].classList.add("d-none");
    console.log("  Oculté:", secciones[i].id);
  }
}

function mostrarSeccion(idSeccion) {
  console.log("mostrarSeccion llamado con:", idSeccion);

  // Validar permisos antes de mostrar
  if (!tienePermiso(idSeccion)) {
    console.log("  Sin permiso para:", idSeccion);
    // Redirigir según el tipo de usuario
    if (!system.usuarioLogueado) {
      idSeccion = "login";
    } else if (esAdmin(system.usuarioLogueado)) {
      idSeccion = "admin";
    } else {
      idSeccion = "explorar";
    }
    console.log("  Redirigido a:", idSeccion);
  }

  ocultarSecciones();
  let seccion = document.querySelector("#" + idSeccion);
  console.log("  Sección encontrada:", seccion ? seccion.id : "NO ENCONTRADA");
  if (seccion) {
    seccion.classList.remove("d-none");
    console.log("  Mostré:", seccion.id);
  }

  // Limpiar hash de la URL si existe
  if (window.location.hash) {
    history.replaceState(null, null, " ");
  }

  // Ejecutar función de render si existe
  renderizarSeccion(idSeccion);
}

function tienePermiso(idSeccion) {
  const user = system.usuarioLogueado;
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
    renderExplorar();
  } else if (idSeccion === "reservar") {
    renderReservar();
  } else if (idSeccion === "historial") {
    renderHistorial();
  } else if (idSeccion === "oferta") {
    renderOfertas();
  } else if (idSeccion === "agregar") {
    wireAdminAgregar();
  } else if (idSeccion === "admin") {
    renderAdminConciertos();
  } else if (idSeccion === "procesar") {
    renderProcesarReservas();
  } else if (idSeccion === "ganancias") {
    renderGanancias();
  }
}

function iniciarNavegacion() {
  let botones = document.querySelectorAll(".boton");
  console.log("Botones encontrados:", botones.length);

  for (let i = 0; i < botones.length; i++) {
    console.log("  Botón", i, ":", botones[i].id);
    botones[i].addEventListener("click", function (e) {
      e.preventDefault();
      let idBtn = this.getAttribute("id");
      let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
      console.log("    ID Sección:", idSeccion);
      mostrarSeccion(idSeccion);
    });
  }
  // Mostrar login por defecto
  mostrarSeccion("login");
}
