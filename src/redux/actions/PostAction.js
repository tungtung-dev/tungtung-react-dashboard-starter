import {AWAIT_MARKER} from 'redux-await';
import {PostApi} from '../../api';

export const GET_POSTS = 'POST/get-posts';
export const GET_POSTS_FILTER = 'POST/get-posts';
export const GET_POST = 'POST/get-post';
export const CLEAR_POST = 'POST/clear-post';
export const DELETE_POST = 'POST/delete-post';

export function getPosts(page = 1, item_per_page = 10){
    return {
        type: GET_POSTS,
        AWAIT_MARKER,
        payload: {
            getPosts: PostApi.getPosts(page, item_per_page)
        }
    }
}

export function getPostsByFilter(filter = '', page = 1, item_per_page = 10){
    return {
        type: GET_POSTS_FILTER,
        AWAIT_MARKER,
        payload: {
            getPosts: PostApi.getPostsByFilter(filter, page, item_per_page)
        }
    }
}

export function getPost(id){
    return {
        type: GET_POST,
        AWAIT_MARKER,
        payload: {
            getPost: PostApi.getPost(id)
        }
    }
}

export function clearPost(){
    return {
        type: CLEAR_POST
    }
}

export function deletePost(id){
    PostApi.deletePost(id)
    return {
        type: DELETE_POST
    }
}

export function deleteMultiplePosts(){

}

export default {getPosts, getPostsByFilter, getPost, clearPost, deletePost}