import {UserApi} from '../../api';
import {AWAIT_MARKER} from 'redux-await';

export const GET_USERS = 'USERS/get-users';
export const GET_USER_INFO = 'DEFAULT-LOAD/get-user';
export const UPDATE_USER_INFO = 'DEFAULT-LOAD/update-user-info';

export function getUsers(page = 1, itemPerPage = 10){
    return dispatch => {
        dispatch({
            type: GET_USERS,
            AWAIT_MARKER,
            payload: {
                getUsers: UserApi.getUsers(page, itemPerPage)
            }
        })
    }
}

export function getUserInfo(userId) {
    return dispatch => {
        dispatch({
            type: GET_USER_INFO,
            AWAIT_MARKER,
            payload: {
                getUserInfo: UserApi.getUserInfo(userId)
            }
        })
    }
}

export function updateUserInfo(userId, user) {
    return dispatch => {
        dispatch({
            type: UPDATE_USER_INFO,
            userId,
            user
        })
    }
}

export default {
    getUsers,
    getUserInfo,
    updateUserInfo
}