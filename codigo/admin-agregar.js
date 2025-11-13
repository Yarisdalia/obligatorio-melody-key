// Página: Admin - Agregar Concierto
document.querySelector("#btnAgregarConcierto").addEventListener("click", agregar);
function agregar() {
  const mensaje = document.querySelector("#msgAgregarConcierto");

  // Obtener valores del formulario
  const nombre = document.querySelector("#txtNombreEvento").value;
  const artista = document.querySelector("#txtArtista").value;
  const precio = Number(document.querySelector("#txtPrecio").value);
  const cupos = Number(document.querySelector("#txtCupos").value);
  const descripcion = document.querySelector("#txtDescripcion").value;
  const oferta = document.querySelector("#chkOferta").checked;

  // Validar campos obligatorios
  if (!nombre || !artista || !descripcion || !precio || !cupos) {
    mensaje.innerHTML = "Los campos no pueden estar vacíos.";
    return;
  }

  // Crear concierto con estado "activo"
  sistema.agregarConcierto(nombre, artista, precio, descripcion, "default.png", cupos, "activo", oferta);
  mensaje.innerHTML = "Concierto agregado.";

  // Limpiar formulario
  document.querySelector("#txtNombreEvento").value = "";
  document.querySelector("#txtArtista").value = "";
  document.querySelector("#txtPrecio").value = "";
  document.querySelector("#txtCupos").value = "";
  document.querySelector("#txtDescripcion").value = "";
  document.querySelector("#chkOferta").checked = false;
}
