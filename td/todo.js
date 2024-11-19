document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const pendingTaskList = document.getElementById('pendingTaskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const searchInput = document.getElementById('searchInput');
  
    const modal = document.getElementById('editModal');
    const closeModal = document.querySelector('.close');
    const editTaskInput = document.getElementById('editTaskInput');
    const saveTaskBtn = document.getElementById('saveTaskBtn');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks in the respective lists (pending/completed)
    function renderTasks() {
      pendingTaskList.innerHTML = '';
      completedTaskList.innerHTML = '';
  
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
          <span>${task.text}</span>
          <span>${task.timestamp}</span>
          <div class="actions">
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            <button class="complete" onclick="toggleComplete(${task.id})">
              ${task.completed ? 'Unmark' : 'Complete'}
            </button>
          </div>
        `;
        if (task.completed) {
          completedTaskList.appendChild(li);
        } else {
          pendingTaskList.appendChild(li);
        }
      });
    }
  
    // Add task
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        const newTask = {
          id: Date.now(),
          text: taskText,
          completed: false,
          timestamp: new Date().toLocaleString(),
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
      }
    });
  
    // Edit Task
    window.editTask = function(id) {
      const task = tasks.find(t => t.id === id);
      editTaskInput.value = task.text;
      modal.style.display = 'flex';
  
      saveTaskBtn.onclick = () => saveTaskChanges(id);
    };
  
    // Save task changes
    function saveTaskChanges(id) {
      const task = tasks.find(t => t.id === id);
      task.text = editTaskInput.value.trim();
      task.timestamp = new Date().toLocaleString(); // Update timestamp after editing
      saveTasks();
      renderTasks();
      modal.style.display = 'none';
    }
  
    // Toggle task completion
    window.toggleComplete = function(id) {
      const task = tasks.find(t => t.id === id);
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };
  
   
  