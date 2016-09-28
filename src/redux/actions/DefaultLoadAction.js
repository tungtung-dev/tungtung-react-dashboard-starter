import {AWAIT_MARKER} from 'redux-await';
import {getCategoriesQuizList, getTagsQuizList} from '../../api/QuizApi';
import {getUserInfo as getUserInfoApi, getUsers as getUsersApi} from '../../api/AuthApi';

export const GET_CATEGORIES_QUIZ_LIST = 'DEFAULT-LOAD/load-categories-quiz-list';
export const GET_TAGS_QUIZ_LIST = 'DEFAULT-LOAD/load-tags-quiz-list';
export const ADD_TAG_QUIZ_LIST = 'DEFAULT-LOAD/add-tag-quiz-list';
export const GET_USER_INFO = 'DEFAULT-LOAD/get-user';
export const UPDATE_USER_INFO = 'DEFAULT-LOAD/update-user-info';
export const GET_USERS = 'DEFAULT-LOAD/get-users';

export function getUsers(){
    return dispatch => {
        dispatch({
            type: GET_USERS,
            AWAIT_MARKER,
            payload: {
                getUsers: getUsersApi()
            }
        })
    }
}

export function loadCategoriesQuizList() {
    return dispatch => {
        dispatch({
            type: GET_CATEGORIES_QUIZ_LIST,
            AWAIT_MARKER,
            payload: {
                getCategoriesQuizList: getCategoriesQuizList()
            }
        });
    }
}

export function loadTagsQuizList() {
    return dispatch => {
        dispatch({
            type: GET_TAGS_QUIZ_LIST,
            AWAIT_MARKER,
            payload: {
                getTagsQuizList: getTagsQuizList()
            }
        });
    }
}

export function addTagQuizList(tag) {
    return dispatch => {
        dispatch({
            type: ADD_TAG_QUIZ_LIST,
            tag
        })
    }
}

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
