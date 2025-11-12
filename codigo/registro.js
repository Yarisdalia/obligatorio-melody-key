// Página: Registro
document.querySelector("#btnRegistrar").addEventListener("click", onRegistrar);
function onRegistrar() {
  const nombre = document.querySelector("#txtNombre").value;
  const apellido = document.querySelector("#txtApellido").value;
  const usuario = document.querySelector("#txtUsuario").value;
  const contrasena = document.querySelector("#txtContrasena").value;
  const contrasena2 = document.querySelector("#txtContrasena2").value;

  const mensaje = sistema.agregarUsuario(nombre, apellido, usuario, contrasena, contrasena2);
  document.querySelector("#pResultado").textContent = mensaje;

  if (mensaje === "Registro exitoso.") {
    document.querySelector("#txtNombre").value = "";
    document.querySelector("#txtApellido").value = "";
    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtContrasena").value = "";
    document.querySelector("#txtContrasena2").value = "";
  }
}
