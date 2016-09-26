import {AWAIT_MARKER} from 'redux-await';
import {BookApi} from '../../api/index'

export const BOOK_ITEM_PER_PAGE = 10;
export const GET_BOOK_LISTS = 'BOOK-LISTS/get-book-lists';
export const LOAD_MORE_BOOK_LISTS = 'BOOK-LISTS/load-more-book-lists';


export function getBookLists(page, item_per_page){
    return dispatch => {
        dispatch({
            type: GET_BOOK_LISTS,
            AWAIT_MARKER,
            payload: {
                getBookLists: BookApi.getBookLists(page, item_per_page)
            }
        })
    }
}

export function loadMoreBookLists(page, item_per_page){
    return dispatch => {
        dispatch({
            type: LOAD_MORE_BOOK_LISTS,
            AWAIT_MARKER,
            payload: {
                loadMoreBookLists: {}
            }
        })
    }
}

export default {getBookLists, loadMoreBookLists}