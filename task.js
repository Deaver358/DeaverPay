const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskType = document.getElementById("taskType");
const requirementsBox = document.getElementById("requirements");
const durationSelect = document.getElementById("taskDuration");
const customDuration = document.getElementById("customDuration");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const CURRENT_USER = "demo_user";

/* ===== TASK TYPE REQUIREMENTS ===== */
taskType.addEventListener("change", () => {
  if (taskType.value === "job") {
    requirementsBox.innerHTML = `<strong>Requires Resume Upload</strong>`;
  } else {
    requirementsBox.innerHTML = `<strong>Requires Social Proof Link</strong>`;
  }
});

/* ===== DURATION ===== */
durationSelect.addEventListener("change", () => {
  customDuration.style.display =
    durationSelect.value === "custom" ? "block" : "none";
});

/* ===== POST TASK ===== */
taskForm.addEventListener("submit", e => {
  e.preventDefault();

  const duration =
    durationSelect.value === "custom"
      ? Number(customDuration.value)
      : Number(durationSelect.value);

  const task = {
    id: Date.now(),
    title: taskTitle.value,
    desc: taskDesc.value,
    type: taskType.value,
    pay: Number(taskPay.value),
    duration,
    createdAt: Date.now(),
    applicants: []
  };

  tasks.unshift(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showNotification("Task posted successfully", "success");
  taskForm.reset();
  renderTasks();
});

/* ===== RENDER TASKS ===== */
function renderTasks() {
  taskList.innerHTML = "";

  if (!tasks.length) {
    taskList.innerHTML = "<p>No tasks available</p>";
    return;
  }

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";

    const applied = task.applicants.includes(CURRENT_USER);

    card.innerHTML = `
      <h4>${task.title}</h4>
      <p>${task.desc}</p>
      <small>Type: ${task.type}</small><br>
      <small>Pay: $${task.pay}</small><br>
      <small>Duration: ${task.duration} days</small><br>
      <button ${applied ? "disabled" : ""} onclick="applyTask(${task.id})">
        ${applied ? "Applied" : "Apply"}
      </button>
    `;

    taskList.appendChild(card);
  });
}

/* ===== APPLY ===== */
function applyTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task || task.applicants.includes(CURRENT_USER)) return;

  task.applicants.push(CURRENT_USER);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showNotification(`Applied for "${task.title}"`, "info");
  renderTasks();
}

/* ===== SCROLL / SHAKE ===== */
function goToSection(id) {
  const section = document.getElementById(id);
  const distance = Math.abs(window.scrollY - section.offsetTop);

  if (distance > 120) {
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    section.classList.add("shake");
    setTimeout(() => section.classList.remove("shake"), 600);
  }
}

renderTasks();