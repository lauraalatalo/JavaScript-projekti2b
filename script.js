$(document).ready(function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    $('#todo-form').submit(function(event) {
        event.preventDefault();
        let taskText = $('#todo-input').val().trim();
        if (taskText === '') {
            alert('Et voi lisätä tyhjää tehtävää.');
            return;
        }
        let task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        let $newTask = addToDOM(task);
        $newTask.hide().fadeIn(500);
        $('#todo-input').val('');
    });

    function renderTasks() {
        $('#todo-list').empty();
        tasks.forEach(task => {
            addToDOM(task).hide().fadeIn(500);
        });
    }

    $('#show-all-done').click(function() {
        $('.task').each(function() {
            var $this = $(this);
            if ($this.data('completed')) {
                $this.slideDown();
            } else {
                $this.slideUp();
            }
        });
    });

    $('#show-all-not-done').click(function() {
        $('.task').each(function() {
            var $this = $(this);
            if (!$this.data('completed')) {
                $this.slideDown();
            } else {
                $this.slideUp();
            }
        });
    });

    $('#show-all').click(function() {
        $('.task').each(function() {
            $(this).slideDown();
        });
    });

    $('#mark-all-done-button').click(function() {
        tasks.forEach(task => {
            task.completed = true;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    });

    $('#clear-all-button').click(function() {
        if (confirm('Haluatko varmasti tyhjentää kaikki tehtävät?')) {
            $('#todo-list').children().fadeOut(500, function() {
                tasks = [];
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            });
        }
    });

    function addToDOM(task) {
        let $taskElement = $('<div></div>', {
            'id': task.id,
            'class': 'task',
            'data-completed': task.completed,
            'text': task.text
        }).prepend($('<input>', {
            'type': 'checkbox',
            'checked': task.completed,
            'change': function() {
                task.completed = !task.completed;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            }
        }));

        if (task.completed) {
            $taskElement.addClass('completed');
        }

        $taskElement.append($('<button>', {
            'text': 'Poista',
            'click': function() {
                $taskElement.fadeOut(500, function() {
                    tasks = tasks.filter(t => t.id !== task.id);
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    renderTasks();
                });
            }
        }));

        $('#todo-list').append($taskElement);
        return $taskElement;
    }
});
