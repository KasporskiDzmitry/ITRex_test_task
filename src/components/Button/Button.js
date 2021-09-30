import React from "react";
import style from './Button.module.scss';

export const Button = props => {
    const classes = props.classList ? `${style.btn} ${props.classList.map(i => i).join(' ')}` : style.btn;
    return <div className={classes} onClick={props.onClickHandler}>
        {props.btnName}
        {props.children}
    </div>
};