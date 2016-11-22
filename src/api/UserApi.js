import {getFetch, deleteFetch} from '../utils/fetch';
import {getUserApi} from './utils';

export function getUsers(page = 1, item_per_page = 10) {
    return getFetch(getUserApi(`users?page=${page}&item_per_page=${item_per_page}`));
}

export function getUserInfo(user_id) {
    return getFetch(getUserApi(`users/${user_id}`));
}

export function followUser(user_id) {
    return getFetch(getUserApi(`users/${user_id}/follow`));
}

export function unfollowUser(user_id) {
    return getFetch(getUserApi(`users/${user_id}/unfollow`));
}

export function deleteUser(user_id) {
    return deleteFetch(getUserApi(`users/${user_id}/delete`));
}

export function checkFollowUser(user_id) {
    return getFetch(getUserApi(`users/${user_id}/check-followed`));
}

export default {
    getUsers,
    getUserInfo,
    followUser,
    unfollowUser,
    deleteUser,
    checkFollowUser
}