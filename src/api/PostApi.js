import {getFetch, postFetch, putFetch, deleteFetch} from '../utils/fetch';
import {randomPosts} from '../utils/mock_data';
import {getPostApi, convertObjectToQueryString} from './utils';

export function getPosts({page = 1, tags, itemPerPage = 10, state = '', keyword}) {
    const query = {page, itemPerPage, tags, state, keyword}
    const queryString = convertObjectToQueryString(query);
    return getFetch(getPostApi(`?${queryString}`));
}

export function createPost(data) {
    return postFetch(getPostApi(), data);
}

export function updatePost(postKey, data) {
    return putFetch(getPostApi(postKey), data);
}

export function getPost(postKey) {
    return getFetch(getPostApi(postKey));
}

export function getPostsByFilter(filter = '', page = 1, itemPerPage = 10) {
    return new Promise((resolve, reject) => {
        resolve(randomPosts(page, itemPerPage))
    });
}

export function deletePost(postKey) {
    return deleteFetch(getPostApi(postKey))
}
export default {
    getPosts,
    getPost,
    createPost,
    updatePost,
    getPostsByFilter,
    deletePost
}