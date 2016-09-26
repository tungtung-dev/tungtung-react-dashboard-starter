import {AWAIT_MARKER} from 'redux-await';
import {BookApi} from '../../api/index'

export const GET_BOOK = 'BOOK/get-book';
export const CLEAR_BOOK = 'BOOK/clear-book';

export function getBook(id){
    return dispatch => {
        dispatch({
            type: GET_BOOK,
            AWAIT_MARKER,
            payload: {
                getBook: BookApi.getBook(id)
            }
        })
    }
}

export function clearBook(){
    return dispatch => {
        dispatch({
            type: CLEAR_BOOK
        })
    }
}

export default {getBook, clearBook}