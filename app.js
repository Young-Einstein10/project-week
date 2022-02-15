const form = document.querySelector("form");
const todosInput = document.querySelector(".enter-todos-input");
const todosWrapper = document.querySelector(".todos-wrapper");
const numOfTodosLeft = document.querySelector(".no-of-items-left");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTodo = todosInput.value;

  addNewTodo(newTodo);
  clearTodosInput();
});

function getTodosList() {
  return JSON.parse(localStorage.getItem("todosList") || "[]");
}

function saveTodoInLocalStorage(newTodo) {
  const todosList = getTodosList();

  return localStorage.setItem(
    "todosList",
    JSON.stringify([...todosList, newTodo])
  );
}

function updateTodoInLocalStorage(newTodo) {
  const todosList = getTodosList();

  return localStorage.setItem(
    "todosList",
    JSON.stringify([...todosList, newTodo])
  );
}

const updateTodoItem = (todoItem, checked, id) => {
  if (checked) {
    todoItem.classList.add("line-through");
  } else {
    todoItem.classList.remove("line-through");
  }

  const todosList = getTodosList();
  const selectedTodoItem = todosList.find(
    (currTodo) => parseInt(currTodo.id) === parseInt(id)
  );

  selectedTodoItem.isCompleted = checked;

  const index = todosList.findIndex((todo) => todo.id === selectedTodoItem.id);

  todosList[index] = selectedTodoItem;

  localStorage.setItem("todosList", JSON.stringify([...todosList]));
};

const renderTodoItem = (newTodo, action = "display") => {
  const { id, todo, isCompleted } = newTodo;

  if (action === "create") {
    // Add Todo to LocalStorage

    saveTodoInLocalStorage(newTodo);
    // updateTotalTodosLeft();
  }

  const li = document.createElement("li");
  li.id = id;
  li.className = "todo-item";

  // ======== CHECKBOX WRAPPER ========
  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.className = "rounded-corner";

  // ======== CHECKBOX ========
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkbox";
  checkbox.checked = isCompleted;
  checkbox.addEventListener("change", function (event) {
    const currElement = event.target;
    const todoItem = currElement.parentElement.nextSibling;

    updateTodoItem(todoItem, checkbox.checked, id);
  });

  // ======== CHECK ========
  const check = document.createElement("span");
  check.className = "check";

  // ======== TODO ITEM ========
  const paragraph = document.createElement("p");
  paragraph.className = "todo";
  paragraph.textContent = todo;
  checkbox.checked ? paragraph.classList.add("line-through") : null;

  // Append Checkbox and Check inside CheckboxWrapper
  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(check);

  // Appends Checkbox Wrapper and paragraph to li
  li.appendChild(checkboxWrapper);
  li.appendChild(paragraph);

  // Append li to todosWrapper
  todosWrapper.appendChild(li);

  updateTotalTodosLeft();
};

const displayTodos = () => {
  const todosList = getTodosList();

  todosList.forEach((todoObj) => {
    renderTodoItem(todoObj, "display");
  });
};

const updateTotalTodosLeft = () => {
  const todosList = getTodosList();
  const totalNumberOfTodos = todosList.length;

  numOfTodosLeft.textContent = `${totalNumberOfTodos} Items Left`;
};

const addNewTodo = (value) => {
  const todosList = getTodosList();

  const newTodo = {
    id: todosList.length + 1,
    todo: value,
    isCompleted: false,
  };

  renderTodoItem(newTodo, "create");
};

const clearTodosInput = () => {
  todosInput.value = "";
};

displayTodos();
