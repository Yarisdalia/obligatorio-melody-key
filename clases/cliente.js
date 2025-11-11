class Cliente
{
    constructor(id, nombre, apellido, usuario, contrasena, saldo)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;     // Nombre de usuario
        this.contrasena = contrasena;
        this.saldo = saldo;
    }

    tieneSaldo(monto)
    {
        return this.saldo >= monto;
    }

    descontarSaldo(monto)
    {
        this.saldo = this.saldo - monto;
        if (this.saldo < 0)
        {
            this.saldo = 0;
        }
    }
}