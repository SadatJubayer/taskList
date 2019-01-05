// UI variables 

const taskInput = document.querySelector('#task');
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.getElementsByClassName('clear-task');
const filter = document.querySelector('#filter');

// Event Listeners 

loadEventListeners();

function loadEventListeners() {
    form.addEventListener('submit', addTask)
}

function addTask(event) {

    if (taskInput.value === '') {
        alert('Add a task!');
    }

    // Create li Element 
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // create node and link
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon 
    link.innerHTML = '<i class="material-icons">close</i>';
    // Append link to li 
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);


    taskInput.value = '';

    event.preventDefault();
}