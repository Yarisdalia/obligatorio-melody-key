// Página: Login
(function () {
    window.pages = window.pages || {};

    function onIniciarSesion() {
        const system = window.app.system;
        var elUsuario = document.getElementById("txtLoginUsuario");
        var elContrasena = document.getElementById("txtLoginContrasena");
        const usuario = elUsuario ? elUsuario.value.trim() : "";
        const contrasena = elContrasena ? elContrasena.value : "";
        const mensaje = system.iniciarSesion(usuario, contrasena);
        const p = document.getElementById("pLoginMensaje");
        if (p) p.textContent = mensaje;
        if (mensaje.startsWith("Bienvenido")) {
            if (window.app.updateNavbar) window.app.updateNavbar();
            // Redirigir según rol
            if (system.usuarioLogueado instanceof Administrador) {
                window.location.hash = "#admin";
            } else {
                window.location.hash = "#explorar";
            }
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const btn = document.getElementById("btnIniciarSesion");
        if (btn) btn.onclick = onIniciarSesion;
    });
})();


