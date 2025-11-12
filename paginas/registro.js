// Página: Registro
function onRegistrar() {
  const nombre = document.getElementById("txtNombre").value.trim();
  const apellido = document.getElementById("txtApellido").value.trim();
  const usuario = document.getElementById("txtUsuario").value.trim();
  const contrasena = document.getElementById("txtContrasena").value;
  const contrasena2 = document.getElementById("txtContrasena2").value;

  const mensaje = system.agregarUsuario(nombre, apellido, usuario, contrasena, contrasena2);
  document.getElementById("pResultado").textContent = mensaje;

  if (mensaje === "Registro exitoso.") {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtUsuario").value = "";
    document.getElementById("txtContrasena").value = "";
    document.getElementById("txtContrasena2").value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btnRegistrar");
  btn.onclick = onRegistrar;
});
