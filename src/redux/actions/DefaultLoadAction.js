import {AWAIT_MARKER} from 'redux-await';
import {getUserInfo as getUserInfoApi} from '../../api/AuthApi';

export const GET_USER_INFO = 'DEFAULT-LOAD/get-user';
export const UPDATE_USER_INFO = 'DEFAULT-LOAD/update-user-info';

export function getUserInfo(user_id) {
    return dispatch => {
        dispatch({
            type: GET_USER_INFO,
            AWAIT_MARKER,
            payload: {
                getUserInfo: getUserInfoApi(user_id)
            }
        })
    }
}

export function updateUserInfo(user_id, user) {
    return dispatch => {
        dispatch({
            type: UPDATE_USER_INFO,
            user_id,
            user
        })
    }
}
