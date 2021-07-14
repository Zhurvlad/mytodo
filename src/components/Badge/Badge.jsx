import React from 'react'

import './Badge.scss'
import classNames from 'classname'

const Badge =  ({color, onClick, className}) => {
    return(
        <i onClick={onClick}
           className={classNames('badge', {[`badge__${color}`]: color}, className)}></i>
    )

}

export default Badge;

