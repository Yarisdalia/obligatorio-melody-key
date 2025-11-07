//Funciones reutilizables


// Función para verificar siExiste una propiedad de un array____________________________________________
function existeProp(array, propiedad, valor)
{
    for (let i = 0; i < array.length; i++)
    {
        if (array[i][propiedad].toLowerCase() === valor.toLowerCase())
        {
            return true;
        }
    }
    return false;
}

// Función para verificar contraseña valida__________________________________________________________
function validaPass(contrasena)
{
    if (contrasena.length < 6)
    {
        return false;
    }

    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;
    let todasValidas = false;

    for (let i = 0; i < contrasena.length; i++)
    {
        let caracter = contrasena.charAt(i);

        if (caracter >= 'A' && caracter <= 'Z')
        {
            tieneMayuscula = true;
        }

        if (caracter >= 'a' && caracter <= 'z')
        {
            tieneMinuscula = true;
        }

        if (caracter >= '0' && caracter <= '9')
        {
            tieneNumero = true;
        }

        if(tieneMayuscula && tieneMinuscula && tieneNumero)
        {
            todasValidas= true;
            break;
        }
    }

    if (todasValidas)
    {
        return true;
    }
    else
    {
        return false;
    }
    
} //Fin validaPass

// ------------------- VALIDACIONES RESERVAR --------------------

function validaCantidad(cantidad)
{
    return cantidad > 0;
}

function validaCupos(cantidad, cupos)
{
    if (cupos <= 0)
    {
        return false;
    }
    return cantidad <= cupos;
}

function puedeReservarEnLista(clienteId, conciertoId, reservas)
{
    if (!reservas)
    {
        return true;
    }
    for (let i = 0; i < reservas.length; i++)
    {
        let reservaActual = reservas[i];
        if (reservaActual)
        {
            if (reservaActual.cliente && reservaActual.concierto)
            {
                if (reservaActual.cliente.id === clienteId && reservaActual.concierto.id === conciertoId)
                {
                    return false;
                }
            }
        }
    }
    return true;
}

// ------------------- VALIDACIONES  HISTORIAL -------------------------------------

function filtrarReservasCliente(reservas, clienteId)
{
    let resultado = [];
    if (!reservas)
    {
        return resultado;
    }
    for (let i = 0; i < reservas.length; i++)
    {
        let reservaActual = reservas[i];
        if (reservaActual)
        {
            if (reservaActual.cliente)
            {
                if (reservaActual.cliente.id === clienteId)
                {
                    resultado.push(reservaActual);
                }
            }
        }
    }
    return resultado;
}

function totalAprobadas(reservasCliente)
{
    let total = 0;
    if (!reservasCliente)
    {
        return 0;
    }
    for (let i = 0; i < reservasCliente.length; i++)
    {
        let reservaActual = reservasCliente[i];
        if (reservaActual)
        {
            if (reservaActual.estado === "aprobada")
            {
                let montoReserva = 0;
                if (reservaActual.montoTotal)
                {
                    montoReserva = reservaActual.montoTotal();
                }
                else if (reservaActual.concierto && reservaActual.cantidad)
                {
                    montoReserva = reservaActual.concierto.precio * reservaActual.cantidad;
                }
                total = total + montoReserva;
            }
        }
    }
    return total;
}

// ------------------- VALIDACIONES CONCIERTOS EN OFERTA ---------------------------

function esActivo(concierto)
{
    if (!concierto)
    {
        return false;
    }
    return concierto.estado === "activo";
}

function esOfertaActiva(concierto)
{
    if (!concierto)
    {
        return false;
    }
    if (!esActivo(concierto))
    {
        return false;
    }
    if (!(concierto.oferta === true))
    {
        return false;
    }
    if (!(concierto.cupos > 0))
    {
        return false;
    }
    return true;
}

function obtenerOfertas(listaConciertos)
{
    let resultado = [];
    if (!listaConciertos)
    {
        return resultado;
    }
    for (let i = 0; i < listaConciertos.length; i++)
    {
        let conciertoActual = listaConciertos[i];
        if (conciertoActual)
        {
            if (esOfertaActiva(conciertoActual))
            {
                resultado.push(conciertoActual);
            }
        }
    }
    return resultado;
}

//verOfertasLista
function verOfertasLista(listaConciertos)
{
    return obtenerOfertas(listaConciertos);
}

function verHistorialLista(reservas, clienteId)
{
    return filtrarReservasCliente(reservas, clienteId);
}


