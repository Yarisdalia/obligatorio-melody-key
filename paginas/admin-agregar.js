// Página: Admin - Agregar Concierto
document.querySelector("#btnAgregarConcierto").addEventListener("click", agregar);

function agregar() {
  const msg = document.querySelector("#msgAgregarConcierto");

  // Obtener valores del formulario
  const nombre = document.querySelector("#txtNombreEvento").value.trim();
  const artista = document.querySelector("#txtArtista").value.trim();
  const precio = parseInt(document.querySelector("#txtPrecio").value.trim(), 10);
  const cupos = parseInt(document.querySelector("#txtCupos").value.trim(), 10);
  const descripcion = document.querySelector("#txtDescripcion").value.trim();
  const fileImg = document.querySelector("#fileImagen");
  const imagen = fileImg.files.length > 0 ? fileImg.files[0].name : "";
  const oferta = document.querySelector("#chkOferta").checked;

  // Validar campos obligatorios
  if (!nombre || !artista || !descripcion || !precio || !cupos) {
    msg.textContent = "Los campos no pueden estar vacíos.";
    return;
  }

  // Crear concierto con estado "activo"
  sistema.agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, "activo", oferta);
  msg.textContent = "Concierto agregado.";

  // Limpiar formulario
  document.querySelector("#txtNombreEvento").value = "";
  document.querySelector("#txtArtista").value = "";
  document.querySelector("#txtPrecio").value = "";
  document.querySelector("#txtCupos").value = "";
  document.querySelector("#txtDescripcion").value = "";
  document.querySelector("#fileImagen").value = "";
  document.querySelector("#chkOferta").checked = false;
}
