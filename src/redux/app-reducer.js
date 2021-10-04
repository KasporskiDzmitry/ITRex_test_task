import axios from "axios";
import {API_URL} from '../util/constants';
import {ITEMS_PER_PAGE} from "../util/constants";

const SET_USERS = 'SET_USERS';
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SET_USERS_TO_SHOW = 'SET_USERS_TO_SHOW';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';


const initialState = {
    users: [],
    usersToShow: [],
    currentUser: null,
    currentPage: 0,
    isFetching: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_USERS_TO_SHOW: {
            return {
                ...state,
                usersToShow: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case SET_CURRENT_USER: {
            return {
                ...state,
                currentUser: action.user
            }
        }
        default: {
            return state
        }
    }
};

const toggleIsFetching = isFetching => ({type: TOGGLE_IS_FETCHING, isFetching});
const setUsers = users => ({type: SET_USERS, users});
export const setUsersToShow = users => ({type: SET_USERS_TO_SHOW, users});
export const setCurrentUser = user => ({type: SET_CURRENT_USER, user});
export const setCurrentPage = page => ({type: SET_CURRENT_PAGE, page});

export const fetchUsers = () => async dispatch => {
    dispatch(toggleIsFetching(true));
    const response = await axios.get(API_URL);
    const users = response.data.sort((a, b) => a.id - b.id);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(users));
    dispatch(setUsersToShow(users));
};

export default appReducer;