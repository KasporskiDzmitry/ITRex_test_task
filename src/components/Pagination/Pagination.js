import React, {useEffect, useState} from "react";
import style from './Pagination.module.scss';

const Pagination = (props) => {
    const pageCount = Math.ceil(props.data.length / props.itemsPerPage);
    const [currPage, setCurrPage] = useState(0);
    const [controlsGroup, setControlsGroup] = useState(0);

    useEffect(() => {
        setCurrPage(props.currentPage)
        if (props.currentPage === 0) {
            setControlsGroup(0);
        }
    }, [props.currentPage])

    useEffect(() => {
        props.onPageChange(currPage)
    }, [currPage])

    const renderControls = () => {
        let limit = props.controlsNumber > pageCount ? pageCount : props.controlsNumber;
        if (props.controlsNumber < pageCount && (controlsGroup + 1) * props.controlsNumber > pageCount) {
            limit = (controlsGroup + 1) * props.controlsNumber - pageCount - 1;
        }
        return [...new Array(limit)].map((i, idx) => {
                return <div key={idx} onClick={() => onClickHandler(controlsGroup * props.controlsNumber + idx)}
                            className={currPage === controlsGroup * props.controlsNumber + idx ? `${style.control} ${style.active}` : style.control}>{controlsGroup * props.controlsNumber + idx + 1}</div>
            }
        )
    };

    const onClickHandler = (page) => {
        if (page + 1 > props.controlsNumber * (controlsGroup + 1)) {
            setControlsGroup(controlsGroup + 1);
        }
        if (props.controlsNumber > 1) {
            if (page !== 0 && page < props.controlsNumber * controlsGroup) {
                setControlsGroup(controlsGroup - 1);
            }
        } else {
            if (page < props.controlsNumber * controlsGroup + 1) {
                setControlsGroup(controlsGroup - 1);
            }
        }

        setCurrPage(page);
    };


    return <div className={style.paginationWrapper}>
        <div className={currPage > 0 ? style.control : `${style.control} ${style.disabled}`}
             onClick={() => {if (currPage > 0) onClickHandler(currPage - 1)}}>&#8678;</div>
        {renderControls()}
        <div className={currPage < pageCount - 1 ? style.control : `${style.control} ${style.disabled}`}
             onClick={() => {if (currPage < pageCount - 1) onClickHandler(currPage + 1)}}>&#8680;</div>
    </div>
};

export default Pagination;