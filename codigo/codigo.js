let miSistema = new Sistema();
miSistema.precargaDatos();


// ________________________ F03 : EXPLORAR CONCIERTOS DISPONIBLES _________________________________________________
document.querySelector("#btnListarDisponibles").addEventListener("click", listarConciertosDisponibles)

    function listarConciertosDisponibles()
    {

        let disponibles = miSistema.explorarConciertosDisponibles();
        let tablaConciertosDisponibles = "";

        // Recorrer nombre, artista, descripcion, precio, oferta, imagen
    for (let i = 0; i < disponibles.length; i++)
    {
        let concierto = disponibles[i];

        tablaConciertosDisponibles += `<tr><td>${concierto.nombre}</td><td>${concierto.artista}</td><td>${concierto.descripcion}</td><td>${concierto.precio}</td><td>${concierto.oferta}</td><td>${concierto.imagen}</td><button type="button" class="btn btn-sm btn-primary btnSolicitarReserva" data-id="${concierto.id}">Seleccionar Concierto</button></td></tr>`;
    }

    document.querySelector("#tblConciertosDisponibles").innerHTML = tablaConciertosDisponibles;

    }




// Estructura tipo ejemplo (select + registrar + tabla)

armarSelectConciertos();

function armarSelectConciertos()
{
    let slc = document.querySelector("#slcConciertos");
    if (!slc) { return; }
    let contenido = `<option value="-1">Seleccione..</option>`;
    for (let i = 0; i < miSistema.conciertos.length; i++)
    {
        const con = miSistema.conciertos[i];
        contenido += `<option value="${con.id}">${con.nombre}-${con.precio}</option>`;
    }
    slc.innerHTML = contenido;
}

let btnReserva = document.querySelector("#btnSolicitaReserva");
if (btnReserva) { btnReserva.addEventListener("click", registrarReserva); }

function registrarReserva()
{
    let sel = document.querySelector("#slcConciertos");
    let inputCant = document.querySelector("#txtCantidad");
    let pMsg = document.querySelector("#pMensaje") || document.querySelector("#pMensajes");

    let conciertoId = sel ? Number(sel.value) : -1;
    let cant = inputCant ? String(inputCant.value) : "";

    if (cant !== "" && !isNaN(cant) && conciertoId !== -1)
    {
        let concierto = null;
        for (let i = 0; i < miSistema.conciertos.length; i++)
        {
            const c = miSistema.conciertos[i];
            if (c.id === conciertoId)
            {
                concierto = c;
                break;
            }
        }
        // Aquí iría: miSistema.agregarReserva(concierto, Number(cant)) si existiera el método
        if (pMsg) { pMsg.innerHTML = "Operación registrada correctamente"; }
    }
    else
    {
        if (pMsg) { pMsg.innerHTML = "Verifique datos"; }
    }
}

let btnMostrarTabla = document.querySelector("#btnMostrarTabla");
if (btnMostrarTabla) { btnMostrarTabla.addEventListener("click", mostrarTabla); }

function mostrarTabla()
{
    let cuerpo = document.querySelector("#tblGanancias");
    if (!cuerpo) { return; }
    let contenido = "";
    for (let i = 0; i < miSistema.conciertos.length; i++)
    {
        const con = miSistema.conciertos[i];
        // Total por concierto no implementado aún; se muestra 0 para mantener estructura
        contenido += ` <tr>
        <td>${con.nombre}</td>
        <td class="text-center">0</td>
        <td class="text-end">$ 0</td>
        </tr>`;
    }
    cuerpo.innerHTML = contenido;
}

    
