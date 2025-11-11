
class Sistema {
    constructor() {
        this.clientes = [];
        this.administradores = [];
        this.conciertos = [];
        this.reservas = [];

        // Contadores autoincrementales
        this.idCliente = 1;
        this.idAdministrador = 1;
        this.idConcierto = 1;
        this.idReserva = 1;

        // Activamos el usuario logueado.
        this.usuarioLogueado = null;
    }



    //_____________________________ F01 - REGISTRO DE CLIENTE (HECHO)___________________________________

    agregarUsuario(nombre, apellido, usuario, contrasena, confirmarContrasena) {
        let mensaje = "";
        //Definimos variables locales para no tener que usar "this." todo el tiempo
        let clientes = this.clientes;

        // Validamos que todos los campos son cumplimentados.
        if (!nombre || !apellido || !usuario || !contrasena || !confirmarContrasena) {
            mensaje = "Todos los campos son obligatorios.";
            return mensaje;
        }

        else if (existeProp(clientes, "usuario", usuario)) //Funcion en librería
        {
            mensaje = "El nombre de usuario ya existe.";
            return mensaje;
        }

        else if (!validarContrasena(contrasena)) //Funcion en librería
        {
            mensaje = "Debe ingresar una contraseña válida."
            return mensaje;
        }

        else if (contrasena !== confirmarContrasena) {
            mensaje = "Las contraseñas no coinciden.";
            return mensaje;
        }

        else {
            let nuevoCliente = new Cliente(obtenerIdCliente(), nombre, apellido, usuario, contrasena, 10000);
            clientes.push(nuevoCliente);
            mensaje = "Registro exitoso.";
        }

        return mensaje;
    }




    //_____________________________ F02 - INICIO DE SESION (HECHO) __________________________________________________________
    // Misma página para clientes y adm. el nombre de usuario identifica el perfil de usuario.
    // O hacer un select???

    iniciarSesion(usuario, contrasena) {
        let mensaje = "";
        let clientes = this.clientes;
        let administradores = this.administradores;
        let esAdmin = false;
        let esCliente = false;

        // Validar campos vacios
        if (!usuario || !contrasena) {
            return mensaje = "Los campos no pueden estar vacíos";
        }

        // Determinar tipo de usuario (admin / cliente)
        esAdmin = existeProp(administradores, "usuario", usuario);

        if (!esAdmin) {
            esCliente = existeProp(clientes, "usuario", usuario);
        }

        if (!esAdmin && !esCliente) {
            return mensaje = "Usuario no encontrado";
        }

        // Validar contraseña
        if (esAdmin) {
            for (let i = 0; i < administradores.length; i++) {
                if (administradores[i].usuario.toLowerCase() === usuario.toLowerCase()) {
                    if (administradores[i].contrasena === contrasena) {
                        this.usuarioLogueado = administradores[i]; //Asignamos el objeto administrador a usuarioLogueado
                        return mensaje = "Bienvenido " + this.usuarioLogueado.nombre;
                    }
                    else {
                        return mensaje = "Contraseña incorrecta";
                    }
                }
            }
        }
        else {
            for (let i = 0; i < clientes.length; i++) {
                if (clientes[i].usuario.toLowerCase() === usuario.toLowerCase()) {
                    if (clientes[i].contrasena === contrasena) {
                        this.usuarioLogueado = clientes[i]; //Asignamos el objeto cliente a usuarioLogueado
                        return mensaje = "Bienvenido " + this.usuarioLogueado.nombre;
                    }
                    else {
                        return mensaje = "Contraseña incorrecta";
                    }
                }
            }
        }
    }

    //_____________________________ F0? - CIERRE DE SESION (HECHO) ______________________________________________
    //Debera constar de un boton en el nav? nav fijo

    cerrarSesion() {
        this.usuarioLogueado = null; //usuarioLogueado guarda un objeto (cliente), lo vaciamos.
        let mensaje = "Sesión cerrada";
        return mensaje;
    }



    //_________________________ F03 EXPLORAR CONCIERTOS DISPONIBLES (SERGIO) ____________________________________________________________________________
    // Solo muestra conciertos activos con cupos disponibles

