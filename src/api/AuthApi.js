import {postFetch, getFetch, putFetch, deleteFetch} from '../utils/fetch';
import {getAuthApi} from './utils';

export function checkFieldExists(field, value) {
    return getFetch(getAuthApi(`check-exists?field=${field}&value=${value}`));
}

export function authRegister(user) {
    return postFetch(getAuthApi(`register`), user);
}

export function authLogin(user) {
    return postFetch(getAuthApi(`login`), user);
}

export function getUserMe() {
    return getFetch(getAuthApi('me'));
}

export function updateProfile(profile) {
    return putFetch(getAuthApi('profile'), profile);
}

export function updatePassword(password, newPassword) {
    return putFetch(getAuthApi('password'), {password, newPassword});
}

export function updateAvatar(imageBase64) {
    return putFetch(getAuthApi('avatar'), {imageBase64});
}

export default {
    checkFieldExists,
    authRegister,
    authLogin,
    getUserMe,
    updateProfile,
    updatePassword,
    updateAvatar
}