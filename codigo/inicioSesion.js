// Página: Login
document.querySelector("#btnIniciarSesion").addEventListener("click", iniciarSesion);
function iniciarSesion() {
  const usuario = document.querySelector("#txtLoginUsuario").value;
  const contrasena = document.querySelector("#txtLoginContrasena").value;

  const resultado = sistema.iniciarSesion(usuario, contrasena);

  if (!resultado.ok){
    document.querySelector("#pLoginMensaje").textContent = resultado.mensaje;
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
