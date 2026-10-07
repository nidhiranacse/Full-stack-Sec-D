const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const errorMessage = document.getElementById("errorMessage");

function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText === ""){
    errorMessage.textContent = "Please enter a task!";
    return;
  }
  errorMessage.textContent = "";

  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";

  span.addEventListener("click", () => span.classList.toggle("completed"));
  deleteBtn.addEventListener("click", () => li.remove());

  li.append(span, deleteBtn);
  todoList.appendChild(li);
  taskInput.value = "";
  taskInput.focus();
}
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => { if(e.key === "Enter") addTask(); });
