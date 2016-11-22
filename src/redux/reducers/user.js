import {
    GET_USERS, GET_USER_INFO, UPDATE_USER_INFO
} from '../actions/userAction';
import update from 'react-addons-update';

const getInitialState = () => {
    return {
        lists: {
            data: [],
            pagination: {},
            filter: ''
        }
    };
}

export default function createReducer (state = getInitialState(), action) {
    switch (action.type){
        case GET_USERS:
            return getUsers(state, action);
        case GET_USER_INFO:
            return getUserInfo(state, action);
        case UPDATE_USER_INFO:
            return updateUserInfo(state, action);
        default:
            return state;
    }
}

export function getUsers(state, action){
    const {users, pagination} = action.payload.getUsers;
    return update(state, {
        lists: {
            data: {$set: users},
            pagination:{$set: pagination}
        }
    })
}

export function getUserInfo(state, action){
    const userInfo = action.payload.getUserInfo;
    let usersList = state.lists.data;
    if (userInfo) {
        let user = state.users.find(u => userInfo.id === u.id);
        if (!user) {
            usersList = usersList.concat(userInfo);
        }
    }
    return update(state, {
        lists: {
            data: {$set: usersList}
        }
    })
}

export function updateUserInfo(state, action){
    let usersList = state.lists.data;
    let userIndex = users.findIndex((u) => u._id === action.userId);
    if (userIndex >= 0) {
        usersList[userIndex] = action.user;
    }
    return update(state, {
        lists: {
            data: usersList
        }
    })
}