import './App.scss';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {fetchUsers, setCurrentUser, setUsersToShow} from "./redux/app-reducer";
import UsersTable from "./components/UsersTable/UsersTable";
import UserInfo from "./components/UserInfo/UserInfo";

class App extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return <div className="app">
            <div className='col-1'>
                <UsersTable users={this.props.users} usersToShow={this.props.usersToShow} setUsersToShow={this.props.setUsersToShow}
                            setCurrentUser={this.props.setCurrentUser}/>
            </div>
            <div className='col-2'>
                {this.props.currentUser &&
                <UserInfo user={this.props.currentUser} setCurrentUser={this.props.setCurrentUser}/>}
            </div>
        </div>
    }
}

const mapStateToProps = state => ({
    users: state.appReducer.users,
    usersToShow: state.appReducer.usersToShow,
    currentUser: state.appReducer.currentUser
});

export default compose(
    connect(mapStateToProps, {fetchUsers, setUsersToShow, setCurrentUser})(App)
);
