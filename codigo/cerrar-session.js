document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSession);
function cerrarSession() {
  sistema.cerrarSesion();
  actualizarNavbar();
  mostrarSeccion("login");
}
