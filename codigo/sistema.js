
class Sistema {
    constructor() {
        this.clientes = [];
        this.administradores = [];
        this.conciertos = [];
        this.reservas = [];

        // Contadores autoincrementales
        // --------- OJO! SI HAY "PRECARGADOS", LOS ID SE INICIALIZAN EN EL NUM. CORRESPONDIENTE ------------------
        this.idCliente = 1;
        this.idAdministrador = 1;
        this.idConcierto = 1;
        this.idReserva = 1;

        // Propiedad para validar el usuario logueado.
        this.usuarioLogueado = null;
    }



 //_____________________________ F01 - REGISTRO DE CLIENTE (HECHO)___________________________________

    agregarUsuario(nombre, apellido, usuario, contrasena, confirmarContrasena)
    {
        let mensaje = "";
        //Definimos variables locales para no tener que usar "this." todo el tiempo
        let clientes = this.clientes;

        // Validamos que todos los campos son cumplimentados.
        if (!nombre || !apellido || !usuario || !contrasena || !confirmarContrasena)
        {
            mensaje = "Todos los campos son obligatorios.";
            return mensaje;
        }

        else if (existePropiedad(clientes, "usuario", usuario)) //Funcion en librería
        {
            mensaje = "El nombre de usuario ya existe.";
            return mensaje;
        }

        else if (!validarContrasena(contrasena)) //Funcion en librería
        {
            mensaje = "Debe ingresar una contraseña válida."
            return mensaje;
        }

        else if (contrasena !== confirmarContrasena)
        {
            mensaje = "Las contraseñas no coinciden.";
            return mensaje;
        }

        else
        {
            let nuevoCliente = new Cliente(obtenerIdCliente(), nombre, apellido, usuario, contrasena, 10000);
            clientes.push(nuevoCliente);
            mensaje = "Registro exitoso.";
        }

        return mensaje;
    }




    //_____________________________ F02 - INICIO DE SESION (HECHO) __________________________________________________________
// Misma página para clientes y adm. el nombre de usuario identifica el perfil de usuario.
// O hacer un select???

  iniciarSesion(usuario, contrasena)
{
    let mensaje = "";
    let clientes = this.clientes;
    let administradores = this.administradores;
    let esAdmin = false;
    let esCliente = false;

    // Validar campos vacios
    if (!usuario || !contrasena)
    {
        return mensaje = "Los campos no pueden estar vacíos";
    }

    // Determinar tipo de usuario (admin / cliente)
    esAdmin = existePropiedad(administradores, "usuario", usuario);

    if (!esAdmin)
    {
        esCliente = existePropiedad(clientes, "usuario", usuario);
    }

    if (!esAdmin && !esCliente)
    {
        return mensaje = "Usuario no encontrado";
    }

    // Validar contraseña
    if (esAdmin)
    {
        for (let i = 0; i < administradores.length; i++)
        {
            if (administradores[i].usuario.toLowerCase() === usuario.toLowerCase())
            {
                if (administradores[i].contrasena === contrasena)
                {
                    this.usuarioLogueado = administradores[i]; //Asignamos el objeto administrador a usuarioLogueado
                    return mensaje = "Bienvenido" + this.usuarioLogueado.nombre;
                }
                else
                {
                    return mensaje = "Contraseña incorrecta";
                }
            }
        }
    }
    else
    {
        for (let i = 0; i < clientes.length; i++)
        {
            if (clientes[i].usuario.toLowerCase() === usuario.toLowerCase())
            {
                if (clientes[i].contrasena === contrasena)
                {
                    this.usuarioLogueado = clientes[i]; //Asignamos el objeto cliente a usuarioLogueado
                    return mensaje = "Bienvenido" + this.usuarioLogueado.nombre;
                }
                else
                {
                    return mensaje = "Contraseña incorrecta";
                }
            }
        }
    }
}

//_____________________________ F0? - CIERRE DE SESION (HECHO) ______________________________________________
//Debera constar de un boton en el nav? nav fijo

cerrarSesion()
{
    this.usuarioLogueado = null; //usuarioLogueado guarda un objeto, lo vaciamos.
    return mensaje = "Sesión cerrada";
}



//_________________________ F03 EXPLORAR CONCIERTOS DISPONIBLES (SERGIO) ____________________________________________________________________________
// Solo muestra conciertos activos con cupos disponibles

explorarConciertosDisponibles() 
{
    let conciertos = this.conciertos; 
    let conciertosDisponibles = []; // Array de conciertos disponibles

    for (let i = 0; i < conciertos.length; i++) 
    {
        if (conciertos[i].estado === "activo" && conciertos[i].cupos > 0) 
        {
            conciertosDisponibles.push(conciertos[i]);
        }
    }

    
    return conciertosDisponibles;
}

} //Fin Class Sistema <------------- TODO DENTRO DE SISTEM

