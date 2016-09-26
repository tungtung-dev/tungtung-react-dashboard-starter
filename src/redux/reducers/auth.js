import {AUTH_SET_AUTHENTICATION, AUTH_GET_USER, AUTH_UPDATE_PROFILE, AUTH_LOGOUT, AUTH_UPDATE_AVATAR} from '../actions/AuthAction';

const getInitialState = () => {
    return {
        token: '',
        user: {
            displayName: ''
        }
    }
}

export default function createReducer(state = getInitialState(), action) {
    switch (action.type) {
        case AUTH_SET_AUTHENTICATION:
            return {
                ...state,
                token: action.token,
                user: {
                    ...state.user,
                    ...action.user
                }
            }
        case AUTH_GET_USER:
            return {
                ...state,
                token: action.payload.getCurrentUser.token,
                user: {
                    ...state.user,
                    ...action.payload.getCurrentUser
                }
            }
        case AUTH_UPDATE_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.user
                }
            }
        case AUTH_UPDATE_AVATAR:
            const {avatar, avatar_url} = action;
            console.log(action);
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar, avatar_url
                }
            }
        case AUTH_LOGOUT:
            return getInitialState();
        default:
            return state;
    }
}