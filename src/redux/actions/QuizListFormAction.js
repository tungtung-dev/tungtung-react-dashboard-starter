import {answerTypes} from '../../constants/quizType';
import {AWAIT_MARKER} from 'redux-await';
import quizApi from '../../api/QuizApi';

export const UPDATE_KEY_FORM = 'QUIZ-LIST-FORM/update-key-form';
export const UPDATE_QUIZ_FORMS = 'QUIZ-LIST-FORM/update-quiz-forms';
export const UPDATE_QUIZ_FORM = 'QUIZ-LIST-FORM/update-quiz-form-by-index';
export const ADD_QUIZ_FORM = 'QUIZ-LIST-FORM/add-quiz-form';
export const REMOVE_QUIZ_FORM = 'QUIZ-LIST-FORM/remove-quiz-form';
export const UPDATE_QUIZ_LIST_FORM = 'QUIZ-LIST-FORM/update-quiz-list-form';
export const CLEAR_QUIZ_FORM = 'QUIZ-LIST-FORM/clear-quiz-form';
export const CHANGE_KEY_SUGGEST_EDITOR = 'QUIZ-LIST-FORM/change-key-suggest-editor';
export const SHUFFLE_QUIZZES = 'QUIZ-LIST-FORM/shuffle-quizzes';
export const SERVER_GET_QUIZ_LIST = 'QUIZ-LIST-FORM/get-quiz-list';
export const SERVER_UPDATE_QUIZ_LIST = 'QUIZ-LIST-FORM/update-quiz-list';
export const SERVER_CREATE_QUIZ_LIST = 'QUIZ-LIST-FORM/create-quiz-list';

export function updateKeyForm(key, value) {
    return dispatch => {
        dispatch({type: UPDATE_KEY_FORM, key, value});
    }
}

export function updateQuizForm(id, quiz) {
    return dispatch => {
        dispatch({type: UPDATE_QUIZ_FORM, id, quiz})
    }
}

export function clearQuizListForm() {
    return dispatch => {
        dispatch({type: CLEAR_QUIZ_FORM});
    }
}

export function addQuizForm(quizType, defaultAnswerType = answerTypes.EDITOR, parent_id = 0) {
    return dispatch => {
        dispatch({type: ADD_QUIZ_FORM, quizType, defaultAnswerType, parent_id})
    }
}

export function removeQuizForm(id) {
    return dispatch => {
        dispatch({type: REMOVE_QUIZ_FORM, id});
    }
}

export function updateQuizForms(quizzes) {
    return dispatch => {
        dispatch({type: UPDATE_QUIZ_FORMS, quizzes})
    }
}

export function updateQuizListForm(quizListForm) {
    return dispatch => {
        dispatch({type: UPDATE_QUIZ_LIST_FORM, quizListForm})
    }
}

export function shuffleQuizzes() {
    return dispatch => {
        dispatch({type: SHUFFLE_QUIZZES});
    }
}

export function changeKeySuggestEditor(key, value) {
    return dispatch => {
        dispatch({type: CHANGE_KEY_SUGGEST_EDITOR, key, value});
    }
}

export function getQuizList(id, type = '', isShuffleQuizzes = false) {
    return dispatch => {
        dispatch({
            type: SERVER_GET_QUIZ_LIST,
            AWAIT_MARKER,
            payload: {
                getQuizList: quizApi.getQuizList(id, type)
            },
            isShuffleQuizzes
        })
    }
}

export function updateQuizList(id, quizListForm) {
    return dispatch => {
        dispatch({
            type: SERVER_UPDATE_QUIZ_LIST,
            AWAIT_MARKER,
            payload: {
                updateQuizList: quizApi.updateQuizList(id, quizListForm)
            }
        })
    }
}

export function createQuizList(quizListForm) {
    return dispatch => {
        dispatch({
            type: SERVER_CREATE_QUIZ_LIST,
            AWAIT_MARKER,
            payload: {
                createQuizList: quizApi.createQuizList(quizListForm)
            }
        })
    }
}

export default {
    updateKeyForm, updateQuizForm, clearQuizListForm, addQuizForm, removeQuizForm, updateQuizForms, updateQuizListForm,
    shuffleQuizzes, changeKeySuggestEditor, getQuizList, updateQuizList, createQuizList
}