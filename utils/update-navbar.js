function actualizarNavbar() {
  const user = sistema.usuarioLogueado;
  const isAdmin = esAdmin(user);
  const isCliente = esCliente(user);

  const navInicio = document.querySelector("#navInicio");
  const navRegistro = document.querySelector("#navRegistro");
  const navExplorar = document.querySelector("#navExplorar");
  const navOfertas = document.querySelector("#navOfertas");
  const navReservar = document.querySelector("#navReservar");
  const navHistorial = document.querySelector("#navHistorial");
  const navAdmin = document.querySelector("#navAdmin");
  const navUsuario = document.querySelector("#navUsuario");
  const btnLogout = document.querySelector("#btnCerrarSesion");

  // --- IF usuario no logueado ---
  if (!user) {
    navInicio.style.display = "block";
    navRegistro.style.display = "block";
    navExplorar.style.display = "none";
    navOfertas.style.display = "none";
    navReservar.style.display = "none";
    navHistorial.style.display = "none";
    navAdmin.style.display = "none";
    navUsuario.textContent = "";
    btnLogout.style.display = "none";
  }

  // --- IF cliente logueado ---
  if (user && isCliente) {
    navInicio.style.display = "none";
    navRegistro.style.display = "none";
    navExplorar.style.display = "block";
    navOfertas.style.display = "block";
    navReservar.style.display = "block";
    navHistorial.style.display = "block";
    navAdmin.style.display = "none";
    navUsuario.textContent = "Hola, " + user.nombre;
    btnLogout.style.display = "block";
  }

  // --- IF admin logueado ---
  if (user && isAdmin) {
    navInicio.style.display = "none";
    navRegistro.style.display = "none";
    navExplorar.style.display = "none";
    navOfertas.style.display = "none";
    navReservar.style.display = "none";
    navHistorial.style.display = "none";
    navAdmin.style.display = "block";
    navUsuario.textContent = "Hola, " + user.nombre;
    btnLogout.style.display = "block";
  }
}