//___________________________ F04 RESERVAR ENTRADAS (YARIS) __________________________________________________



/* function reservarEntradas()
{
    // Validar el usuario logueado!

    if (miSistema.usuarioActivo === null) {
        alert("Debes iniciar sesión para ver tus reservas.");
        return;
    }

    
} 

agregarReserva(reserva)
{
    this.reservas.push(reserva);
}
*/



//______________________________ F05 – HISTORIAL DE RESERVAS (YARIS) ______________________________________________

// Validar el usuariologueado, usuarioLogueado guarda el objeto del cliente (id, nombre, contraseña... )
// Se utiliza usuarioLogueado para traer la info de sus reservas. 

/* function mostrarReservasCliente()
{
    if (miSistema.usuarioLogueado === null)
    {
        return Mensaje: "Debes iniciar sesión para ver tus reservas";
        
    }
    else
    {
       // código para mostrar las reservas del usuario activo 
    }

} */



//______________________________ F06 – CONCIERTOS EN OFERTA (YARIS) ________________________________








//______________________________ F07 – LISTAR Y PROCESAR RESERVAS (SERGIO) ________________________________






//______________________________ F08 – AGREGAR CONCIERTOS (SERGIO) ________________________________


agregarConcierto(nombre, artista, precio, descripcion, imagen, cupos, estado, oferta)
{
    // Generamos un id único usando la función de librería
    let idConcierto = obtenerIdConcierto();

    // Convertimos el booleano oferta a texto
    oferta = obtenerTextoOferta(oferta);

    // Creamos el objeto concierto
    let nuevoConcierto = new Concierto(idConcierto, nombre, artista, precio, descripcion, imagen, cupos, estado, oferta);

    // Agregamos al array "madre"
    this.conciertos.push(nuevoConcierto);
}


//______________________________ F09 – ADMINISTRAR CONCIERTOS (YARIS) ________________________________





//______________________________ F010 – INFORME DE GANANCIAS (SERGIO) ________________________________


Sistema.prototype.precargaDatos = function()
{
    // Conciertos: id, nombre, artista, precio, descripcion, imagen, cupos, oferta, estado
    this.conciertos.push(
        new Concierto(this.idConcierto++, "Morat Live", "Morat", 6500, "Gran show del pop latino en Antel Arena", "morat.jpg", 5000, false, "activo"),
        new Concierto(this.idConcierto++, "La Beriso Tour", "La Beriso", 4500, "Rock argentino clásico en Teatro de Verano", "laberiso.jpg", 3000, true, "activo"),
        new Concierto(this.idConcierto++, "Babasonicos Regreso", "Babasonicos", 7000, "Regreso de Babasonicos a Montevideo en Antel Arena", "babasonicos.jpg", 4000, false, "activo"),
        new Concierto(this.idConcierto++, "Silvio Rodríguez En Vivo", "Silvio Rodríguez", 5500, "Trova cubana contemporánea en Antel Arena", "silviorodriguez.jpg", 2000, true, "activo"),
        new Concierto(this.idConcierto++, "Rock Park Fest", "Rock Park Fest (varios)", 3000, "Festival de rock en Velódromo Municipal", "rockpark.jpg", 8000, false, "activo"),
        new Concierto(this.idConcierto++, "Shakira World Tour", "Shakira", 9000, "Show internacional en Estadio Centenario", "shakira.jpg", 60000, true, "activo"),
        new Concierto(this.idConcierto++, "Master DY Metal", "Master DY", 3500, "Metal europeo en Teatro Central", "masterdy.jpg", 1500, false, "activo"),
        new Concierto(this.idConcierto++, "Jazz Nights Montevideo", "Jazz Trio", 2500, "Noches de jazz en la Sala Zitarrosa", "jazznights.jpg", 500, false, "activo"),
        new Concierto(this.idConcierto++, "Festival Electrónico SITIO", "DJs internacionales", 2000, "Carpa SITIO en Velódromo electrónica y club", "electrositio.jpg", 10000, false, "activo"),
        new Concierto(this.idConcierto++, "Evento Especial Montevideo", "Artista Popular", 4000, "Concierto especial con cupos agotados", "evento_especial.jpg", 0, false, "pausado"));

};
