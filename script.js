let editingIndex = null;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        

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
        taskList.appendChild(li);
    });
}

function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = tasks[index].text;
    document.getElementById('taskInput').value = taskText; 
    editingIndex = index; 
    document.querySelector('.add-task-button').textContent = 'Atualizar';
}


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
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
        taskInput.value = ''; 
        loadTasks();
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
