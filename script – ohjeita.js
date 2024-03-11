// Haetaan tarvittavat elementit DOMista
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Tarkistetaan onko tallennettuja tehtäviä paikallisessa tallennustilassa
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Näytetään tallennetut tehtävät
renderTasks();

// Funktio lomakkeen validointiin
function validateForm() {
    let taskText = todoInput.value.trim(); // Otetaan tehtäväteksti lomakkeesta ja poistetaan ylimääräiset välilyönnit

    if (taskText === '') {
        alert("Tehtävä täytyy kirjoittaa");
        return false; // Palautetaan false estääkseen lomakkeen lähettämisen
    }

    return true; // Palautetaan true sallimaan lomakkeen lähettäminen
}

// Lisätään tapahtumankäsittelijä lomakkeelle
todoForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Estetään lomakkeen oletustoiminta

    // Kutsutaan validateForm-funktiota tarkistamaan lomakkeen syöte
    if (!validateForm()) {
        return; // Jos lomake ei ole kelvollinen, ei tehdä mitään
    }

    const taskText = todoInput.value.trim(); // Otetaan tehtäväteksti lomakkeesta ja poistetaan ylimääräiset välilyönnit

    // Luodaan tehtäväobjekti
    const task = {
        id: Date.now(), // Käytetään aikaleimaa tehtävän yksilöimiseen
        text: taskText,
        completed: false // Oletuksena tehtävä ei ole suoritettu
    };

    // Lisätään tehtävälistaan ja päivitetään näkymä
    tasks.push(task);
    renderTasks();

    // Tallennetaan päivitetty tehtävälista paikalliseen tallennustilaan
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Tyhjennetään syötekenttä
    todoInput.value = '';
});

// Funktio tehtävälistan päivittämiseen
function renderTasks() {
    todoList.innerHTML = ''; // Tyhjennetään tehtävälista

    tasks.forEach(task => {
        // Luodaan tehtäväelementti
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        // Lisätään tehtävän teksti elementtiin
        taskElement.innerText = task.text;

        // Lisätään ruksausnappi
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            task.completed = !task.completed;
            renderTasks(); // Päivitetään näkymä ruksauksen muutoksen jälkeen
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Tallennetaan päivitetty tehtävälista
        });
        taskElement.prepend(checkbox);

        // Lisätään delete-nappi
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks(); // Päivitetään näkymä poiston jälkeen
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Tallennetaan päivitetty tehtävälista
        });
        taskElement.append(deleteButton);

        // Lisätään tehtäväelementti sivulle
        todoList.appendChild(taskElement);
    });
}

// Funktio näyttää valmiit tehtävät
function showAllReadyDone() {
    tasks.forEach(task => {
        if (task.completed) {
            document.getElementById(task.id).style.display = "block";
        } else {
            document.getElementById(task.id).style.display = "none";
        }
    });
}

// Funktio näyttää tekemättömät tehtävät
function showNotDone() {
    tasks.forEach(task => {
        if (!task.completed) {
            document.getElementById(task.id).style.display = "block";
        } else {
            document.getElementById(task.id).style.display = "none";
        }
    });
}

// Funktio näyttää kaikki tehtävät
function showAll() {
    tasks.forEach(task => {
        document.getElementById(task.id).style.display = "block";
    });
}

// Funktio lomakkeen validointiin
function validateForm() {
    let taskText = todoInput.value.trim(); // Otetaan tehtäväteksti lomakkeesta ja poistetaan ylimääräiset välilyönnit

    if (taskText === '') {
        alert("Tehtävä täytyy kirjoittaa");
        return false; // Palautetaan false estääkseen lomakkeen lähettämisen
    }

    return true; // Palautetaan true sallimaan lomakkeen lähettäminen
}

// Lisätään tapahtumankäsittelijä lomakkeelle
todoForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Estetään lomakkeen oletustoiminta

    // Kutsutaan validateForm-funktiota tarkistamaan lomakkeen syöte
    if (!validateForm()) {
        return; // Jos lomake ei ole kelvollinen, ei tehdä mitään
    }

    const taskText = todoInput.value.trim(); // Otetaan tehtäväteksti lomakkeesta ja poistetaan ylimääräiset välilyönnit

    // Luodaan tehtäväobjekti
    const task = {
        id: Date.now(), // Käytetään aikaleimaa tehtävän yksilöimiseen
        text: taskText,
        completed: false // Oletuksena tehtävä ei ole suoritettu
    };

    // Lisätään tehtävälistaan ja päivitetään näkymä
    tasks.push(task);
    renderTasks();

    // Tallennetaan päivitetty tehtävälista paikalliseen tallennustilaan
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Tyhjennetään syötekenttä
    todoInput.value = '';
});

// Funktio tehtävälistan päivittämiseen
function renderTasks() {
    todoList.innerHTML = ''; // Tyhjennetään tehtävälista

    tasks.forEach(task => {
        // Luodaan tehtäväelementti
        const taskElement = document.createElement('div');
        taskElement.id = task.id; // Asetetaan id elementille samaksi kuin tehtävälle, jotta sitä voidaan manipuloida helposti
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }

        // Lisätään tehtävän teksti elementtiin
        taskElement.innerText = task.text;

        // Lisätään ruksausnappi
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            task.completed = !task.completed;
            renderTasks(); // Päivitetään näkymä ruksauksen muutoksen jälkeen
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Tallennetaan päivitetty tehtävälista
        });
        taskElement.prepend(checkbox);

        // Lisätään delete-nappi
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks(); // Päivitetään näkymä poiston jälkeen
            localStorage.setItem('tasks', JSON.stringify(tasks)); // Tallennetaan päivitetty tehtävälista
        });
        taskElement.append(deleteButton);

        // Lisätään tehtäväelementti sivulle
        todoList.appendChild(taskElement);
    });
}
