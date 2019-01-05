// UI variables 
const taskInput = document.querySelector('#task');
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');

// Event Listeners 
loadEventListeners();

function loadEventListeners() {
    // On DOM load
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Tasks
    form.addEventListener('submit', addTask);
    // Remove Tasks
    taskList.addEventListener('click', removeTask);
    // Clear Tasks 
    clearBtn.addEventListener('click', clearAllTasks);
    // Filter Tasks 
    filter.addEventListener('keyup', filterTasks);
}

// Get Tasks
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        // Create a li element 
        const li = document.createElement('li');
        // Add a class on li
        li.className = 'collection-item';
        // Adding text 
        li.textContent = task;

        // creating an Link with icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">clear</i>';

        // Append Link to li
        li.appendChild(link);
        // Append li to taskList 
        taskList.appendChild(li);
    })
}

function addTask(event) {

    // If input field is empty 
    if (taskInput.value === '') {
        alert('Please enter a Task')
    } else {

        // Create a li element 
        const li = document.createElement('li');
        // Add a class on li
        li.className = 'collection-item';
        // Adding text 
        li.textContent = taskInput.value;

        // creating an Link with icon
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">clear</i>';

        // Append Link to li
        li.appendChild(link);
        // Append li to taskList 
        taskList.appendChild(li);

        // Store Task in local storage 
        storeTask(taskInput.value);

        // clear input
        taskInput.value = '';
    }
    // move cursor to the iput 
    taskInput.focus();

    event.preventDefault();
}

// Store Tasks
function storeTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter Task 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    const collection = document.querySelectorAll('.collection-item'); // returns a nodeList 
    collection.forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// Remove Task
function removeTask(event) {
    // if has a delete-item class
    if (event.target.parentElement.classList.contains('delete-item')) {
        // confirmation 
        if (confirm('Are you sure?'))
            event.target.parentElement.parentElement.remove();
        // Remove task form Local Storage 
        removeTasksFromLS(event.target.parentElement.parentElement);
    }
}

// Remove form local storage
function removeTasksFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task + 'clear') {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all tasks
function clearAllTasks() {

    // taskList.innerHTML = '';

    // Another faster way:
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // move cursor to the input 
    taskInput.focus();

    clearTaskFromLS();
}

// clear form local storage 
function clearTaskFromLS() {
    localStorage.clear();
}