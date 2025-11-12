// Página: Registro
function onRegistrar() {
  const system = window.app.system;
  var elNombre = document.getElementById("txtNombre");
  var elApellido = document.getElementById("txtApellido");
  var elUsuario = document.getElementById("txtUsuario");
  var elContrasena = document.getElementById("txtContrasena");
  var elContrasena2 = document.getElementById("txtContrasena2");
  const nombre = elNombre ? elNombre.value.trim() : "";
  const apellido = elApellido ? elApellido.value.trim() : "";
  const usuario = elUsuario ? elUsuario.value.trim() : "";
  const contrasena = elContrasena ? elContrasena.value : "";
  const contrasena2 = elContrasena2 ? elContrasena2.value : "";
  const mensaje = system.agregarUsuario(nombre, apellido, usuario, contrasena, contrasena2);
  const p = document.getElementById("pResultado");
  if (p) p.textContent = mensaje;
  if (mensaje.toLowerCase().includes("exitoso")) {
    if (elNombre) elNombre.value = "";
    if (elApellido) elApellido.value = "";
    if (elUsuario) elUsuario.value = "";
    if (elContrasena) elContrasena.value = "";
    if (elContrasena2) elContrasena2.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnRegistrar");
  if (btn) btn.onclick = onRegistrar;
});
