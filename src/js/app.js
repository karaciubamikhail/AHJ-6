// TODO: write code here
import { Task } from "./task";
import {loadBoardState} from './load'
if(localStorage.getItem('boardState')){
    loadBoardState()
}else{
    document.addEventListener('DOMContentLoaded',loadBoardState())
    let taskManager = new Task (document.querySelectorAll('.task'));
    taskManager.init();
}