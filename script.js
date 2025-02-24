let editingIndex = null;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        

        if (editingIndex === index) {
            const editInput = document.createElement('input');
            editInput.value = task.text;
            editInput.classList.add('edit-input');
            editInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    saveTask(index, editInput.value);
                }
            });

            li.appendChild(editInput);
            const saveButton = document.createElement('button');
            saveButton.classList.add('save');
            const updateIcon = document.createElement('i');
            updateIcon.classList.add('fas', 'fa-sync-alt');
            saveButton.appendChild(updateIcon); 
            saveButton.appendChild(document.createTextNode(''));
            
            saveButton.onclick = () => saveTask(index, editInput.value);
            li.appendChild(saveButton);
            
        } else {
            const taskTextContainer = document.createElement('div');
            taskTextContainer.classList.add('task-text');
            taskTextContainer.textContent = task.text;

            if (task.completed) {
                li.classList.add('completed');
            }

            // Botão de conclusão
            const completeButton = document.createElement('button');
            const completeIcon = document.createElement('i');
            completeIcon.classList.add('fas', task.completed ? 'fa-times' : 'fa-check');
            completeButton.appendChild(completeIcon);
            completeButton.classList.add('complete'); 
            completeButton.onclick = () => toggleCompletion(index);

            // Botão de remoção
            const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash'); 
            deleteButton.appendChild(deleteIcon);
            deleteButton.classList.add('remove'); 
            deleteButton.onclick = () => deleteTask(index); 

            // Botão de edição
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
    editingIndex = index;
    loadTasks();
}

function saveTask(index, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (newText.trim() !== '') {
        tasks[index].text = newText;
    }
    editingIndex = null; // Limpar o modo de edição
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(); // Recarregar as tarefas
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        
        if (editingIndex !== null) {
            tasks[editingIndex].text = taskText;
            editingIndex = null;  // Limpar a variável de edição
            document.querySelector('.add-task-button').textContent = 'Adicionar'; // Voltar ao texto original do botão
        } else {
            const newTask = {
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = ''; // Limpar o campo de input
        loadTasks(); // Recarregar a lista de tarefas
    }
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); 
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function toggleCompletion(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTask();
    }
});

window.onload = loadTasks;
