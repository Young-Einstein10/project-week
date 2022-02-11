const form = document.querySelector("form");
const todosInput = document.querySelector(".enter-todos-input");
const todosWrapper = document.querySelector(".todos-wrapper");

const todosList = [
  {
    id: 1,
    todo: "A new todo",
    isCompleted: true,
  },
  {
    id: 2,
    todo: "Second Todo",
    isCompleted: false,
  },
];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTodo = todosInput.value;

  addNewTodo(newTodo);
  clearTodosInput();
});

const addNewTodo = (value) => {
  const listItem = `
        <li class="todo-item">
            <div class="rounded-corner">
                <input class="checkbox" type="checkbox" />
                <span class="check"></span>
            </div>
            <p class="todo">${value}</p>
        </li>
        `;

  todosWrapper.insertAdjacentHTML("beforeend", listItem);
};

const clearTodosInput = () => {
  todosInput.value = "";
};
