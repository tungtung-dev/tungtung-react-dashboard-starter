import AuthApi from '../../api/AuthApi';
import {AWAIT_MARKER} from 'redux-await';

export const GET_USERS = 'USERS/get-users';

export function getUsers(){
    return dispatch => {
        dispatch({
            type: GET_USERS,
            AWAIT_MARKER,
            payload: {
                getUsers: AuthApi.getUsers()
            }
        })
    }
}

export default {getUsers}