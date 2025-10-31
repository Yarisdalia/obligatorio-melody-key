// ------------------- FUNCIONES DE PERSISTENCIA --------------------------------------

function guardarDatos()
{
    // guarda arrays en localStorage: clientes, conciertos, reservas
}

function cargarDatos()
{
    // carga arrays del localStorage o crea arrays vacíos si no existen
}

// ------------------- FUNCIONES GENERALES --------------------------------------

function numeroPositivo(numero)
{
    if (numero > 0) return true;
    else return false;
}

function generarIDConcierto()
{
    // devuelve "CON_ID_x" con x autoincremental (usa una variable global o localStorage)
}

function generarIDCliente()
{
    // devuelve id numérico autoincremental
}

function buscarConciertoPorID(id)
{
    // busca en array conciertos y devuelve el objeto o null
}

function buscarClientePorUsername(username)
{
    // busca (comparando lowercase) y devuelve el cliente o null
}

function formatoMoneda(numero)
{
    // devuelve cadena: por ejemplo "1000" o con separadores, según queráis
}

// ------------------- FUNCIONES CLIENTES --------------------------------------

function registrarCliente(nombre, apellido, username, password)
{
    // valida: username único (case insensitive),
    // password mínimo 5 caracteres y contiene mayúscula, minúscula y número
    // si OK: crear cliente con id autoincremental, saldo = 10000, reservas = []
    // devuelve el cliente creado o null/error
}

function iniciarSesionCliente(username, password)
{
    // busca usuario (case insensitive para username),
    // compara password (case sensitive),
    // devuelve cliente si OK o null si error
}

function explorarConciertosDisponibles()
{
    // devuelve array de conciertos con estado "activo" y cupos > 0
    // cada item incluye: nombre, artista, descripcion, precio, oferta, imagen
}

function verConciertosEnOferta()
{
    // devuelve mismos conciertos pero filtrados por oferta === true y estado activo/cupos
}

function puedeReservarCliente(clienteId, conciertoId)
{
    // comprueba si cliente ya reservó ese concierto (cualquier estado)
    // devuelve true si puede reservar (es decir, no tiene reserva previa)
}

function crearReserva(clienteId, conciertoId, cantidad)
{
    // crea reserva con estado "pendiente"
    // monto = cantidad * precioConcierto
    // no se verifica saldo ni cupo aquí (según enunciado)
    // retorna la reserva creada (o mensaje de error si cliente ya reservó)
}

function verHistorialReservas(clienteId)
{
    // devuelve array de reservas del cliente con los campos solicitados:
    // nombre del concierto, cantidad, monto, estado
    // además calcula saldoDisponible (cliente.saldo) y totalAprobadas
}

function cancelarReserva(reservaId, clienteId)
{
    // sólo permite cancelar si reserva.estado === "pendiente" y clienteId coincide
    // cambia estado a "cancelada"
}

// ------------------- FUNCIONES ADMINISTRADORES --------------------------------------

function iniciarSesionAdmin(username, password)
{
    // similares a cliente, admins están precargados
}

function listarReservasPorEstado(estado)
{
    // devuelve array de reservas cuyo estado coincida (pendiente, aprobada, cancelada)
}

function procesarReserva(reservaId)
{
    // lógicas:
    // 1) obtener reserva, cliente, concierto
    // 2) calcular montoFinal = monto * (aplica 10% descuento si cantidad >=4)
    // 3) si cliente.saldo >= montoFinal && concierto.estado === "activo" && concierto.cupos >= reserva.cantidad
    //      - restar saldo al cliente: cliente.saldo -= montoFinal
    //      - restar cupos al concierto: concierto.cupos -= reserva.cantidad
    //      - si concierto.cupos === 0 -> concierto.estado = "pausado"
    //      - reserva.estado = "aprobada"
    //    else
    //      - reserva.estado = "cancelada"
    // 4) actualizar listas (devuelve true/false o el nuevo estado)
}

function agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, oferta)
{
    // valida campos (todos obligatorios, precio>0, cupos>0)
    // genera id con generarIDConcierto()
    // estado por defecto "activo"
    // agrega a array conciertos
}

function modificarCupos(conciertoId, nuevosCupos)
{
    // actualiza cupos. Si nuevosCupos === 0 -> estado = "pausado"
}

function activarPausarConcierto(conciertoId, accion)
{
    // accion = "activar" o "pausar"
    // activar solo si cupos > 0
}

function marcarOferta(conciertoId, valorBooleano)
{
    // asigna concierto.oferta = valorBooleano
}

function informeGanancias()
{
    // calcular totalRecaudado (sum de reservas.aprobadas con sus montos ya con descuento)
    // y tabla por concierto: entradasVendidas y montoGenerado
    // devolver objeto con resumen y tabla

