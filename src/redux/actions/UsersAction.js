import AuthApi from '../../api/AuthApi';
import {AWAIT_MARKER} from 'redux-await';

export const GET_USERS = 'USERS/get-users';

export function getUsers(page = 1, item_per_page = 10){
    return dispatch => {
        dispatch({
            type: GET_USERS,
            AWAIT_MARKER,
            payload: {
                getUsers: AuthApi.getUsers(page, item_per_page)
            }
        })
    }
}

export default {getUsers}