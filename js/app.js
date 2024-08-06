//? Initialize tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//? Function to save tasks to localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//? Function to add a new task
const addTask = text => {
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

//? Function to toggle task completion
const toggleTaskCompleted = id => {
    tasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
    saveTasks();
    renderTasks();
}

//? Function to delete a task
const  deleteTask = id => {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

//? Function to render tasks in the DOM
const renderTasks = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.classList.toggle('completed', task.completed);
        li.addEventListener('click', () => toggleTaskCompleted(task.id));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            deleteTask(task.id);
//* Function that uses a library to show a banner when you delete a task
            Toastify({
                text: 'You delet a task',
                duration: 4000,
                style: {background: 'red'},
            }).showToast();
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

//? Event listener to add tasks from the form
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    if (taskInput.value.trim() !== '') {
        addTask(taskInput.value.trim());
        taskInput.value = '';
    }
//* Function that uses a library to show a banner when you add a task
    Toastify({
        text: 'You add a task',
        duration: 4000,
        style: {background: 'green'},
    }).showToast();
});

//? Initial render of tasks
renderTasks();
