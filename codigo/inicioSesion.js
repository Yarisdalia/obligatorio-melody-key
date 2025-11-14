// Página: Login
document.querySelector("#btnIniciarSesion").addEventListener("click", iniciarSesion);
function iniciarSesion() {
  const usuario = document.querySelector("#txtLoginUsuario").value;
  const contrasena = document.querySelector("#txtLoginContrasena").value;

  const mensaje = sistema.iniciarSesion(usuario, contrasena);

  if (siHayError(mensaje)) {
    document.querySelector("#pLoginMensaje").textContent = mensaje;
  } else {
    actualizarNavbar();
    // Redirigir según rol
    if (esAdmin(sistema.usuarioLogueado)) {
      mostrarSeccion("admin");
    } else {
      mostrarSeccion("explorar");
    }
  }
}
