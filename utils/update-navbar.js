function actualizarNavbar() {
  const usuarioLogueado = sistema.usuarioLogueado;
  const isAdmin = esAdmin(usuarioLogueado);
  const isCliente = esCliente(usuarioLogueado);

  const navInicio = document.querySelector("#navInicio");
  const navRegistro = document.querySelector("#navRegistro");
  const navExplorar = document.querySelector("#navExplorar");
  const navOfertas = document.querySelector("#navOfertas");
  const navHistorial = document.querySelector("#navHistorial");
  const navAgregar = document.querySelector("#navAgregar");
  const navAdministrar = document.querySelector("#navAdministrar");
  const navProcesar = document.querySelector("#navProcesar");
  const navGanancias = document.querySelector("#navGanancias");
  const navUsuario = document.querySelector("#navUsuario");
  const btnLogout = document.querySelector("#btnCerrarSesion");

  // --- IF usuario no logueado ---
  if (!usuarioLogueado) {
    navInicio.style.display = "block";
    navRegistro.style.display = "block";
    navExplorar.style.display = "none";
    navOfertas.style.display = "none";
    navHistorial.style.display = "none";
    navAgregar.style.display = "none";
    navAdministrar.style.display = "none";
    navProcesar.style.display = "none";
    navGanancias.style.display = "none";
    navUsuario.innerHTML = "";
    btnLogout.style.display = "none";
  }

  // --- IF cliente logueado ---
  if (usuarioLogueado && isCliente) {
    navInicio.style.display = "none";
    navRegistro.style.display = "none";
    navExplorar.style.display = "block";
    navOfertas.style.display = "block";
    navHistorial.style.display = "block";
    navAgregar.style.display = "none";
    navAdministrar.style.display = "none";
    navProcesar.style.display = "none";
    navGanancias.style.display = "none";
    navUsuario.innerHTML = "Hola, " + usuarioLogueado.nombre;
    btnLogout.style.display = "block";
  }

  // --- IF admin logueado ---
  if (usuarioLogueado && isAdmin) {
    navInicio.style.display = "none";
    navRegistro.style.display = "none";
    navExplorar.style.display = "none";
    navOfertas.style.display = "none";
    navHistorial.style.display = "none";
    navAgregar.style.display = "block";
    navAdministrar.style.display = "block";
    navProcesar.style.display = "block";
    navGanancias.style.display = "block";
    navUsuario.innerHTML = "Hola, " + usuarioLogueado.nombre;
    btnLogout.style.display = "block";
  }
}
