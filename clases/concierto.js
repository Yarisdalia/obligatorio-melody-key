class Concierto {
  constructor(id, nombre, artista, precio, descripcion, imagen, cupos, estado, oferta) {
    this.id = id;
    this.nombre = nombre;
    this.artista = artista;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.cupos = cupos;
    this.estado = estado; // activo o pausado
    this.oferta = oferta; // true o false
  }
}
