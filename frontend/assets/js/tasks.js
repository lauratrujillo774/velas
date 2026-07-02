// Reusable Bootstrap modal for creating or editing tasks.
const renderTaskModal = () => `
    <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <form class="modal-content" id="taskForm">
                <div class="modal-header">
                    <h2 class="modal-title h5" id="taskModalTitle">Nueva tarea</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6"><label class="form-label">Título</label><input class="form-control" required></div>
                        <div class="col-md-6"><label class="form-label">Categoría</label><select class="form-select"><option>Diseño</option><option>Frontend</option><option>Backend</option><option>QA</option></select></div>
                        <div class="col-12"><label class="form-label">Descripción</label><textarea class="form-control" rows="3"></textarea></div>
                        <div class="col-md-4"><label class="form-label">Prioridad</label><select class="form-select"><option>Alta</option><option>Media</option><option>Baja</option></select></div>
                        <div class="col-md-4"><label class="form-label">Estado</label><select class="form-select"><option>Pendiente</option><option>En progreso</option><option>Revisión</option><option>Completada</option></select></div>
                        <div class="col-md-4"><label class="form-label">Color</label><input class="form-control form-control-color w-100" type="color" value="#34B6A7"></div>
                        <div class="col-md-4"><label class="form-label">Fecha inicio</label><input class="form-control" type="date"></div>
                        <div class="col-md-4"><label class="form-label">Fecha límite</label><input class="form-control" type="date"></div>
                        <div class="col-md-4"><label class="form-label">Hora</label><input class="form-control" type="time"></div>
                        <div class="col-md-6"><label class="form-label">Etiquetas</label><input class="form-control" placeholder="UX, Sprint, API"></div>
                        <div class="col-md-6"><label class="form-label">Archivo adjunto</label><input class="form-control" type="file"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light-app" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary-app">Guardar</button>
                </div>
            </form>
        </div>
    </div>
`;

const setupTaskModal = () => {
    if (!document.querySelector("#taskModal")) {
        document.body.insertAdjacentHTML("beforeend", renderTaskModal());
    }

    document.querySelector("#taskForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        bootstrap.Modal.getInstance(document.querySelector("#taskModal"))?.hide();
        toast("Tarea guardada correctamente");
    });
};

