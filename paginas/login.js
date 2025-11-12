// Página: Login

function onIniciarSesion() {
  const usuario = document.getElementById("txtLoginUsuario").value.trim();
  const contrasena = document.getElementById("txtLoginContrasena").value;
  const mensaje = system.iniciarSesion(usuario, contrasena);

  document.getElementById("pLoginMensaje").textContent = mensaje;

  if (mensaje.startsWith("Bienvenido")) {
    updateNavbar();
    // Redirigir según rol
    if (system.usuarioLogueado instanceof Administrador) {
      window.location.hash = "#admin";
    } else {
      window.location.hash = "#explorar";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnIniciarSesion");
  btn.onclick = onIniciarSesion;
});
