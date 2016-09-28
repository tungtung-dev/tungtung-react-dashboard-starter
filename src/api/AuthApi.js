import {postFetch, getFetch, putFetch, deleteFetch} from '../utils/fetch';
import {AUTH_API} from '../config/index';
//const url = 'http://192.168.1.9:6022';
//107.191.98.127
const url = AUTH_API;

export function getUrl(path) {
    return url + '/' + path;
}

export function getAuthUrl(path) {
    return url + '/auth/' + path;
}

export function checkFieldExists(field, value) {
    return getFetch(getAuthUrl(`check-exists?field=${field}&value=${value}`));
}

export function authRegister(user) {
    return postFetch(getAuthUrl(`register`), user);
}

export function authLogin(user) {
    return postFetch(getAuthUrl(`login`), user);
}

export function socialCheckLogin(social, token) {
    return postFetch(getAuthUrl(`social/check-login`), {social, token});
}

export function socialConfirmUser(user) {
    const {social, token, username, password} = user;
    return postFetch(getAuthUrl(`social/confirm`), {social, token, username, password});
}

export function getUserMe() {
    return getFetch(getAuthUrl('me'));
}

export function updateProfile(profile) {
    return putFetch(getAuthUrl('profile'), profile);
}

export function updateTagFollow(tags_follow) {
    return putFetch(getAuthUrl('tags-follow'), {tags_follow});
}

export function updatePassword(password, new_password) {
    return putFetch(getAuthUrl('password'), {password, new_password});
}

export function updateAvatar(image_base64) {
    return putFetch(getAuthUrl('avatar'), {image_base64});
}

export function getUsers(page = 1, item_per_page = 10) {
    return getFetch(getUrl(`users?page=${page}&item_per_page=${item_per_page}`));
}

export function getUserInfo(user_id) {
    return getFetch(getUrl(`users/${user_id}`));
}

export function followUser(user_id){
    return getFetch(getUrl(`users/${user_id}/follow`));
}

export function unfollowUser(user_id){
    return getFetch(getUrl(`users/${user_id}/unfollow`));
}

export function deleteUser(user_id){
    return deleteFetch(getUrl(`users/${user_id}/delete`));
}

export function checkFollowUser(user_id){
    return getFetch(getUrl(`users/${user_id}/check-followed`));
}

export default {
    checkFieldExists,
    authRegister,
    authLogin,
    socialCheckLogin,
    socialConfirmUser,
    getUserMe,
    updateProfile,
    updateTagFollow,
    updatePassword,
    updateAvatar,
    getUsers,
    getUserInfo,
    followUser,
    unfollowUser,
    checkFollowUser
}