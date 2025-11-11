// ------------------- GENERAR ID'S --------------------
//El id debe ser único, por lo que se requiere un formato de id, diferente para cada clase
//Seguimos el mismo criterio que el declarado en la letra: CON_ID_ para conciertos.

let proximoIdConcierto = 1;
let proximoIdCliente = 1;
let proximoIdAdministrador = 1;
let proximoIdReserva = 1;

function obtenerIdConcierto() {
    let idActual = "CON_ID_" + proximoIdConcierto;
    proximoIdConcierto++;
    return idActual;
}

function obtenerIdCliente() {
    let idCliente = "CLI_ID_" + proximoIdCliente;
    proximoIdCliente++;
    return idCliente;
}

function obtenerIdAdministrador() {
    let idActual = "ADM_ID_" + proximoIdAdministrador;
    proximoIdAdministrador++;
    return idActual;
}

function obtenerIdReserva() {
    let idActual = "RES_ID_" + proximoIdReserva;
    proximoIdReserva++;
    return idActual;
}