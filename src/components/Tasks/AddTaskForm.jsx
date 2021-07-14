import addSVG from "../../assets/img/add.svg";
import React, {useState} from "react";
import  axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputForm, setInputForm] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputForm('')
    }

    const addTask = () => {
        const obj = {

            listId: list.id,
            text: inputForm,
            completed: false
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks/', obj).then(({ data }) => {
            onAddTask(list.id, data)
            toggleFormVisible();
        },)
            .catch(() => {
            alert('Ошибка при добавлении задачи');
        })
            .finally(() => {
            setIsLoading(false)
        });
    }

    return <div>
        <div className="tasks__form">
            {!visibleForm ? <div onClick={toggleFormVisible} className="tasks__form-new">
                <img src={addSVG} alt={'Добавить задачу'}/>
                <span> Новая задача </span>
            </div> : <div className="tasks__form-block">
                <input
                    value={inputForm}
                    className='field'
                    placeholder='Текст задачи'
                    onChange={e => setInputForm(e.target.value)}
                />

                <button disabled={isLoading} onClick={addTask} className='button'>
                    {isLoading ? 'Добавление...' : 'Добавить задачу'}
                </button>
                <button  onClick={toggleFormVisible} className='button button--grey'>
                    Отмена
                </button>
            </div>}
        </div>
    </div>


}

export default AddTaskForm;

