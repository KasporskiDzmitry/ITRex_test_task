import React, {useRef, useState} from "react";
import {ButtonDropdown} from "../ButtonDropDown/ButtonDropdown";
import {ITEMS_PER_PAGE} from "../../util/constants";
import Pagination from "../Pagination/Pagination";
import style from './UsersTable.module.scss';

const UsersTable = (props) => {
    const [sortBy, setSortBy] = useState('id');
    const [filter, setFilter] = useState('');
    const [filterState, setFilterState] = useState('All');
    const [isAscSort, setIsAscSort] = useState(true);

    const refs = {
        id: useRef(null),
        firstName: useRef(null),
        lastName: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        state: useRef(null)
    };

    const chooseUser = (user) => {
        props.setCurrentUser(user);
    };

    const createTableHead = () => {
        const names = {
            id: 'id',
            firstName: 'First name',
            lastName: 'Last name',
            email: 'Email',
            phone: 'Phone',
            state: 'State'
        };
        return Object.keys(refs).map((i) => <td key={i} ref={refs[i]} onClick={() => {
            if (sortBy === i) {
                setIsAscSort(!isAscSort);
            }
            setSortBy(i)
        }}>{names[i]} {sortBy === i ? isAscSort ? <span>&#8593;</span> : <span>&#8595;</span> : ''}</td>)
    };

    const renderRows = () => {
        const regExp = new RegExp(filter, 'i');
        let users = props.usersToShow.filter(i => (
            i.firstName.match(regExp) ||
            i.lastName.match(regExp) ||
            i.email.match(regExp) ||
            i.phone.match(regExp) ||
            i.adress.state.match(regExp)
        ));

        if (filterState !== 'All') {
            users = users.filter(i => i.adress.state === filterState);
        }

        const rows = users.sort((a, b) => {
            if (sortBy === 'state') {
                a = a.adress;
                b = b.adress;
            }
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0;
        }).map((i, idx) => <tr key={i.id + idx} className={idx % 2 === 0 ? style.odd : undefined} onClick={() => chooseUser(i)}>
                <td>{i.id}</td>
                <td>{i.firstName}</td>
                <td>{i.lastName}</td>
                <td>{i.email}</td>
                <td>{i.phone}</td>
                <td>{i.adress.state}</td>
            </tr>
        );

        return isAscSort ? rows : rows.reverse();
    };

    return <div className={style.usersTableWrapper}>
        <div className={style.usersTableControlsWrapper}>
            <div className={style.filter}>
                <div>
                    <input type="text" placeholder='Search by name' value={filter}
                           onChange={(e) => setFilter(e.target.value)}/>
                </div>
                <div>
                    <ButtonDropdown btnName={filterState !== 'All' ? filterState : 'Filter by state'}
                                    content={[...new Set(props.usersToShow.map(i => i.adress.state))]}
                                    onClickHandler={setFilterState}/>
                </div>
            </div>
            <Pagination data={props.users} controlsNumber={3} itemsPerPage={ITEMS_PER_PAGE}
                        onPageChange={props.setUsersToShow}/>
        </div>
        <div className={style.usersTableTableWrapper}>
            <table className={props.users.length === 0 ? style.loading : undefined}>
                <thead>
                <tr>
                    {createTableHead()}
                </tr>
                </thead>
                <tbody>
                {renderRows()}
                </tbody>
            </table>
        </div>
    </div>
};

export default UsersTable;