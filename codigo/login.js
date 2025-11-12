// Página: Login
document.querySelector("#btnIniciarSesion").addEventListener("click", iniciarSesion);
function iniciarSesion() {
  const usuario = document.querySelector("#txtLoginUsuario").value;
  const contrasena = document.querySelector("#txtLoginContrasena").value;
  const mensaje = sistema.iniciarSesion(usuario, contrasena);

  document.querySelector("#pLoginMensaje").textContent = mensaje;

  if (mensaje.startsWith("Bienvenido")) {
    actualizarNavbar();
    // Redirigir según rol
    if (sistema.usuarioLogueado instanceof Administrador) {
      mostrarSeccion("admin");
    } else {
      mostrarSeccion("explorar");
    }
  }
}
