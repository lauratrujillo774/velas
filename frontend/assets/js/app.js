// Static JSON-like data used by every screen until a backend is connected.
const appData = {
    user: {
        name: "Laura Méndez",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/120?img=47"
    },
    tasks: [
        { id: 1, title: "Diseñar flujo de onboarding", description: "Pantallas iniciales para nuevos usuarios.", category: "Diseño", priority: "Alta", status: "Pendiente", date: "2026-07-04", assignee: "Laura", tags: ["UX", "Sprint"], color: "#ef4444" },
        { id: 2, title: "Crear API contract", description: "Definir endpoints de tareas.", category: "Backend", priority: "Media", status: "En progreso", date: "2026-07-05", assignee: "Carlos", tags: ["API"], color: "#f59e0b" },
        { id: 3, title: "Revisión visual del dashboard", description: "Pulir tarjetas KPI y gráficas.", category: "Frontend", priority: "Alta", status: "Revisión", date: "2026-07-06", assignee: "Ana", tags: ["UI"], color: "#ef4444" },
        { id: 4, title: "Publicar release notes", description: "Resumen de cambios para usuarios.", category: "Marketing", priority: "Baja", status: "Completada", date: "2026-07-07", assignee: "Mateo", tags: ["Docs"], color: "#22c55e" },
        { id: 5, title: "Auditar accesibilidad", description: "Labels, contraste y navegación por teclado.", category: "QA", priority: "Media", status: "Pendiente", date: "2026-07-09", assignee: "Laura", tags: ["A11y"], color: "#f59e0b" }
    ],
    categories: [
        { name: "Diseño", color: "#34B6A7", count: 12 },
        { name: "Frontend", color: "#3b82f6", count: 18 },
        { name: "Backend", color: "#8b5cf6", count: 9 },
        { name: "QA", color: "#f59e0b", count: 7 },
        { name: "Marketing", color: "#ef4444", count: 5 }
    ],
    tags: [
        { name: "Sprint", color: "#34B6A7", count: 8 },
        { name: "UX", color: "#3b82f6", count: 6 },
        { name: "API", color: "#8b5cf6", count: 5 },
        { name: "A11y", color: "#f59e0b", count: 4 },
        { name: "Docs", color: "#ef4444", count: 3 }
    ],
    activity: [
        "Laura creó una nueva tarea de onboarding.",
        "Carlos actualizó el estado de API contract.",
        "Ana comentó en Dashboard visual.",
        "Mateo completó release notes."
    ]
};

const pageMeta = {
    dashboard: ["Dashboard", "Resumen general de productividad y actividad."],
    tasks: ["Mis tareas", "Gestiona, filtra y organiza tareas con acciones rápidas."],
    kanban: ["Kanban", "Visualiza el flujo de trabajo por estado."],
    calendar: ["Calendario", "Planifica tareas en vista mensual, semanal o diaria."],
    categories: ["Categorías", "Administra grupos de tareas y colores."],
    tags: ["Etiquetas", "Clasifica tareas con etiquetas rápidas."],
    profile: ["Perfil", "Gestiona tu información personal."],
    settings: ["Configuración", "Personaliza tema, idioma y preferencias."]
};

const menuItems = [
    ["dashboard", "bi-grid-1x2", "Dashboard", "dashboard.html"],
    ["tasks", "bi-check2-circle", "Mis tareas", "tasks.html"],
    ["calendar", "bi-calendar3", "Calendario", "calendar.html"],
    ["categories", "bi-folder2-open", "Categorías", "categories.html"],
    ["tags", "bi-tags", "Etiquetas", "tags.html"],
    ["dashboard", "bi-bar-chart", "Reportes", "dashboard.html#reports"],
    ["profile", "bi-person", "Perfil", "profile.html"],
    ["settings", "bi-gear", "Configuración", "settings.html"],
    ["logout", "bi-box-arrow-right", "Cerrar sesión", "login.html"]
];

const getCurrentPage = () => document.body.dataset.page;

const getBadgeClass = (value) => {
    const map = {
        Alta: "soft-danger",
        Media: "soft-warning",
        Baja: "soft-success",
        Pendiente: "soft-warning",
        "En progreso": "soft-info",
        Revisión: "soft-primary",
        Completada: "soft-success"
    };
    return map[value] || "soft-primary";
};

