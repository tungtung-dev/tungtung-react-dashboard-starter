import {SET_AUTH_SOCIAL, RESET_AUTH_SOCIAL} from '../actions/AuthSocialAction';

const getInitialState = () => ({
    social: '',
    token: '',
    user: {}
});

export default function createReducer(state = getInitialState(), action) {
    switch (action.type) {
        case SET_AUTH_SOCIAL:
            const {social, token, user} = action;
            return {
                ...state,
                social,
                token,
                user
            }
        case RESET_AUTH_SOCIAL:
            return getInitialState();
        default:
            return state;
    }
}