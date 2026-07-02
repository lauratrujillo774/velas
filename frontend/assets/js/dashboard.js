const renderDashboard = () => {
    const content = document.querySelector("#pageContent");
    const total = appData.tasks.length;
    const completed = appData.tasks.filter((task) => task.status === "Completada").length;
    const pending = appData.tasks.filter((task) => task.status === "Pendiente").length;
    const progress = appData.tasks.filter((task) => task.status === "En progreso").length;
    const overdue = 2;

    content.innerHTML = `
        <div class="row g-4 mb-4">
            ${[
                ["Total tareas", total, "bi-list-task", "soft-primary"],
                ["Completadas", completed, "bi-check2-circle", "soft-success"],
                ["Pendientes", pending, "bi-hourglass-split", "soft-warning"],
                ["En progreso", progress, "bi-arrow-repeat", "soft-info"],
                ["Vencidas", overdue, "bi-exclamation-triangle", "soft-danger"]
            ].map(([label, value, icon, className]) => `
                <div class="col-12 col-sm-6 col-xl">
                    <article class="app-card kpi-card h-100">
                        <div class="kpi-icon ${className}"><i class="bi ${icon}"></i></div>
                        <strong>${value}</strong>
                        <span>${label}</span>
                    </article>
                </div>
            `).join("")}
        </div>

        <div class="row g-4">
            <div class="col-xl-7">
                <article class="app-card p-4 h-100" id="reports">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h2 class="h5 fw-bold mb-0">Progreso semanal</h2>
                        <span class="badge badge-soft soft-primary">Chart.js</span>
                    </div>
                    <canvas id="tasksChart" height="145" aria-label="Grafico de tareas"></canvas>
                </article>
            </div>
            <div class="col-xl-5">
                <article class="app-card p-4 h-100">
                    <h2 class="h5 fw-bold mb-4">Actividad reciente</h2>
                    <ul class="list-clean">
                        ${appData.activity.map((item) => `
                            <li class="activity-item">
                                <span class="badge badge-soft soft-primary"><i class="bi bi-lightning"></i></span>
                                <div>
                                    <strong>${item}</strong>
                                    <p class="text-muted mb-0">Hace pocos minutos</p>
                                </div>
                            </li>
                        `).join("")}
                    </ul>
                </article>
            </div>
            <div class="col-lg-6">
                <article class="app-card p-4">
                    <h2 class="h5 fw-bold mb-4">Próximas tareas</h2>
                    <ul class="list-clean">
                        ${appData.tasks.slice(0, 4).map((task) => `
                            <li class="activity-item">
                                <i class="bi bi-calendar-event text-primary"></i>
                                <div class="w-100">
                                    <div class="d-flex justify-content-between gap-3">
                                        <strong>${task.title}</strong>
                                        <span class="badge badge-soft ${getBadgeClass(task.priority)}">${task.priority}</span>
                                    </div>
                                    <p class="text-muted mb-0">${task.date} - ${task.assignee}</p>
                                </div>
                            </li>
                        `).join("")}
                    </ul>
                </article>
            </div>
            <div class="col-lg-6">
                <article class="app-card p-4">
                    <h2 class="h5 fw-bold mb-4">Últimos comentarios</h2>
                    <ul class="list-clean">
                        <li class="activity-item"><i class="bi bi-chat-left-text text-primary"></i><div><strong>Excelente avance en UI.</strong><p class="text-muted mb-0">Ana en Dashboard visual</p></div></li>
                        <li class="activity-item"><i class="bi bi-chat-left-text text-primary"></i><div><strong>Revisar microcopy del registro.</strong><p class="text-muted mb-0">Laura en Onboarding</p></div></li>
                        <li class="activity-item"><i class="bi bi-chat-left-text text-primary"></i><div><strong>Contrato listo para revisión.</strong><p class="text-muted mb-0">Carlos en API contract</p></div></li>
                    </ul>
                </article>
            </div>
        </div>
    `;

    new Chart(document.querySelector("#tasksChart"), {
        type: "line",
        data: {
            labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
            datasets: [
                {
                    label: "Completadas",
                    data: [4, 6, 5, 8, 7, 9, 11],
                    borderColor: "#34B6A7",
                    backgroundColor: "rgba(52, 182, 167, 0.14)",
                    fill: true,
                    tension: 0.4
                },
                {
                    label: "Pendientes",
                    data: [8, 7, 9, 6, 5, 4, 3],
                    borderColor: "#f59e0b",
                    backgroundColor: "rgba(245, 158, 11, 0.1)",
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: "bottom" } },
            scales: { y: { beginAtZero: true } }
        }
    });
};

document.addEventListener("DOMContentLoaded", renderDashboard);
