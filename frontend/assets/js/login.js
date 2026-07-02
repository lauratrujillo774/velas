const showToast = (title, icon = "success") => {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true
    });
};

const validateForm = (form) => {
    if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return false;
    }
    return true;
};

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");
    const registerForm = document.querySelector("#registerForm");
    const forgotForm = document.querySelector("#forgotForm");
    const googleLogin = document.querySelector("#googleLogin");
    const photoInput = document.querySelector("#photoInput");
    const photoPreview = document.querySelector("#photoPreview");

    loginForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!validateForm(loginForm)) return;
        showToast("Ingreso exitoso");
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 650);
    });

    googleLogin?.addEventListener("click", () => {
        showToast("Login con Google simulado", "info");
    });

    registerForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const password = document.querySelector("#registerPassword")?.value;
        const confirm = document.querySelector("#confirmPassword")?.value;

        if (!validateForm(registerForm)) return;

        if (password !== confirm) {
            Swal.fire("Contraseñas diferentes", "Verifica que ambas contraseñas coincidan.", "warning");
            return;
        }

        Swal.fire({
            icon: "success",
            title: "Cuenta creada",
            text: "Registro simulado correctamente."
        }).then(() => {
            window.location.href = "login.html";
        });
    });

    forgotForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const password = document.querySelector("#newPassword")?.value;
        const confirm = document.querySelector("#newPasswordConfirm")?.value;

        if (!validateForm(forgotForm)) return;

        if (password !== confirm) {
            Swal.fire("Contraseñas diferentes", "La nueva contraseña no coincide.", "warning");
            return;
        }

        Swal.fire("Contraseña actualizada", "Puedes iniciar sesión con tu nueva contraseña.", "success")
            .then(() => window.location.href = "login.html");
    });

    photoInput?.addEventListener("change", () => {
        const file = photoInput.files?.[0];
        if (!file) return;
        photoPreview.src = URL.createObjectURL(file);
    });
});
