import {GET_QUIZ_LISTS, CHANGE_KEY_SEARCH_FORM} from '../actions/QuizListsAction';
import update from 'react-addons-update';

const getInitialState = () => {
    return {
        data: [],
        pagination: {
            total_item: 0,
            item_per_page: 10,
            page: 1
        },
        filterBy: '',
        search: {
            text: '',
            tags: [],
            isTags: false
        },
        tag: '',
        category: ''
    }
}

export default function createReducer(state = getInitialState(), action) {
    switch (action.type) {
        case GET_QUIZ_LISTS:
            return {
                ...state,
                data: action.payload.getQuizLists.quiz_list,
                pagination: action.payload.getQuizLists.pagination
            }
        case CHANGE_KEY_SEARCH_FORM:
            return update(state, {
                search: {
                    [action.key]: {$set: action.value}
                }
            });
        default:
            return state;
    }
}