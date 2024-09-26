import { Task } from "../task";

test('Create task', () => { 
    document.body.innerHTML = `
    <div class = "container">
    <div class="task">
      <div class="task-head">
        <h2 class="task-head-header">TODO</h2>
      </div>
      <div class="task-body">
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
      </div>
      <button class="task-add">Add abother card</button>
    </div>
    <div class="task">
      <div class="task-head">
        <h2 class="task-head-header">In progress</h2>
      </div>
      <div class="task-body">
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
      </div>
      <button class="task-add">Add abother card</button>
    </div>
    <div class="task">
      <div class="task-head">
        <h2 class="task-head-header">Done</h2>
      </div>
      <div class="task-body">
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
        <div class="task-body__item">
          text
          <button class="remove_tas">Удалить</button>
        </div>
      </div>
      <button class="task-add">Add abother card</button>
    </div>
  </div>
    `;
  let taskManager = new Task (document.querySelectorAll('.task'));
    taskManager.init();
    let btnadd = document.querySelector('.task-add');
    btnadd.click();
    let imput = document.querySelector('.task-add__imput');
    imput.value = 'check';
    let btnTask = document.querySelector('.task-add__btn');
    btnTask.click();
    let task = document.querySelector('.task-body__item');
    expect(task.classList.contains('task-body__item')).toBe(true)
 })
 test('Remove task', () => { 
  document.body.innerHTML = `
  <div class = "container">
  <div class="task">
    <div class="task-head">
      <h2 class="task-head-header">TODO</h2>
    </div>
    <div class="task-body">
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
    </div>
    <button class="task-add">Add abother card</button>
  </div>
  <div class="task">
    <div class="task-head">
      <h2 class="task-head-header">In progress</h2>
    </div>
    <div class="task-body">
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
    </div>
    <button class="task-add">Add abother card</button>
  </div>
  <div class="task">
    <div class="task-head">
      <h2 class="task-head-header">Done</h2>
    </div>
    <div class="task-body">
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
      <div class="task-body__item">
        text
        <button class="remove_tas">Удалить</button>
      </div>
    </div>
    <button class="task-add">Add abother card</button>
  </div>
</div>
  `;
let taskManager = new Task (document.querySelectorAll('.task'));
  taskManager.init();
  let btnadd = document.querySelector('.task-add');
  btnadd.click();
  let imput = document.querySelector('.task-add__imput');
  imput.value = 'check';
  let btnTask = document.querySelector('.task-add__btn');
  btnTask.click();
  let delet = document.querySelector('.remove_tas')
  delet.click();
  let task = btnTask.parentElement;
  expect(task.classList.contains('task-body__item')).toBe(false)
})