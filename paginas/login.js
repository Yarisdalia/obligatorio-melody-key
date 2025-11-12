// Página: Login

function onIniciarSesion() {
  const usuario = document.querySelector("#txtLoginUsuario").value.trim();
  const contrasena = document.querySelector("#txtLoginContrasena").value;
  const mensaje = system.iniciarSesion(usuario, contrasena);

  document.querySelector("#pLoginMensaje").textContent = mensaje;

  if (mensaje.startsWith("Bienvenido")) {
    updateNavbar();
    // Redirigir según rol
    if (system.usuarioLogueado instanceof Administrador) {
      mostrarSeccion("admin");
    } else {
      mostrarSeccion("explorar");
    }
  }
}

// Asignar evento al botón
const btnLogin = document.querySelector("#btnIniciarSesion");
if (btnLogin) {
  btnLogin.onclick = onIniciarSesion;
}

