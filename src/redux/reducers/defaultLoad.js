/* eslint-disable */
import {GET_USER_INFO, UPDATE_USER_INFO} from '../actions/DefaultLoadAction';

function getInitialState() {
    return {
        tagsQuizList: [],
        categoriesQuizList: [],
        users: []
    }
}

export default function createReducer(state = getInitialState(), action) {
    switch (action.type) {
        case GET_USER_INFO:
            var userInfo = action.payload.getUserInfo;
            var users = state.users;
            if (userInfo) {
                var user = state.users.find(u => userInfo._id === u.id);
                if (!user) {
                    users = users.concat(userInfo);
                }
            }
            return {
                ...state,
                users
            }
        case UPDATE_USER_INFO:
            var users = state.users;
            var uIndex = users.findIndex((u) => u._id === action.user_id);
            if (uIndex >= 0) {
                users[uIndex] = action.user;
            }
            return {
                ...state,
                users
            }
        default:
            return state;
    }
}
