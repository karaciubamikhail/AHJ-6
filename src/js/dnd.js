import {saveBoardState,loadBoardState} from './load'
import {Task} from './task'
export function dnd (){
const items = document.querySelectorAll('.task-body');

//const itemsElements = items.querySelector('.task-body__item');

let actualElement;

const onMouseOver = (e) => {

    actualElement.style.top = e.clientY + 'px';
    actualElement.style.left = e.clientX + 'px';
};

const onMouseUp = (e) => {
    const mouseUpItem = e.target;
        const elem = mouseUpItem.parentElement;
        elem.insertBefore(actualElement, mouseUpItem);
    
        actualElement.classList.remove('dragged');
        actualElement = undefined;
    
        document.documentElement.removeEventListener('mouseup', onMouseUp);
        document.documentElement.removeEventListener('mouseover', onMouseOver);
        saveBoardState();
};

    items.forEach((elem)=>{
        elem.addEventListener('mousedown', (e) => {
            if(!e.target.classList.contains('remove_tas')){
            e.preventDefault();
            console.log(e.target.classList.contains('remove_tas'))
            actualElement = e.target;
                actualElement.classList.add('dragged');
            
                document.documentElement.addEventListener('mouseup', onMouseUp);
                document.documentElement.addEventListener('mouseover', onMouseOver);
            }
            else{
                e.target.addEventListener('click',(e)=>{
                    e.target.parentElement.remove()
                    saveBoardState() 
                })
            }
        })
    })
}