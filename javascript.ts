document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Tarkistaa ja tallentaa TODO:n localstorageen
    function saveTodo(todoText) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: todoText, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    // Renderöi TODO-listan
    function renderTodos() {
        list.innerHTML = '';
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach((todo, index) => {
            const item = document.createElement('div');
            item.textContent = todo.text;
            if (todo.completed) {
                item.classList.add('completed');
            }
            item.addEventListener('click', () => toggleCompleted(index));
            list.appendChild(item);
        });
    }

    // Merkitsee TODO:n hoidetuksi tai takaisin avoimeksi
    function toggleCompleted(index) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos[index].completed = !todos[index].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    // Tarkistaa, lisää TODO:n ja tyhjentää syöttökentän
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText.length > 0) {
            saveTodo(todoText);
            input.value = '';
            input.classList.remove('error');
        } else {
            input.classList.add('error');
            alert('Please enter a valid TODO!');
        }
    });

    // Renderöi TODO-listan sivun latauksen yhteydessä
    renderTodos();
});