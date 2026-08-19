/* =========================================================
   PCESMS - LOGIN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const form =
        document.getElementById("login-form");

    const usernameInput =
        document.getElementById("username");

    const passwordInput =
        document.getElementById("password");

    const rememberInput =
        document.getElementById("remember");

    const loginButton =
        document.getElementById("login-button");

    const loginButtonText =
        document.getElementById("login-button-text");

    const loginSpinner =
        document.getElementById("login-spinner");

    const errorMessage =
        document.getElementById("login-error");

    const togglePassword =
        document.getElementById("toggle-password");

    const togglePasswordIcon =
        document.getElementById(
            "password-toggle-icon"
        );

    const forgotPassword =
        document.querySelector(
            ".forgot-password"
        );


    /* =====================================================
       COMPROBAR QUE ESTAMOS EN EL LOGIN
       ===================================================== */

    if (!form) {
        return;
    }


    /* =====================================================
       MOSTRAR / OCULTAR CONTRASEÑA
       ===================================================== */

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            () => {

                const isPassword =
                    passwordInput.type === "password";


                passwordInput.type =
                    isPassword
                        ? "text"
                        : "password";


                togglePassword.setAttribute(
                    "aria-pressed",
                    isPassword
                );


                togglePassword.setAttribute(
                    "aria-label",
                    isPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                );


                if (togglePasswordIcon) {

                    togglePasswordIcon.textContent =
                        isPassword
                            ? "Ocultar"
                            : "Mostrar";

                }

            }
        );

    }


    /* =====================================================
       ERROR
       ===================================================== */

    function showError(message) {

        if (!errorMessage) {
            return;
        }

        errorMessage.textContent = message;

        errorMessage.hidden = false;

    }


    function hideError() {

        if (!errorMessage) {
            return;
        }

        errorMessage.textContent = "";

        errorMessage.hidden = true;

    }


    /* =====================================================
       ESTADO DE CARGA
       ===================================================== */

    function setLoading(loading) {

        if (loginButton) {

            loginButton.disabled = loading;

        }


        if (loginButtonText) {

            loginButtonText.hidden = loading;

        }


        if (loginSpinner) {

            loginSpinner.hidden = !loading;

        }

    }


    /* =====================================================
       VALIDACIÓN
       ===================================================== */

    function validateForm() {

        hideError();


        const username =
            usernameInput.value.trim();


        const password =
            passwordInput.value;


        if (!username) {

            showError(
                "Introduce tu nombre de usuario."
            );

            usernameInput.focus();

            return false;

        }


        if (!password) {

            showError(
                "Introduce tu contraseña."
            );

            passwordInput.focus();

            return false;

        }


        if (username.length < 3) {

            showError(
                "El usuario debe tener al menos 3 caracteres."
            );

            usernameInput.focus();

            return false;

        }


        return true;

    }


    /* =====================================================
       LOGIN
       ===================================================== */

    async function login(username, password) {

        /*
         * ==================================================
         * TEMPORAL
         * ==================================================
         *
         * Actualmente no tenemos backend.
         *
         * Esta función simula una petición al servidor.
         *
         * Posteriormente sustituiremos esta parte por:
         *
         * const response = await fetch(...);
         *
         * ==================================================
         */


        await new Promise(resolve => {

            setTimeout(resolve, 900);

        });


        /*
         * Usuario temporal para probar el frontend.
         *
         * IMPORTANTE:
         *
         * Esto NO será el sistema definitivo.
         */

        if (
            username === "admin" &&
            password === "admin"
        ) {

            return {

                success: true,

                user: {

                    username: "admin",

                    team: "Real Madrid"

                }

            };

        }


        return {

            success: false,

            message:
                "Usuario o contraseña incorrectos."

        };

    }


    /* =====================================================
       GUARDAR SESIÓN TEMPORAL
       ===================================================== */

    function saveSession(user) {

        const session = {

            authenticated: true,

            username: user.username,

            team: user.team,

            loginTime: Date.now()

        };


        /*
         * Recordarme:
         *
         * localStorage
         *
         * No recordarme:
         *
         * sessionStorage
         */

        if (
            rememberInput &&
            rememberInput.checked
        ) {

            localStorage.setItem(
                "pcesms_session",
                JSON.stringify(session)
            );

        } else {

            sessionStorage.setItem(
                "pcesms_session",
                JSON.stringify(session)
            );

        }

    }


    /* =====================================================
       REDIRECCIÓN
       ===================================================== */

    function redirectToDashboard() {

        window.location.href =
            "home.html";

    }


    /* =====================================================
       SUBMIT
       ===================================================== */

    form.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            if (!validateForm()) {

                return;

            }


            const username =
                usernameInput.value.trim();


            const password =
                passwordInput.value;


            setLoading(true);


            try {

                const result =
                    await login(
                        username,
                        password
                    );


                if (!result.success) {

                    showError(
                        result.message
                    );

                    passwordInput.focus();

                    return;

                }


                saveSession(
                    result.user
                );


                redirectToDashboard();


            } catch (error) {

                console.error(
                    "Error de login:",
                    error
                );


                showError(
                    "No se ha podido conectar con el servidor."
                );

            } finally {

                setLoading(false);

            }

        }
    );


    /* =====================================================
       LIMPIAR ERROR AL ESCRIBIR
       ===================================================== */

    usernameInput.addEventListener(
        "input",
        hideError
    );


    passwordInput.addEventListener(
        "input",
        hideError
    );


    /* =====================================================
       ENTER EN USUARIO
       ===================================================== */

    usernameInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                passwordInput.focus();

            }

        }
    );


    /* =====================================================
       RECORDAR SESIÓN
       ===================================================== */

    function checkExistingSession() {

        const localSession =
            localStorage.getItem(
                "pcesms_session"
            );


        const temporarySession =
            sessionStorage.getItem(
                "pcesms_session"
            );


        const session =
            localSession ||
            temporarySession;


        if (!session) {
            return;
        }


        try {

            const data =
                JSON.parse(session);


            if (
                data &&
                data.authenticated
            ) {

                redirectToDashboard();

            }

        } catch (error) {

            console.warn(
                "Sesión inválida.",
                error
            );


            localStorage.removeItem(
                "pcesms_session"
            );


            sessionStorage.removeItem(
                "pcesms_session"
            );

        }

    }


    /* =====================================================
       RECUPERACIÓN DE CONTRASEÑA
       ===================================================== */

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            event => {

                event.preventDefault();


                showError(
                    "La recuperación de contraseña estará disponible próximamente."
                );

            }
        );

    }


    /* =====================================================
       INICIO
       ===================================================== */

    checkExistingSession();

});
