import {AWAIT_MARKER} from 'redux-await';

import {AuthApi} from '../../api/index';
import {storageKey} from '../../config';

export const AUTH_SET_AUTHENTICATION = 'AUTH/set-authentication';
export const AUTH_GET_USER = 'AUTH/get-user';
export const AUTH_LOGOUT = 'AUTH/logout';
export const AUTH_UPDATE_PROFILE = 'AUTH/update-profile';
export const AUTH_UPDATE_AVATAR = 'AUTH/update-avatar';

export function setAuthToken(token, user = {}) {
    return dispatch => {
        localStorage.setItem(storageKey.auth, token);
        dispatch({
            type: AUTH_SET_AUTHENTICATION,
            token,
            user
        });
    }
}

export function getCurrenUser() {
    return dispatch => {
        dispatch({
            type: AUTH_GET_USER,
            AWAIT_MARKER,
            payload: {
                getCurrentUser: AuthApi.getUserMe()
            }
        })
    }
}

export function authLogout() {
    localStorage.removeItem('auth_token');
    return dispatch => {
        dispatch({
            type: AUTH_LOGOUT
        })
    }
}

export function updateProfile(user) {
    return dispatch => {
        dispatch({
            type: AUTH_UPDATE_PROFILE,
            user
        });
    }
}

export function updateAvatar(avatar, avatarUrl) {
    return dispatch => {
        dispatch({
            type: AUTH_UPDATE_AVATAR,
            avatar,
            avatarUrl
        })
    }
}

export default {
    setAuthToken, getCurrenUser, authLogout, updateProfile, updateAvatar
}