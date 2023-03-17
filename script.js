// Get references to HTML elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Initialize the todo array
let todos = [];

// Check if there are any todos in local storage and add them to the list
if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
  renderTodos();
}

// Event listener for form submit
todoForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form from submitting

  // Get the todo value from the input field
  const todoText = todoInput.value.trim();

  // If the input is not empty, add the todo to the list and update local storage
  if (todoText !== '') {
    todos.unshift({ text: todoText });
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = ''; // Reset the input field
  }
});

// Render the todos in the list
function renderTodos() {
  // Clear the list first
  todoList.innerHTML = '';

  // Loop through the todos array and add each one to the list
  todos.forEach(function(todo) {
    // Create the list item element
    const li = document.createElement('li');

    // Create the text node and append it to the list item
    const text = document.createTextNode(todo.text);
    li.appendChild(text);

    // Create the remove button and append it to the list item
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = 'Remove';
    removeBtn.addEventListener('click', function() {
      // Remove the todo from the array and update local storage
      const todoIndex = todos.findIndex(function(item) {
        return item.text === todo.text;
      });
      todos.splice(todoIndex, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });
    li.appendChild(removeBtn);

    // Create the edit button and append it to the list item
    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.addEventListener('click', function() {
      // Prompt the user to enter a new value for the todo
      const newTodoText = prompt('Enter new value:', todo.text);

      // If the input is not empty, update the todo and local storage
      if (newTodoText !== null && newTodoText !== '') {
        const todoIndex = todos.findIndex(function(item) {
          return item.text === todo.text;
        });
        todos[todoIndex].text = newTodoText;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
      }
    });
    li.appendChild(editBtn);

    // Add the list item to the list
    todoList.appendChild(li);
  });
}
