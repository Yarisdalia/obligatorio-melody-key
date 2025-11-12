var sistema = new Sistema();

function iniciarTodoElSistema() {
  precargarDatos(sistema);
  // Botón cerrar sesión
  const btnLogout = document.querySelector("#btnCerrarSesion");
  btnLogout.onclick = function () {
    sistema.cerrarSesion();
    updateNavbar();
    mostrarSeccion("login");
  };
  updateNavbar();
  // Iniciar navegación
  iniciarNavegacion();
}

iniciarTodoElSistema();
