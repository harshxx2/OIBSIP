// Get DOM elements
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const prioritySelect = document.getElementById('prioritySelect');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearTasksButton = document.getElementById('clearTasksButton');

// Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add(task.priority);
        if (task.completed) taskItem.classList.add('completed');
        
        taskItem.innerHTML = `
            <span>${task.name} <small>(${task.dueDate})</small></span>
            <div>
                <button class="editButton" onclick="editTask(${index})">Edit</button>
                <button class="deleteButton" onclick="deleteTask(${index})">X</button>
            </div>
        `;
        taskItem.addEventListener('click', () => toggleCompletion(index));
        taskList.appendChild(taskItem);
    });
}

// Add a new task
addTaskButton.addEventListener('click', () => {
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskName === '') {
        alert('Please enter a task!');
        return;
    }

    const newTask = {
        name: taskName,
        dueDate: dueDate || 'No due date',
        priority: priority,
        completed: false,
    };

    tasks.push(newTask);
    taskInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'low';

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
});

// Toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Edit task
function editTask(index) {
    const newName = prompt('Edit Task Name:', tasks[index].name);
    const newDueDate = prompt('Edit Due Date:', tasks[index].dueDate);

    if (newName) tasks[index].name = newName;
    if (newDueDate) tasks[index].dueDate = newDueDate;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Clear all tasks
clearTasksButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) {
        tasks = [];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
});

// Initialize app
displayTasks();
