// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Add event listener to the Add Task button
addTaskButton.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.textContent = taskInput.value;
    taskInput.value = '';  // Clear input field

    // Add a delete button to the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    // Add event listener for marking the task as completed
    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    // Append delete button to the task item
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}