    explorarConciertosDisponibles() {
        let conciertos = this.conciertos;
        let conciertosDisponibles = []; // Array de conciertos disponibles

        for (let i = 0; i < conciertos.length; i++) {
            if (conciertos[i].estado === "activo" && conciertos[i].cupos > 0) {
                conciertosDisponibles.push(conciertos[i]);
            }
        }


        return conciertosDisponibles;
    }



    //___________________________ F04 RESERVAR ENTRADAS (YARIS) __________________________________________________



    solicitarReserva(clienteId, conciertoId, cantidad) {
        let cliente = null;
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].id === clienteId) {
                cliente = this.clientes[i];
                break;
            }
        }
        if (!cliente) {
            return { exito: false, mensaje: "Cliente inválido." };
        }
        let concierto = null;
        for (let i = 0; i < this.conciertos.length; i++) {
            if (this.conciertos[i].id === conciertoId) {
                concierto = this.conciertos[i];
                break;
            }
        }
        if (!concierto) {
            return { exito: false, mensaje: "Concierto inválido." };
        }
        if (!validaCantidad(cantidad)) {
            return { exito: false, mensaje: "Cantidad inválida." };
        }
        if (!puedeReservarEnLista(clienteId, conciertoId, this.reservas)) {
            return { exito: false, mensaje: "Ya existe una reserva para este concierto." };
        }
        let nueva = new Reserva(obtenerIdReserva(), cliente, concierto, cantidad, "pendiente");
        this.reservas.push(nueva);
        return { exito: true, mensaje: "Reserva creada y pendiente de aprobación.", reserva: nueva };
    }



    //______________________________ F05 – HISTORIAL DE RESERVAS (YARIS) ______________________________________________

    // Validar el usuariologueado, usuarioLogueado guarda el objeto del cliente (id, nombre, contraseña... )
    // Se utiliza usuarioLogueado para traer la info de sus reservas. 

    listarReservasCliente(clienteId) {
        return filtrarReservasCliente(this.reservas, clienteId);
    }

    cancelarReserva(reservaId, clienteId) {
        for (let i = 0; i < this.reservas.length; i++) {
            let r = this.reservas[i];
            if (r.id === reservaId && r.cliente && r.cliente.id === clienteId) {
                if (r.estado === "pendiente") {
                    r.estado = "cancelada";
                    return { exito: true, mensaje: "Reserva cancelada." };
                }
                else {
                    return { exito: false, mensaje: "Solo se pueden cancelar reservas pendientes." };
                }
            }
        }
        return { exito: false, mensaje: "Reserva no encontrada." };
    }

    totalAprobadasCliente(clienteId) {
        let reservasCliente = this.listarReservasCliente(clienteId);
        return totalAprobadas(reservasCliente);
    }



    //______________________________ F06 – CONCIERTOS EN OFERTA (YARIS) ________________________________

    obtenerOfertas() {
        let resultado = [];
        if (!this.conciertos) {
            return resultado;
        }
        for (let i = 0; i < this.conciertos.length; i++) {
            let conciertoActual = this.conciertos[i];
            if (conciertoActual) {
                if (esOfertaActiva(conciertoActual)) {
                    resultado.push(conciertoActual);
                }
            }
        }
        return resultado;
    }




    //______________________________ F07 – LISTAR Y PROCESAR RESERVAS (SERGIO) ________________________________

    // Listar reservas:

listarReservasPendientes()
{
    let pendientes = [];

    for (let i = 0; i < this.reservas.length; i++)
    {
        let reserva = this.reservas[i];
        if (reserva.estado === "pendiente")
        {
            pendientes.push(reserva);
        }
    }

    return pendientes;
}

listarReservasAprobadas()
{
    let aprobadas = [];

    for (let i = 0; i < this.reservas.length; i++)
    {
        let reserva = this.reservas[i];
        if (reserva.estado === "aprobada")
        {
            aprobadas.push(reserva);
        }
    }

    return aprobadas;
}


