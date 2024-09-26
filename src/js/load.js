import { Task } from "./task";
export function saveBoardState() {
    const boardHTML = document.querySelector('.container').innerHTML;
    localStorage.setItem('boardState', boardHTML);
  }

  // Загрузка состояния доски из localStorage
  export function loadBoardState() {
    const savedBoardState = localStorage.getItem('boardState');
    if (savedBoardState) {
    document.querySelector('.container').innerHTML = savedBoardState;
    let taskManager = new Task (document.querySelectorAll('.task'));
    taskManager.init();
    }
  }