const sistema = new Sistema();

function iniciarTodoElSistema() {
  precargarDatos(sistema);
  updateNavbar();
  iniciarNavegacion();
}

iniciarTodoElSistema();
