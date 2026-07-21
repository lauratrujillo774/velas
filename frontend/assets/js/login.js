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

    loginForm?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!validateForm(loginForm)) return;

        const formData = new FormData(loginForm);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log("Respuesta del login:", data);

            if (!response.ok) {
                showToast(data.message || "No se pudo iniciar sesión", "error");
                return;
            }

            showToast("Ingreso exitoso");
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 650);
        } catch (error) {
            console.error("Error en el login:", error);
            showToast("No se pudo conectar con el servidor", "error");
        }
    });

    googleLogin?.addEventListener("click", () => {
        showToast("Login con Google simulado", "info");
    });

    registerForm?.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!validateForm(registerForm)) return;

        const formData = new FormData(registerForm);
        const firstName = formData.get("firstName")?.toString().trim();
        const lastName = formData.get("lastName")?.toString().trim();
        const username = formData.get("username")?.toString().trim();
        const phone = formData.get("phone")?.toString().trim();
        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString();
        const confirmPassword = formData.get("confirmPassword")?.toString();
        const photoInputValue = formData.get("photoInput");
        

        if (!firstName || !lastName || !username || !phone || !email || !password || !confirmPassword) {
            showToast("Completa todos los campos obligatorios", "warning");
            return;
        }

        if (password !== confirmPassword) {
            Swal.fire("Contraseñas diferentes", "Verifica que ambas contraseñas coincidan.", "warning");
            return;
        }

        const name = [firstName, lastName].filter(Boolean).join(" ").trim();

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, confirmPassword, username, phone, img: photoInputValue.file })
            });

            const data = await response.json();
            console.log("Respuesta del registro:", data);

            if (!response.ok) {
                showToast(data.message || "No se pudo registrar el usuario", "error");
                return;
            }



  

            Swal.fire({
                icon: "success",
                title: "Cuenta creada",
                text: data.message || "Registro correcto."
            }).then(() => {
                window.location.href = "login.html";
            });
        } catch (error) {
            console.error("Error en el registro:", error);
            showToast("No se pudo conectar con el servidor", "error");
        }
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
