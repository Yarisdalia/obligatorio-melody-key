// Precarga de datos para el sistema (conciertos, clientes, reservas y administradores)
function precargarDatos(system) {
  // =========================
  // 1) Conciertos
  // =========================

  // Conciertos: id, nombre, artista, precio, descripcion, imagen, cupos, estado, oferta
  system.conciertos.push(
    new Concierto(obtenerIdConcierto(), "Morat Live", "Morat", 6500, "Gran show del pop latino en Antel Arena", "morat.jpg", 5000, "activo", true),
    new Concierto(obtenerIdConcierto(), "La Beriso Tour", "La Beriso", 4500, "Rock argentino clásico en Teatro de Verano", "laberiso.jpg", 3000, "activo", true),
    new Concierto(obtenerIdConcierto(), "Babasonicos Regreso", "Babasonicos", 7000, "Regreso de Babasonicos a Montevideo en Antel Arena", "babasonicos.jpg", 4000, "activo", false),
    new Concierto(obtenerIdConcierto(), "Silvio Rodríguez En Vivo", "Silvio Rodríguez", 5500, "Trova cubana contemporánea en Antel Arena", "silviorodriguez.jpg", 2000, "activo", true),
    new Concierto(obtenerIdConcierto(), "Rock Park Fest", "Rock Park Fest (varios)", 3000, "Festival de rock en Velódromo Municipal", "rockpark.jpg", 8000, "activo", false),
    new Concierto(obtenerIdConcierto(), "Shakira World Tour", "Shakira", 9000, "Show internacional en Estadio Centenario", "shakira.jpg", 60000, "activo", true),
    new Concierto(obtenerIdConcierto(), "Master DY Metal", "Master DY", 3500, "Metal europeo en Teatro Central", "masterdy.jpg", 1500, "activo", false),
    new Concierto(obtenerIdConcierto(), "Jazz Nights Montevideo", "Jazz Trio", 2500, "Noches de jazz en la Sala Zitarrosa", "jazznights.jpg", 500, "activo", false),
    new Concierto(obtenerIdConcierto(), "Festival Electrónico SITIO", "DJs internacionales", 2000, "Carpa SITIO en Velódromo electrónica y club", "electrositio.jpg", 10000, "activo", false),
    new Concierto(obtenerIdConcierto(), "Evento Especial Montevideo", "Artista Popular", 4000, "Concierto especial con cupos agotados", "evento_especial.jpg", 0, "pausado", false),
  );

  // =========================
  // 2) Clientes
  // =========================

  // Clientes: id, nombre, apellido, usuario, contraseña, saldo
  system.clientes.push(
    new Cliente(obtenerIdCliente(), "Ana", "Perez", "anaperez", "Ana12", 20000),
    new Cliente(obtenerIdCliente(), "Bruno", "Lopez", "brunolo", "Bruno1", 9000),
    new Cliente(obtenerIdCliente(), "Carla", "Suarez", "carsu", "Carla1", 15000),
    new Cliente(obtenerIdCliente(), "Diego", "Gomez", "diegog", "Diego1", 10000),
    new Cliente(obtenerIdCliente(), "Elena", "Ramos", "elir", "Elena1", 8000),
    new Cliente(obtenerIdCliente(), "Fabian", "Silva", "fabis", "Fabian1", 7000),
    new Cliente(obtenerIdCliente(), "Gabriela", "Vega", "gabiv", "Gabi12", 12000),
    new Cliente(obtenerIdCliente(), "Hector", "Mendez", "hecm", "Hector1", 6000),
    new Cliente(obtenerIdCliente(), "Irene", "Diaz", "irend", "Irene1", 4000),
    new Cliente(obtenerIdCliente(), "Joaquin", "Paz", "joap", "Joaquin1", 11000),
  );

  // =========================
  // 3) Atajos para conciertos y clientes
  // =========================

  // Conciertos
  var c1 = system.conciertos[0];
  var c2 = system.conciertos[1];
  var c3 = system.conciertos[2];
  var c4 = system.conciertos[3];
  var c5 = system.conciertos[4];
  var c6 = system.conciertos[5];
  var c7 = system.conciertos[6];
  var c8 = system.conciertos[7];
  var c9 = system.conciertos[8];

  // Clientes
  var u1 = system.clientes[0];
  var u2 = system.clientes[1];
  var u3 = system.clientes[2];
  var u4 = system.clientes[3];
  var u5 = system.clientes[4];
  var u6 = system.clientes[5];
  var u7 = system.clientes[6];
  var u8 = system.clientes[7];
  var u9 = system.clientes[8];
  var u10 = system.clientes[9];

  // =========================
  // 4) Helper para registrar reserva
  // =========================

  function registrarReserva(reserva) {
    system.reservas.push(reserva);

    // Solo procesamos las aprobadas
    if (reserva.estado === "aprobada") {
      var total = reserva.montoTotal();

      var tieneSaldo = reserva.cliente.saldo >= total;
      var hayCupos = reserva.concierto.cupos >= reserva.cantidad;

      if (tieneSaldo && hayCupos) {
        // Descontar saldo y cupos
        reserva.cliente.saldo = reserva.cliente.saldo - total;
        reserva.concierto.cupos = reserva.concierto.cupos - reserva.cantidad;

        // Si se quedó sin cupos, se pausa el concierto
        if (reserva.concierto.cupos === 0) {
          reserva.concierto.estado = "pausado";
        }
      } else {
        // No alcanza saldo o cupos: la reserva vuelve a "pendiente"
        reserva.estado = "pendiente";
      }
    }
  }

  // =========================
  // 5) Reservas de ejemplo
  // =========================

  registrarReserva(new Reserva(obtenerIdReserva(), u1, c1, 2, "aprobada"));
  registrarReserva(new Reserva(obtenerIdReserva(), u2, c2, 1, "pendiente"));
  registrarReserva(new Reserva(obtenerIdReserva(), u3, c2, 3, "cancelada"));
  registrarReserva(new Reserva(obtenerIdReserva(), u4, c3, 1, "aprobada"));
  registrarReserva(new Reserva(obtenerIdReserva(), u5, c4, 4, "pendiente"));
  registrarReserva(new Reserva(obtenerIdReserva(), u6, c5, 2, "aprobada"));
  registrarReserva(new Reserva(obtenerIdReserva(), u7, c6, 1, "pendiente"));
  registrarReserva(new Reserva(obtenerIdReserva(), u8, c7, 2, "cancelada"));
  registrarReserva(new Reserva(obtenerIdReserva(), u9, c8, 1, "aprobada"));
  registrarReserva(new Reserva(obtenerIdReserva(), u10, c9, 5, "pendiente"));

  // =========================
  // 6) Administradores
  // =========================

  // Administradores: id, nombre, usuario, contraseña
  system.administradores.push(
    new Administrador(obtenerIdAdministrador(), "Alice", "admin1", "Admin1A"),
    new Administrador(obtenerIdAdministrador(), "Bruno", "admin2", "Admin2B"),
    new Administrador(obtenerIdAdministrador(), "Carla", "admin3", "Admin3C"),
    new Administrador(obtenerIdAdministrador(), "Diego", "admin4", "Admin4D"),
    new Administrador(obtenerIdAdministrador(), "Elena", "admin5", "Admin5E"),
  );
}
