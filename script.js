document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTask(taskText);
        taskInput.value = '';
    }

    function createTaskElement(taskText, completed = false) {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (completed) li.classList.add('completed');

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', function() {
            li.classList.toggle('completed');
            completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
            updateTask(taskText, li.classList.contains('completed'));
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            deleteTask(taskText);
        });

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        return li;
    }

    function saveTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.completed);
            taskList.appendChild(taskItem);
        });
    }

    function updateTask(taskText, completed) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.text === taskText) {
                return { text: taskText, completed: completed };
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
