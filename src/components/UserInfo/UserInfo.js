import React from "react";
import style from './UserInfo.module.scss';
import {Button} from "../Button/Button";

const UserInfo = ({user, setCurrentUser}) => {
    return <div className={style.userInfoWrapper}>
        <div className={style.btnWrapper}>
            <Button classList={[style.btn]} onClickHandler={() => setCurrentUser(null)}><span>&#10540;</span></Button>
        </div>
        <div className={style.userInfoProfileWrapper}>
            <div>
                First name
                <input type="text" value={user.firstName}/>
            </div>
            <div>
                Last name
                <input type="text" value={user.lastName}/>
            </div>
            <div>
                Email
                <input type="text" value={user.email}/>
            </div>
            <div>
                Phone
                <input type="text" value={user.phone}/>
            </div>
        </div>
        <div className={style.userInfoProfileAddressWrapper}>
            Address
            <div>
                Street
                <input type="text" value={user.adress.streetAddress}/>
            </div>
            <div>
                City
                <input type="text" value={user.adress.city}/>
            </div>
            <div>
                State
                <input type="text" value={user.adress.state}/>
            </div>
            <div>
                ZIP
                <input type="text" value={user.adress.zip}/>
            </div>
        </div>
    </div>
};

export default UserInfo;