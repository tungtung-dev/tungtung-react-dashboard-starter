import {getFetch, postFetch, putFetch, deleteFetch} from '../utils/fetch';
import {randomPosts} from '../utils/mock_data';
import {getPostApi, convertObjectToQueryString} from './utils';

export function getPosts({page = 1, item_per_page = 10, state = '', keyword}) {
    const query = {page, item_per_page, state, keyword}
    const queryString = convertObjectToQueryString(query);
    return getFetch(getPostApi(`?${queryString}`));
}

export function createPost(data) {
    return postFetch(getPostApi(), data);
}

export function updatePost(postSlug, data) {
    return putFetch(getPostApi(postSlug), data);
}

export function getPost(postId) {
    return getFetch(getPostApi(postId));
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = randomPosts(1, 2);
            resolve(posts.data[1]);
        }, 300)
    });
}

export function getPostsByFilter(filter = '', page = 1, item_per_page = 10) {
    return new Promise((resolve, reject) => {
        resolve(randomPosts(page, item_per_page))
    });
}

export function deletePost() {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
export default {
    getPosts,
    getPost,
    createPost,
    updatePost,
    getPostsByFilter,
    deletePost
}