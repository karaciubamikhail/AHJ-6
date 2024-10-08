import DrawUI from './DrawUI';
import defaultData from './defaultData';
import LocalStorage from './LocalStorage';

const storage = new LocalStorage();
const drawUI = new DrawUI();
const tasks = document.querySelector('#tasks');

let draggedElement = null;
let ghostElement = null;
let draggedElementWidth;
let draggedElementHeight;
let elementTop;
let elementLeft;

function dragAndDrop(event, element) {
  const closest = document.elementFromPoint(event.clientX, event.clientY);
  const { top } = closest.getBoundingClientRect();

  if (closest.classList.contains('item-task')) {
    if (event.pageY > window.scrollY + top + closest.offsetHeight / 2) {
      closest.closest('.item-tasks').insertBefore(element, closest.nextElementSibling);
    } else {
      closest.closest('.item-tasks').insertBefore(element, closest);
    }
  } else if (closest.classList.contains('item-tasks') && !closest.querySelector('.item-task')) {
    closest.append(element);
  }
}

function saveToStorage() {
  const toDoList = document.querySelectorAll('#todo .item-tasks .item-task');
  const inProgressList = document.querySelectorAll('#in-progress .item-tasks .item-task');
  const doneList = document.querySelectorAll('#done .item-tasks .item-task');

  const tasksCollection = {
    todo: [],
    inProgress: [],
    done: [],
  };

  for (const item of toDoList) {
    tasksCollection.todo.push(item.textContent.replace(' ✖', ''));
  }

  for (const item of inProgressList) {
    tasksCollection.inProgress.push(item.textContent.replace(' ✖', ''));
  }

  for (const item of doneList) {
    tasksCollection.done.push(item.textContent.replace(' ✖', ''));
  }
  storage.save(tasksCollection);
}

document.addEventListener('DOMContentLoaded', () => {
  const localStorageData = JSON.parse(storage.load());
  if (localStorageData) {
    drawUI.fillingTasksFields(localStorageData);
  } else {
    drawUI.fillingTasksFields(defaultData());
  }
});

// mousedown
tasks.addEventListener('mousedown', (event) => {
  // event.preventDefault();
  // открыть добавление новой задачи
  if (event.target.classList.contains('add-task')) {
    event.target.parentNode.querySelector('.input-task').classList.remove('hidden');
    event.target.classList.add('hidden');

    // отмена добавления задачи
  } else if (event.target.classList.contains('b-cancel-task')) {
    event.target.closest('.col-tasks').querySelector('.add-task').classList.remove('hidden');
    event.target.parentNode.classList.add('hidden');

    // добавить новую задачу
  } else if (event.target.classList.contains('b-add-task')) {
    const parentElement = event.target.closest('.col-tasks').querySelector('.item-tasks');
    const inputField = event.target.closest('.input-task').querySelector('#text-task');
    drawUI.addNewTask(parentElement, inputField.value);
    inputField.value = '';
    event.target.closest('.col-tasks').querySelector('.add-task').classList.remove('hidden');
    event.target.parentNode.classList.add('hidden');
    saveToStorage();

    // удалить текущую задачу
  } else if (event.target.classList.contains('del-task')) {
    const taskForDelete = event.target.parentNode;
    taskForDelete.parentNode.removeChild(taskForDelete);
    saveToStorage();

    // начало перемещения задачи
  } else if (event.target.classList.contains('item-task')) {
    event.preventDefault();
    event.target.querySelector('.del-task').classList.add('hidden');
    const { top, left } = event.target.getBoundingClientRect();
    draggedElement = event.target;
    draggedElementWidth = draggedElement.offsetWidth;
    draggedElementHeight = draggedElement.offsetHeight;
    elementLeft = event.pageX - left;
    elementTop = event.pageY - top;

    ghostElement = event.target.cloneNode(true);
    ghostElement.innerHTML = '';
    ghostElement.style.backgroundColor = 'grey';
    ghostElement.style.width = `${draggedElementWidth}px`;
    ghostElement.style.height = `${draggedElementHeight}px`;

    draggedElement.classList.add('dragged');
    event.target.parentNode.insertBefore(ghostElement, event.target.nextElementSibling);

    draggedElement.style.left = `${event.pageX - elementLeft}px`;
    draggedElement.style.top = `${event.pageY - elementTop}px`;
    draggedElement.style.width = `${draggedElementWidth}px`;
    draggedElement.style.height = `${draggedElementHeight}px`;
  }
});

// mouseleave
tasks.addEventListener('mouseleave', (event) => {
  if (draggedElement) {
    event.preventDefault();
    ghostElement.parentNode.removeChild(ghostElement);
    draggedElement.classList.remove('dragged');
    draggedElement.style = '';
    ghostElement = null;
    draggedElement = null;
  }
});

// mousemove
tasks.addEventListener('mousemove', (event) => {
  if (draggedElement) {
    event.preventDefault();
    dragAndDrop(event, ghostElement);
    draggedElement.style.left = `${event.pageX - elementLeft}px`;
    draggedElement.style.top = `${event.pageY - elementTop}px`;
  }
});

// mouseup
tasks.addEventListener('mouseup', (event) => {
  if (draggedElement) {
    dragAndDrop(event, draggedElement);

    ghostElement.parentNode.removeChild(ghostElement);
    draggedElement.classList.remove('dragged');
    draggedElement.style = '';
    ghostElement = null;
    draggedElement = null;

    saveToStorage();
  }
});
