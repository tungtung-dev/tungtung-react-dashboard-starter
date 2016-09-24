import {getUserMe} from '../../api/AuthApi';
import {AWAIT_MARKER} from 'redux-await';

export const AUTH_SET_AUTHENTICATION = 'AUTH/set-authentication';
export const AUTH_GET_USER_FROM_TOKEN = 'AUTH/get-user-from-token';
export const AUTH_LOGOUT = 'AUTH/logout';
export const AUTH_UPDATE_PROFILE = 'AUTH/update-profile';
export const AUTH_UPDATE_AVATAR = 'AUTH/update-avatar';

export function setAuthToken(token, user = {}) {
    return dispatch => {
        localStorage.setItem('auth_token', token);
        dispatch({
            type: AUTH_SET_AUTHENTICATION,
            token,
            user
        });
    }
}

export function getUserFromToken() {
    return dispatch => {
        dispatch({
            type: AUTH_GET_USER_FROM_TOKEN,
            AWAIT_MARKER,
            payload: {
                getUserFromToken: getUserMe()
            }
        })
    }
}

export function authLogout() {
    return dispatch => {
        localStorage.removeItem('auth_token');
        dispatch({
            type: AUTH_LOGOUT
        })
    }
}

export function updateProfile(user) {
    return dispatch => {
        console.log(user);
        dispatch({
            type: AUTH_UPDATE_PROFILE,
            user
        });
    }
}

export function updateAvatar(avatar, avatar_url) {
    return dispatch => {
        dispatch({
            type: AUTH_UPDATE_AVATAR,
            avatar,
            avatar_url
        })
    }
}