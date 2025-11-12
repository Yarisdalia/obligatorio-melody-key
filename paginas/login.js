// Página: Login
document.querySelector("#btnIniciarSesion").addEventListener("click", onIniciarSesion);
function onIniciarSesion() {
  const usuario = document.querySelector("#txtLoginUsuario").value.trim();
  const contrasena = document.querySelector("#txtLoginContrasena").value;
  const mensaje = sistema.iniciarSesion(usuario, contrasena);

  document.querySelector("#pLoginMensaje").textContent = mensaje;

  if (mensaje.startsWith("Bienvenido")) {
    updateNavbar();
    // Redirigir según rol
    if (sistema.usuarioLogueado instanceof Administrador) {
      mostrarSeccion("admin");
    } else {
      mostrarSeccion("explorar");
    }
  }
}
