/* eslint-disable */
import {GET_TAGS_QUIZ_LIST, ADD_TAG_QUIZ_LIST, GET_USER_INFO, UPDATE_USER_INFO, GET_CATEGORIES_QUIZ_LIST} from '../actions/DefaultLoadAction';

function getInitialState() {
    return {
        tagsQuizList: [],
        categoriesQuizList: [],
        users: []
    }
}

function filterTagsName(tags = []) {
    return tags.map(tag => tag);
}

export default function createReducer(state = getInitialState(), action) {
    switch (action.type) {
        case GET_CATEGORIES_QUIZ_LIST:
            return {
                ...state,
                categoriesQuizList: action.payload.getCategoriesQuizList
            }
        case GET_TAGS_QUIZ_LIST:
            return {
                ...state,
                tagsQuizList: filterTagsName(action.payload.getTagsQuizList)
            }
        case ADD_TAG_QUIZ_LIST:
            return {
                ...state,
                tagsQuizList: state.tagsQuizList.concat({tag_name: action.tag})
            }
        case GET_USER_INFO:
            var userInfo = action.payload.getUserInfo;
            var users = state.users;
            if (userInfo) {
                let user = state.users.find(u => userInfo._id === u.id);
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