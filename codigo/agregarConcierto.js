// Página: Agregar Concierto (Admin)

document.querySelector("#btnAgregarConcierto").addEventListener("click", agregar);

function agregar() {
  let mensaje = "";

  // Obtener valores del formulario
  const nombre = document.querySelector("#txtNombreEvento").value;
  const artista = document.querySelector("#txtArtista").value;
  const precio = Number(document.querySelector("#txtPrecio").value);
  const cupos = Number(document.querySelector("#txtCupos").value);
  const descripcion = document.querySelector("#txtDescripcion").value;
  const oferta = document.querySelector("#chkOferta").checked;
  const imagen = document.querySelector("#slcImagen").value;

  // Validar campos obligatorios
  if (!nombre || !artista || !descripcion || !precio || !cupos) {
    mensaje = "Los campos no pueden estar vacíos";
    document.querySelector("#msgAgregarConcierto").innerHTML = mensaje;
    return;
  }

  //Añade la imagen default.jpg si el admin no selecciona ninguna
  let imagenSeleccionada = document.querySelector("#slcImagen").value;
  if (imagenSeleccionada === "") {
      imagenSeleccionada = "default.png";
  }

  // Crear concierto con estado "activo"
  sistema.agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, "activo", oferta);
  mensaje = "Concierto agregado";
  document.querySelector("#msgAgregarConcierto").innerHTML = mensaje;

  // Limpiar formulario
  document.querySelector("#txtNombreEvento").value = "";
  document.querySelector("#txtArtista").value = "";
  document.querySelector("#txtPrecio").value = "";
  document.querySelector("#txtCupos").value = "";
  document.querySelector("#txtDescripcion").value = "";
  document.querySelector("#chkOferta").checked = false;
  document.querySelector("#slcImagen").value = "default.png";
}
