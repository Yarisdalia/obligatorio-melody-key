// Integración mínima de UI para Reservar e Historial usando funciones simples de librería

function reservar() {
  let campoCantidadEntradas = document.querySelector("#txtCantidad");
  let etiquetaPrecioUnitario = document.querySelector("#precioUnitario");
  let etiquetaCuposDisponibles = document.querySelector("#cuposDisponibles");
  let etiquetaMontoTotal = document.querySelector("#montoTotal");
  let botonSolicitarReserva = document.querySelector("#btnSolicitaReserva");
  let mensajeReserva = document.querySelector("#pMensaje");

  if (!campoCantidadEntradas || !etiquetaPrecioUnitario || !etiquetaCuposDisponibles || !etiquetaMontoTotal || !botonSolicitarReserva) {
    return;
  }

  function actualizar() {
    let cantidadElegida = Number(campoCantidadEntradas.value);
    let precioUnitario = Number(etiquetaPrecioUnitario.innerHTML);
    let cuposDisponibles = Number(etiquetaCuposDisponibles.innerHTML);

    let monto = precioUnitario * cantidadElegida;
    if (cantidadElegida >= 4) {
      monto = monto - (monto * 0.1); // 10% descuento
    }
    etiquetaMontoTotal.innerHTML = monto;

    if (mensajeReserva) {
      if (!cantidadValida(cantidadElegida)) {
        mensajeReserva.innerHTML = "Cantidad inválida";
      } else if (!validarCuposSuficientes(cantidadElegida, cuposDisponibles)) {
        mensajeReserva.innerHTML = "No hay cupos suficientes";
      } else {
        mensajeReserva.innerHTML = "";
      } 
    }
  }

  campoCantidadEntradas.addEventListener("input", function () {
    actualizar();
  });

  botonSolicitarReserva.addEventListener("click", clickSolicitar);

  function clickSolicitar() {
    actualizar();
  }

  actualizar();
}

function historial() {
  let cuerpoHistorial = document.querySelector("#tblHistorial");
  let etiquetaTotalAprobadas = document.querySelector("#totalAprobadas");
  if (!cuerpoHistorial || !etiquetaTotalAprobadas) {
    return;
  }

  let filasHistorial = cuerpoHistorial.children; // HTMLCollection de <tr>
  let total = 0;
  for (let i = 0; i < filasHistorial.length; i++) {
    let celdasHistorial = filasHistorial[i].children; // HTMLCollection de <td>
    if (celdasHistorial && celdasHistorial.length >= 4) {
      let textoEstado = celdasHistorial[3].innerHTML;
      if (textoEstado && textoEstado.toLowerCase().indexOf("aprobada") !== -1) {
        let textoMonto = celdasHistorial[2].innerHTML;
        let montoFila = Number(textoMonto);
        if (!(montoFila > 0)) {
          montoFila = 0;
        }
        total = total + montoFila;
      }
    }
  }
  etiquetaTotalAprobadas.innerHTML = total;
}

// Llamadas directas (el script está al final del body en index.html)
reservar();
historial();


