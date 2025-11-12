// Página: Registro
document.querySelector("#btnRegistrar").addEventListener("click", onRegistrar);
function onRegistrar() {
  const nombre = document.querySelector("#txtNombre").value.trim();
  const apellido = document.querySelector("#txtApellido").value.trim();
  const usuario = document.querySelector("#txtUsuario").value.trim();
  const contrasena = document.querySelector("#txtContrasena").value;
  const contrasena2 = document.querySelector("#txtContrasena2").value;

  const mensaje = system.agregarUsuario(nombre, apellido, usuario, contrasena, contrasena2);
  document.querySelector("#pResultado").textContent = mensaje;

  if (mensaje === "Registro exitoso.") {
    document.querySelector("#txtNombre").value = "";
    document.querySelector("#txtApellido").value = "";
    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtContrasena").value = "";
    document.querySelector("#txtContrasena2").value = "";
  }
}
