import React from 'react'
import './List.scss'
import classNames from 'classname'
import Badge from "../Badge/Badge";
import axios from 'axios'

import removeSVG from '../../assets/img/remove.svg'




const List = ({items, isRemovable, onClick, onRemove,onClickItem, activeItem }) => {

    const removeList = (item) => {
        if ( window.confirm('Вы действительно хотите удалить список')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() =>{
                onRemove(item.id)
            })
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, _index) => (
                <li onClick={onClickItem ? () => onClickItem(item): null}
                    key={_index}
                    className={classNames(item.className, {active: item.active ? item.active : activeItem && activeItem.id === item.id})}>
                    <i>{item.icon ? item.icon :<Badge  color={item.color.name}/> }</i>
                        <span>{item.name}{item.tasks &&  ` (${item.tasks.length})`}</span>
                    {isRemovable && <img
                        className='list__remove-icon'
                        src={removeSVG}
                        alt='Deleted icon'
                    onClick={() => removeList(item)}
                    />}
                    </li>
                ))}
        </ul>
    )
}

export default List