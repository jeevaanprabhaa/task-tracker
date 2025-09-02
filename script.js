let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const main = document.getElementById("main-task").value.trim();
  const sub = document.getElementById("sub-task").value.trim();
  const date = document.getElementById("task-date").value;
  const time = document.getElementById("task-time").value;

  if (!main || !date || !time) return;

  tasks.push({ main, sub, date, time, completed: false });
  saveTasks();
  renderTasks();
  this.reset();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const container = document.getElementById("task-container");
  container.innerHTML = "";

  tasks.forEach((task, index) => {
    const item = document.createElement("div");
    item.className = "task-item" + (task.completed ? " completed" : "");

    const content = document.createElement("span");
    content.innerHTML = `<strong>${task.main}</strong><br>${task.sub}<br><small>${task.date} at ${task.time}</small>`;

    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = task.completed ? "✅" : "☐";
    toggleBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    const buttonGroup = document.createElement("div");
    buttonGroup.style.display = "flex";
    buttonGroup.style.gap = "10px";
    buttonGroup.appendChild(toggleBtn);
    buttonGroup.appendChild(deleteBtn);

    item.appendChild(content);
    item.appendChild(buttonGroup);
    container.appendChild(item);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  document.getElementById("stats").textContent = `Total: ${total} | Completed: ${completed}`;
}

renderTasks();