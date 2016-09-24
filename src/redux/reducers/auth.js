import {AUTH_SET_AUTHENTICATION, AUTH_GET_USER_FROM_TOKEN, AUTH_UPDATE_PROFILE, AUTH_LOGOUT, AUTH_UPDATE_AVATAR} from '../actions/AuthAction';

const getInitialState = () => {
    return {
        token: localStorage.auth_token,
        user: {
            avatar: 'http://semantic-ui.com/images/avatar2/small/mark.png'
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
        case AUTH_GET_USER_FROM_TOKEN:
            return {
                ...state,
                token: action.payload.getUserFromToken._id ? state.token : null,
                user: {
                    ...state.user,
                    ...action.payload.getUserFromToken
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