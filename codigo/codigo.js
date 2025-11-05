let miSistema = new Sistema();


document.querySelector("#btnPrueba").addEventListener("click", pruebaSistema)

    function pruebaSistema ()
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



document.querySelector("#btnListarDisponibles").addEventListener("click", conciertosDisponibles)

    function conciertosDisponibles()
    {
        let listaDisponibles = miSistema.explorarConciertosDisponibles();
        console.log(listaDisponibles);
    }
    