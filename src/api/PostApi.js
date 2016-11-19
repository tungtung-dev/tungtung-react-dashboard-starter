import {MEDIA_API} from '../config/index';
import {getFetch, postFetch, putFetch, deleteFetch} from '../utils/fetch';
import {randomPosts} from '../utils/mock_data';

const url = MEDIA_API;

export function getUrl(path) {
    return url + '/posts/' + path;
}

export function getPosts(page = 1, item_per_page = 10) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve(randomPosts(page, item_per_page))
        }, 300);
    });
}

export function getPost(id) {
    return new Promise((resolve, reject) =>{
        const posts = randomPosts(1);
        resolve(posts[1]);
    });
}

export function getPostsByFilter(filter = '', page = 1, item_per_page = 10) {
    return new Promise((resolve, reject) =>{
        resolve(randomPosts(page, item_per_page))
    });
}

export function deletePost(){
    return new Promise((resolve, reject) => {
        resolve();
    });
}
export default {getPosts, getPost, getPostsByFilter, deletePost}