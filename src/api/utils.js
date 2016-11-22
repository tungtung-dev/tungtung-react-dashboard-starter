import {api} from '../config';
import path from 'path';

export function getAuthApi(urlQuery){
    return path.join(api.auth, 'auth', urlQuery);
}

export function getUserApi(urlQuery){
    return path.join(api.default, 'users', urlQuery);
}

export function getPostApi(urlQuery){
    return path.join(api.default, 'post', urlQuery)
}

export function getMediaApi(urlQuery){
    return path.join(api.media, 'media', urlQuery);
}

export default {
    getAuthApi,
    getUserApi,
    getPostApi,
    getMediaApi
}