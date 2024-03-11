const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const taskText = todoInput.value.trim();

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    renderTasks();

    localStorage.setItem('tasks', JSON.stringify(tasks));

    todoInput.value = '';
});

function renderTasks() {
    todoList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.id = task.id;
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        taskElement.innerText = task.text;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            task.completed = !task.completed;
            renderTasks();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskElement.prepend(checkbox);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Poista';
        deleteButton.addEventListener('click', function() {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        taskElement.append(deleteButton);

        todoList.appendChild(taskElement);
    });
}

function validateForm() {
    if (todoInput.value.trim() === '') {
        alert('Et voi lisätä tyhjää tehtävää.');
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mark-all-done-button').addEventListener('click', markAllDone);
    document.getElementById('clear-all-button').addEventListener('click', clearAll);
    document.getElementById('show-all-done').addEventListener('click', showAllDone);
    document.getElementById('show-all-not-done').addEventListener('click', showAllNotDone);
    document.getElementById('show-all').addEventListener('click', showAll);
});

function markAllDone() {
    tasks.forEach(task => task.completed = true);
    renderTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAll() {
    if (confirm('Haluatko varmasti tyhjentää kaikki tehtävät?')) {
        tasks = [];
        renderTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function showAllDone() {
    todoList.innerHTML = '';
    tasks.forEach(task => {
        if (task.completed) {
            addToDOM(task);
        }
    });
}

function showAllNotDone() {
    todoList.innerHTML = '';
    tasks.forEach(task => {
        if (!task.completed) {
            addToDOM(task);
        }
    });
}

function showAll() {
    renderTasks();
}

function addToDOM(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.textContent = task.text;
    todoList.appendChild(taskElement);
}

const buttonIds = ['show-all', 'show-all-not-done', 'show-all-done'];

buttonIds.forEach(buttonId => {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', function() {
    buttonIds.forEach(id => {
      const btn = document.getElementById(id);
      btn.classList.remove('button-active');
    });

    this.classList.add('button-active');
    
    if (this.id === 'show-all-done') {
        showAllDone();
    } else if (this.id === 'show-all-not-done') {
        showAllNotDone();
    } else if (this.id === 'show-all') {
      showAll();
    }
  });
});