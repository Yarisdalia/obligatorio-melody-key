// ARCHIVO QUE CONTIENE TODAS LAS CLASES NECESARIAS (EXPTO. SISTEMAS)

class Cliente
{
    constructor(id, nombre, apellido, usuario, contrasena, saldo)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;     // Nombre de usuario
        this.contrasena = contrasena;
        this.saldo = saldo;
    }
}

class Administrador
{
    constructor(id, nombre, usuario, contrasena)
    {
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario; // Nombre de usuario
        this.contrasena = contrasena;
    }
}

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
}

class Reserva
{
    constructor(id, cliente, concierto, cantidad, estado)
    {
        this.id = id;                 // id autoincremental
        this.cliente = cliente;       // objeto Cliente
        this.concierto = concierto;   // objeto Concierto
        this.cantidad = cantidad;     // cantidad de cupos
        this.estado = estado;         // pendiente, aprobada, cancelada
    }

    montoTotal()
    {
        return this.cantidad * this.concierto.precio;
    }
}