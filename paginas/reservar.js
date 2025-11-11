// Página: Reservar
(function () {
    window.pages = window.pages || {};

    function renderReservar() {
        const system = window.app.system;
        const select = document.getElementById("slcConciertos");
        const inputCantidad = document.getElementById("txtCantidad");
        const txtMonto = document.getElementById("montoTotal");
        const txtSaldo = document.getElementById("saldoDisponible");
        const precioUnitario = document.getElementById("precioUnitario");
        const cuposDisponibles = document.getElementById("cuposDisponibles");
        if (!select) return;

        // Rellenar select con conciertos activos
        select.innerHTML = "";
        const activos = system.explorarConciertosDisponibles();
        for (let i = 0; i < activos.length; i++) {
            const c = activos[i];
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = `${c.nombre} - ${c.artista}`;
            select.appendChild(opt);
        }
        if (window.app.preselectedConciertoId) {
            select.value = window.app.preselectedConciertoId;
            window.app.preselectedConciertoId = null;
        }

        function obtenerConciertoSeleccionado() {
            const id = select.value;
            for (let i = 0; i < system.conciertos.length; i++) {
                if (system.conciertos[i].id === id) return system.conciertos[i];
            }
            return null;
        }
        function actualizarDetalle() {
            const seleccionado = obtenerConciertoSeleccionado();
            if (!seleccionado) return;
            if (precioUnitario) precioUnitario.textContent = seleccionado.precio;
            if (cuposDisponibles) cuposDisponibles.textContent = seleccionado.cupos;
            const cantidad = parseInt(inputCantidad ? inputCantidad.value : "0", 10) || 0;
            const total = cantidad * seleccionado.precio;
            if (txtMonto) txtMonto.textContent = total;
            if (txtSaldo) txtSaldo.textContent = (system.usuarioLogueado && system.usuarioLogueado.saldo != null) ? system.usuarioLogueado.saldo : 0;
        }
        select.onchange = actualizarDetalle;
        if (inputCantidad) inputCantidad.oninput = actualizarDetalle;
        actualizarDetalle();

        const btn = document.getElementById("btnSolicitaReserva");
        const pMsg = document.getElementById("pMensaje");
        if (btn) {
            btn.onclick = function () {
                if (pMsg) pMsg.textContent = "";
                if (!system.usuarioLogueado || !(system.usuarioLogueado instanceof Cliente)) {
                    if (pMsg) pMsg.textContent = "Debes iniciar sesión como cliente para reservar.";
                    return;
                }
                const concierto = obtenerConciertoSeleccionado();
                if (!concierto) {
                    if (pMsg) pMsg.textContent = "Debes seleccionar un concierto.";
                    return;
                }
                const cantidad = parseInt(inputCantidad ? inputCantidad.value : "0", 10) || 0;
                const res = system.solicitarReserva(system.usuarioLogueado.id, concierto.id, cantidad);
                if (pMsg) pMsg.textContent = res.mensaje;
                if (res.exito) {
                    window.location.hash = "#historial";
                }
            };
        }
    }

    window.pages.renderReservar = renderReservar;
})();


