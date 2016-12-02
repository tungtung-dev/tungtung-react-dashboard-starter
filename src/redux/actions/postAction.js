import {AWAIT_MARKER} from 'redux-await';
import {PostApi} from '../../api';

export const GET_POSTS = 'POST/get-posts';
export const CREATE_POST = 'POST/create-post';
export const UPDATE_POST = 'POST/update-post';
export const UPDATE_CURRENT_POST = 'POST/update-current-post';
export const GET_POSTS_FILTER = 'POST/get-posts';
export const GET_POST = 'POST/get-post';
export const CLEAR_POST = 'POST/clear-post';

export function getPosts(...args) {
    return {
        type: GET_POSTS,
        AWAIT_MARKER,
        payload: {
            getPosts: PostApi.getPosts(...args)
        }
    }
}

export function getPostsByFilter(filter = '', page = 1, itemPerPage = 10) {
    return {
        type: GET_POSTS_FILTER,
        AWAIT_MARKER,
        payload: {
            getPosts: PostApi.getPostsByFilter(filter, page, itemPerPage)
        }
    }
}

export function getPost(id) {
    return {
        type: GET_POST,
        AWAIT_MARKER,
        payload: {
            getPost: PostApi.getPost(id)
        }
    }
}

export function updateCurrentPost(dataPost) {
    return {
        type: UPDATE_CURRENT_POST,
        dataPost
    }
}

export function createPost(dataPost) {
    return {
        type: CREATE_POST,
        AWAIT_MARKER,
        payload: {
            createPost: PostApi.createPost(dataPost)
        }
    }
}

export function updatePost(postKey, dataPost) {
    return {
        type: UPDATE_POST,
        AWAIT_MARKER,
        payload: {
            updatePost: PostApi.updatePost(postKey, dataPost)
        }
    }
}

export function updatePostState(postKey, state){
    return PostApi.updatePost(postKey, {state});
}

export function clearPost() {
    return {
        type: CLEAR_POST
    }
}

export function deletePost(id) {
    return PostApi.deletePost(id)
}

export async function updateStateMultiplePosts(postsKey, state) {
    const promises = postsKey.map(async postKey => {
        return updatePostState(postKey, state);
    });
    for (const promise of promises) {
        await promise;
    }
    return true;
}

export async function deleteMultiplePosts(postsKey) {
    const promises = postsKey.map(async postKey => {
        return deletePost(postKey);
    });
    for (const promise of promises) {
        await promise;
    }
    return true;
}

export default {
    getPosts, getPostsByFilter, getPost, createPost,
    updatePost, clearPost, deletePost, deleteMultiplePosts,
    updateCurrentPost, updatePostState, updateStateMultiplePosts
}