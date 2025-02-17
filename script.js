function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpa a lista antes de re-renderizar

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        
        // Cria um contêiner para o texto da tarefa
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

        li.appendChild(taskTextContainer);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}


function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);

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

    loadTasks(); }

document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {  
        event.preventDefault();  
        addTask();
    }
});

window.onload = loadTasks; 