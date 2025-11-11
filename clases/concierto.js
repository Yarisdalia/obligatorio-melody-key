class Concierto
{
    constructor(id, nombre, artista, precio, descripcion, imagen, cupos, estado, oferta)
    {
        this.id = id;           // id autoincremental
        this.nombre = nombre;
        this.artista = artista;
        this.precio = precio;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.cupos = cupos;     //Cantidad de cupos disponibles.
        this.estado = estado;   // pendiente, aprobada, cancelada
        this.oferta = oferta;   // Si/No
    }

    estaActivo()
    {
        return this.estado === "activo";
    }

    tieneCupos(cantidad)
    {
        if (this.cupos <= 0)
        {
            return false;
        }
        return cantidad <= this.cupos;
    }

    descargarCupos(cantidad)
    {
        this.cupos = this.cupos - cantidad;
        if (this.cupos <= 0)
        {
            this.cupos = 0;
            this.estado = "pausado";
        }
    }
}