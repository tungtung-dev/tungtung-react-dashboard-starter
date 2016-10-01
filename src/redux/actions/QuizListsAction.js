import QuizApi from '../../api/QuizApi';
import {AWAIT_MARKER} from 'redux-await';

export const GET_QUIZ_LISTS = 'QUIZ-LISTS/get-quiz-lists';
export const CHANGE_KEY_SEARCH_FORM = 'QUIZ-LISTS/change-key-search-form';

export function getQuizLists(status_type, page = 1, item_per_page = 5) {
    return dispatch => {
        dispatch({
            type: GET_QUIZ_LISTS,
            AWAIT_MARKER,
            payload: {
                getQuizLists: QuizApi.getQuizLists(status_type, page, item_per_page)
            }
        })
    }
}


export function getQuizListsByTag(tag_name, page = 1, item_per_page = 5) {
    return dispatch => {
        dispatch({
            type: GET_QUIZ_LISTS,
            AWAIT_MARKER,
            payload: {
                getQuizLists: QuizApi.getQuizListsByTag(tag_name, page, item_per_page)
            }
        })
    }
}

export function getQuizListsBySearch(search, page = 1, item_per_page = 5) {
    return dispatch => {
        dispatch({
            type: GET_QUIZ_LISTS,
            AWAIT_MARKER,
            payload: {
                getQuizLists: QuizApi.getQuizListsBySearch(search, page, item_per_page)
            }
        })
    }
}

export function changeKeySearchForm(key, value) {
    return dispatch => {
        dispatch({
            type: CHANGE_KEY_SEARCH_FORM,
            key,
            value
        });
    }
}

export default {getQuizLists, getQuizListsByTag, getQuizListsBySearch, changeKeySearchForm}