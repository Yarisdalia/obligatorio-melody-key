// Variable global del sistema
var system = new Sistema();

function updateNavbar() {
  const user = system.usuarioLogueado;
  const isAdmin = esAdmin(user);
  const isCliente = esCliente(user);

  // Mostrar/ocultar elementos del nav según rol
  document.querySelector("#navInicio").style.display = !user ? "" : "none";
  document.querySelector("#navRegistro").style.display = !user ? "" : "none";
  document.querySelector("#navExplorar").style.display = isCliente ? "" : "none";
  document.querySelector("#navOfertas").style.display = isCliente ? "" : "none";
  document.querySelector("#navReservar").style.display = isCliente ? "" : "none";
  document.querySelector("#navHistorial").style.display = isCliente ? "" : "none";
  document.querySelector("#navAdmin").style.display = isAdmin ? "" : "none";

  // Usuario y botón cerrar sesión
  const navUsuario = document.querySelector("#navUsuario");
  const btnLogout = document.querySelector("#btnCerrarSesion");

  if (user) {
    navUsuario.textContent = "Hola, " + user.nombre;
    btnLogout.style.display = "";
  } else {
    navUsuario.textContent = "";
    btnLogout.style.display = "none";
  }
}

function iniciarTodoElSistema() {
  precargarDatos(system);
  // Botón cerrar sesión
  const btnLogout = document.querySelector("#btnCerrarSesion");
  btnLogout.onclick = function () {
    system.cerrarSesion();
    updateNavbar();
    mostrarSeccion("login");
  };
  updateNavbar();
  // Iniciar navegación
  iniciarNavegacion();
}

iniciarTodoElSistema();