listarReservasCanceladas()
{
    let canceladas = [];

    for (let i = 0; i < this.reservas.length; i++)
    {
        let reserva = this.reservas[i];
        if (reserva.estado === "cancelada")
        {
            canceladas.push(reserva);
        }
    }

    return canceladas;
}

    // Y este codigo?? :

    procesarReserva(reservaId, accion) {
        for (let i = 0; i < this.reservas.length; i++) {
            let r = this.reservas[i];
            if (r.id === reservaId) {
                if (r.estado !== "pendiente") {
                    return { exito: false, mensaje: "La reserva ya fue procesada." };
                }
                if (accion === "aprobar") {
                    // Verificaciones de aprobación
                    if (!r.concierto.estaActivo()) {
                        r.estado = "cancelada";
                        return { exito: false, mensaje: "El concierto no está activo. Reserva cancelada." };
                    }
                    if (!r.concierto.tieneCupos(r.cantidad)) {
                        r.estado = "cancelada";
                        return { exito: false, mensaje: "No hay cupos suficientes. Reserva cancelada." };
                    }
                    // Total con descuento si corresponde
                    let total = r.montoConDescuento();
                    if (!r.cliente.tieneSaldo(total)) {
                        r.estado = "cancelada";
                        return { exito: false, mensaje: "Saldo insuficiente. Reserva cancelada." };
                    }
                    r.cliente.descontarSaldo(total);
                    r.concierto.descargarCupos(r.cantidad);
                    r.estado = "aprobada";
                    return { exito: true, mensaje: "Reserva aprobada." };
                }
                else if (accion === "cancelar") {
                    r.estado = "cancelada";
                    return { exito: true, mensaje: "Reserva cancelada." };
                }
                else {
                    return { exito: false, mensaje: "Acción inválida." };
                }
            }
        }
        return { exito: false, mensaje: "Reserva no encontrada." };
    }


    //______________________________ F08 – AGREGAR CONCIERTOS (SERGIO) ________________________________


    agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, estado, oferta) {
        // Generamos un id único usando la función de librería
        let idConcierto = obtenerIdConcierto();

        // Creamos el objeto concierto
        let nuevoConcierto = new Concierto(idConcierto, nombre, artista, precio, descripcion, imagen, cupos, estado, oferta);

        // Agregamos al array "madre"
        this.conciertos.push(nuevoConcierto);
    }


    //______________________________ F09 – ADMINISTRAR CONCIERTOS (YARIS) ________________________________


    actualizarConcierto(idConcierto, cambios) {
        for (let i = 0; i < this.conciertos.length; i++) {
            let c = this.conciertos[i];
            if (c.id === idConcierto) {
                if (typeof cambios.cupos !== "undefined") {
                    let nuevosCupos = cambios.cupos;
                    if (nuevosCupos < 0) {
                        nuevosCupos = 0;
                    }
                    c.cupos = nuevosCupos;
                    if (c.cupos === 0) {
                        c.estado = "pausado";
                    }
                }
                if (typeof cambios.estado !== "undefined") {
                    let nuevoEstado = cambios.estado;
                    if (nuevoEstado === "activo" && c.cupos === 0) {
                        c.estado = "pausado";
                    }
                    else {
                        c.estado = nuevoEstado;
                    }
                }
                if (typeof cambios.oferta !== "undefined") {
                    c.oferta = !!cambios.oferta;
                }
                return { exito: true, mensaje: "Concierto actualizado." };
            }
        }
        return { exito: false, mensaje: "Concierto no encontrado." };
    }

    //______________________________ F010 – INFORME DE GANANCIAS (SERGIO) ________________________________

    calcularGanancias() {
        let total = 0;
        let detalle = {};
        for (let i = 0; i < this.reservas.length; i++) {
            let r = this.reservas[i];
            if (r && r.estado === "aprobada") {
                let monto = r.montoConDescuento();
                total = total + monto;
                let clave = r.concierto.id;
                if (!detalle[clave]) {
                    detalle[clave] = { nombre: r.concierto.nombre, cantidad: 0, monto: 0 };
                }
                detalle[clave].cantidad = detalle[clave].cantidad + r.cantidad;
                detalle[clave].monto = detalle[clave].monto + monto;
            }
        }
        return { total: total, detalle: detalle };
    }

}
