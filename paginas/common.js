// Inicialización y ruteo simple por hash
(function () {
    window.app = window.app || {};
    window.pages = window.pages || {};

    function inicializarSistema() {
        if (window.app.system) return;
        const system = new Sistema();
        // Precarga simple sin chequeos avanzados
        precargarDatos(system);
        window.app.system = system;
        window.app.preselectedConciertoId = null;
    }

    function esAdmin(user) {
        return user && (user instanceof Administrador);
    }

    function esCliente(user) {
        return user && (user instanceof Cliente);
    }

    function setDisplay(id, show) {
        const el = document.getElementById(id);
        if (!el) return;
        el.style.display = show ? "" : "none";
    }

    function updateNavbar() {
        const user = window.app.system.usuarioLogueado;
        const isAdmin = esAdmin(user);
        const isCliente = esCliente(user);
        // Visibilidad por rol
        setDisplay("navRegistro", !user);
        setDisplay("navExplorar", !!isCliente);
        setDisplay("navOfertas", !!isCliente);
        setDisplay("navReservar", !!isCliente);
        setDisplay("navHistorial", !!isCliente);
        setDisplay("navAdmin", !!isAdmin);
        // Usuario y logout
        const navUsuario = document.getElementById("navUsuario");
        const btnLogout = document.getElementById("btnCerrarSesion");
        if (user) {
            if (navUsuario) navUsuario.textContent = `Hola, ${user.nombre}`;
            if (btnLogout) btnLogout.style.display = "";
        } else {
            if (navUsuario) navUsuario.textContent = "";
            if (btnLogout) btnLogout.style.display = "none";
        }
    }

    function ensureAllowedRoute() {
        const user = window.app.system.usuarioLogueado;
        const hash = window.location.hash || "#login";
        const adminPages = ["#agregar", "#admin", "#procesar", "#ganancias"];
        const clientPages = ["#explorar", "#oferta", "#reservar", "#historial"];
        // Si no logueado: solo login y registro
        if (!user) {
            if (hash !== "#login" && hash !== "#registro") {
                window.location.hash = "#login";
                return false;
            }
            return true;
        }
        // Si admin: bloquear pantallas de cliente
        if (esAdmin(user) && clientPages.indexOf(hash) !== -1) {
            window.location.hash = "#admin";
            return false;
        }
        // Si cliente: bloquear pantallas de admin
        if (esCliente(user) && adminPages.indexOf(hash) !== -1) {
            window.location.hash = "#explorar";
            return false;
        }
        return true;
    }

    function route() {
        const hash = window.location.hash || "#login";
        if (!ensureAllowedRoute()) return;
        updateNavbar();
        if (hash === "#explorar" && window.pages.renderExplorar) {
            window.pages.renderExplorar();
        } else if (hash === "#reservar" && window.pages.renderReservar) {
            window.pages.renderReservar();
        } else if (hash === "#historial" && window.pages.renderHistorial) {
            window.pages.renderHistorial();
        } else if (hash === "#oferta" && window.pages.renderOfertas) {
            window.pages.renderOfertas();
        } else if (hash === "#agregar" && window.pages.wireAdminAgregar) {
            window.pages.wireAdminAgregar();
        } else if (hash === "#admin" && window.pages.renderAdminConciertos) {
            window.pages.renderAdminConciertos();
        } else if (hash === "#procesar" && window.pages.renderProcesarReservas) {
            window.pages.renderProcesarReservas();
        } else if (hash === "#ganancias" && window.pages.renderGanancias) {
            window.pages.renderGanancias();
        }
    }

    function boot() {
        inicializarSistema();
        // Logout
        const btnLogout = document.getElementById("btnCerrarSesion");
        if (btnLogout) {
            btnLogout.onclick = function () {
                window.app.system.cerrarSesion();
                updateNavbar();
                window.location.hash = "#login";
            };
        }
        // Exponer para uso desde otras páginas
        window.app.updateNavbar = updateNavbar;
        updateNavbar();
        window.addEventListener("hashchange", route);
        route();
        // Re-forzar una pasada de ruteo tras carga de todos los módulos
        setTimeout(route, 0);
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
        boot();
    } else {
        document.addEventListener("DOMContentLoaded", boot);
    }
})();


