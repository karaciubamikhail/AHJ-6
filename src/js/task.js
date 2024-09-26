import {saveBoardState,loadBoardState} from './load'
import {dnd} from './dnd'
export class Task {
    constructor(element){
        this.element =  document.querySelectorAll('.task'); ;
        this.btns = document.querySelectorAll('.task-add');
    }
    init(){
      this.addBtn();
      dnd ();
    }
    addBtn (){
      let btnAdd = this.btns;
      btnAdd.forEach((elem)=>{
        elem.addEventListener('click',this.AddTask)})
    }
    static createElement (tag,className,content){
      let element = document.createElement (tag);
      if(className || className !=null){
          element.classList.add(className);
      }
      if(content || content !=null){
          element.textContent = content;
      }
      return element;
  }
    AddTask (e){
      let parrent = e.target.parentElement;
      let bodyTask = parrent.querySelector('.task-body');
      let windowsTask = Task.createElement('div','task-add__window',null);
      let imputTask = Task.createElement('input','task-add__imput',null);
      let btnTask = Task.createElement('button','task-add__btn',null);
      btnTask.textContent = 'Добавить задачу'
      imputTask.setAttribute('type','text');
      windowsTask.appendChild(imputTask);
      windowsTask.appendChild(btnTask);
      parrent.appendChild(windowsTask);
      let removeTask = Task.createElement('button','remove_task',null);
      removeTask.textContent = 'Удалить'
        btnTask.addEventListener('click',()=>{
            let task = Task.createElement('div','task-body__item',null);
            task.textContent = imputTask.value;
            task.appendChild(removeTask)
            bodyTask.appendChild(task);
            windowsTask.remove();
            let remove = document.querySelector('.remove_task')
            removeTask.addEventListener('click',(e)=>{
              e.target.parentElement.remove();
              saveBoardState();
              dnd ()
            })
            saveBoardState();
            dnd ()
        });
  }
}