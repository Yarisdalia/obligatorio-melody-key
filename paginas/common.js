// Variable global del sistema
var system = new Sistema();

function updateNavbar() {
  const user = system.usuarioLogueado;
  const isAdmin = esAdmin(user);
  const isCliente = esCliente(user);

  // Mostrar/ocultar elementos del nav según rol
  document.getElementById("navRegistro").style.display = !user ? "" : "none";
  document.getElementById("navExplorar").style.display = isCliente ? "" : "none";
  document.getElementById("navOfertas").style.display = isCliente ? "" : "none";
  document.getElementById("navReservar").style.display = isCliente ? "" : "none";
  document.getElementById("navHistorial").style.display = isCliente ? "" : "none";
  document.getElementById("navAdmin").style.display = isAdmin ? "" : "none";

  // Usuario y botón cerrar sesión
  const navUsuario = document.getElementById("navUsuario");
  const btnLogout = document.getElementById("btnCerrarSesion");

  if (user) {
    navUsuario.textContent = "Hola, " + user.nombre;
    btnLogout.style.display = "";
  } else {
    navUsuario.textContent = "";
    btnLogout.style.display = "none";
  }
}

function ensureAllowedRoute() {
  const user = system.usuarioLogueado;
  const hash = window.location.hash || "#login";
  const adminPages = ["#agregar", "#admin", "#procesar", "#ganancias"];
  const clientPages = ["#explorar", "#oferta", "#reservar", "#historial"];
  // Si no logueado: solo login y registro
  if (!user) {
    if (hash !== "#login" && hash !== "#registro") {
      window.location.hash = "#login";
      return false;
    }
    return true;
  }
  // Si admin: bloquear pantallas de cliente
  if (esAdmin(user) && clientPages.indexOf(hash) !== -1) {
    window.location.hash = "#admin";
    return false;
  }
  // Si cliente: bloquear pantallas de admin
  if (esCliente(user) && adminPages.indexOf(hash) !== -1) {
    window.location.hash = "#explorar";
    return false;
  }
  return true;
}

function route() {
  const hash = window.location.hash || "#login";
  if (!ensureAllowedRoute()) return;
  updateNavbar();
  if (hash === "#explorar") {
    renderExplorar();
  } else if (hash === "#reservar") {
    renderReservar();
  } else if (hash === "#historial") {
    renderHistorial();
  } else if (hash === "#oferta") {
    renderOfertas();
  } else if (hash === "#agregar") {
    wireAdminAgregar();
  } else if (hash === "#admin") {
    renderAdminConciertos();
  } else if (hash === "#procesar") {
    renderProcesarReservas();
  } else if (hash === "#ganancias") {
    renderGanancias();
  }
}

function iniciarTodoElSistema() {
  precargarDatos(system);

  // Botón cerrar sesión
  const btnLogout = document.getElementById("btnCerrarSesion");
  btnLogout.onclick = function () {
    system.cerrarSesion();
    updateNavbar();
    window.location.hash = "#login";
  };

  updateNavbar();
  window.addEventListener("hashchange", route);
  route();
}

iniciarTodoElSistema();
