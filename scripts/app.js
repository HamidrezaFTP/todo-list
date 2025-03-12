const themeToggle = document.getElementById("theme-toggle");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const tasksContainer = document.getElementById("tasks");

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    tasksContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="task">
          <p>${task}</p>
          <div class="task__buttons">
            <button class="edit-btn" aria-label="Edit task">📝</button>
            <button class="delete-btn" aria-label="Delete task">❌</button>
          </div>
      </li>`
    );
  });
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(tasksContainer.children).map(
    (task) => task.querySelector("p").textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = taskInput.value.trim();

  if (!task) {
    return;
  }

  taskInput.value = "";
  tasksContainer.insertAdjacentHTML(
    "afterbegin",
    `<li class="task">
       <p>${task}</p>
       <div class="task__buttons">
         <button class="edit-btn" aria-label="Edit task">📝</button>
         <button class="delete-btn" aria-label="Delete task">❌</button>
       </div>
     </li>`
  );
  saveTasks();
});

// Handle task actions (edit/delete)
tasksContainer.addEventListener("click", (e) => {
  const taskElement = e.target.closest(".task");
  if (!taskElement) return;

  if (e.target.classList.contains("edit-btn")) {
    const taskText = taskElement.querySelector("p");
    taskText.setAttribute("contenteditable", true);
    taskText.focus();
    taskText.style.outline = "none";

    taskText.addEventListener("blur", () => {
      taskText.removeAttribute("contenteditable");
      saveTasks();
    });

    taskText.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        taskText.blur();
      }
    });
  }

  if (e.target.classList.contains("delete-btn")) {
    taskElement.remove();
    saveTasks();
  }
});

// Toggle dark/light theme
themeToggle.addEventListener("click", () => {
  // Toggle theme using dataset API and ternary operator
  const isDarkMode = document.body.dataset.theme === "dark";
  document.body.dataset.theme = isDarkMode ? null : "dark";
  themeToggle.textContent = isDarkMode ? "🌕" : "🌞";
});

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
