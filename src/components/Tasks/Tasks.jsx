import React from 'react'
import './Tasks.scss'
import editSVG from '../../assets/img/edit.svg'
import axios from "axios";
import addSVG from '../../assets/img/add.svg'
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import {Link} from "react-router-dom";

const Tasks = ({list, onEditTitle, onAddTask,  withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {

    const editeTitle = () => {
const newTitle = window.prompt('Название списка', list.name);
        if(newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(()=> {
                alert('Не удалось обновить название списка')
            })
        }
    }



    return (
        <div className="todo__tasks">
            <div className='tasks'>
                <Link to={`/lists/${list.id}`}>
                    <h2 style={{color: list.color.hex}} className="tasks__title">
                        {list.name}
                        <img onClick={editeTitle}
                             src={editSVG} alt='Edit icon'/>
                    </h2>
                </Link>
                <div className="tasks__item">
                    {!withoutEmpty && list.tasks && !list.tasks.length && <h2>
                        Задачи отсутствуют
                    </h2> }
                    {list.tasks && list.tasks.map(task => (
                        <Task onRemove={onRemoveTask} onComplete={onCompleteTask} onEdit={onEditTask} list={list} key={task.id} {...task}/>
                    ))}
                    <div className="tasks__form">
                       <AddTaskForm key={list.id} onAddTask={onAddTask} list={list}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks;