import {GET_BOOK, CLEAR_BOOK} from '../actions/BookAction';

const initialState = {
    title: '',
    sub_title: '',
    photoURL: '',
    summary: '',
    about_book: '',
    chapters: [],
    author: {
        name: "",
        photoURL: ""
    }
}

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BOOK:
            return {
                ...state,
                ...action.payload.getBook
            }
        case CLEAR_BOOK:
            return initialState;
        default:
            return state;
    }
}