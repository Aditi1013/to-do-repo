document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.getElementById("todoList");
  const newTodo = document.getElementById("newTodo");
  const addBtn = document.getElementById("addBtn");
  const noteArea = document.getElementById("noteArea");
  const calendarInput = document.getElementById("calendarInput");
  const dateDisplay = document.getElementById("dateDisplay");

  const pageKey = window.location.pathname.split("/").pop().replace(".html", "") || "home";

  function storageKey(key) {
    return `${pageKey}_${key}`;
  }

  function saveNoteAndCalendar() {
    localStorage.setItem(storageKey("note"), noteArea?.value || "");
    localStorage.setItem(storageKey("calendar"), calendarInput?.value || "");
  }

  function loadNoteAndCalendar() {
    if (noteArea) noteArea.value = localStorage.getItem(storageKey("note")) || "";
    if (calendarInput) calendarInput.value = localStorage.getItem(storageKey("calendar")) || "";
  }

  function renderTodos() {
    todoList.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem(pageKey)) || [];

    todos.forEach((todo, index) => {
      const li = document.createElement("li");

      const taskSpan = document.createElement("span");
      taskSpan.textContent = todo;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => editTodo(index);

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️";
      delBtn.onclick = () => deleteTodo(index);

      li.appendChild(taskSpan);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      todoList.appendChild(li);
    });
  }

  function addTodoItem() {
    const task = newTodo.value.trim();
    if (task === "") return;

    const todos = JSON.parse(localStorage.getItem(pageKey)) || [];
    todos.push(task);
    localStorage.setItem(pageKey, JSON.stringify(todos));
    newTodo.value = "";
    renderTodos();
  }

  function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem(pageKey)) || [];
    todos.splice(index, 1);
    localStorage.setItem(pageKey, JSON.stringify(todos));
    renderTodos();
  }

  function editTodo(index) {
    const todos = JSON.parse(localStorage.getItem(pageKey)) || [];
    const updated = prompt("Edit task:", todos[index]);
    if (updated && updated.trim()) {
      todos[index] = updated.trim();
      localStorage.setItem(pageKey, JSON.stringify(todos));
      renderTodos();
    }
  }

  
  addBtn?.addEventListener("click", addTodoItem);
  newTodo?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodoItem();
  });
  noteArea?.addEventListener("input", saveNoteAndCalendar);
  calendarInput?.addEventListener("change", saveNoteAndCalendar);

  if (dateDisplay) {
    const now = new Date();
    dateDisplay.innerText = now.toDateString();
  }

  
  renderTodos();
  loadNoteAndCalendar();
});
