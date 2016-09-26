import {GET_BOOK_LISTS, LOAD_MORE_BOOK_LISTS} from '../actions/BookListsAction';

const inititalState = {
    books: [],
    pagination: {},
    filter: ''
}

export default function createReducer(state = inititalState, action) {
    switch (action.type) {
        case GET_BOOK_LISTS:
            return {
                ...state,
                books: action.payload.getBookLists
            }
        case LOAD_MORE_BOOK_LISTS:
            return {
                ...state,
                books: [
                    ...state.books,
                    ...action.payload.loadMoreBookLists,
                ]
            }
        default:
            return state;
    }
}