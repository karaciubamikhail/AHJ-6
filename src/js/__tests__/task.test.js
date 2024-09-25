import { Task } from "../task";

test('should first', () => { 
    document.body.textContent = `
    <div class = "container">
    <div class="task">
      <div class="task-head">
        <h2 class="task-head-header">TODO</h2>
      </div>
      <div class="task-body">
      </div>
      <button class="task-add">Add abother card</button>
    </div>
    <div class="task">
      <div class="task-head">
        <h2 class="task-head-header">In progress</h2>
      </div>
      <div class="task-body">
      </div>
      <button class="task-add">Add abother card</button>
    </div>
    <div class="task">
      <div class="task-head">
        <h2 class="task-head-header">Done</h2>
      </div>
      <div class="task-body">
      </div>
      <button class="task-add">Add abother card</button>
    </div>
  </div>`
  let taskManager = new Task (document.querySelectorAll('.task'));
    taskManager.start();
    expect(1).toBe(1)
 })