import React, {useEffect, useRef, useState} from "react";
import style from './ButtonDropDown.module.scss';
import {Button} from "../Button/Button";

function useOutsideClick(ref, handleClick) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClick(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handleClick]);
}

export const ButtonDropdown = (props) => {

    const [isActive, setIsActive] = useState(false);
    const btnRef = useRef(null);
    useOutsideClick(btnRef, setIsActive);

    return <div ref={btnRef}  className={style.dropdown}>
        <Button classList={[style.dropbtn]} onClickHandler={() => setIsActive(!isActive)} btnName={props.btnName}><span>&#8628;</span></Button>
        <div className={isActive ? `${style.dropdownContent} ${style.active}` : style.dropdownContent}>
            <div onClick={() => {
                setIsActive(!isActive);
                props.onClickHandler('All')
            }}>All</div>
            {
                props.content.map((i, idx) => <div key={idx} onClick={() => {
                    setIsActive(!isActive);
                    props.onClickHandler(i)
                }}>{i}</div>)
            }
        </div>
    </div>
};