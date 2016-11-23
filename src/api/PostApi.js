import {randomPosts} from '../utils/mock_data';
//import {getPostApi} from './utils';

export function getPosts(page = 1, item_per_page = 10) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve(randomPosts(page, item_per_page))
        }, 300);
    });
}

export function getPost(id) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            const posts = randomPosts(1, 2);
            resolve(posts.data[1]);
        }, 300)
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
export default {
    getPosts,
    getPost,
    getPostsByFilter,
    deletePost
}