document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSession);
function cerrarSession() {
  sistema.cerrarSesion();
  updateNavbar();
  mostrarSeccion("login");
}
