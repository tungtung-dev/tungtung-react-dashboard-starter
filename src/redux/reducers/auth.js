import update from 'react-addons-update';
import {
    AUTH_SET_AUTHENTICATION, AUTH_GET_USER, AUTH_UPDATE_PROFILE, 
    AUTH_LOGOUT, AUTH_UPDATE_AVATAR
} from '../actions/AuthAction';
import {storageKey} from '../../config';

const getInitialState = () => {
    return {
        token: localStorage.getItem(storageKey.auth),
        user: {
            fullName: ''
        }
    }
}

export default function createReducer(state : AuthReducerState = getInitialState(), action) {
    switch (action.type) {
        case AUTH_SET_AUTHENTICATION:
            return setAuthentication(state, action);
        case AUTH_GET_USER:
            return getAuthUser(state, action);
        case AUTH_UPDATE_PROFILE:
            return updateProfile(state, action);
        case AUTH_UPDATE_AVATAR:
            return updateAvatar(state, action);
        case AUTH_LOGOUT:
            return getInitialState();
        default:
            return state;
    }
}

export function setAuthentication(state, action){
    return update(state, {
        token: {$set: action.token},
        user: {
            $merge: action.user
        }
    })
}

export function getAuthUser(state, action) {
    const userRes = action.payload.getCurrentUser;
    return update(state, {
        token: {$set: userRes.token ? state.token : null},
        user: {
            $merge: userRes
        }
    })
}

export function updateProfile(state, action){
    return update(state, {
        user: {
            $merge: action.user
        }
    })
}

export function updateAvatar(state, action){
    const {avatar, avatarUrl} = action;
    return updateProfile(state, {
        user: {
            avatar,
            avatarUrl
        }
    })
}