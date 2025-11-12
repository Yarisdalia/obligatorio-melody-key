function esAdmin(user) {
  return user && user instanceof Administrador;
}

function esCliente(user) {
  return user && user instanceof Cliente;
}
