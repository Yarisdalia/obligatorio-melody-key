let miSistema = new Sistema();
miSistema.precargaDatos();


let btnPrueba = document.querySelector("#btnPrueba");
if (btnPrueba) { btnPrueba.addEventListener("click", prueba); }

    function prueba ()
    {
    console.log("Probando el sistema...");

    // Prueba manual: crear cliente directamente
    let clientePrueba = new Cliente(1, "Sergio", "Argente", "sergio", "1234", 10000);
    console.log("Cliente creado directamente:", clientePrueba);

    // Otra prueba del método del sistema
    let mensaje = miSistema.agregarUsuario("Juan", "Pérez", "juanp", "abcd", "abcd");
    console.log("Resultado del método agregarCliente:", mensaje);

    console.log("Clientes actuales:", miSistema.clientes);
    }



let btnListarDisponibles = document.querySelector("#btnListarDisponibles");
if (btnListarDisponibles) { btnListarDisponibles.addEventListener("click", listarDisponibles); }

    function listarDisponibles()
    {
        let listaDisponibles = miSistema.explorarConciertosDisponibles();
        console.log(listaDisponibles);
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
    