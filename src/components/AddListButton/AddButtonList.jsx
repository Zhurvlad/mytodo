import React, {useEffect, useState} from 'react'
import List from "../List/List";
import axios from 'axios'
import './AddListButton.scss'
import Badge from "../Badge/Badge";
import closeSVG from '../../assets/img/close.svg'

const AddButtonList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectedColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        setSelectedColor(null)
    }


    const addList = () => {
        if (!inputValue) {
            alert('Введите название списка')
            return
        }
        setIsLoading(true)
        /* const color = colors.filter(c => c.id === selectedColor)[0].name;*/
        axios.post('http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor
        })
            .then(({data}) => {
                const color = colors.filter(c => c.id === setSelectedColor)[0];
                const listObj = {...data, color: {name: color.name, hex: color.hex}, tasks: []};
                onAdd(listObj);
                onClose()
            }).catch(() => {
            alert('Ошибка при добавлении списка');
        })
            .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className='add-list'>
            <List onClick={() => setVisiblePopup(true)}
                  items={[
                      {
                          className: 'list__icon-plus',
                          icon: (<svg width="12"
                                      height="12" viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                          >
                              <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                              <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                          </svg>)

                          ,
                          name: 'Добавить список',
                      }]}
                  isRemovable={false}
            />
            {visiblePopup && <div className="add-list__popup">
                <img
                    onClick={onClose}
                    src={closeSVG}
                    alt='close Button'
                    className="add-list__popup-close-btn"/>

                <input
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                    className='field'
                    placeholder='Название списка'/>
                <div className="add-list__popup-colors">
                    {
                        colors.map((color) => (<Badge onClick={() => setSelectedColor(color.id)}
                                                      key={color.id}
                                                      color={color.name}
                                                      className={selectedColor === color.id && 'active'}
                            />)
                        )
                    }
                </div>
                <button onClick={addList}
                        className='button'>
                    {isLoading ? 'Добавление...' : 'Добавить'}
                </button>
            </div>}
        </div>
    )
}

export default AddButtonList;