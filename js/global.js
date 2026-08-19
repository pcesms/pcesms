/* =========================================================
   PCESMS - GLOBAL JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS DEL DOM
       ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const menuButton = document.getElementById("menu-button");
    const closeButton = document.getElementById("sidebar-close");
    const overlay = document.getElementById("sidebar-overlay");



    /* =====================================================
       SIDEBAR
       ===================================================== */

    function openSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.add("open");

        if (overlay) {
            overlay.classList.add("active");
        }

        document.body.classList.add("sidebar-open");
    }


    function closeSidebar() {

        if (!sidebar) {
            return;
        }

        sidebar.classList.remove("open");

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.classList.remove("sidebar-open");
    }


    /* =====================================================
       BOTÓN MENÚ
       ===================================================== */

    if (menuButton) {

        menuButton.addEventListener("click", () => {

            if (sidebar && sidebar.classList.contains("open")) {

                closeSidebar();

            } else {

                openSidebar();

            }

        });

    }


    /* =====================================================
       BOTÓN CERRAR
       ===================================================== */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================================
       OVERLAY
       ===================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================================
       ESC PARA CERRAR
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeSidebar();

        }

    });


    /* =====================================================
       NAVEGACIÓN DEL SIDEBAR
       ===================================================== */

    if (sidebar) {

        const navigationItems =
            sidebar.querySelectorAll(".nav-item");


        navigationItems.forEach(item => {

            item.addEventListener("click", () => {

                /*
                 * En móvil cerramos el menú después
                 * de seleccionar una sección.
                 */

                closeSidebar();

            });

        });

    }


    /* =====================================================
       DETECTAR PÁGINA ACTUAL
       ===================================================== */

    function setActiveNavigation() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop();


        if (!currentPage) {
            return;
        }


        const navigationItems =
            document.querySelectorAll(
                ".sidebar .nav-item"
            );


        navigationItems.forEach(item => {

            const href =
                item.getAttribute("href");


            if (!href || href === "#") {
                return;
            }


            const linkPage =
                href.split("/")
                    .pop()
                    .split("?")[0];


            if (linkPage === currentPage) {

                item.classList.add("active");

            } else {

                item.classList.remove("active");

            }

        });

    }


    setActiveNavigation();



    /* =====================================================
       BLOQUEAR SCROLL CON SIDEBAR ABIERTO
       ===================================================== */

    function updateBodyScroll() {

        if (
            window.innerWidth <= 1050 &&
            sidebar &&
            sidebar.classList.contains("open")
        ) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

    }


    /*
     * Actualizamos cuando cambia el tamaño
     * de la ventana.
     */

    window.addEventListener(
        "resize",
        updateBodyScroll
    );


    /*
     * Observamos cambios en el sidebar para
     * bloquear/desbloquear el scroll.
     */

    if (sidebar) {

        const observer =
            new MutationObserver(updateBodyScroll);


        observer.observe(sidebar, {
            attributes: true,
            attributeFilter: ["class"]
        });

    }


    updateBodyScroll();



    /* =====================================================
       BOTONES SIN DESTINO
       ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

        });

    });


    /* =====================================================
       LOGOUT
       ===================================================== */

    const logoutButton =
        document.querySelector(".logout");


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            event => {

                /*
                 * De momento no existe autenticación.
                 *
                 * Cuando tengamos backend aquí
                 * limpiaremos la sesión y
                 * redirigiremos al login.
                 */

                event.preventDefault();

                window.location.href =
                    "index.html";

            }
        );

    }


    /* =====================================================
       UTILIDADES GLOBALES
       ===================================================== */

    window.PCESMS = {

        version: "0.1.0",

        openSidebar,

        closeSidebar

    };

});
