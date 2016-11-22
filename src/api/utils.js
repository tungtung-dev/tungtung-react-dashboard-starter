import {api} from '../config';
import path from 'path';

export function getAuthApi(urlQuery){
    return api.auth + path.join('/auth', urlQuery);
}

export function getUserApi(urlQuery){
    return api.default + path.join('/users', urlQuery);
}

export function getPostApi(urlQuery){
    return api.default + path.join('/post', urlQuery);
}

export function getMediaApi(urlQuery){
    return api.media + path.join('/media', urlQuery);
}

export default {
    getAuthApi,
    getUserApi,
    getPostApi,
    getMediaApi
}