let item = [];
export class Task {
    constructor(element){
        this._element = element;
        this.tasks = [];
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
    static removesTask(e){
        let task = e.target.parentElement;
        let indexdelitem = item.findIndex((item)=>{
            return item == task;
        })
        item.splice(indexdelitem,1)
        task.remove();
        Task.updateDom(task);
    }
    static updateDom (){
        return document.querySelectorAll('.task')
    }
    static addTask (task){
        let windowsTask = task.querySelector('.task-add__window');
        let btnTask = task.querySelector('.task-add__btn');
        let imputTask = task.querySelector('.task-add__imput');
        let taskBody = task.querySelector('.task-body')
        let removeTask = Task.createElement('button','remove_task',null);
        removeTask.textContent = 'Удалить'
        btnTask.addEventListener('click',()=>{
            task = Task.createElement('div','task-body__item',null);
            task.textContent = imputTask.value;
            task.appendChild(removeTask)
            taskBody.appendChild(task);
            windowsTask.remove();
            let btnrem = taskBody.querySelector('.remove_task')
            btnrem.addEventListener('click',Task.removesTask)
            item.push(taskBody);
            Task.updateDom(taskBody);
        });
    }
    static updateDom (result){
        if(result.parentElement.classList != null){
            console.log(result.parentElement.parentElement)
        }
    }
    windowsAddTask (e){
        let parrent = e.target.parentElement;
        let bodyTask = parrent.querySelector('.task-body');
        let windowsTask = Task.createElement('div','task-add__window',null);
        let imputTask = Task.createElement('input','task-add__imput',null);
        let btnTask = Task.createElement('button','task-add__btn',null);
        btnTask.textContent = 'Добавить задачу'
        imputTask.setAttribute('type','text');
        windowsTask.appendChild(imputTask);
        windowsTask.appendChild(btnTask);
        bodyTask.appendChild(windowsTask);
        let result = e.target.parentElement;
        Task.addTask(result);
    }
    eventTask (){
        let task = this.taskSelector();
        let btns = [];
        let tasks = [];
        task.forEach((element)=>{
            btns.push(element.querySelector('.task-add'))
        })
        btns.forEach(element => {
            element.addEventListener('click',this.windowsAddTask);
        });
    }
    taskSelector (){
        return this._element;
    }
    removeBtn (){
        console.log(this.taskSelector)
    }
    start(){
        this.eventTask();
    }
}
console.log(item);