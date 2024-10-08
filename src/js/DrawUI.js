/* eslint-disable class-methods-use-this */
export default class DrawUI {
  constructor() {
    this.toDoField = document.querySelector('#todo .item-tasks');
    this.inProgressField = document.querySelector('#in-progress .item-tasks');
    this.doneField = document.querySelector('#done .item-tasks');
  }

  fillingTasksFields(data) {
    this.fillingCurrentField(this.toDoField, data.todo);
    this.fillingCurrentField(this.inProgressField, data.inProgress);
    this.fillingCurrentField(this.doneField, data.done);
  }

  fillingCurrentField(parentElement, data) {
    for (let i = 0; i < data.length; i += 1) {
      this.addNewTask(parentElement, data[i]);
    }
  }

  addNewTask(parentElement, value) {
    const newTask = document.createElement('div');
    newTask.className = 'item-task';
    newTask.innerHTML = `
      ${value}
      <div class="del-task hidden">&#x2716;</div>
    `;
    parentElement.appendChild(newTask);
  }
}