const renderTasks = () => {
    setupTaskModal();
    document.querySelector("#pageActions").innerHTML = `
        <button class="btn btn-primary-app" data-bs-toggle="modal" data-bs-target="#taskModal">
            <i class="bi bi-plus-lg me-2"></i>Nueva tarea
        </button>
    `;

    document.querySelector("#pageContent").innerHTML = `
        <article class="app-card p-4 mb-4">
            <div class="row g-3 align-items-end">
                <div class="col-lg-4"><label class="form-label">Buscador</label><input class="form-control" id="taskSearch" placeholder="Buscar por título o responsable"></div>
                <div class="col-md-4 col-lg-3"><label class="form-label">Filtros</label><select class="form-select"><option>Todos los estados</option><option>Pendiente</option><option>En progreso</option><option>Completada</option></select></div>
                <div class="col-md-4 col-lg-3"><label class="form-label">Ordenar</label><select class="form-select"><option>Fecha próxima</option><option>Prioridad</option><option>Responsable</option></select></div>
                <div class="col-md-4 col-lg-2"><button class="btn btn-light-app w-100" id="filterBtn"><i class="bi bi-funnel me-2"></i>Aplicar</button></div>
            </div>
        </article>

        <article class="app-card p-0 overflow-hidden">
            <div class="table-responsive">
                <table class="table align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Título</th><th>Descripción</th><th>Categoría</th><th>Prioridad</th><th>Estado</th><th>Fecha</th><th>Responsable</th><th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appData.tasks.map((task) => `
                            <tr>
                                <td><strong>${task.title}</strong></td>
                                <td>${task.description}</td>
                                <td>${task.category}</td>
                                <td><span class="badge badge-soft ${getBadgeClass(task.priority)}">${task.priority}</span></td>
                                <td><span class="badge badge-soft ${getBadgeClass(task.status)}">${task.status}</span></td>
                                <td>${task.date}</td>
                                <td>${task.assignee}</td>
                                <td>
                                    <div class="table-actions">
                                        ${["eye", "pencil", "trash", "files", "check2"].map((icon) => `<button class="icon-btn task-action" data-action="${icon}" type="button"><i class="bi bi-${icon}"></i></button>`).join("")}
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 p-3">
                <span class="text-muted small">Mostrando 5 de 24 tareas</span>
                <nav aria-label="Paginacion de tareas">
                    <ul class="pagination mb-0">
                        <li class="page-item disabled"><a class="page-link" href="#">Anterior</a></li>
                        <li class="page-item active" aria-current="page"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
                    </ul>
                </nav>
            </div>
        </article>
    `;

    document.querySelectorAll(".task-action").forEach((button) => {
        button.addEventListener("click", () => {
            const action = button.dataset.action;
            if (action === "trash") {
                confirmAction("Eliminar tarea", "Esta acción es simulada.", () => toast("Tarea eliminada"));
                return;
            }
            toast("Acción simulada", "info");
        });
    });

    document.querySelector("#filterBtn")?.addEventListener("click", () => toast("Filtros aplicados", "info"));
};

const renderKanban = () => {
    setupTaskModal();
    document.querySelector("#pageActions").innerHTML = `<button class="btn btn-primary-app" data-bs-toggle="modal" data-bs-target="#taskModal"><i class="bi bi-plus-lg me-2"></i>Nueva tarea</button>`;
    const columns = ["Pendiente", "En progreso", "Revisión", "Completada"];

    document.querySelector("#pageContent").innerHTML = `
        <div class="kanban-board">
            ${columns.map((column) => `
                <section class="kanban-column">
                    <div class="kanban-title">
                        <span>${column}</span>
                        <span class="badge badge-soft ${getBadgeClass(column)}">${appData.tasks.filter((task) => task.status === column).length}</span>
                    </div>
                    ${appData.tasks.filter((task) => task.status === column).map((task) => `
                        <article class="task-card priority-${task.priority === "Alta" ? "high" : task.priority === "Media" ? "medium" : "low"}">
                            <div class="d-flex justify-content-between gap-3 mb-2">
                                <strong>${task.title}</strong>
                                <i class="bi bi-three-dots"></i>
                            </div>
                            <p class="text-muted small">${task.description}</p>
                            <div class="d-flex flex-wrap gap-2 mb-3">${task.tags.map((tag) => `<span class="badge badge-soft soft-primary">${tag}</span>`).join("")}</div>
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="small text-muted"><i class="bi bi-calendar3 me-1"></i>${task.date}</span>
                                <img class="user-avatar" src="https://i.pravatar.cc/80?u=${task.assignee}" alt="${task.assignee}">
                            </div>
                        </article>
                    `).join("")}
                </section>
            `).join("")}
        </div>
    `;
};

const renderCalendar = () => {
    const days = Array.from({ length: 35 }, (_, index) => index + 1);
    document.querySelector("#pageActions").innerHTML = `
        <div class="btn-group" role="group" aria-label="Vista calendario">
            <button class="btn btn-light-app">Mensual</button>
            <button class="btn btn-light-app">Semanal</button>
            <button class="btn btn-light-app">Diaria</button>
        </div>
    `;
    document.querySelector("#pageContent").innerHTML = `
        <article class="app-card p-4 mb-4">
            <h2 class="h5 fw-bold mb-0">Julio 2026</h2>
        </article>
        <div class="calendar-grid">
            ${days.map((day) => {
                const task = appData.tasks.find((item) => Number(item.date.slice(-2)) === day);
                return `<div class="calendar-cell"><strong>${day}</strong>${task ? `<span class="calendar-event" style="background:${task.color}">${task.title}</span>` : ""}</div>`;
            }).join("")}
        </div>
    `;
};

const renderCategories = () => {
    document.querySelector("#pageActions").innerHTML = `<button class="btn btn-primary-app" id="createCategory"><i class="bi bi-plus-lg me-2"></i>Crear</button>`;
    document.querySelector("#pageContent").innerHTML = `
        <div class="row g-4">
            ${appData.categories.map((category) => `
                <div class="col-md-6 col-xl-4">
                    <article class="app-card p-4 h-100">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <span class="brand-icon" style="background:${category.color}; color:#fff"><i class="bi bi-folder"></i></span>
                            <span class="badge badge-soft soft-primary">${category.count} tareas</span>
                        </div>
                        <h2 class="h5 fw-bold">${category.name}</h2>
                        <div class="d-flex gap-2 mt-4">
                            <button class="btn btn-light-app flex-fill">Editar</button>
                            <button class="btn btn-light-app flex-fill text-danger category-delete">Eliminar</button>
                        </div>
                    </article>
                </div>
            `).join("")}
        </div>
    `;
    document.querySelector("#createCategory")?.addEventListener("click", () => toast("Categoría creada", "success"));
    document.querySelectorAll(".category-delete").forEach((button) => button.addEventListener("click", () => confirmAction("Eliminar categoría", "Acción simulada.", () => toast("Categoría eliminada"))));
};

const renderTags = () => {
    document.querySelector("#pageContent").innerHTML = `
        <div class="row g-4">
            ${appData.tags.map((tag) => `
                <div class="col-md-6 col-xl-4">
                    <article class="tag-pill app-card" style="border-left: 6px solid ${tag.color}">
                        <div>
                            <h2 class="h5 fw-bold mb-1">#${tag.name}</h2>
                            <p class="text-muted mb-0">${tag.count} tareas asociadas</p>
                        </div>
                        <i class="bi bi-tag fs-3" style="color:${tag.color}"></i>
                    </article>
                </div>
            `).join("")}
        </div>
    `;
};

const renderProfile = () => {
    document.querySelector("#pageContent").innerHTML = `
        <div class="row g-4">
            <div class="col-lg-4">
                <article class="app-card p-4 text-center h-100">
                    <img class="profile-photo mb-3" src="${appData.user.avatar}" alt="Foto de perfil">
                    <h2 class="h4 fw-bold">${appData.user.name}</h2>
                    <p class="text-muted">${appData.user.role}</p>
                    <button class="btn btn-primary-app w-100">Cambiar fotografía</button>
                </article>
            </div>
            <div class="col-lg-8">
                <article class="app-card p-4">
                    <h2 class="h5 fw-bold mb-4">Información personal</h2>
                    <div class="row g-3">
                        <div class="col-md-6"><label class="form-label">Nombre</label><input class="form-control" value="Laura"></div>
                        <div class="col-md-6"><label class="form-label">Apellido</label><input class="form-control" value="Méndez"></div>
                        <div class="col-md-6"><label class="form-label">Correo</label><input class="form-control" value="laura@guilar.app"></div>
                        <div class="col-md-6"><label class="form-label">Teléfono</label><input class="form-control" value="+57 300 000 0000"></div>
                        <div class="col-12"><button class="btn btn-primary-app">Editar datos</button><button class="btn btn-light-app ms-2">Cambiar contraseña</button></div>
                    </div>
                </article>
            </div>
        </div>
    `;
};

const renderSettings = () => {
    document.querySelector("#pageContent").innerHTML = `
        <article class="app-card p-4">
            <div class="row g-4">
                <div class="col-md-6"><label class="form-label">Tema</label><select class="form-select"><option>Tema claro</option><option>Tema oscuro</option></select></div>
                <div class="col-md-6"><label class="form-label">Idioma</label><select class="form-select"><option>Español</option><option>Inglés</option></select></div>
                <div class="col-md-6"><label class="form-label">Zona horaria</label><select class="form-select"><option>America/Bogota</option><option>UTC</option></select></div>
                <div class="col-md-6"><label class="form-label">Preferencias</label><select class="form-select"><option>Productividad equilibrada</option><option>Enfoque profundo</option></select></div>
                <div class="col-12">
                    <div class="form-check form-switch mb-3"><input class="form-check-input" type="checkbox" id="emailNotifications" checked><label class="form-check-label" for="emailNotifications">Notificaciones por correo</label></div>
                    <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="pushNotifications" checked><label class="form-check-label" for="pushNotifications">Notificaciones push</label></div>
                </div>
                <div class="col-12"><button class="btn btn-primary-app" id="saveSettings">Guardar preferencias</button></div>
            </div>
        </article>
    `;
    document.querySelector("#saveSettings")?.addEventListener("click", () => toast("Preferencias guardadas"));
};

document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    const renderers = {
        tasks: renderTasks,
        kanban: renderKanban,
        calendar: renderCalendar,
        categories: renderCategories,
        tags: renderTags,
        profile: renderProfile,
        settings: renderSettings
    };
    renderers[page]?.();
});