const toast = (title, icon = "success") => {
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

const confirmAction = (title, text, callback) => {
    Swal.fire({
        title,
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34B6A7",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) callback();
    });
};

// Shared application layout: navbar, sidebar, breadcrumb, footer and main content slot.
const buildShell = () => {
    const page = getCurrentPage();
    const [title, subtitle] = pageMeta[page] || pageMeta.dashboard;
    const shell = document.querySelector("#appShell");

    shell.innerHTML = `
        <div class="app-shell">
            <aside class="sidebar" id="sidebar" aria-label="Menu lateral">
                <div class="sidebar-brand">
                    <div class="brand-icon"><i class="bi bi-check2-square"></i></div>
                    <span>Guilar</span>
                </div>
                <nav class="sidebar-menu">
                    ${menuItems.map(([key, icon, label, href]) => `
                        <a class="sidebar-link ${key === page ? "active" : ""}" href="${href}" data-menu="${key}">
                            <i class="bi ${icon}"></i>
                            <span class="sidebar-text">${label}</span>
                        </a>
                    `).join("")}
                </nav>
            </aside>

            <div class="app-main">
                <header class="topbar">
                    <button class="icon-btn" type="button" id="sidebarToggle" aria-label="Alternar menu" data-bs-toggle="tooltip" title="Menu">
                        <i class="bi bi-list"></i>
                    </button>

                    <div class="topbar-search">
                        <i class="bi bi-search"></i>
                        <input class="form-control" type="search" placeholder="Buscar tareas, etiquetas o personas">
                    </div>

                    <div class="d-flex align-items-center gap-2">
                        <button class="icon-btn" type="button" data-bs-toggle="tooltip" title="Notificaciones">
                            <i class="bi bi-bell"></i>
                        </button>
                        <button class="icon-btn" type="button" id="themeToggle" data-bs-toggle="tooltip" title="Modo oscuro">
                            <i class="bi bi-moon-stars"></i>
                        </button>
                        <div class="dropdown">
                            <button class="btn p-0 border-0 d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-expanded="false">
                                <img class="user-avatar" src="${appData.user.avatar}" alt="Foto de ${appData.user.name}">
                                <span class="topbar-user-details text-start">
                                    <strong class="d-block">${appData.user.name}</strong>
                                    <small class="text-muted">${appData.user.role}</small>
                                </span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i>Perfil</a></li>
                                <li><a class="dropdown-item" href="settings.html"><i class="bi bi-gear me-2"></i>Configuración</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger" href="login.html"><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</a></li>
                            </ul>
                        </div>
                    </div>
                </header>

                <main class="content-area fade-in">
                    <div class="page-header">
                        <div class="page-title">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-2">
                                    <li class="breadcrumb-item"><a href="dashboard.html">Guilar</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">${title}</li>
                                </ol>
                            </nav>
                            <h1>${title}</h1>
                            <p>${subtitle}</p>
                        </div>
                        <div id="pageActions"></div>
                    </div>
                    <section id="pageContent"></section>
                </main>
                <footer class="footer">Guilar TODO List App - Frontend HTML5, Bootstrap 5.3 y JavaScript ES6.</footer>
            </div>
        </div>
    `;
};

// Cross-page interactions: dark mode, sidebar collapse, tooltips and logout confirmation.
const setupAppInteractions = () => {
    const savedTheme = localStorage.getItem("guilar-theme") || "light";
    document.documentElement.dataset.theme = savedTheme;

    document.querySelector("#sidebarToggle")?.addEventListener("click", () => {
        if (window.innerWidth < 992) {
            document.body.classList.toggle("sidebar-open");
        } else {
            document.querySelector("#sidebar")?.classList.toggle("collapsed");
        }
    });

    document.querySelector("#themeToggle")?.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("guilar-theme", nextTheme);
        toast(nextTheme === "dark" ? "Modo oscuro activo" : "Modo claro activo", "info");
    });

    document.querySelector('[data-menu="logout"]')?.addEventListener("click", (event) => {
        event.preventDefault();
        confirmAction("Cerrar sesión", "¿Deseas volver al login?", () => window.location.href = "login.html");
    });

    document.querySelectorAll("[data-bs-toggle='tooltip']").forEach((item) => new bootstrap.Tooltip(item));
};

document.addEventListener("DOMContentLoaded", () => {
    if (!document.querySelector("#appShell")) return;
    buildShell();
    setupAppInteractions();
});
