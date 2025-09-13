const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.completed));
  updateTaskCount();
};
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    saveTasks();
    updateTaskCount();
    taskInput.value = "";
  }
});

function addTask(text, completed = false) {
  const li = document.createElement("li");

  const taskLeft = document.createElement("div");
  taskLeft.classList.add("task-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;

  const span = document.createElement("span");
  span.textContent = text;
  if (completed) span.classList.add("completed");

  checkbox.addEventListener("change", () => {
    span.classList.toggle("completed");
    saveTasks();
    updateTaskCount();
  });

  taskLeft.appendChild(checkbox);
  taskLeft.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
    updateTaskCount();
  };
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  };
  li.appendChild(taskLeft);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  taskList.appendChild(li);
}
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.querySelector("span").classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function updateTaskCount() {
  const allTasks = document.querySelectorAll("#taskList li");
  const completed = document.querySelectorAll("#taskList .completed").length;
  const uncompleted = allTasks.length - completed;
  taskCount.textContent = `Completed: ${completed} | Uncompleted: ${uncompleted}`;
}
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskFromInput();
  }
});
function addTaskFromInput() {
  const text = taskInput.value.trim();
  if (text) {
    addTask(text);
    saveTasks();
    updateTaskCount();
    taskInput.value = "";
  }
}
function filterTasks(type) {
  const tasks = document.querySelectorAll("#taskList li");
  tasks.forEach(task => {
    const isCompleted = task.querySelector("span").classList.contains("completed");
    if (type === "all") task.style.display = "flex";
    else if (type === "active" && isCompleted) task.style.display = "none";
    else if (type === "completed" && !isCompleted) task.style.display = "none";
    else task.style.display = "flex";
  });
}