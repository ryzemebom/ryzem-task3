let editingIndex = null;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        if (editingIndex === index) {
            const editTextArea = document.createElement('textarea');
            editTextArea.value = task.text;
            editTextArea.classList.add('edit-input');
            editTextArea.focus();
            editTextArea.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && event.shiftKey) { 
                    event.preventDefault();
                    saveTask(index, editTextArea.value);
                }
            });
            
            li.appendChild(editTextArea);

            const saveButton = document.createElement('button');
            saveButton.classList.add('save');
            const updateIcon = document.createElement('i');
            updateIcon.classList.add('fas', 'fa-sync-alt');
            saveButton.appendChild(updateIcon); 
            saveButton.onclick = () => saveTask(index, editTextArea.value);
            li.appendChild(saveButton);
        } else {
            const taskTextContainer = document.createElement('div');
            taskTextContainer.classList.add('task-text');
            taskTextContainer.textContent = task.text;

            if (task.completed) {
                li.classList.add('completed');
            }

            const completeButton = document.createElement('button');
            const completeIcon = document.createElement('i');
            completeIcon.classList.add('fas', task.completed ? 'fa-times' : 'fa-check');
            completeButton.appendChild(completeIcon);
            completeButton.classList.add('complete');
            completeButton.onclick = () => toggleCompletion(index);

            const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash');
            deleteButton.appendChild(deleteIcon);
            deleteButton.classList.add('remove');
            deleteButton.onclick = () => deleteTask(index);

            const editButton = document.createElement('button');
            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-edit');
            editButton.appendChild(editIcon);
            editButton.classList.add('edit');
            editButton.onclick = () => editTask(index);

            li.appendChild(taskTextContainer);
            li.appendChild(completeButton);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
        }

        taskList.appendChild(li);
    });
}

function editTask(index) {
    document.getElementById('loadingSpinner').style.display = 'flex';
    editingIndex = index;

    setTimeout(() => {
        loadTasks();
        document.getElementById('loadingSpinner').style.display = 'none';
    }, 400);
}


function saveTask(index, newText) {
    document.getElementById('loadingSpinner').style.display = 'flex'; 
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (newText.trim() !== '') {
        tasks[index].text = newText;
    }
    editingIndex = null;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    setTimeout(() => {
        loadTasks();
        document.getElementById('loadingSpinner').style.display = 'none'; 
    }, 500);
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        document.getElementById('loadingSpinner').style.display = 'flex'; // Mostrar o spinner ao adicionar a tarefa

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        if (editingIndex !== null) {
            tasks[editingIndex].text = taskText;
            editingIndex = null;
            document.querySelector('.add-task-button').textContent = 'Adicionar';
        } else {
            const newTask = {
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = ''; // Limpa o campo de input

        setTimeout(() => {
            loadTasks();
            document.getElementById('loadingSpinner').style.display = 'none'; // Esconde o spinner
        }, 500);
    }
}

function deleteTask(index) {
    document.getElementById('loadingSpinner').style.display = 'flex';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    setTimeout(() => {
        loadTasks();
        document.getElementById('loadingSpinner').style.display = 'none'; 
    }, 500);
}

function toggleCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    setTimeout(() => {
        loadTasks();
        document.getElementById('loadingSpinner').style.display = 'none'; 
    }, 500);
}

document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

window.onload = loadTasks;
